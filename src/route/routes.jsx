import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
} from 'react-router-dom'
import Layout from '../pages/layout/Layout'
import DashboardPage from '@/pages/dashboard/DashboardPage'
import AuthLayout from '@/pages/auth/AuthLayout'
import Login from '@/components/auth/Login'
import SignUp from '@/components/auth/SignUp'

const routes = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<DashboardPage />} />
      </Route>

      <Route path="/auth" element={<AuthLayout />}>
        <Route index element={<Navigate to="login" replace />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<SignUp />} />
      </Route>
    </Route>
  )
)

export default routes
