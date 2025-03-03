import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './assets/css/App.css';

import App from './App';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ConnectButton, SuiClientProvider, WalletProvider } from '@mysten/dapp-kit';

const root = ReactDOM.createRoot(document.getElementById('root'));
const queryClient = new QueryClient();
root.render(
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <SuiClientProvider>
        <WalletProvider>
          <App />
          {/* <ConnectButton />; */}
        </WalletProvider>
      </SuiClientProvider>
    </QueryClientProvider>
  </BrowserRouter>,
);
