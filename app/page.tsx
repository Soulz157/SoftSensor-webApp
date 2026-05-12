"use client";

import { useState } from "react";
import { Sidebar } from "@/components/sidebar";
import { Header } from "@/components/header";
import { DashboardContent } from "@/components/dashboard-content";
import { CreateWorkspaceDialog } from "@/components/create-project-dialog";

export default function Home() {
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  
  // Sidebar state
  const [activeNav, setActiveNav] = useState("dashboard");
  const [activeWorkspace, setActiveWorkspace] = useState("1");
  const [workspaceOpen, setWorkspaceOpen] = useState(true);

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        isCollapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        activeNav={activeNav}
        onNavChange={setActiveNav}
        activeWorkspace={activeWorkspace}
        onWorkspaceChange={setActiveWorkspace}
        workspaceOpen={workspaceOpen}
        onWorkspaceToggle={() => setWorkspaceOpen(!workspaceOpen)}
      />

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Header */}
        <Header
          onCreateWorkspace={() => setCreateDialogOpen(true)}
          onMenuClick={() => setSidebarOpen(true)}
        />

        {/* Dashboard Content */}
        <DashboardContent />
      </div>

      {/* Create Workspace Dialog */}
      <CreateWorkspaceDialog
        open={createDialogOpen}
        onClose={() => setCreateDialogOpen(false)}
      />
    </div>
  );
}
