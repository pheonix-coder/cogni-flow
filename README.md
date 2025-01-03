![cogni-flow](https://socialify.git.ci/pheonix-coder/cogni-flow/image?custom_description=QnA+AI+webapp+using+ReWoo+Agent&description=1&font=KoHo&name=1&owner=1&pattern=Overlapping+Hexagons&theme=Light)


### ⭐ About  

- Open-source web app for asking questions.  
- Built with Next.js, CopilotKit.  
- Uses a ReWoo LangGraph agent to interact with user.
- Minimal clone of discord ui for webapp

<details>
<summary><h2>What is ReWOO?</h2></summary>

ReWOO is an agent architecture designed to improve efficiency and simplify fine-tuning for tool use in AI systems. It features three main modules:

![image](https://github.com/user-attachments/assets/6745dd30-3470-4719-94aa-29357a301579)

### 🧠 Planner
- Generates a step-by-step plan in the following format:
  ```
  Plan: <reasoning>
  #E1 = Tool[argument for tool]
  Plan: <reasoning>
  #E2 = Tool[argument for tool with #E1 variable substitution]
  ...
  ```
- Leverages **variable substitution** to avoid redundant calls to the Planner LLM.

### Worker
- Executes the tools using the arguments provided by the Planner.

### 🧠 Solver
- Generates the final answer for the original task using the observations from the Worker.

Modules marked with a 🧠 emoji involve an LLM call. By consolidating tool usage planning, ReWOO reduces token consumption and execution time compared to ReACT-style architectures.

</details>

### :movie_camera: Demo
[![YouTube](http://i.ytimg.com/vi/lsqSSLxT8bE/hqdefault.jpg)](https://www.youtube.com/watch?v=lsqSSLxT8bE)

### :hammer_and_wrench: Tech Stack

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-black?logo=next.js" alt="Next.js" />
  <img src="https://img.shields.io/badge/CopilotKit-🪁-black" alt="CopilotKit" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/ShadCN--UI-7F56D9" alt="ShadCN UI" />
  <img src="https://img.shields.io/badge/LangGraph-purple" alt="LangGraph" />
  <img src="https://img.shields.io/badge/FastAPI-blue" alt="FastAPI" />
</p>

### :outbox_tray: Set up

#### **Setting Up the Agent and UI**

##### **1. Get an GITHUB PAT**

##### **2. Clone the Repository**
- Clone the repository to your local machine:
   ```sh
   git clone https://github.com/pheonix-coder/cogni-flow.git
   ```

##### **3. Set Up the Agent**
- Navigate to the agent directory:
   ```sh
   cd agent
   ```
- Install dependencies using Poetry:
   ```sh
   poetry install
   ```
- Create a `.env` file inside the `./agent` directory with your **GITHUB_PAT** and **TAVILY_API_KEY**:
   ```
   OPENAI_API_KEY=YOUR_GITHUB_PAT_HERE
   TAVILY_API_KEY=YOUR_TAVILY_API_KEY
   ```
- Run the agent demo:
   ```sh
   poetry run demo
   ```

##### **4. Set Up the UI**
- Navigate to the UI directory:
   ```sh
   cd ./ui
   ```
- Install dependencies using pnpm:
   ```sh
   pnpm i
   ```
- Create a `.env` file inside the `./ui` directory with your **GITHUB_PAT**:
   ```
   OPENAI_API_KEY=YOUR_GITHUB_PAT_HERE
   ```
- Run the Next.js project:
   ```sh
   pnpm dev
   ```

#### **Troubleshooting**
1. Ensure no other local application is running on port **8000**.
2. In the file `/agent/rag_agent/demo.py`, change the address from `0.0.0.0` to `127.0.0.1` or `localhost` if needed.
