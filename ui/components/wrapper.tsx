import { ReactNode } from "react";

interface WrapperProps {
  children: ReactNode;
  isDark: boolean;
}

export default function Wrapper({ children, isDark }: WrapperProps) {
  return (
    <div
      className={`flex h-screen transition-colors duration-300 ${
        isDark ? "bg-dark text-light" : "bg-background text-foreground"
      }`}
    >
      {children}
    </div>
  );
}
