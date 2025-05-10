import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  ChevronDown,
  ChevronRight,
  Database,
  FileText,
  Home,
  Settings,
  ShoppingCart,
  Users,
  Clipboard,
  PanelLeftClose,
  PanelLeftOpen
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

// Type declarations and props
type SidebarItemProps = {
  title: string;
  path?: string;
  icon: React.ElementType;
  children?: { title: string; path: string }[];
  isActive?: boolean;
  collapsed?: boolean;
  itemKey: string; // Unique identifier for each item
  activeDropdown: string | null; // Currently active dropdown
  setActiveDropdown: (key: string | null) => void; // Function to set active dropdown
};

const SidebarItem = ({ icon: Icon, title, path, children, collapsed, itemKey, activeDropdown, setActiveDropdown }: SidebarItemProps) => {
  const location = useLocation();
  
  // Check if this item or any of its children is active
  const isActive = path ? location.pathname === path : 
    children?.some(child => location.pathname === child.path);
  
  const hasChildren = children && children.length > 0;
  
  // Determine if this dropdown is open based on activeDropdown state
  const isOpen = activeDropdown === itemKey;
  
  // Toggle dropdown - close others when this one is opened
  const toggleDropdown = () => {
    if (isOpen) {
      setActiveDropdown(null); // Close this dropdown if it's already open
    } else {
      setActiveDropdown(itemKey); // Open this dropdown and close others
    }
  };
  
  // Check if any child is active to auto-expand the menu
  useEffect(() => {
    if (hasChildren && children.some(child => location.pathname === child.path)) {
      setActiveDropdown(itemKey);
    }
  }, [location.pathname, hasChildren, children, itemKey, setActiveDropdown]);
  
  if (collapsed) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <Link
            to={path || "#"}
            className={cn(
              "w-full flex items-center justify-center p-2 rounded-md transition-all duration-300",
              isActive
                ? "bg-sidebar-accent text-sidebar-accent-foreground shadow-sm"  
                : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
            )}
            onClick={(e) => hasChildren && !path ? e.preventDefault() : null}   
          >
            <Icon className="h-5 w-5" />
          </Link>
        </TooltipTrigger>
        <TooltipContent side="right">
          {title}
        </TooltipContent>
      </Tooltip>
    );
  }

  return (
    <div className="mb-1">
      {hasChildren ? (
        <>
          <button
            onClick={toggleDropdown}
            className={cn(
              "w-full flex items-center justify-between p-2 rounded-md text-left transition-all duration-300",
              isActive
                ? "bg-sidebar-accent text-sidebar-accent-foreground shadow-sm"  
                : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
            )}
          >
            <div className="flex items-center">
              <Icon className="h-5 w-5 mr-3 shrink-0" />
              <span className="truncate font-medium">{title}</span>
            </div>
            <div>
              {isOpen ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
            </div>
          </button>
          <div
            className={cn(
              "ml-6 mt-1 border-l-2 border-sidebar-border pl-3 space-y-1 overflow-hidden transition-all duration-300",
              isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
            )}
          >
            {children.map((child, index) => (
              <Link
                key={index}
                to={child.path}
                className={cn(
                  "block p-2 rounded-md text-sm text-left transition-all duration-300",
                  location.pathname === child.path
                    ? "bg-blue-100 text-blue-800 shadow-sm"
                    : "text-gray-800 hover:bg-gray-200 hover:text-gray-900"
                )}
              >
                {child.title}
              </Link>
            ))}
          </div>
        </>
      ) : (
        <Link
          to={path || "#"}
          className={cn(
            "w-full flex items-center p-2 rounded-md text-left transition-all duration-300",
            isActive
              ? "bg-blue-100 text-blue-800 shadow-sm"    
              : "text-gray-800 hover:bg-gray-200 hover:text-gray-900"
          )}
        >
          <Icon className="h-5 w-5 mr-3 shrink-0" />
          <span className="truncate font-medium">{title}</span>
        </Link>
      )}
    </div>
  );
};

type SidebarProps = {
  collapsed?: boolean;
  onToggle?: () => void;
};

