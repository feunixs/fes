import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import useParallaxTransition from "@/hooks/useParallaxTransition";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { 
    applyTransitionEffect 
  } = useParallaxTransition({ 
    targetPath: "/dashboard",
    duration: 1200,
    intensity: 0.6,
    easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
    staggerDelay: 120
  });
  
  // Refs for elements
  const containerRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  
  // Add entrance animation on load
  useEffect(() => {
    // Initial animation for background
    if (backgroundRef.current) {
      backgroundRef.current.style.opacity = '0';
      
      setTimeout(() => {
        backgroundRef.current!.style.transition = 'opacity 1.5s cubic-bezier(0.22, 1, 0.36, 1)';
        backgroundRef.current!.style.opacity = '1';
      }, 100);
      
      // Animate background shapes with staggered delay
      const shapes = backgroundRef.current.querySelectorAll('.bg-shape');
      shapes.forEach((shape, index) => {
        const shapeEl = shape as HTMLElement;
        shapeEl.style.opacity = '0';
        
        setTimeout(() => {
          shapeEl.style.transition = 'opacity 1.5s cubic-bezier(0.22, 1, 0.36, 1)';
          shapeEl.style.opacity = '0.4';
        }, 300 + (index * 150));
      });
    }
    
    // Initial animation for logo
    if (logoRef.current) {
      logoRef.current.style.opacity = '0';
      
      setTimeout(() => {
        logoRef.current!.style.transition = 'opacity 1s cubic-bezier(0.22, 1, 0.36, 1)';
        logoRef.current!.style.opacity = '1';
      }, 600);
    }
    
    // Initial animation for card
    if (cardRef.current) {
      cardRef.current.style.opacity = '0';
      
      setTimeout(() => {
        cardRef.current!.style.transition = 'opacity 1s cubic-bezier(0.22, 1, 0.36, 1)';
        cardRef.current!.style.opacity = '1';
      }, 800);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate login process
    setTimeout(() => {
      // For demo purposes, allow any login
      if (username && password) {
        localStorage.setItem("feunix-user", JSON.stringify({ username }));
        toast({
          title: "Login successful",
          description: "Welcome to Feunix Enterprise System",
        });
        
        // Start transition to dashboard
        triggerParallaxTransition();
      } else {
        setLoading(false);
        toast({
          title: "Login failed",
          description: "Please enter both username and password",
          variant: "destructive",
        });
      }
    }, 1000);
  };

  const triggerParallaxTransition = () => {
    // Apply transition effect to background with custom options
    if (backgroundRef.current) {
      applyTransitionEffect(backgroundRef.current, 'out', {
        delay: 0,
        customDuration: 1500,
        customIntensity: 0.3
      });
      
      // Also animate the background shapes
      const shapes = backgroundRef.current.querySelectorAll('.bg-shape');
      shapes.forEach((shape, index) => {
        applyTransitionEffect(shape as HTMLElement, 'out', {
          delay: 100 * index,
          customDuration: 1200,
          customIntensity: 0.5 + (index * 0.1)
        });
      });
    }
    
    // Apply transition effect to logo
    if (logoRef.current) {
      applyTransitionEffect(logoRef.current, 'out', {
        delay: 100,
        customDuration: 1200,
        customIntensity: 0.7
      });
    }
    
    // Apply transition effect to card
    if (cardRef.current) {
      applyTransitionEffect(cardRef.current, 'out', {
        delay: 200,
        customDuration: 1200,
        customIntensity: 0.8
      });
    }
    
    // Navigate after animation completes
    setTimeout(() => {
      navigate("/dashboard");
    }, 1200);
  };

  return (
    <div 
      ref={containerRef}
      className="min-h-screen flex items-center justify-center overflow-hidden fixed inset-0"
    >
      {/* Professional and elegant background */}
      <div 
        ref={backgroundRef}
        className="login-background parallax-layer"
        data-depth="0.2"
      >
        {/* Animated gradient shapes */}
        <div className="bg-shape bg-shape-1"></div>
        <div className="bg-shape bg-shape-2"></div>
        <div className="bg-shape bg-shape-3"></div>
        
        {/* Subtle grid lines */}
        <div className="grid-lines"></div>
      </div>
      
      <div className="w-full max-w-md p-4 z-10 relative">
        {/* Logo section */}
        <div 
          ref={logoRef} 
          className="mb-8 text-center parallax-layer" 
          data-depth="0.4"
        >
          <h1 className="text-4xl font-bold text-feunix-800 tracking-tight">Feunix</h1>
          <p className="text-feunix-600 font-medium">Enterprise System</p>
        </div>
        
        {/* Card */}
        <div 
          ref={cardRef} 
          className="parallax-layer" 
          data-depth="0.6"
        >
          <Card className="glass-card professional-shadow border-0">
            <CardHeader className="pb-4">
              <CardTitle className="text-2xl font-semibold text-feunix-800">Login</CardTitle>
              <CardDescription className="text-gray-600">
                Enter your credentials to access your account
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleLogin}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="username" className="text-sm font-medium text-feunix-700">
                    Username
                  </label>
                  <Input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter your username"
                    required
                    className="elegant-input"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="password" className="text-sm font-medium text-feunix-700">
                    Password
                  </label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                    className="elegant-input"
                  />
                </div>
                <div className="flex items-center">
                  <div className="flex items-center">
                    <input type="checkbox" id="remember" className="rounded text-feunix-600 focus:ring-feunix-500" />
                    <label htmlFor="remember" className="ml-2 text-sm text-feunix-700">
                      Remember me
                    </label>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  type="submit" 
                  className="w-full professional-button" 
                  disabled={loading}
                >
                  {loading ? "Logging in..." : "Log in"}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Login;