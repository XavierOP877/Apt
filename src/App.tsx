import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Campaign from './pages/Campaign';
import Widget from './pages/Widget';
import { WalletSelector } from "@aptos-labs/wallet-adapter-ant-design";
import { SwapProvider, useSwap } from './context/SwapContext';

const App = () => {
  return (
      <Router>
        <Navbar />
        <WalletSelector />
        <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/campaign" element={<Campaign />} />
      <Route path="/widget" element={<Widget/>} />
      </Routes>
      </Router>
  );
};

export default App;
