import React from 'react';
import ReactDOM from 'react-dom/client';
import NavBar from './components/navBar';
import CryptoTable from './pages/Overview/CryptoTable';
import CreatePortfolio from './pages/Top-10-Crypto/CreatePortfolio';
import './css/index.css';
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <NavBar />
    <CryptoTable />
    <CreatePortfolio />
  </React.StrictMode>
);
