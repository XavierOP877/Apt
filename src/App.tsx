import React, {useState} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Campaign from './pages/Campaign';
import Swap from './pages/Swap';
import CreateCampaign from './pages/CreateCampaign';
import { WalletSelector } from "@aptos-labs/wallet-adapter-ant-design";
import { useWallet, WalletName } from '@aptos-labs/wallet-adapter-react';

const App = () => {

  return (

    <Router>
      <Navbar />
      <WalletSelector />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/campaign" element={<Campaign />} />
        <Route path="/create" element={<CreateCampaign />} />
      </Routes>
    </Router>
  );
};

export default App;
