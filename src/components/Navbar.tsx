import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useWallet } from '@aptos-labs/wallet-adapter-react';
import { AptosClient, Types } from 'aptos';

const Navbar: React.FC = () => {
  const { account, connect, disconnect, connected } = useWallet();
  const [balance, setBalance] = useState<number | null>(null);
  const client = new AptosClient('https://fullnode.testnet.aptoslabs.com/v1');
  console.log(account?.address);

  useEffect(() => {
    const fetchBalance = async () => {
      if (account?.address) {
        try {
          const accountResources = await client.getAccountResources(account?.address);
          console.log('Account Resources:', accountResources); // Inspect resource structure

          const coinStoreResource = accountResources.find(resource =>
            resource.type === '0x1::coin::CoinStore<0x1::aptos_coin::AptosCoin>'
          );

          if (coinStoreResource) {
            // Adjust this based on actual data structure
            const { data } = coinStoreResource;
            console.log(data);
            // const balanceValue = data.coin.value; // Adjust based on actual structure
            // setBalance(Number(balanceValue) / 1e8); // Convert based on smallest unit, e.g., 1e8 for Aptos
            console.log('Coin Store Resource Data:', data.coin.value)
          }
        } catch (error) {
          console.error('Error fetching balance:', error);
        }
      }
    };

    fetchBalance();
  }, [account, client]);


  return (
    <nav className="fixed top-0 left-0 right-0 bg-white shadow-md py-4 px-8 flex justify-between items-center">
      <div className="text-2xl font-bold">AptFund</div>
      <ul className="flex space-x-4">
        <li>
          <Link to="/" className="text-blue-500 hover:text-blue-700">Home</Link>
        </li>
        <li>
          <Link to="/profile" className="text-blue-500 hover:text-blue-700">Profile</Link>
        </li>
        <li>
          <Link to="/campaign" className="text-blue-500 hover:text-blue-700">Campaign</Link>
        </li>
        <li>
          <Link to="/swap" className="text-blue-500 hover:text-blue-700">Widget</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
