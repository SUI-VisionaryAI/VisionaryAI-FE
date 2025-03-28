import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './assets/css/App.css';

import App from './App';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ConnectButton, SuiClientProvider, WalletProvider, createNetworkConfig } from '@mysten/dapp-kit';
import { Toaster } from 'react-hot-toast';
import { getFullnodeUrl } from "@mysten/sui/client";

const { networkConfig } = createNetworkConfig({
  testnet: {
    url: getFullnodeUrl("testnet"),
  },
  mainnet: {
    url: getFullnodeUrl("mainnet"),
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
const queryClient = new QueryClient();
root.render(
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <SuiClientProvider networks={networkConfig}>
        <WalletProvider autoConnect defaultNetwork="testnet">
          <App />
          <Toaster position="top-center" />
          {/* <ConnectButton />; */}
        </WalletProvider>
      </SuiClientProvider>
    </QueryClientProvider>
  </BrowserRouter>,
);
