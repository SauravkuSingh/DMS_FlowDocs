import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '../../components/layout/AppSidebar';
import { Outlet } from 'react-router-dom';
import { SidebarInset } from '../../components/ui/sidebar';

const Layout = () => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset style={{ width: 'calc(100vw - var(--sidebar-width))' }}>
        <main className="flex w-full flex-col">
          <div className="pages_container h-full w-full p-5 py-6 sm:p-7 sm:py-4">
            <Outlet />
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default Layout;
