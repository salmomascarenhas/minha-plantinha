import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';

import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { theme } from './theme';

import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import { AuthProvider } from './providers/AuthProvider.tsx';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <MantineProvider theme={theme} defaultColorScheme="auto">
          <Notifications position="top-right" zIndex={1000} />
          <App />
        </MantineProvider>
      </QueryClientProvider>
    </AuthProvider>
  </React.StrictMode>,
);
