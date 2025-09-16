import { Search, Bell } from 'lucide-react'
import { SidebarTrigger, useSidebar } from '../ui/sidebar'

export default function TopHeader() {
  const { open } = useSidebar()

  return (
    <div className="mb-5 flex items-center justify-between border-b border-slate-200/60 bg-white p-3">
      <div className="input_container flex items-center justify-center gap-1">
        {(!open || window.innerWidth <= 768) && (
          <div className="trigger_button mr-3 flex h-7 w-7 items-center justify-center rounded-md bg-slate-200/70">
            <SidebarTrigger className="" />
          </div>
        )}
        <div className="flex w-full min-w-[13rem] items-center gap-1 rounded-lg px-2.5 py-2 sm:min-w-[18rem]">
          <h2 className="text-2xl font-bold text-gray-900">FlowDocs</h2>
        </div>
      </div>
      <div className="ml-4 flex items-center gap-4">
        <div className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-sm border border-slate-200/60 shadow-xs">
          <Bell className="h-5 w-5 cursor-pointer text-gray-600" />
        </div>
        <img
          src="https://randomuser.me/api/portraits/men/1.jpg"
          alt="Profile"
          className="h-9 w-9 rounded-full object-cover"
        />
      </div>
    </div>
  )
}
