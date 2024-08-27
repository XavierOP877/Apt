import React, { useState } from 'react';
import { AptosClient, AptosAccount, FaucetClient, Types } from 'aptos';


// URLs for Aptos services
const NODE_URL = 'https://fullnode.devnet.aptoslabs.com';
const FAUCET_URL = 'https://faucet.devnet.aptoslabs.com';

// Initialize Aptos client
const aptosClient = new AptosClient(NODE_URL);

// Initialize Faucet client
const faucetClient = new FaucetClient(FAUCET_URL, NODE_URL);

export async function createCampaign(account: any, goal: any, durationInSeconds: any) {
    const payload = {
        type: 'entry_function_payload',
        function: '0x9e372b0466276fcb1d73484b83aab86d9f9c871d8e804d9658cea840be8b4d3e::CrowdfundingDapp::create_campaign',
        arguments: [goal, durationInSeconds],
        type_arguments: ['0x1::aptos_coin::AptosCoin'],
    };

    try {
        const txnRequest = await aptosClient.generateTransaction(account.address(), payload);
        const signedTxn = await aptosClient.signTransaction(account, txnRequest);
        const txnResponse = await aptosClient.submitTransaction(signedTxn);
        await aptosClient.waitForTransaction(txnResponse.hash);
        console.log('Campaign created successfully!');
    } catch (error) {
        console.error('Error creating campaign:', error);
    }
}
