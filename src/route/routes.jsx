import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';
import Layout from '../pages/layout/Layout';
import DashboardPage from '@/pages/dashboard/DashboardPage';

const routes = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Layout />}>
      <Route path="/" element={<DashboardPage />} />
    </Route>,
  ),
);

export default routes;
