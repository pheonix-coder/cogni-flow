"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Markdown from "react-markdown";

interface ChatMessageProps {
  sender: "user" | "bot";
  content: string;
  username: string;
}

export default function ChatMessage({
  sender,
  content,
  username,
}: ChatMessageProps) {
  return (
    <div className="flex items-start gap-3">
      <Avatar>
        <AvatarImage
          src={
            sender === "bot"
              ? "https://robohash.org/coagents-rewoo"
              : "https://avatars.githubusercontent.com/u/124599?v=4"
          }
        />
        <AvatarFallback
          className={
            sender === "bot"
              ? "bg-primary text-primary-foreground"
              : "bg-secondary text-secondary-foreground"
          }
        >
          {sender === "bot" ? "AI" : "US"}
        </AvatarFallback>
      </Avatar>
      <div>
        <div className="flex items-center gap-2">
          <span className="font-semibold">
            {sender === "bot" ? "Planova" : username}
          </span>
        </div>
        <div className="text-sm">
          <Markdown>{content}</Markdown>
        </div>
      </div>
    </div>
  );
}
