import { useState } from "react";
import { HugeiconsIcon, type IconSvgElement } from "@hugeicons/react";
import {
  DashboardSquare01Icon,
  File02Icon,
  Exchange01Icon,
  Wallet01Icon,
  Settings01Icon,
  Logout03Icon,
  Invoice03Icon,
} from "@hugeicons/core-free-icons";
import { Link, useLocation } from "react-router";

import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { LogoutDialog } from "../common/logout-dialog";

interface NavItem {
  title: string;
  url: string;
  icon: IconSvgElement;
}

const NAV_ITEMS: NavItem[] = [
  { title: "Dashboard", url: "/", icon: DashboardSquare01Icon },
  { title: "Statements", url: "/statements", icon: File02Icon },
  { title: "Transactions", url: "/transactions", icon: Exchange01Icon },
  { title: "Budgets", url: "/budgets", icon: Wallet01Icon },
  { title: "Settings", url: "/settings", icon: Settings01Icon },
];

function isNavItemActive(pathname: string, url: string) {
  return pathname === url || pathname.startsWith(`${url}/`);
}

export function AppSidebar() {
  const location = useLocation();
  const [confirmOpen, setConfirmOpen] = useState(false);

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <div className="flex items-center gap-2 p-2">
              <div className="flex size-8 shrink-0 items-center justify-center bg-primary text-primary-foreground">
                <HugeiconsIcon icon={Invoice03Icon} className="size-4" />
              </div>
              <div className="group-data-[collapsible=icon]:hidden">
                <p className="text-sm font-bold text-foreground">LexiLedger</p>
              </div>
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup className="px-0 py-0">
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenu className="gap-1.5">
                {NAV_ITEMS.map((item) => (
                  <SidebarMenuItem key={item.url}>
                    <SidebarMenuButton
                      isActive={isNavItemActive(location.pathname, item.url)}
                      tooltip={item.title}
                      render={<Link to={item.url} />}
                      className="border-l-2 border-transparent h-10 pl-3 text-base text-sidebar-foreground [&_svg]:size-5 data-active:border-sidebar-primary data-active:bg-sidebar-primary/10 data-active:font-medium data-active:sidetext-sidebar-primary"
                    >
                      <HugeiconsIcon icon={item.icon} />
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <Button
              onClick={() => setConfirmOpen(true)}
              variant="ghost"
              className="w-full justify-start text-base text-destructive hover:bg-transparent hover:text-destructive"
            >
              <HugeiconsIcon icon={Logout03Icon} />
              <span className="group-data-[collapsible=icon]:hidden">
                Logout
              </span>
            </Button>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      <LogoutDialog open={confirmOpen} onClose={() => setConfirmOpen(false)} />
    </Sidebar>
  );
}
