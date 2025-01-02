import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CopilotKit } from "@copilotkit/react-core";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ReWoo CoAgents",
  description: "CoAgents Demo App using ReWoo agent",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light">
      <body className={inter.className}>
        <CopilotKit runtimeUrl="/api/copilotkit" agent="rewoo_agent">
          {children}
        </CopilotKit>
      </body>
    </html>
  );
}
