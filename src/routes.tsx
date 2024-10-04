import { createBrowserRouter } from 'react-router-dom';

import { AppLayout } from './pages/_layouts/app';
import { SignIn } from './pages/auth/sign-in';
import { SignUp } from './pages/auth/sign-up';
import { Profile } from './pages/app/profile/profile';
import { TimeLog } from './pages/app/time-log';

export const router = createBrowserRouter([
  { 
    path: "/", 
    element: <AppLayout />,
    children: [
      { path: "/", element: <SignIn /> },
      { path: "/profile", element: <Profile /> },    
      { path: "/register", element: <SignUp /> },
      { path: "/registrar-ponto/:userId", element: <TimeLog /> },
    ],
  },
  
]);