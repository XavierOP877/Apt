import React, { useState } from 'react';
import { AptosClient, AptosAccount, FaucetClient, Types } from 'aptos';
import { createCampaign } from "../utils/campaign";
import { useWallet } from '@aptos-labs/wallet-adapter-react';

// URLs for Aptos services
const NODE_URL = 'https://fullnode.devnet.aptoslabs.com';
const FAUCET_URL = 'https://faucet.devnet.aptoslabs.com';

// Initialize Aptos client
const aptosClient = new AptosClient(NODE_URL);

// Initialize Faucet client
const faucetClient = new FaucetClient(FAUCET_URL, NODE_URL);

interface ProjectFormValues {
  projectTitle: string;
  description: string;
  targetFund: string;
  startDate: string;
  endDate: string;
}

const ProjectForm: React.FC = () => {
  const [formValues, setFormValues] = useState<ProjectFormValues>({
    projectTitle: '',
    description: '',
    targetFund: '',
    startDate: '',
    endDate: '',
  });

    const [error, setError] = useState<string | null>(null);
    const {account, signAndSubmitTransaction,} = useWallet();

    const createCampaign = async () => {
        const response = await signAndSubmitTransaction({
            sender: account?.address,
            data: {
              function: "0x9e372b0466276fcb1d73484b83aab86d9f9c871d8e804d9658cea840be8b4d3e::CrowdfundingDapp::create_campaign",
              typeArguments: ["0x1::aptos_coin::AptosCoin"],
              functionArguments: [formValues.targetFund, 100],
            },
          });
    };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };


  return (
    <div className="max-w-xl mx-auto bg-gradient-to-r from-blue-500 to-black p-8 shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Create a New Campaign</h2>

      <form className="space-y-6">
        {/* Project Title */}
        <div>
          <label htmlFor="projectTitle" className="block text-sm font-medium text-gray-700">Project Title</label>
          <input
            type="text"
            id="projectTitle"
            name="projectTitle"
            value={formValues.projectTitle}
            onChange={handleChange}
            placeholder="Enter project title"
            className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            id="description"
            name="description"
            value={formValues.description}
            onChange={handleChange}
            placeholder="Enter project description"
            rows={4}
            className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>

        {/* Target Fund */}
        <div>
          <label htmlFor="targetFund" className="block text-sm font-medium text-gray-700">Target Fund ($)</label>
          <input
            type="number"
            id="targetFund"
            name="targetFund"
            value={formValues.targetFund}
            onChange={handleChange}
            placeholder="Enter target fund amount"
            className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>

        {/* Start Date */}
        <div>
          <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">Start Date</label>
          <input
            type="date"
            id="startDate"
            name="startDate"
            value={formValues.startDate}
            onChange={handleChange}
            className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>

        {/* End Date */}
        <div>
          <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">End Date</label>
          <input
            type="date"
            id="endDate"
            name="endDate"
            value={formValues.endDate}
            onChange={handleChange}
            className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-center">
          <button
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            onClick={createCampaign}
          >
            Submit Campaign
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProjectForm;
