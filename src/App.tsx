//import "./global.css";

import { RouterProvider } from 'react-router-dom';
import { Toaster } from 'sonner';

import { router } from './routes';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './lib/react-query';
export function App() {
  return (
    <>
      <Toaster richColors/>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
      
    </>
  );
}

