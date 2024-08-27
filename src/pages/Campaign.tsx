import React, { useEffect, useState } from 'react';
import { AptosClient, AptosAccount, FaucetClient, Types } from 'aptos';

const NODE_URL = 'https://fullnode.devnet.aptoslabs.com';
const FAUCET_URL = 'https://faucet.devnet.aptoslabs.com';

// Initialize Aptos client
const aptosClient = new AptosClient(NODE_URL);

// Initialize Faucet client
const faucetClient = new FaucetClient(FAUCET_URL, NODE_URL);


// Define the campaign structure
interface Campaign {
    creator: string;
    goal: number;
    deadline: number;
    raised_amount: number;
    is_active: boolean;
    success: boolean;
}

const Campaigns: React.FC = () => {
    const [account, setAccount] = useState<AptosAccount | null>(null);
    const [campaigns, setCampaigns] = useState<Campaign[]>([]);
    const [contributionAmount, setContributionAmount] = useState<number>(0);

    // Fetch all campaigns from the blockchain
    const fetchCampaigns = async (account: AptosAccount) => {
        try {
            const {resource}: any = await aptosClient.getAccountResource(
                account.address().hex(),
                '0x9e372b0466276fcb1d73484b83aab86d9f9c871d8e804d9658cea840be8b4d3e::CrowdfundingDapp::CampaignStore<0x1::aptos_coin::AptosCoin>'
            );
            const campaignsData: Campaign[] = resource.data.campaigns;
            setCampaigns(campaignsData);
        } catch (error) {
            console.error('Error fetching campaigns:', error);
        }
    };

    // Handle contribution to a campaign
    const contributeToCampaign = async (campaignId: number) => {
        if (!account) return;

        const payload = {
            type: 'entry_function_payload',
            function: '0x9e372b0466276fcb1d73484b83aab86d9f9c871d8e804d9658cea840be8b4d3e::CrowdfundingDapp::contribute',
            arguments: [campaignId, contributionAmount],
            type_arguments: ['0x1::aptos_coin::AptosCoin'],
        };

        try {
            const txnRequest = await aptosClient.generateTransaction(account.address(), payload);
            const signedTxn = await aptosClient.signTransaction(account, txnRequest);
            const txnResponse = await aptosClient.submitTransaction(signedTxn);
            await aptosClient.waitForTransaction(txnResponse.hash);
            console.log('Contributed successfully!');
            fetchCampaigns(account); // Refresh campaigns after contribution
        } catch (error) {
            console.error('Error contributing to campaign:', error);
        }
    };

    return (
        <div className="campaigns-container">
            <h1>Crowdfunding Campaigns</h1>
            <div className="campaigns-list">
                {campaigns.length === 0 ? (
                    <p>No campaigns available.</p>
                ) : (
                    campaigns.map((campaign, index) => (
                        <div key={index} className="campaign-card">
                            <h2>Campaign {index + 1}</h2>
                            <p>Creator: {campaign.creator}</p>
                            <p>Goal: {campaign.goal}</p>
                            <p>Raised: {campaign.raised_amount}</p>
                            <p>Deadline: {new Date(campaign.deadline * 1000).toLocaleString()}</p>
                            <p>Status: {campaign.is_active ? 'Active' : 'Inactive'}</p>
                            <p>Success: {campaign.success ? 'Yes' : 'No'}</p>
                            {campaign.is_active && (
                                <div className="contribute-section">
                                    <input
                                        type="number"
                                        placeholder="Contribution Amount"
                                        value={contributionAmount}
                                        onChange={(e) => setContributionAmount(parseInt(e.target.value))}
                                    />
                                    <button onClick={() => contributeToCampaign(index)}>
                                        Contribute
                                    </button>
                                </div>
                            )}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Campaigns;