const Sidebar = ({ collapsed = false, onToggle }: SidebarProps) => {
  // State untuk melacak dropdown menu yang sedang aktif/terbuka
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  
  return (
    <aside
      className={cn(
        "h-screen flex flex-col bg-white border-r border-gray-200 text-gray-700 fixed top-0 left-0 z-40 transition-all duration-300 shadow-sm",
        collapsed ? "w-[70px]" : "w-64"
      )}
    >
      <div className="flex items-center h-16 border-b border-gray-200 px-4 bg-gray-50">
        <h1 className={cn(
          "font-bold text-primary transition-all duration-300", 
          collapsed ? "text-xl" : "text-2xl"
        )}>
          {collapsed ? "F" : "Feunix"}
        </h1>
      </div>

      <div className="flex-1 overflow-y-auto px-3 py-4 scrollbar-thin">
        <nav className="space-y-1 text-gray-800 sidebar-item">
          <SidebarItem 
            icon={Home} 
            title="Dashboard" 
            path="/dashboard" 
            collapsed={collapsed}
            itemKey="dashboard"
            activeDropdown={activeDropdown}
            setActiveDropdown={setActiveDropdown}
          />
          
          <div className="master-data">
            <SidebarItem 
              icon={Database} 
              title="Master Data" 
              children={[
                { title: "Data Customer", path: "/master/customers" },
                { title: "Data Supplier", path: "/master/suppliers" },
                { title: "Data Karyawan", path: "/master/employees" },
                { title: "Data Barang & Price List", path: "/master/items" },
                { title: "Data Embalasi & Price List", path: "/master/packaging" },
              ]} 
              collapsed={collapsed}
              itemKey="masterData"
              activeDropdown={activeDropdown}
              setActiveDropdown={setActiveDropdown}
            />
          </div>
          
          <div className="purchased">
            <SidebarItem
              icon={ShoppingCart}
              title="Purchased"
              children={[
                { title: "Purchase Order", path: "/purchased/orders" },
                { title: "Embalasi Out", path: "/purchased/packaging-out" },
              ]}
              collapsed={collapsed}
              itemKey="purchased"
              activeDropdown={activeDropdown}
              setActiveDropdown={setActiveDropdown}
            />
          </div>
          
          <div className="transaction">
            <SidebarItem
              icon={Clipboard}
              title="Transaction"
              children={[
                { title: "Invoice", path: "/transaction/invoices" },
                { title: "Embalasi In", path: "/transaction/packaging-in" },
              ]}
              collapsed={collapsed}
              itemKey="transaction"
              activeDropdown={activeDropdown}
              setActiveDropdown={setActiveDropdown}
            />
          </div>
          
          <div className="report">
            <SidebarItem
              icon={FileText}
              title="Report"
              children={[
                { title: "Laporan Selling", path: "/reports/selling" },
                { title: "Laporan Purchased", path: "/reports/purchased" },
                { title: "Barang", path: "/reports/items" },
                { title: "Price List Barang", path: "/reports/item-prices" },
                { title: "Embalasi", path: "/reports/packaging" },
                { title: "Price List Embalasi", path: "/reports/packaging-prices" },
                { title: "Customer", path: "/reports/customers" },
                { title: "Supplier", path: "/reports/suppliers" },
                { title: "Karyawan", path: "/reports/employees" },
              ]}
              collapsed={collapsed}
              itemKey="report"
              activeDropdown={activeDropdown}
              setActiveDropdown={setActiveDropdown}
            />
          </div>
          
          <div className="user-access">
            <SidebarItem
              icon={Users}
              title="User Access"
              children={[
                { title: "Role & Permission", path: "/users/roles" },
                { title: "User Account Listing", path: "/users/accounts" },
              ]}
              collapsed={collapsed}
              itemKey="userAccess"
              activeDropdown={activeDropdown}
              setActiveDropdown={setActiveDropdown}
            />
          </div>
          
          <div className="settings">
            <SidebarItem
              icon={Settings}
              title="Settings"
              path="/settings"
              collapsed={collapsed}
              itemKey="settings"
              activeDropdown={activeDropdown}
              setActiveDropdown={setActiveDropdown}
            />
          </div>
        </nav>
      </div>

      {/* Sidebar toggle button at the bottom */}
      {onToggle && (
        <div className="border-t border-sidebar-border p-3 flex justify-center">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="ghost" 
                size="sm" 
                className="w-full flex items-center justify-center gap-2 hover:bg-sidebar-accent/50" 
                onClick={onToggle}
              >
                {collapsed ? (
                  <>
                    <PanelLeftOpen className="h-5 w-5" />
                    {!collapsed && <span>Expand Sidebar</span>}
                  </>
                ) : (
                  <>
                    <PanelLeftClose className="h-5 w-5" />
                    {!collapsed && <span>Collapse Sidebar</span>}
                  </>
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent side={collapsed ? "right" : "top"}>
              {collapsed ? "Expand Sidebar (Ctrl+B)" : "Collapse Sidebar (Ctrl+B)"}
            </TooltipContent>
          </Tooltip>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
