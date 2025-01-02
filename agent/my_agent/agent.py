from dotenv import load_dotenv
from langchain_community.tools.tavily_search import TavilySearchResults
from langchain_core.messages import AIMessage
from langchain_openai import ChatOpenAI
from langgraph.checkpoint.memory import MemorySaver
from langgraph.graph import END, StateGraph, START
from langgraph.graph.message import add_messages
from pydantic import BaseModel
from typing import List
from typing_extensions import TypedDict, Annotated

load_dotenv()


class ReWOO(TypedDict):
    task: str
    plan_string: str
    steps: List
    results: dict
    messages: Annotated[list, add_messages]


model = ChatOpenAI(model="gpt-4o", base_url="https://models.inference.ai.azure.com")

prompt = """For the following task, make plans that can solve the problem step by step. For each plan, indicate \
which external tool together with tool input to retrieve evidence. You can store the evidence into a \
variable #E that can be called by later tools. Each plan should follow this format:
- plan: [Description of the plan]
- evidence_id: [Evidence identifier, e.g., #E1, #E2]
- tool_name: [Google or LLM]
- tool_input: [Input to the tool]

Tools can be one of the following:
(1) Google[input]: Worker that searches results from Google. Useful when you need to find short
and succinct answers about a specific topic. The input should be a search query.
(2) LLM[input]: A pretrained LLM like yourself. Useful when you need to act with general
world knowledge and common sense. Prioritize it when you are confident in solving the problem
yourself. Input can be any instruction.

Task: {task}"""

class Step(BaseModel):
    plan: str
    evidence_id: str
    tool_name: str
    tool_input: str

class StepsOutput(BaseModel):
    Steps: List[Step]

def get_plan(state: ReWOO):
    messages = state["messages"]
    task = messages[-1].content
    planner = model.with_structured_output(StepsOutput)
    steps_output = planner.invoke(prompt.format(task=task))
    return {**state, "task": task, "steps": steps_output.Steps}


search = TavilySearchResults()


def _get_current_task(state: ReWOO):
    if "results" not in state or state["results"] is None:
        return 1
    if len(state["results"]) == len(state["steps"]):
        return None
    else:
        return len(state["results"]) + 1


def tool_execution(state: ReWOO):
    """Worker node that executes the tools of a given plan."""
    _step = _get_current_task(state)
    step = state["steps"][_step - 1]
    _results = state.get("results", {})

    for k, v in _results.items():
        step.tool_input = step.tool_input.replace(k, v)
        
    if step.tool_name == "Google":
        result = search.invoke(step.tool_input)
    elif step.tool_name == "LLM":
        result = model.invoke(step.tool_input)
    else:
        raise ValueError

    _results[step.evidence_id] = str(result)
    return {**state, "results": _results}


solve_prompt = """Solve the following task or problem. To solve the problem, we have made step-by-step Plan and \
retrieved corresponding Evidence to each Plan. Use them with caution since long evidence might \
contain irrelevant information.

{plan}

Now solve the question or task according to provided Evidence above. Respond with the answer
directly with no extra words.

Task: {task}
Response:"""


def solve(state: ReWOO):
    plan = ""
    for step in state["steps"]:
        _results = state.get("results", {})
        for k, v in _results.items():
            step.tool_input = step.tool_input.replace(k, v)
            step.evidence_id = step.evidence_id.replace(k, v)
        plan += f"Plan: {step.plan}\n{step.evidence_id} = {step.tool_name}[{step.tool_input}]"
    
    prompt = solve_prompt.format(plan=plan, task=state["task"])
    result = model.invoke(prompt)

    messages = state["messages"]
    ai_message = AIMessage(content = result.content)

    return {**state, "messages": messages + [ai_message]}


def _route(state):
    _step = _get_current_task(state)
    return "tool" if _step else "solve"


workflow = StateGraph(ReWOO)
workflow.add_node("plan", get_plan)
workflow.add_node("tool", tool_execution)
workflow.add_node("solve", solve)

workflow.add_edge(START, "plan")
workflow.add_edge("plan", "tool")
workflow.add_conditional_edges("tool", _route)
workflow.add_edge("solve", END)

graph = workflow.compile(checkpointer=MemorySaver())
