import { useEffect, useRef, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import ChatMessage from "@/components/chat-message";
import ChatInput from "@/components/chat-input";
import { Role, TextMessage } from "@copilotkit/runtime-client-gql";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Loader2 } from "lucide-react";

interface ChatInterfaceProps {
  username: string;
  isLoading: boolean;
  appendMessage: (message: TextMessage) => void;
  visibleMessages: TextMessage[];
}

export default function ChatInterface({
  username,
  isLoading,
  appendMessage,
  visibleMessages,
}: ChatInterfaceProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [visibleMessages]);

  const [input, setInput] = useState("");

  const handleSend = async () => {
    if (input.trim()) {
      appendMessage(
        new TextMessage({
          content: input,
          role: Role.User,
        })
      );
      setInput("");
    }
  };

  return (
    <div className="flex-1 flex flex-col">
      <div className="p-4 border-b border-border flex items-center">
        <h3 className="font-semibold">Planova</h3>
      </div>
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {visibleMessages.map(
            (message) =>
              message.content && (
                <ChatMessage
                  key={message.id}
                  username={message.role === Role.User ? username : "Planova"}
                  content={message.content}
                  sender={message.role === Role.User ? "user" : "bot"}
                />
              )
          )}
        </div>
        <div ref={messagesEndRef} />
      </ScrollArea>
      <ChatInput
        isLoading={isLoading}
        input={input}
        setInput={setInput}
        handleSend={handleSend}
      />
    </div>
  );
}
