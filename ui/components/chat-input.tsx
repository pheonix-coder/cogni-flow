"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";

interface ChatInputProps {
  input: string;
  setInput: (value: string) => void;
  handleSend: () => void;
  isLoading: boolean;
}

export default function ChatInput({
  input,
  setInput,
  handleSend,
  isLoading,
}: ChatInputProps) {
  return (
    <div className="p-4 border-t border-border">
      {isLoading && (
        <div className="flex items-center gap-2 mb-2 text-sm text-muted-foreground">
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-current rounded-full animate-bounce" />
            <div className="w-2 h-2 bg-current rounded-full animate-bounce [animation-delay:0.2s]" />
            <div className="w-2 h-2 bg-current rounded-full animate-bounce [animation-delay:0.4s]" />
          </div>
          Planova thinking...
        </div>
      )}
      <div className="relative">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Message Planova..."
          className="pr-12 py-6 bg-background border-input"
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
        />
        <Button
          size="icon"
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-primary text-primary-foreground hover:bg-primary/90"
          onClick={handleSend}
          disabled={!input.trim() || isLoading}
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
