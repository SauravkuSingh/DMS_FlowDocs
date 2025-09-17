import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  useSidebar,
  SidebarMenuItem,
  SidebarFooter,
} from '@/components/ui/sidebar'
import { useEffect, useRef, useState } from 'react'
import AppMenuItems from './AppMenuItems'

import { Home, Settings, ChevronLeft, Users, ClipboardList } from 'lucide-react'
import { SidebarTrigger } from '../ui/sidebar'
import SettingsOptions from './SettingsOptions'

const items = [
  {
    title: 'Home',
    url: '#home',
    isActive: false,
    iconActive: <Home className="h-[18px] w-[18px]" />,
    iconInactive: <Home className="h-[18px] w-[18px]" />,
  },
  {
    title: 'User Management',
    url: '#users',
    isActive: false,
    iconActive: <Users className="h-[18px] w-[18px]" />,
    iconInactive: <Users className="h-[18px] w-[18px]" />,
  },
  {
    title: 'Reports',
    url: '#reports',
    isActive: false,
    iconActive: <ClipboardList className="h-[18px] w-[18px]" />,
    iconInactive: <ClipboardList className="h-[18px] w-[18px]" />,
  },
]

export function AppSidebar() {
  const [isSidebarHovered, setIsSidebarHovered] = useState(false)
  const elementRef = useRef(null)
  const { open } = useSidebar()

  const [openKey, setOpenKey] = useState(null)
  const handleMouseEnter = () => {
    setIsSidebarHovered(true)
  }

  const handleMouseLeave = () => {
    setIsSidebarHovered(false)
  }

  const [menuItems, setMenuItems] = useState(items)

  const deactivateAllSubMenuItems = () => {
    menuItems.forEach((menu) => {
      if (menu.items && Array.isArray(menu.items)) {
        menu.items.forEach((subItem) => {
          subItem.isActive = false
        })
      }
    })
  }

  const setActiveMenu = (parentMenu, childActiveMenuURL = '#') => {
    const parentURL = parentMenu.url

    if (!parentMenu.items && childActiveMenuURL === '#') {
      const updatedItems = menuItems.map((item) => {
        const isActive = item.url === parentURL
        return {
          ...item,
          isActive,
          icon: isActive ? item.iconActive : item.iconInactive,
        }
      })
      setMenuItems(updatedItems)
    } else {
      const updatedMenuItems = menuItems.map((menu) => {
        if (menu.url === parentURL) {
          return {
            ...menu,
            isActive: true,
            items: menu.items.map((item) => ({
              ...item,
              isActive: item.link === childActiveMenuURL,
            })),
          }
        }

        return { ...menu, isActive: false }
      })
      setMenuItems(updatedMenuItems)
      deactivateAllSubMenuItems()
    }

    const breadCrumbData = []

    const parent = menuItems.find((item) => item.url === parentURL)
    const child = parent.items?.find((item) => item.link === childActiveMenuURL)
    breadCrumbData.push(
      { label: parent?.title },
      { label: child?.label ?? '#' }
    )
  }

  useEffect(() => {
    const locationPath = location.pathname
    menuItems.map((menu) => {
      if (menu.url === locationPath) {
        setActiveMenu(menu, menu.items || '#')
      }
      return menu
    })
  }, [])

  return (
    <Sidebar
      ref={elementRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      collapsible="icon"
    >
      <SidebarContent className="bg-gray-50">
        <SidebarGroup>
          <div
            className={`flex items-center justify-between transition-all duration-200 ease-in ${!open ? 'px-[2px] py-2' : 'p-3'}`}
          >
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-[#7A5AF8] p-3 text-xs font-bold text-white">
                FD
              </div>
              {/* <span className="text-[15px] font-medium text-[#111827]">
                FlowDocs
              </span> */}
            </div>
            <SidebarTrigger>
              <div className="close_sidebar flex h-7 w-7 cursor-pointer items-center justify-center rounded-md bg-slate-200/70">
                <ChevronLeft className="h-5 w-5 text-black/60" />
              </div>
            </SidebarTrigger>
          </div>
          <SidebarGroupContent>
            <SidebarMenu className="flex gap-2">
              {menuItems?.map((item, index) => (
                <AppMenuItems
                  openKey={openKey}
                  setOpenKey={setOpenKey}
                  isSidebarHovered={isSidebarHovered}
                  setActiveMenu={setActiveMenu}
                  key={index}
                  item={item}
                />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="max-w-full overflow-hidden bg-gray-50">
        <SidebarMenu className="max-w-full overflow-hidden">
          <SettingsOptions open={open} />
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
