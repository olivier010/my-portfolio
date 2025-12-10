'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

// Only create the context on the client side
const ThemeContext = typeof window !== 'undefined' ? createContext() : null;

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');
  const [mounted, setMounted] = useState(false);

  // Set theme on initial load
  useEffect(() => {
    // Ensure we're in the browser
    if (typeof window === 'undefined') return;

    try {
      // Check for saved theme preference or use system preference
      const savedTheme = localStorage.getItem('theme') || 
        (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
      
      setTheme(savedTheme);
      setMounted(true);
      
      // Watch for system theme changes
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleChange = (e) => {
        const newTheme = e.matches ? 'dark' : 'light';
        setTheme(newTheme);
        try {
          localStorage.setItem('theme', newTheme);
        } catch (e) {
          console.error('Failed to save theme preference:', e);
        }
      };
      
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    } catch (error) {
      console.error('Error initializing theme:', error);
      setMounted(true); // Still render the app even if theme fails
    }
  }, []);

  // Apply theme class to document element
  useEffect(() => {
    if (typeof document === 'undefined') return;
    
    try {
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      localStorage.setItem('theme', theme);
    } catch (error) {
      console.error('Error applying theme:', error);
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  // Don't render theme-dependent content until we know the user's preference
  // But don't block rendering if we're on the server
  if (!mounted && typeof window !== 'undefined') {
    return null;
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  if (typeof window === 'undefined') {
    // Return default values during SSR
    return { theme: 'light', toggleTheme: () => {} };
  }

  const context = useContext(ThemeContext);
  if (context === undefined) {
    console.warn('useTheme must be used within a ThemeProvider');
    return { theme: 'light', toggleTheme: () => {} };
  }
  return context;
};
