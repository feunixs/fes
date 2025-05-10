import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import TopNav from "./TopNav";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@/components/ui/breadcrumb";
import { useToast } from "@/components/ui/use-toast";

// Import yang tidak digunakan telah disingkirkan

type BreadcrumbItem = {
  title: string;
  path: string;
};

type DashboardLayoutProps = {
  children: React.ReactNode;
  title: string;
  breadcrumbs?: BreadcrumbItem[];
};

const DashboardLayout = ({ children, title, breadcrumbs = [] }: DashboardLayoutProps) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(() => {
    // Initialize from localStorage if available
    const savedState = localStorage.getItem("feunix-sidebar-collapsed");
    return savedState ? JSON.parse(savedState) : false;
  });
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  // Check if user is logged in
  useEffect(() => {
    const user = localStorage.getItem("feunix-user");
    if (!user && location.pathname !== "/login") {
      navigate("/login");
    }
  }, [navigate, location.pathname]);

  // Toggle sidebar and save state to localStorage
  const toggleSidebar = () => {
    const newState = !sidebarCollapsed;
    setSidebarCollapsed(newState);
    localStorage.setItem("feunix-sidebar-collapsed", JSON.stringify(newState));
  };
  
  // Add keyboard shortcut for toggling sidebar
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Toggle sidebar with Ctrl+B (common shortcut in many IDEs and applications)
      if (e.ctrlKey && e.key === 'b') {
        e.preventDefault();
        toggleSidebar();
        
        toast({
          title: sidebarCollapsed ? "Sidebar expanded" : "Sidebar collapsed",
          description: "You can use Ctrl+B to toggle the sidebar",
          duration: 2000,
        });
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [sidebarCollapsed, toast]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar tetap di posisi fixed untuk layout standar dashboard */}
      <Sidebar collapsed={sidebarCollapsed} onToggle={toggleSidebar} />
      
      {/* Area konten utama dengan margin-left yang menyesuaikan lebar sidebar */}
      <div className={`${sidebarCollapsed ? 'ml-[70px]' : 'ml-64'} min-h-screen flex flex-col transition-all duration-300`}>
        {/* Navbar di bagian atas konten utama */}
        <TopNav onToggleSidebar={toggleSidebar} sidebarCollapsed={sidebarCollapsed} />
        
        {/* Konten utama */}
        <main className="flex-1 p-6">
          {/* Header halaman dengan breadcrumb */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-800 text-left">{title}</h1>
            
            <Breadcrumb className="mt-2">
              {breadcrumbs.map((item, index) => (
                <BreadcrumbItem key={index}>
                  <BreadcrumbLink href={item.path}>
                    {item.title}
                  </BreadcrumbLink>
                </BreadcrumbItem>
              ))}
            </Breadcrumb>
          </div>

          {/* Konten halaman */}
          <div className="w-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
