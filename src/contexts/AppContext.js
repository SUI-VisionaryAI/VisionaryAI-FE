import React, { createContext, useContext, useState } from 'react';

// Mode constants
export const GRID_MODE = 0;
export const LIST_MODE = 1;

// Create context
const AppContext = createContext();

// Context provider
export const AppProvider = ({ children }) => {
  const [viewMode, setViewMode] = useState(GRID_MODE);
  const [accounts, setAccounts] = useState([]);
  const [currentAccount, setCurrentAccount] = useState(null);
  const [wallets, setWallets] = useState([]);
  
  return (
    <AppContext.Provider
      value={{
        viewMode,
        setViewMode,
        accounts,
        setAccounts,
        currentAccount,
        setCurrentAccount,
        wallets,
        setWallets,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// Custom hook for easier usage
export const useAppContext = () => useContext(AppContext);
