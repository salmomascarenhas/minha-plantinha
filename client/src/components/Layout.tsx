import { AppShell } from '@mantine/core';
import { Outlet } from 'react-router';
import { Header } from './Header';

export function Layout() {
  return (
    <AppShell header={{ height: 60 }} padding="md">
      <AppShell.Header>
        <Header />
      </AppShell.Header>

      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}
