"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Switch } from "@/components/ui/switch";
import { Settings, X } from "lucide-react";

interface SidebarProps {
  username: string;
  setUsername: (name: string) => void;
  isDark: boolean;
  setIsDark: (value: boolean) => void;
  isMobile: boolean;
  isSidebarOpen: boolean;
  setIsSidebarOpen: (value: boolean) => void;
}

export default function Sidebar({
  username,
  setUsername,
  isDark,
  setIsDark,
  isMobile,
  isSidebarOpen,
  setIsSidebarOpen,
}: SidebarProps) {
  return (
    <>
      {(isMobile ? isSidebarOpen : true) && (
        <div
          className={`${
            isMobile ? "fixed inset-y-0 left-0 z-50 w-60" : "relative w-60"
          } bg-accent text-accent-foreground border-r border-border flex flex-col`}
        >
          <div className="p-4 border-b border-border flex justify-between items-center">
            <h2 className="font-semibold">CogniFlow</h2>
            {isMobile && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsSidebarOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
          <ScrollArea className="flex-1">
            <div className="p-4">
              <h3 className="font-semibold mb-2">Planova</h3>
              <p className="text-sm text-muted-foreground">A chatbot using ReWoo agent to answer your queries :)</p>
            </div>
          </ScrollArea>
          <div className="p-3 border-t border-border flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Avatar>
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback className="bg-secondary text-secondary-foreground">
                  JD
                </AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium">{username}</span>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Settings className="h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px] bg-background border-border">
                <DialogHeader>
                  <DialogTitle className="text-foreground">
                    Settings
                  </DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label
                      htmlFor="username"
                      className="text-right text-foreground"
                    >
                      Username
                    </Label>
                    <Input
                      id="username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="col-span-3 text-foreground"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label
                      htmlFor="darkMode"
                      className="text-right text-foreground"
                    >
                      Dark Mode
                    </Label>
                    <div className="col-span-3 flex items-center">
                      <Switch
                        id="darkMode"
                        checked={isDark}
                        onCheckedChange={(checked) => {
                          setIsDark(checked);
                          document.documentElement.classList.toggle(
                            "dark",
                            checked
                          );
                        }}
                      />
                    </div>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      )}
    </>
  );
}
