import { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import DashboardLayout from "@/components/layout/DashboardLayout";
import StatsCard from "@/components/ui/stats/StatsCard";
import RecentActivities from "@/components/ui/activities/RecentActivities";
import CurrencyDisplay from "@/components/ui/data-display/CurrencyDisplay";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatRupiah } from "@/lib/utils";
import {
  Users,
  ShoppingCart,
  DollarSign,
  Package,
  FileText,
  User,
  Settings,
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import useParallaxTransition from "@/hooks/useParallaxTransition";

const Dashboard = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  // Removed unused state declaration
  const { applyEntranceAnimation } = useParallaxTransition({
    duration: 1000,
    easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
    staggerDelay: 80
  });
  
  // Refs for animated elements
  const containerRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const activitiesRef = useRef<HTMLDivElement>(null);
  const quickLinksRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Simulate loading data
    const timeout = setTimeout(() => {
      setLoading(false);
      
      // Start entrance animations after loading
      setTimeout(() => {
        animateEntrance();
      }, 100);
    }, 1000);
    
    return () => clearTimeout(timeout);
  }, []);
  
  // Enhanced animate dashboard elements entrance
  const animateEntrance = () => {
    // Animate stats cards with enhanced staggered delay
    if (statsRef.current) {
      const statCards = Array.from(statsRef.current.querySelectorAll('.stat-card')) as HTMLElement[];
      applyEntranceAnimation(statCards);
    }
    
    // Animate activities card with slide and fade
    if (activitiesRef.current) {
      activitiesRef.current.style.opacity = '0';
      activitiesRef.current.style.transform = 'translate3d(-30px, 0, 0)';
      
      setTimeout(() => {
        activitiesRef.current!.style.transition = 'opacity 1s cubic-bezier(0.22, 1, 0.36, 1), transform 1s cubic-bezier(0.22, 1, 0.36, 1)';
        activitiesRef.current!.style.opacity = '1';
        activitiesRef.current!.style.transform = 'translate3d(0, 0, 0)';
      }, 300);
    }
    
    // Animate quick links card with slide and fade
    if (quickLinksRef.current) {
      quickLinksRef.current.style.opacity = '0';
      quickLinksRef.current.style.transform = 'translate3d(30px, 0, 0)';
      
      setTimeout(() => {
        quickLinksRef.current!.style.transition = 'opacity 1s cubic-bezier(0.22, 1, 0.36, 1), transform 1s cubic-bezier(0.22, 1, 0.36, 1)';
        quickLinksRef.current!.style.opacity = '1';
        quickLinksRef.current!.style.transform = 'translate3d(0, 0, 0)';
      }, 400);
      
      // Animate quick link buttons with staggered delay
      const quickLinkButtons = Array.from(quickLinksRef.current.querySelectorAll('button'));
      quickLinkButtons.forEach((button, index) => {
        const htmlButton = button as HTMLElement;
        htmlButton.style.opacity = '0';
        htmlButton.style.transform = 'translateY(15px)';
        
        setTimeout(() => {
          htmlButton.style.transition = 'opacity 0.8s cubic-bezier(0.22, 1, 0.36, 1), transform 0.8s cubic-bezier(0.22, 1, 0.36, 1)';
          htmlButton.style.opacity = '1';
          htmlButton.style.transform = 'translateY(0)';
        }, 500 + (index * 80));
      });
    }
    
    // Animation complete
    // Removed unused timeout
  };
  
  // Mock data for recent activities
  const recentActivities = [
    {
      id: 1,
      title: "New Customer Registration",
      description: "PT. Global Jaya registered as a new customer",
      time: "10 min ago",
      statusColor: "bg-green-500",
    },
    {
      id: 2,
      title: "Purchase Order Created",
      description: "PO #12345 was created for Supplier ABC",
      time: "1 hour ago",
      statusColor: "bg-blue-500",
    },
    {
      id: 3,
      title: "Invoice Generated",
      description: "Invoice #INV-2023-001 was generated for Customer XYZ",
      time: "3 hours ago",
      statusColor: "bg-purple-500",
    },
    {
      id: 4,
      title: "New Item Added",
      description: "Product 'Steel Bracket 10mm' was added to inventory",
      time: "5 hours ago",
      statusColor: "bg-yellow-500",
    },
    {
      id: 5,
      title: "Price List Updated",
      description: "Price list for packaging materials was updated",
      time: "Yesterday",
      statusColor: "bg-orange-500",
    },
  ];
  
  // Quick links for main modules
  const quickLinks = [
    {
      title: "Customer Data",
      icon: <Users className="h-5 w-5" />,
      path: "/master/customers",
    },
    {
      title: "Purchase Orders",
      icon: <ShoppingCart className="h-5 w-5" />,
      path: "/purchased/orders",
    },
    {
      title: "Invoices",
      icon: <FileText className="h-5 w-5" />,
      path: "/transaction/invoices",
    },
    {
      title: "User Access",
      icon: <User className="h-5 w-5" />,
      path: "/users/roles",
    },
    {
      title: "Settings",
      icon: <Settings className="h-5 w-5" />,
      path: "/settings",
    },
  ];
  
  const handleQuickLinkClick = (path: string) => {
    toast({
      title: "Navigation",
      description: `Navigating to ${path}`,
    });
    
    // In a real app, you would use navigate or router to navigate
    // navigate(path);
  };
  
  return (
    <DashboardLayout
      title="Dashboard"
      breadcrumbs={[]}
    >
      <div 
        ref={containerRef}
        className="relative"
      >
        <div 
          ref={statsRef} 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6"
        >
          {loading ? (
            Array(4)
              .fill(0)
              .map((_, index) => (
                <Card key={index} className="animate-pulse">
                  <CardContent className="p-6">
                    <div className="h-6 bg-gray-200 rounded w-1/2 mb-2"></div>
                    <div className="h-10 bg-gray-300 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                  </CardContent>
                </Card>
              ))
          ) : (
            <>
              <div className="stat-card">
                <StatsCard
                  title="Total Customers"
                  value={234}
                  icon={<Users className="h-6 w-6" />}
                  trend={{ value: 12, isPositive: true }}
                  variant="primary"
                />
              </div>
              
              <div className="stat-card">
                <StatsCard
                  title="Purchase Order"
                  value={45}
                  icon={<ShoppingCart className="h-6 w-6" />}
                  trend={{ value: 5, isPositive: true }}
                  variant="secondary"
                />
              </div>
              
              <div className="stat-card">
                <StatsCard
                  title="Sales Revenue"
                  value={12500000}
                  icon={<DollarSign className="h-6 w-6" />}
                  trend={{ value: 8, isPositive: true }}
                  variant="success"
                  isCurrency={true}
                  useShortFormat={true}
                  description="Revenue this month"
                />
              </div>
              
              <div className="stat-card">
                <StatsCard
                  title="Total Products"
                  value={1240}
                  icon={<Package className="h-6 w-6" />}
                  trend={{ value: 3, isPositive: false }}
                  variant="warning"
                />
              </div>
            </>
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div 
            ref={activitiesRef} 
            className="md:col-span-2"
          >
            <RecentActivities activities={recentActivities} />
          </div>
          
          <div
            ref={quickLinksRef}
            className="hover-lift menu-cepat"
          >
            <Card className="shadow-sm hover:shadow-md transition-all duration-300">
              <CardHeader className="pb-2 border-b">
                <CardTitle className="text-xl font-bold text-gray-800">Quick Links</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 p-4">
                {quickLinks.map((link, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="w-full justify-start hover:bg-gray-50 transition-all duration-200"
                    onClick={() => handleQuickLinkClick(link.path)}
                  >
                    <div className="mr-3 p-2 rounded-full bg-gray-100 text-gray-700">
                      {link.icon}
                    </div>
                    <span className="font-medium">{link.title}</span>
                  </Button>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;