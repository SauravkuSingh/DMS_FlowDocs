import React, { useEffect, useState } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { SidebarMenuItem } from '../ui/sidebar'
import { Settings, LogOut, CircleUser } from 'lucide-react'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'

const SettingsOptions = ({ open }) => {
  const navigate = useNavigate()

  const handleLogout = () => {
    Cookies.remove('token')
    navigate('/auth/login', { replace: true })
    localStorage.removeItem('userId')
  }

  const [userId, setUserId] = useState(null)

  useEffect(() => {
    const userId = localStorage.getItem('userId')
    setUserId(userId)
  }, [])

  return (
    <Popover>
      <PopoverTrigger asChild>
        <SidebarMenuItem
          className={`relative ${!open ? 'p-2' : 'p-2 px-4'} flex h-9 cursor-pointer items-center gap-2 overflow-hidden rounded-md hover:bg-slate-200 dark:hover:bg-gray-700`}
        >
          <Settings className="w-[18px]" />
          <span className="absolute left-11 text-sm whitespace-nowrap text-slate-700 dark:text-gray-200">
            Settings
          </span>
        </SidebarMenuItem>
      </PopoverTrigger>

      <PopoverContent className="ml-3 w-56 rounded-lg bg-slate-100 p-1 shadow-lg dark:bg-gray-800">
        {/* User Email */}
        {userId && (
          <div className="mb-1 border-b border-gray-200 p-2 dark:border-gray-700">
            <p className="flex items-center gap-1.5 truncate text-sm font-medium text-gray-700 dark:text-gray-300">
              <CircleUser className="h-4 w-4" />
              {userId}
            </p>
          </div>
        )}

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="flex w-full cursor-pointer items-center gap-1.5 rounded-md p-1.5 px-2 transition-colors hover:bg-red-100 dark:hover:bg-red-700"
        >
          <LogOut className="w-4 text-red-500" />
          <span className="text-sm text-red-600 dark:text-red-300">Logout</span>
        </button>
      </PopoverContent>
    </Popover>
  )
}

export default SettingsOptions
