import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { AppSidebar } from '../../components/layout/AppSidebar'
import { Outlet, useNavigate } from 'react-router-dom'
import TopHeader from '../../components/layout/TopHeader'
import { SidebarInset } from '../../components/ui/sidebar'
import Cookies from 'js-cookie'
import { useEffect } from 'react'

const Layout = () => {
  const navigate = useNavigate()
  useEffect(() => {
    const token = Cookies.get('token')
    if (token) {
      navigate('/dashboard', { replace: true })
    } else {
      navigate('/auth/login', { replace: true })
    }
  }, [navigate])

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset style={{ width: 'calc(100vw - var(--sidebar-width))' }}>
        <main className="flex w-full flex-col">
          <TopHeader />
          <div className="pages_container h-full w-full p-5 py-6 sm:p-7 sm:py-4">
            <Outlet />
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}

export default Layout
