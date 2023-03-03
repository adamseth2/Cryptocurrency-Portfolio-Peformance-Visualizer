import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import List from './components/List';
import CryptoTable from './pages/Overview/CryptoTable';
import CreatePortfolio from './pages/Top-10-Crypto/CreatePortfolio';
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <List />
    <CryptoTable />
    <CreatePortfolio />
  </React.StrictMode>
);
