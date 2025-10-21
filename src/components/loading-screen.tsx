"use client";

import { useEffect, useState } from "react";
import { Spinner } from "./ui/spinner";

export function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    // Check if all images are loaded
    const checkImagesLoaded = () => {
      const images = document.querySelectorAll('img');
      let loadedCount = 0;
      const totalImages = images.length;

      if (totalImages === 0) {
        // If no images, just wait a bit for other content to load
        setTimeout(() => setIsLoading(false), 1000);
        return;
      }

      const handleImageLoad = () => {
        loadedCount++;
        if (loadedCount === totalImages) {
          // All images loaded, start fade out transition
          setTimeout(() => {
            setIsFadingOut(true);
            // Hide completely after fade animation
            setTimeout(() => setIsLoading(false), 300);
          }, 500);
        }
      };

      images.forEach((img) => {
        if (img.complete) {
          handleImageLoad();
        } else {
          img.addEventListener('load', handleImageLoad);
          img.addEventListener('error', handleImageLoad); // Count errors as "loaded"
        }
      });
    };

    // Wait for DOM to be ready
    if (document.readyState === 'complete') {
      checkImagesLoaded();
    } else {
      window.addEventListener('load', checkImagesLoaded);
    }

    // Fallback: hide loading after 5 seconds regardless
    const fallbackTimer = setTimeout(() => {
      setIsFadingOut(true);
      setTimeout(() => setIsLoading(false), 300);
    }, 5000);

    return () => {
      window.removeEventListener('load', checkImagesLoaded);
      clearTimeout(fallbackTimer);
    };
  }, []);

  if (!isLoading) return null;

  return (
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-300 ${
        isFadingOut ? 'opacity-0' : 'opacity-100'
      }`}
      style={{
        background: 'linear-gradient(135deg, #0f172a 0%, #1e3a8a 25%, #1e40af 50%, #1e3a8a 75%, #0f172a 100%)',
        backgroundSize: '400% 400%',
        animation: 'gradientShift 3s ease-in-out infinite'
      }}
    >
      {/* Automotive-themed background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gear/cog animations */}
        <div className="absolute top-20 left-20 w-16 h-16 opacity-20">
          <div className="w-full h-full border-4 border-white rounded-full animate-spin" style={{ animationDuration: '4s' }}>
            <div className="w-2 h-2 bg-white rounded-full absolute top-0 left-1/2 transform -translate-x-1/2"></div>
            <div className="w-2 h-2 bg-white rounded-full absolute bottom-0 left-1/2 transform -translate-x-1/2"></div>
            <div className="w-2 h-2 bg-white rounded-full absolute left-0 top-1/2 transform -translate-y-1/2"></div>
            <div className="w-2 h-2 bg-white rounded-full absolute right-0 top-1/2 transform -translate-y-1/2"></div>
          </div>
        </div>
        
        <div className="absolute top-32 right-32 w-12 h-12 opacity-15">
          <div className="w-full h-full border-3 border-white rounded-full animate-spin" style={{ animationDuration: '6s', animationDirection: 'reverse' }}>
            <div className="w-1.5 h-1.5 bg-white rounded-full absolute top-0 left-1/2 transform -translate-x-1/2"></div>
            <div className="w-1.5 h-1.5 bg-white rounded-full absolute bottom-0 left-1/2 transform -translate-x-1/2"></div>
            <div className="w-1.5 h-1.5 bg-white rounded-full absolute left-0 top-1/2 transform -translate-y-1/2"></div>
            <div className="w-1.5 h-1.5 bg-white rounded-full absolute right-0 top-1/2 transform -translate-y-1/2"></div>
          </div>
        </div>

        <div className="absolute bottom-20 left-32 w-10 h-10 opacity-10">
          <div className="w-full h-full border-2 border-white rounded-full animate-spin" style={{ animationDuration: '8s' }}>
            <div className="w-1 h-1 bg-white rounded-full absolute top-0 left-1/2 transform -translate-x-1/2"></div>
            <div className="w-1 h-1 bg-white rounded-full absolute bottom-0 left-1/2 transform -translate-x-1/2"></div>
            <div className="w-1 h-1 bg-white rounded-full absolute left-0 top-1/2 transform -translate-y-1/2"></div>
            <div className="w-1 h-1 bg-white rounded-full absolute right-0 top-1/2 transform -translate-y-1/2"></div>
          </div>
        </div>

        <div className="absolute bottom-32 right-20 w-14 h-14 opacity-25">
          <div className="w-full h-full border-3 border-white rounded-full animate-spin" style={{ animationDuration: '5s', animationDirection: 'reverse' }}>
            <div className="w-2 h-2 bg-white rounded-full absolute top-0 left-1/2 transform -translate-x-1/2"></div>
            <div className="w-2 h-2 bg-white rounded-full absolute bottom-0 left-1/2 transform -translate-x-1/2"></div>
            <div className="w-2 h-2 bg-white rounded-full absolute left-0 top-1/2 transform -translate-y-1/2"></div>
            <div className="w-2 h-2 bg-white rounded-full absolute right-0 top-1/2 transform -translate-y-1/2"></div>
          </div>
        </div>

        {/* Moving lines to simulate speed */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-white to-transparent opacity-30 animate-pulse"></div>
          <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-white to-transparent opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-3/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-white to-transparent opacity-25 animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>

        {/* Corner accents */}
        <div className="absolute top-0 left-0 w-32 h-32 border-l-4 border-t-4 border-white opacity-20"></div>
        <div className="absolute top-0 right-0 w-32 h-32 border-r-4 border-t-4 border-white opacity-20"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 border-l-4 border-b-4 border-white opacity-20"></div>
        <div className="absolute bottom-0 right-0 w-32 h-32 border-r-4 border-b-4 border-white opacity-20"></div>
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center space-y-6">
        <div className="relative">
          {/* Custom automotive spinner */}
          <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
          <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-r-white rounded-full animate-spin" style={{ animationDuration: '1.5s', animationDirection: 'reverse' }}></div>
        </div>
        
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-2 tracking-wider">
            ALOK AUTOMOBILES
          </h2>
          <div className="w-24 h-0.5 bg-white mx-auto mb-3"></div>
          <p className="text-gray-300 text-sm font-medium tracking-wide">
            Loading your automotive solutions...
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes gradientShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
      `}</style>
    </div>
  );
}
