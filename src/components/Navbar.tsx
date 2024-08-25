import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
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
          <Link to="/widget" className="text-blue-500 hover:text-blue-700">Widget</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
