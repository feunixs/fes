import { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

interface UseParallaxTransitionOptions {
  duration?: number;
  targetPath?: string;
  intensity?: number;
  easing?: string;
  staggerDelay?: number;
}

const useParallaxTransition = (options: UseParallaxTransitionOptions = {}) => {
  const { 
    duration = 1200, 
    targetPath,
    intensity = 0.5,
    easing = 'cubic-bezier(0.22, 1, 0.36, 1)',
    staggerDelay = 120
  } = options;
  
  const [isTransitioning, setIsTransitioning] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const layersRef = useRef<HTMLElement[]>([]);
  
  // Find and cache parallax layers
  const findParallaxLayers = useCallback(() => {
    const layers = Array.from(
      document.querySelectorAll(".parallax-layer")
    ) as HTMLElement[];
    
    layersRef.current = layers;
    return layers;
  }, []);
  
  // Apply transition effect to a specific element
  const applyTransitionEffect = useCallback((
    element: HTMLElement, 
    effect: 'in' | 'out', 
    customOptions?: {
      delay?: number;
      customDuration?: number;
      customEasing?: string;
      customIntensity?: number;
    }
  ) => {
    if (!element) return;
    
    const depth = parseFloat(element.dataset.depth || "0.1");
    const effectIntensity = customOptions?.customIntensity ?? intensity;
    const effectDuration = customOptions?.customDuration ?? duration;
    const effectEasing = customOptions?.customEasing ?? easing;
    const effectDelay = customOptions?.delay ?? 0;
    
    element.style.transition = `transform ${effectDuration}ms ${effectEasing} ${effectDelay}ms, 
                               opacity ${effectDuration}ms ${effectEasing} ${effectDelay}ms`;
    
    if (effect === 'out') {
      // Exit animation
      const translateY = 40 * depth * effectIntensity;
      const scale = 1 + (depth * 0.1);
      const rotate = depth * 3;
      
      element.style.transform = `translate3d(0, ${translateY}px, 0) scale(${scale}) rotateX(${rotate}deg)`;
      element.style.opacity = '0';
    } else {
      // Reset/entrance animation
      element.style.transform = 'translate3d(0, 0, 0) scale(1) rotateX(0deg)';
      element.style.opacity = '1';
    }
  }, [duration, easing, intensity]);
  
  // Start transition with enhanced control
  const startTransition = useCallback((path: string, customOptions?: {
    transitionDuration?: number;
    transitionIntensity?: number;
    transitionEasing?: string;
  }) => {
    setIsTransitioning(true);
    
    // Find all parallax layers
    const layers = findParallaxLayers();
    const transitionDuration = customOptions?.transitionDuration ?? duration;
    
    // Apply staggered exit animations to all layers
    layers.forEach((layer, index) => {
      const delay = index * staggerDelay;
      
      applyTransitionEffect(layer, 'out', {
        delay,
        customDuration: transitionDuration,
        customEasing: customOptions?.transitionEasing,
        customIntensity: customOptions?.transitionIntensity
      });
    });
    
    // Calculate max transition time including all delays
    const maxTransitionTime = transitionDuration + (layers.length * staggerDelay);
    
    // Wait for animation to complete before navigating
    setTimeout(() => {
      navigate(path);
      
      // Reset transition state after navigation
      setTimeout(() => {
        setIsTransitioning(false);
      }, 100);
    }, maxTransitionTime);
  }, [navigate, duration, staggerDelay, findParallaxLayers, applyTransitionEffect]);
  
  // Apply entrance animation to elements
  const applyEntranceAnimation = useCallback((elements: HTMLElement[] | NodeListOf<Element>) => {
    const elementsArray = Array.from(elements) as HTMLElement[];
    
    elementsArray.forEach((element, index) => {
      // Set initial state
      element.style.opacity = '0';
      element.style.transform = 'translate3d(0, 30px, 0)';
      
      // Force a reflow to ensure the initial state is applied
      void element.offsetWidth;
      
      // Apply entrance animation with staggered delay
      setTimeout(() => {
        element.style.transition = `transform ${duration}ms ${easing}, opacity ${duration}ms ${easing}`;
        element.style.opacity = '1';
        element.style.transform = 'translate3d(0, 0, 0)';
      }, index * staggerDelay);
    });
  }, [duration, easing, staggerDelay]);
  
  // Check if we're on the source page for the transition
  const isSourcePage = useCallback(() => {
    if (!targetPath) return false;
    return location.pathname !== targetPath;
  }, [location.pathname, targetPath]);
  
  return {
    isTransitioning,
    startTransition,
    isSourcePage,
    applyTransitionEffect,
    applyEntranceAnimation,
    findParallaxLayers
  };
};

export default useParallaxTransition;