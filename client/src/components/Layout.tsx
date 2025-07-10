import { AppShell } from "@mantine/core";
import { Outlet } from "react-router";
import { DashboardHeader } from "./DashboardHeader";

export function Layout() {
  return (
    <AppShell header={{ height: 60 }} padding="md">
      <AppShell.Header>
        <DashboardHeader />
      </AppShell.Header>

      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}
