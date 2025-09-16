import {
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
  useSidebar,
} from '@/components/ui/sidebar';
import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';

const AppMenuItems = ({
  key,
  isSidebarHovered,
  item,
  setActiveMenu,
  openKey,
  setOpenKey,
}) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const { state } = useSidebar();

  const subMenuOpen = openKey === item.title;

  const handleMenuButtonClick = (event, item) => {
    event.stopPropagation();
    if (subMenuOpen) {
      setOpenKey(null);
    } else {
      setOpenKey(item.title);
    }
    if (!item.items) {
      setActiveMenu(item);
    }
  };

  useEffect(() => {
    if (state == 'collapsed' && !isSidebarHovered) {
      setOpenKey(null);
    }
  }, [state, isSidebarHovered, setOpenKey]);

  return (
    <Collapsible
      open={subMenuOpen}
      onOpenChange={() => setOpenKey(subMenuOpen ? null : item.title)}
      key={item.title}
      className="group/collapsible"
    >
      <SidebarMenuItem>
        <CollapsibleTrigger asChild>
          <SidebarMenuButton
            onClick={(event) => handleMenuButtonClick(event, item)}
            className={`hover:bg-slate-200/80 ${item.isActive ? 'text-white' : 'text-[#9fa8c1]'} flex items-center justify-between ${subMenuOpen ? 'text-blur-500 bg-gradient-to-b from-slate-100 to-purple-100/90 font-semibold' : ''} `}
            asChild
            isActive={item.isActive}
          >
            {item.items ? (
              <span className="relative flex w-full cursor-pointer items-center justify-between select-none">
                <div
                  onMouseEnter={() => setHoveredIndex(key)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className="left_menu flex w-full items-center justify-start gap-3 py-5 text-sm text-slate-700"
                >
                  <Tooltip>
                    <TooltipTrigger>{item.iconActive}</TooltipTrigger>
                    {state == 'collapsed' && (
                      <TooltipContent side="right">{item.title}</TooltipContent>
                    )}
                  </Tooltip>
                  <span
                    className={`${subMenuOpen} absolute left-11 text-sm whitespace-nowrap text-slate-700`}
                  >
                    {item.title}
                  </span>
                </div>
                {item.items &&
                  (subMenuOpen ? (
                    <ChevronDown className="absolute top-3 right-2 text-slate-500" />
                  ) : (
                    <ChevronRight className="absolute top-3 right-2 text-slate-500" />
                  ))}
              </span>
            ) : (
              <Link
                to={item.url}
                onMouseEnter={() => setHoveredIndex(key)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="relative flex w-full items-center justify-between"
              >
                <div className="left_menu flex w-full items-center justify-start gap-3 text-sm text-slate-700">
                  <Tooltip>
                    <TooltipTrigger>{item.iconActive}</TooltipTrigger>
                    {state == 'collapsed' && (
                      <TooltipContent side="right">{item.title}</TooltipContent>
                    )}
                  </Tooltip>
                  <span
                    className={`absolute left-11 text-sm whitespace-nowrap text-slate-700`}
                  >
                    {item.title}
                  </span>
                </div>
                {item.items &&
                  (subMenuOpen ? (
                    <ChevronDown className="absolute left-[215px]" />
                  ) : (
                    <ChevronRight className="absolute left-[215px]" />
                  ))}
              </Link>
            )}
          </SidebarMenuButton>
        </CollapsibleTrigger>
        <CollapsibleContent className={`${item.items ? 'block' : 'hidden'} `}>
          <SidebarMenuSub className="my-2 gap-3 border-black/80">
            {item.items?.map((items, subIndex) => (
              <SidebarMenuSubItem
                className=""
                onClick={() => setActiveMenu(item, items.link)}
                key={subIndex}
              >
                <Link
                  to={items.link}
                  className={`relative right-0 flex gap-1.5 hover:text-black ${
                    items.isActive ? 'text-black/80' : 'text-black/80'
                  } items-center justify-start text-sm text-black/80 transition-all duration-200 ease-in hover:right-[3px]`}
                >
                  <div className="h-[1px] w-[14px] bg-black/80"></div>
                  <span>{items.label}</span>
                </Link>
              </SidebarMenuSubItem>
            ))}
          </SidebarMenuSub>
        </CollapsibleContent>
      </SidebarMenuItem>
    </Collapsible>
  );
};

export default AppMenuItems;
