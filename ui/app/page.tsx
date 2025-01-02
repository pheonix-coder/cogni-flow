"use client";

import { useState } from "react";
import Wrapper from "@/components/wrapper";
import Sidebar from "@/components/sidebar";
import ChatInterface from "@/components/chat-interface";
import { useMediaQuery } from "react-responsive";
import { useCopilotChat } from "@copilotkit/react-core";
import { TextMessage } from "@copilotkit/runtime-client-gql";

export default function HomePage() {
  const [isDark, setIsDark] = useState(false);
  const [username, setUsername] = useState("John Doe");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: 768 });

  const { isLoading, appendMessage, visibleMessages } = useCopilotChat();

  return (
    <Wrapper isDark={isDark}>
      <Sidebar
        username={username}
        setUsername={setUsername}
        isDark={isDark}
        setIsDark={setIsDark}
        isMobile={isMobile}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
      <ChatInterface
        username={username}
        isLoading={isLoading}
        appendMessage={appendMessage}
        visibleMessages={visibleMessages as TextMessage[]}
      />
    </Wrapper>
  );
}
