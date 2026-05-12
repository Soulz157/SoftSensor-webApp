"use client";

import { useState } from "react";
import {
  LayoutDashboard,
  Settings,
  HelpCircle,
  ChevronDown,
  Building2,
  Box,
  BarChart3,
  ChevronRight,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Workspace {
  id: string;
  name: string;
  modelsCount: number;
}

interface NavItem {
  id: string;
  name: string;
  icon: React.ReactNode;
  badge?: number;
}

const workspaces: Workspace[] = [
  { id: "1", name: "Acme Corporation", modelsCount: 24 },
  { id: "2", name: "TechFlow Inc", modelsCount: 56 },
  { id: "3", name: "DataSense Ltd", modelsCount: 12 },
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const [activeNav, setActiveNav] = useState("dashboard");
  const [workspaceOpen, setWorkspaceOpen] = useState(true);
  const [activeWorkspace, setActiveWorkspace] = useState("1");

  const currentWorkspace = workspaces.find((w) => w.id === activeWorkspace);

  const navItems: NavItem[] = [
    { id: "dashboard", name: "Dashboard", icon: <LayoutDashboard className="h-4 w-4" /> },
    { id: "models", name: "Models", icon: <Box className="h-4 w-4" />, badge: currentWorkspace?.modelsCount },
    { id: "analytics", name: "Analytics", icon: <BarChart3 className="h-4 w-4" /> },
    { id: "settings", name: "Settings", icon: <Settings className="h-4 w-4" /> },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex h-screen w-64 flex-col bg-sidebar text-sidebar-foreground border-r border-sidebar-border transition-transform duration-300 ease-in-out lg:static lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Logo */}
        <div className="flex items-center justify-between px-5 py-5 border-b border-sidebar-border">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <Box className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="text-lg font-semibold tracking-tight">SoftSensor</span>
          </div>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-md text-sidebar-foreground/60 hover:bg-sidebar-accent hover:text-sidebar-foreground transition-colors lg:hidden"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Workspace Section */}
        <div className="px-3 py-4">
          <button
            onClick={() => setWorkspaceOpen(!workspaceOpen)}
            className="flex w-full items-center justify-between rounded-md px-3 py-2 text-xs font-medium uppercase tracking-wider text-sidebar-foreground/60 hover:text-sidebar-foreground transition-colors"
          >
            Workspaces
            <ChevronDown
              className={cn(
                "h-4 w-4 transition-transform duration-200",
                workspaceOpen && "rotate-180"
              )}
            />
          </button>

          {workspaceOpen && (
            <div className="mt-2 space-y-1">
              {workspaces.map((workspace) => (
                <button
                  key={workspace.id}
                  onClick={() => setActiveWorkspace(workspace.id)}
                  className={cn(
                    "group flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-sm transition-colors",
                    activeWorkspace === workspace.id
                      ? "bg-sidebar-accent text-sidebar-accent-foreground"
                      : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
                  )}
                >
                  <Building2 className="h-4 w-4 shrink-0" />
                  <span className="flex-1 truncate text-left">{workspace.name}</span>
                  <span className="text-xs text-sidebar-foreground/50">
                    {workspace.modelsCount}
                  </span>
                  {activeWorkspace === workspace.id && (
                    <ChevronRight className="h-3 w-3 text-primary" />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Divider */}
        <div className="mx-3 border-t border-sidebar-border" />

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4">
          <div className="space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveNav(item.id)}
                className={cn(
                  "flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors",
                  activeNav === item.id
                    ? "bg-sidebar-primary text-sidebar-primary-foreground"
                    : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground"
                )}
              >
                {item.icon}
                {item.name}
                {item.badge !== undefined && (
                  <span
                    className={cn(
                      "ml-auto rounded-full px-2 py-0.5 text-xs",
                      activeNav === item.id
                        ? "bg-sidebar-primary-foreground/20 text-sidebar-primary-foreground"
                        : "bg-sidebar-accent text-sidebar-foreground/60"
                    )}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            ))}
          </div>
        </nav>

        {/* Current Workspace Info */}
        {currentWorkspace && (
          <div className="mx-3 mb-3 rounded-lg bg-sidebar-accent/50 p-3">
            <div className="flex items-center gap-2 mb-1">
              <Building2 className="h-3.5 w-3.5 text-primary" />
              <span className="text-xs font-medium text-sidebar-foreground">
                {currentWorkspace.name}
              </span>
            </div>
            <div className="text-xs text-sidebar-foreground/60">
              {currentWorkspace.modelsCount} / 100 models
            </div>
            <div className="mt-2 h-1.5 w-full rounded-full bg-sidebar-border">
              <div
                className="h-full rounded-full bg-primary transition-all"
                style={{ width: `${(currentWorkspace.modelsCount / 100) * 100}%` }}
              />
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="border-t border-sidebar-border px-3 py-4">
          <button className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm text-sidebar-foreground/60 hover:bg-sidebar-accent hover:text-sidebar-foreground transition-colors">
            <HelpCircle className="h-4 w-4" />
            Help & Support
          </button>
        </div>
      </aside>
    </>
  );
}
