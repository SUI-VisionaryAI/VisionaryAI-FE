import React, { createContext, useContext, useState } from 'react';

// Mode constants
export const GRID_MODE = 0;
export const LIST_MODE = 1;

// Create context
const AppContext = createContext();

// Context provider
export const AppProvider = ({ children }) => {
  const [viewMode, setViewMode] = useState(GRID_MODE); // default: grid

  return (
    <AppContext.Provider value={{ viewMode, setViewMode }}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook for easier usage
export const useAppContext = () => useContext(AppContext);
