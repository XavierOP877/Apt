import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';

// Assuming the Campaign data is fetched from an API
const Campaign: React.FC = () => {
  const [campaign, setCampaign] = useState<any>(null);

  useEffect(() => {
    // Replace with your API endpoint to fetch campaign data
    axios.get('')
      .then(response => setCampaign(response.data))
      .catch(error => console.error('Error fetching campaign data:', error));
  }, []);

  if (!campaign) {
    return <div>Loading...</div>;
  }

  const progress = (campaign.fundReceived / campaign.targetFund) * 100;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Campaign Header */}
      <header className="flex items-center space-x-8 mb-8">
        <img src={campaign.image} alt={campaign.projectTitle} className="w-1/2 h-auto object-cover" />
        <div className="w-1/2">
          <h1 className="text-4xl font-bold mb-4">{campaign.projectTitle}</h1>
          <p className="text-lg mb-4">{campaign.description}</p>
          <p className="text-xl font-semibold mb-2">Target Fund: ${campaign.targetFund.toLocaleString()}</p>
          <p className="text-xl font-semibold mb-4">Fund Received: ${campaign.fundReceived.toLocaleString()}</p>
          <p className="text-md mb-4">Start Date: {new Date(campaign.startDate).toLocaleDateString()}</p>
          <p className="text-md mb-8">End Date: {new Date(campaign.endDate).toLocaleDateString()}</p>

          {/* Progress Bar */}
          <div className="w-full bg-gray-300 rounded-full h-4 mb-4">
            <div
              className="bg-green-500 h-full rounded-full"
              style={{width:`${progress}%`}}
            />
          </div>
          <p className="text-md font-semibold">Progress: {Math.round(progress)}%</p>

          {/* Call-to-Action */}
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4">
            Contribute Now
          </button>
        </div>
      </header>
    </div>
  );
};

export default Campaign;