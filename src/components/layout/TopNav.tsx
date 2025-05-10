
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Bell, 
  Menu, 
  User,
  Settings,
  HelpCircle,
  LogOut,
  ChevronUp,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/use-toast";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

type TopNavProps = {
  onToggleSidebar: () => void;
  sidebarCollapsed: boolean;
};

const TopNav = ({ onToggleSidebar, sidebarCollapsed }: TopNavProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  
  // Handle scroll to hide/show navbar
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Show navbar when scrolling up or at the top
      if (currentScrollY <= 0 || currentScrollY < lastScrollY) {
        setIsNavbarVisible(true);
      } 
      // Hide navbar when scrolling down
      else if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setIsNavbarVisible(false);
      }
      
      setLastScrollY(currentScrollY);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);
  
  const handleLogout = () => {
    localStorage.removeItem("feunix-user");
    toast({
      title: "Logged out",
      description: "You have been logged out successfully",
    });
    navigate("/login");
  };
  
  // Force show navbar
  const handleShowNavbar = () => {
    setIsNavbarVisible(true);
  };
  
  return (
    <>
      {/* Main navbar */}
      <header 
        className="h-16 bg-white border-b border-gray-200 sticky top-0 w-full z-30 flex items-center px-6 shadow-sm"
      >
        <div className="w-full flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="outline" 
                  className="flex items-center gap-2" 
                  onClick={onToggleSidebar}
                >
                  {sidebarCollapsed ? (
                    <>
                      <PanelLeftOpen className="h-5 w-5" />
                    </>
                  ) : (
                    <>
                      <PanelLeftClose className="h-5 w-5" />
                      <span className="hidden sm:inline">Hide Sidebar</span>
                    </>
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                {sidebarCollapsed ? "Expand Sidebar (Ctrl+B)" : "Collapse Sidebar (Ctrl+B)"}
              </TooltipContent>
            </Tooltip>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative flex items-center space-x-2">
                  <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-700">
                    <User className="h-5 w-5" />
                  </div>
                  <span className="hidden sm:block">Admin User</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <HelpCircle className="mr-2 h-4 w-4" />
                    <span>Help</span>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>
      
      {/* Show navbar button when navbar is hidden */}
      {!isNavbarVisible && (
        <Button 
          variant="secondary" 
          size="sm" 
          className="fixed top-2 right-2 z-40 shadow-md"
          onClick={handleShowNavbar}
        >
          <ChevronUp className="h-4 w-4 mr-1" />
          Show Menu
        </Button>
      )}
    </>
  );
};

export default TopNav;
