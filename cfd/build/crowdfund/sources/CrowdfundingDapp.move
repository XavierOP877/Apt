    module apt::CrowdfundingDapp {
        use aptos_framework::coin::{Self, Coin};
        use aptos_framework::signer;
        use aptos_framework::timestamp;
        use aptos_framework::vector;

        struct Campaign<Asset> has key, store {
            creator: address,
            goal: u64,
            deadline: u64,
            raised_amount: u64,
            funders: vector<address>,
            contributions: vector<u64>,
            is_active: bool,
            success: bool,
        }

        struct CampaignStore<Asset> has key, store {
            campaigns: vector<Campaign<Asset>>,
        }

        // Initialize a new CampaignStore
        public fun initialize<Asset: store>(account: &signer) {
            move_to<CampaignStore<Asset>>(account, CampaignStore {
                campaigns: vector::empty<Campaign<Asset>>(),
            });
        }

        // Create a new campaign
        public entry fun create_campaign<Asset: store>(
            account: &signer,
            goal: u64,
            duration_in_seconds: u64
        ) acquires CampaignStore {
            let timestamp = timestamp::now_seconds();
            let deadline = timestamp + duration_in_seconds;
            
            let new_campaign = Campaign {
                creator: signer::address_of(account),
                goal,
                deadline,
                raised_amount: 0,
                funders: vector::empty<address>(),
                contributions: vector::empty<u64>(),
                is_active: true,
                success: false,
            };

            let campaign_store = borrow_global_mut<CampaignStore<Asset>>(signer::address_of(account));
            vector::push_back(&mut campaign_store.campaigns, new_campaign);
        }

        // Contribute to a campaign
        public fun contribute<Asset: store + drop + key>(
            account: &signer,
            campaign_id: u64,
            amount: u64
        ) acquires CampaignStore {
            let campaign_store = borrow_global_mut<CampaignStore<Asset>>(signer::address_of(account));
            let campaign_ref = vector::borrow_mut<Campaign<Asset>>(&mut campaign_store.campaigns, campaign_id);

            assert!(campaign_ref.is_active, 1);
            assert!(timestamp::now_seconds() <= campaign_ref.deadline, 2);

            let funder = signer::address_of(account);
            vector::push_back(&mut campaign_ref.funders, funder);
            vector::push_back(&mut campaign_ref.contributions, amount);

            coin::transfer<Coin<Asset>>(account, campaign_ref.creator, amount);

            campaign_ref.raised_amount = campaign_ref.raised_amount + amount;
            
            if (campaign_ref.raised_amount >= campaign_ref.goal) {
                campaign_ref.success = true;
                campaign_ref.is_active = false;
            }
        }

        // Withdraw funds from a campaign
        public fun withdraw_funds<Asset: store + key>(
            account: &signer,
            campaign_id: u64
        ) acquires CampaignStore {
            let campaign_store = borrow_global_mut<CampaignStore<Asset>>(signer::address_of(account));
            let campaign_ref: &mut Campaign<Asset> = vector::borrow_mut(&mut campaign_store.campaigns, campaign_id);

            assert!(campaign_ref.creator == signer::address_of(account), 1);
            assert!(campaign_ref.success, 2);
            
            // Fund transfer would have already happened in `contribute`.
            campaign_ref.is_active = false;
        }
    }
