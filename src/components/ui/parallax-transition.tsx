import { useState, useEffect, ReactNode, useRef } from "react";

interface ParallaxTransitionProps {
  children: ReactNode;
  isActive: boolean;
  onTransitionComplete?: () => void;
  intensity?: number; // Controls the intensity of the parallax effect (0.1 to 1.0)
  mouseParallax?: boolean; // Enable mouse-based parallax
}

const ParallaxTransition = ({
  children,
  isActive,
  onTransitionComplete,
  intensity = 0.5,
  mouseParallax = true,
}: ParallaxTransitionProps) => {
  const [transitioning, setTransitioning] = useState(false);
  const [layers, setLayers] = useState<HTMLElement[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Normalize intensity to be between 0.1 and 1.0
  const normalizedIntensity = Math.min(Math.max(intensity, 0.1), 1.0);
  
  // Handle mouse movement for parallax effect
  useEffect(() => {
    if (!mouseParallax || transitioning) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      
      const { clientX, clientY } = e;
      const { width, height, left, top } = containerRef.current.getBoundingClientRect();
      
      // Calculate mouse position relative to the container center
      const mouseX = ((clientX - left) / width - 0.5) * 2; // -1 to 1
      const mouseY = ((clientY - top) / height - 0.5) * 2; // -1 to 1
      
      // Apply parallax effect to each layer based on its depth
      layers.forEach(layer => {
        const depth = parseFloat(layer.dataset.depth || "0.1");
        const moveX = mouseX * depth * 20 * normalizedIntensity;
        const moveY = mouseY * depth * 20 * normalizedIntensity;
        const rotateX = mouseY * depth * 5 * normalizedIntensity;
        const rotateY = -mouseX * depth * 5 * normalizedIntensity;
        
        // Apply smooth transform with subtle rotation for depth
        layer.style.transform = `translate3d(${moveX}px, ${moveY}px, 0) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      });
    };
    
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [layers, mouseParallax, transitioning, normalizedIntensity]);
  
  useEffect(() => {
    if (isActive) {
      setTransitioning(true);
      
      // Find all elements with parallax-layer class
      const parallaxLayers = Array.from(
        document.querySelectorAll(".parallax-layer")
      ) as HTMLElement[];
      
      setLayers(parallaxLayers);
      
      // Apply enhanced parallax effect with staggered timing
      parallaxLayers.forEach((layer, index) => {
        const depth = parseFloat(layer.dataset.depth || "0.1");
        const delay = index * 120; // Increased stagger delay for more professional look
        const duration = 1200 + (depth * 300); // Longer duration for deeper layers
        
        // Use cubic-bezier for smoother, more professional easing
        layer.style.transition = `transform ${duration}ms cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms, 
                                 opacity ${duration}ms cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms`;
        
        // Enhanced transform with scale and subtle rotation for more depth
        layer.style.transform = `translate3d(0, ${-40 * depth * normalizedIntensity}vh, 0) 
                                scale(${1 + depth * 0.1}) 
                                rotateX(${depth * 5}deg)`;
        layer.style.opacity = "0";
      });
      
      // Complete transition with timing adjusted for the enhanced animations
      const maxDuration = Math.max(...parallaxLayers.map((layer, index) => {
        const depth = parseFloat(layer.dataset.depth || "0.1");
        return 1200 + (depth * 300) + (index * 120);
      }));
      
      const timer = setTimeout(() => {
        setTransitioning(false);
        if (onTransitionComplete) {
          onTransitionComplete();
        }
      }, maxDuration + 100); // Add a small buffer
      
      return () => clearTimeout(timer);
    } else {
      // Reset layers with smooth return animation
      layers.forEach((layer, index) => {
        const depth = parseFloat(layer.dataset.depth || "0.1");
        const delay = index * 50; // Shorter delay for reset
        
        layer.style.transition = `transform 800ms cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms, 
                                 opacity 800ms cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms`;
        layer.style.transform = "translate3d(0, 0, 0) scale(1) rotateX(0) rotateY(0)";
        layer.style.opacity = "1";
      });
    }
  }, [isActive, onTransitionComplete, normalizedIntensity]);
  
  return (
    <div 
      ref={containerRef}
      className={`parallax-container ${transitioning ? "transitioning" : ""}`}
    >
      {children}
    </div>
  );
};

export default ParallaxTransition;