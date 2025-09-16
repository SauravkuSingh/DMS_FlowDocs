import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import { Button } from '@/components/ui/button';
import Layout from './pages/layout/Layout';
import { RouterProvider } from 'react-router-dom';
import routes from './route/routes';

function App() {
  return <RouterProvider router={routes} />;
}

export default App;
