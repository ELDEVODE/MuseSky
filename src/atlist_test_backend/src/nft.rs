use crate::wallet::{self, Balance, Currency};
use crate::weather::{self, Condition};
use candid::Principal as ICPrincipal;
use candid::{CandidType, Deserialize, Nat, Principal};
use ic_cdk::api::call::call_raw;
use ic_cdk::api::time;
use ic_cdk_timers::set_timer_interval;
use std::cell::{Ref, RefCell};
use std::collections::{HashMap, VecDeque};
use std::time::Duration;

#[derive(CandidType, Deserialize, Clone, PartialEq, Eq, Hash, Debug)]
pub enum Rarity {
    Common,
    Uncommon,
    Rare,
    Epic,
    Legendary,
}

#[derive(CandidType, Deserialize, Clone)]
pub struct NFTPrice {
    pub amount: Nat,
    pub currency: Currency,
}

#[derive(CandidType, Deserialize, Clone)]
pub struct NFT {
    pub id: Nat,
    pub collection_id: Nat,
    pub name: String,
    pub image: Vec<u8>,
    pub price: NFTPrice,
    pub location: String,
    pub owner: Principal,
    pub creator: Principal,
    pub weather_condition: String,
    pub created_at: Nat,
    pub rarity: Rarity,
    pub for_sale: bool,
    pub sale_price: Option<NFTPrice>,
    pub auction_end_time: Option<u64>,
    pub highest_bidder: Option<Principal>,
    pub highest_bid: Option<NFTPrice>,
    pub all_images: Vec<Vec<u8>>,
    pub initial_price: NFTPrice,
    pub last_price_update: u64,
    pub auction_extension_period: Option<u64>,
}

#[derive(CandidType, Deserialize, Clone)]
pub struct RarityThresholds {
    pub common: u8,
    pub uncommon: u8,
    pub rare: u8,
    pub epic: u8,
}

#[derive(CandidType, Deserialize, Clone)]
pub struct PricingFactors {
    pub base_prices: HashMap<Rarity, Nat>,
    pub demand_multiplier: Nat,
}

thread_local! {
    static NFT_STORAGE: RefCell<HashMap<Nat, NFT>> = RefCell::new(HashMap::new());
    static NEXT_ID: RefCell<Nat> = RefCell::new(Nat::from(1_u32));
    static WEATHER_IMAGES: RefCell<HashMap<Condition, Vec<u8>>> = RefCell::new(HashMap::new());
    static RARITY_THRESHOLDS: RefCell<RarityThresholds> = RefCell::new(RarityThresholds {
        common: 165,     // 65% (0-165)
        uncommon: 216,   // 20% (166-216)
        rare: 242,       // 10% (217-242)
        epic: 252,       // 4%  (243-252)
    });
    static PRICING_FACTORS: RefCell<PricingFactors> = RefCell::new(PricingFactors {
        base_prices: HashMap::new(),
        demand_multiplier: Nat::from(1_u32),
    });
    static RECENT_SALES: RefCell<VecDeque<u64>> = RefCell::new(VecDeque::new());
    static LAST_DEMAND_UPDATE: RefCell<u64> = RefCell::new(0);
}

pub fn init() {
    NFT_STORAGE.with(|storage| storage.borrow_mut().clear());
    NEXT_ID.with(|id| *id.borrow_mut() = Nat::from(1_u32));
    WEATHER_IMAGES.with(|images| images.borrow_mut().clear());
    init_pricing_factors();
}

pub fn init_pricing_factors() {
    PRICING_FACTORS.with(|factors| {
        let mut factors = factors.borrow_mut();
        factors
            .base_prices
            .insert(Rarity::Common, Nat::from(1_000_000u64));
        factors
            .base_prices
            .insert(Rarity::Uncommon, Nat::from(5_000_000u64));
        factors
            .base_prices
            .insert(Rarity::Rare, Nat::from(10_000_000u64));
        factors
            .base_prices
            .insert(Rarity::Epic, Nat::from(50_000_000u64));
        factors
            .base_prices
            .insert(Rarity::Legendary, Nat::from(100_000_000u64));
    });
}

pub fn update_single_nft_price(nft: &mut NFT) {
    let current_time = time();
    let cooldown_period = 3600 * 1_000_000_000; // 1 hour in nanoseconds

    if current_time - nft.last_price_update < cooldown_period {
        return; // Exit if cooldown period hasn't passed
    }

    let old_price = nft.price.clone();
    let new_price = calculate_nft_price(nft);

    if new_price.amount != old_price.amount {
        let reason = format!(
            "Price updated for NFT ID {}. Old price: {} {:?}. New price: {} {:?}. Reason: {}.",
            nft.id,
            old_price.amount,
            old_price.currency,
            new_price.amount,
            new_price.currency,
            get_price_change_reason(nft, &old_price, &new_price)
        );
        ic_cdk::println!("{}", reason);
        nft.price = new_price;
        nft.last_price_update = current_time;
    }
}

// pub fn init_pricing_factors() {
//     PRICING_FACTORS.with(|factors| {
//         let mut factors = factors.borrow_mut();
//         factors
//             .base_prices
//             .insert(Rarity::Common, Nat::from(1_000_000u64));
//         factors
//             .base_prices
//             .insert(Rarity::Uncommon, Nat::from(5_000_000u64));
//         factors
//             .base_prices
//             .insert(Rarity::Rare, Nat::from(10_000_000u64));
//         factors
//             .base_prices
//             .insert(Rarity::Epic, Nat::from(50_000_000u64));
//         factors
//             .base_prices
//             .insert(Rarity::Legendary, Nat::from(100_000_000u64));
//     });
// }

fn calculate_nft_price(nft: &NFT) -> NFTPrice {
    PRICING_FACTORS.with(|factors| {
        let factors = factors.borrow();
        let binding = Nat::from(1_000_000u64);
        let base_price = factors.base_prices.get(&nft.rarity).unwrap_or(&binding);
        let price = Nat::from(base_price.0.clone()) * factors.demand_multiplier.clone();
        NFTPrice {
            amount: Nat::from(price),
            currency: nft.price.currency.clone(),
        }
    })
}

pub fn get_next_id() -> Nat {
    NEXT_ID.with(|id| {
        let current_id = id.borrow().clone();
        *id.borrow_mut() += Nat::from(1_u32);
        current_id
    })
}

pub fn record_sale() {
    let current_time = time();
    RECENT_SALES.with(|sales| {
        let mut sales = sales.borrow_mut();
        sales.push_back(current_time);

        // Remove sales older than 24 hours
        let day_ago = current_time - 24 * 60 * 60 * 1_000_000_000; // 24 hours in nanoseconds
        while let Some(sale_time) = sales.front() {
            if *sale_time < day_ago {
                sales.pop_front();
            } else {
                break;
            }
        }
    });
}

pub fn get_recent_sales() -> u32 {
    RECENT_SALES.with(|sales| sales.borrow().len() as u32)
}

pub fn update_demand_multiplier() {
    let recent_sales = get_recent_sales();
    let new_multiplier = 1.0 + (recent_sales as f64 - 10.0) / 100.0; // Adjust based on your needs
    PRICING_FACTORS.with(|factors| {
        factors.borrow_mut().demand_multiplier = Nat::from(new_multiplier.max(0.5).min(2.0) as u64);
    });
}

pub fn get_current_demand_multiplier() -> Nat {
    PRICING_FACTORS.with(|factors| factors.borrow().demand_multiplier.clone())
}

pub fn start_weather_update_timer() {
    set_timer_interval(Duration::from_secs(3600), || {
        update_nft_weather_conditions();
    });
}

fn update_nft_weather_conditions() {
    NFT_STORAGE.with(|storage| {
        let mut storage = storage.borrow_mut();
        for nft in storage.values_mut() {
            let weather_data = weather::get_weather(nft.location.clone());
            nft.weather_condition = format!("{:?}", weather_data.condition);
            nft.image = WEATHER_IMAGES.with(|images| {
                images
                    .borrow()
                    .get(&weather_data.condition)
                    .cloned()
                    .unwrap_or_else(|| Vec::new())
            });
        }
    });
}

pub fn update_demand_if_needed() {
    let current_time = time();
    LAST_DEMAND_UPDATE.with(|last_update| {
        let mut last_update = last_update.borrow_mut();
        if current_time - *last_update > 60 * 1_000_000_000 {
            // 1 minute in nanoseconds
            update_demand_multiplier();
            *last_update = current_time;
        }
    });
}

pub async fn get_nft(id: Nat) -> Option<NFT> {
    NFT_STORAGE.with(|storage| {
        let mut storage = storage.borrow_mut();
        if let Some(nft) = storage.get_mut(&id) {
            update_demand_if_needed();
            update_single_nft_price(nft);
            Some(nft.clone())
        } else {
            None
        }
    })
}

pub async fn mint_nft(
    collection_id: Nat,
    name: String,
    initial_price: Nat,
    currency: Currency,
    location: String,
    sunny_image: Vec<u8>,
    raining_image: Vec<u8>,
    cloudy_image: Vec<u8>,
    windy_image: Vec<u8>,
) -> Result<Nat, String> {
    let caller = ic_cdk::caller();
    let id = get_next_id();

    WEATHER_IMAGES.with(|images| {
        let mut images = images.borrow_mut();
        images.insert(Condition::Sunny, sunny_image);
        images.insert(Condition::Raining, raining_image);
        images.insert(Condition::Cloudy, cloudy_image);
        images.insert(Condition::Windy, windy_image);
    });

    let weather_data = weather::get_weather(location.clone());

    let weather_condition = weather_data.condition.clone();
    let image = WEATHER_IMAGES.with(|images| {
        images
            .borrow()
            .get(&weather_condition)
            .cloned()
            .unwrap_or_else(|| Vec::new())
    });

    let rarity = determine_rarity().await;

    let all_images = WEATHER_IMAGES.with(|images| images.borrow().values().cloned().collect());

    let nft_price = NFTPrice {
        amount: initial_price.clone(),
        currency: currency.clone(),
    };

    let nft = NFT {
        id: id.clone(),
        collection_id,
        name,
        image,
        price: nft_price.clone(),
        initial_price: nft_price.clone(),
        location,
        owner: caller,
        creator: caller,
        weather_condition: format!("{:?}", weather_data.condition),
        created_at: Nat::from(ic_cdk::api::time()),
        rarity,
        for_sale: false,
        sale_price: None,
        auction_end_time: None,
        highest_bidder: None,
        highest_bid: None,
        all_images,
        last_price_update: time(),
        auction_extension_period: None,
    };

    NFT_STORAGE.with(|storage| storage.borrow_mut().insert(id.clone(), nft.clone()));

    // Subtract the price from the wallet
    let caller_balance = wallet::get_balance(caller, currency.clone());
    if caller_balance < initial_price {
        return Err("Insufficient balance".to_string());
    }
    wallet::update_balance_subtract(caller, initial_price, currency)?;

    Ok(id)
}

pub fn get_nfts_in_collection(collection_id: Nat) -> Vec<NFT> {
    update_demand_if_needed();
    NFT_STORAGE.with(|storage| {
        let mut storage = storage.borrow_mut();
        storage
            .values_mut()
            .filter(|nft| nft.collection_id == collection_id)
            .map(|nft| {
                update_single_nft_price(nft);
                nft.clone()
            })
            .collect()
    })
}

async fn determine_rarity() -> Rarity {
    let random_bytes = match call_raw(
        ICPrincipal::from_text("aaaaa-aa").unwrap(),
        "raw_rand",
        &[],
        0,
    )
    .await
    {
        Ok(bytes) => bytes,
        Err(e) => {
            ic_cdk::println!("Error calling raw_rand: {:?}", e);
            vec![0] // Default to 0 in case of error
        }
    };

    let random_number = if random_bytes.is_empty() {
        0
    } else {
        random_bytes[0]
    };

    RARITY_THRESHOLDS.with(|thresholds| {
        let thresholds = thresholds.borrow();
        if random_number <= thresholds.common {
            Rarity::Common
        } else if random_number <= thresholds.uncommon {
            Rarity::Uncommon
        } else if random_number <= thresholds.rare {
            Rarity::Rare
        } else if random_number <= thresholds.epic {
            Rarity::Epic
        } else {
            Rarity::Legendary
        }
    })
}

pub fn list_for_sale(id: Nat, price: Nat) -> Result<(), String> {
    update_demand_if_needed();
    NFT_STORAGE.with(|storage| {
        let mut storage = storage.borrow_mut();
        if let Some(nft) = storage.get_mut(&id) {
            update_single_nft_price(nft);
            if nft.owner != ic_cdk::caller() {
                return Err("Only the owner can list the NFT for sale".to_string());
            }
            nft.for_sale = true;
            nft.sale_price = Some(NFTPrice {
                amount: price,
                currency: nft.price.currency.clone(),
            });
            Ok(())
        } else {
            Err("NFT not found".to_string())
        }
    })
}

pub fn buy_nft(id: Nat, currency: Currency) -> Result<(), String> {
    update_demand_if_needed();
    let buyer = ic_cdk::caller();
    NFT_STORAGE.with(|storage| {
        let mut storage = storage.borrow_mut();
        if let Some(nft) = storage.get_mut(&id) {
            update_single_nft_price(nft);
            if !nft.for_sale {
                return Err("NFT is not for sale".to_string());
            }
            let sale_price = nft.sale_price.clone().ok_or("Sale price not set")?;

            if currency != sale_price.currency {
                return Err(format!(
                    "NFT is priced in {:?}, but you're trying to pay with {:?}",
                    sale_price.currency, currency
                ));
            }

            let buyer_balance = wallet::get_balance(buyer, currency.clone());
            if buyer_balance < sale_price.amount {
                return Err("Insufficient balance".to_string());
            }

            // Transfer funds
            wallet::update_balance_subtract(buyer, sale_price.amount.clone(), currency.clone())?;
            wallet::update_balance(
                nft.owner,
                sale_price.amount.clone() * Nat::from(95_u32) / Nat::from(100_u32),
                currency.clone(),
            )?; // 95% to seller
            wallet::update_balance(
                nft.creator,
                sale_price.amount * Nat::from(5_u32) / Nat::from(100_u32),
                currency,
            )?; // 5% royalty to creator

            // Update NFT ownership
            nft.owner = buyer;
            nft.for_sale = false;
            nft.sale_price = None;
            Ok(())
        } else {
            Err("NFT not found".to_string())
        }
    })
}

pub fn update_nft_prices() {
    NFT_STORAGE.with(|storage| {
        let mut storage = storage.borrow_mut();
        for nft in storage.values_mut() {
            let old_price = nft.price.clone();
            let new_price = calculate_nft_price(nft);

            if new_price.amount != old_price.amount {
                let reason = format!(
                    "Price updated for NFT ID {}. Old price: {} {:?}. New price: {} {:?}. Reason: {}.",
                    nft.id,
                    old_price.amount,
                    old_price.currency,
                    new_price.amount,
                    new_price.currency,
                    get_price_change_reason(nft, &old_price, &new_price)
                );
                ic_cdk::println!("{}", reason); // Log the reason for price change
                nft.price = new_price;
                nft.last_price_update = time();
            }
        }
    });
}

fn get_price_change_reason(nft: &NFT, old_price: &NFTPrice, new_price: &NFTPrice) -> String {
    let demand_multiplier = get_current_demand_multiplier();

    let base_price = PRICING_FACTORS.with(|factors| {
        let factors = factors.borrow();
        factors
            .base_prices
            .get(&nft.rarity)
            .unwrap_or(&Nat::from(1_000_000u64))
            .clone()
    });

    if old_price.amount < new_price.amount {
        format!(
            "Increased demand. Base price for rarity {:?} is {} {:?}. Current demand multiplier: {}.",
            nft.rarity, base_price, old_price.currency, demand_multiplier
        )
    } else if old_price.amount > new_price.amount {
        format!(
            "Decreased demand. Base price for rarity {:?} is {} {:?}. Current demand multiplier: {}.",
            nft.rarity, base_price, old_price.currency, demand_multiplier
        )
    } else {
        "No change in price detected.".to_string()
    }
}

pub fn start_price_update_timer() {
    set_timer_interval(Duration::from_secs(3600), || {
        update_demand_multiplier();
        update_nft_prices();
    });
}

pub fn place_bid(id: Nat, bid_amount: Nat, currency: Currency) -> Result<(), String> {
    let bidder = ic_cdk::caller();
    NFT_STORAGE.with(|storage| {
        let mut storage = storage.borrow_mut();
        if let Some(nft) = storage.get_mut(&id) {
            if !nft.for_sale || nft.auction_end_time.is_none() {
                return Err("NFT is not up for auction".to_string());
            }
            if currency != nft.price.currency {
                return Err(format!(
                    "NFT is priced in {:?}, but you're trying to bid with {:?}",
                    nft.price.currency, currency
                ));
            }
            let current_time = ic_cdk::api::time();
            let auction_end_time = nft.auction_end_time.unwrap();

            if current_time > auction_end_time {
                return Err("Auction has ended".to_string());
            }

            // Anti-sniping mechanism
            let extension_period = 300 * 1_000_000_000; // 5 minutes in nanoseconds
            if auction_end_time - current_time < extension_period {
                nft.auction_end_time = Some(auction_end_time + extension_period);
                nft.auction_extension_period = Some(extension_period);
            }

            if bid_amount
                <= nft
                    .highest_bid
                    .clone()
                    .map(|b| b.amount)
                    .unwrap_or(nft.sale_price.clone().unwrap().amount)
            {
                return Err("Bid too low".to_string());
            }

            let bidder_balance = wallet::get_balance(bidder, currency.clone());
            if bidder_balance < bid_amount {
                return Err("Insufficient balance".to_string());
            }

            // Return funds to previous highest bidder
            if let Some(prev_bidder) = nft.highest_bidder {
                let prev_bid = nft.highest_bid.clone().unwrap();
                wallet::update_balance(prev_bidder, prev_bid.amount, prev_bid.currency)?;
            }

            // Update bid
            wallet::update_balance_subtract(bidder, bid_amount.clone(), currency.clone())?;
            nft.highest_bidder = Some(bidder);
            nft.highest_bid = Some(NFTPrice {
                amount: bid_amount,
                currency,
            });
            Ok(())
        } else {
            Err("NFT not found".to_string())
        }
    })
}

pub fn start_auction(id: Nat, starting_price: Nat, duration: u64) -> Result<(), String> {
    update_demand_if_needed();
    NFT_STORAGE.with(|storage| {
        let mut storage = storage.borrow_mut();
        if let Some(nft) = storage.get_mut(&id) {
            update_single_nft_price(nft);
            if nft.owner != ic_cdk::caller() {
                return Err("Only the owner can start an auction".to_string());
            }
            nft.for_sale = true;
            nft.sale_price = Some(NFTPrice {
                amount: starting_price,
                currency: nft.price.currency.clone(),
            });
            nft.auction_end_time = Some(ic_cdk::api::time() + duration);
            nft.highest_bidder = None;
            nft.highest_bid = None;
            nft.auction_extension_period = Some(300 * 1_000_000_000); // 5 minutes in nanoseconds
            Ok(())
        } else {
            Err("NFT not found".to_string())
        }
    })
}

pub fn end_auction(id: Nat) -> Result<(), String> {
    update_demand_if_needed();
    NFT_STORAGE.with(|storage| {
        let mut storage = storage.borrow_mut();
        if let Some(nft) = storage.get_mut(&id) {
            update_single_nft_price(nft);
            if !nft.for_sale || nft.auction_end_time.is_none() {
                return Err("NFT is not up for auction".to_string());
            }
            if ic_cdk::api::time() < nft.auction_end_time.unwrap() {
                return Err("Auction has not ended yet".to_string());
            }

            if let Some(winner) = nft.highest_bidder {
                let final_price = nft.highest_bid.clone().unwrap();

                // Transfer funds
                wallet::update_balance(
                    nft.owner,
                    final_price.amount.clone() * Nat::from(95_u32) / Nat::from(100_u32),
                    final_price.currency.clone(),
                )?; // 95% to seller
                wallet::update_balance(
                    nft.creator,
                    final_price.amount * Nat::from(5_u32) / Nat::from(100_u32),
                    final_price.currency,
                )?; // 5% royalty to creator

                // Update NFT ownership
                nft.owner = winner;
            }

            nft.for_sale = false;
            nft.sale_price = None;
            nft.auction_end_time = None;
            nft.highest_bidder = None;
            nft.highest_bid = None;
            Ok(())
        } else {
            Err("NFT not found".to_string())
        }
    })
}

pub fn get_nfts_by_owner(owner: Principal) -> Vec<NFT> {
    update_demand_if_needed();
    NFT_STORAGE.with(|storage| {
        let mut storage = storage.borrow_mut();
        storage
            .values_mut()
            .filter(|nft| nft.owner == owner)
            .map(|nft| {
                update_single_nft_price(nft);
                nft.clone()
            })
            .collect()
    })
}

pub fn get_active_auctions() -> Vec<NFT> {
    update_demand_if_needed();
    NFT_STORAGE.with(|storage| {
        let mut storage = storage.borrow_mut();
        storage
            .values_mut()
            .filter(|nft| {
                nft.for_sale
                    && nft.auction_end_time.is_some()
                    && nft.auction_end_time.unwrap() > ic_cdk::api::time()
            })
            .map(|nft| {
                update_single_nft_price(nft);
                nft.clone()
            })
            .collect()
    })
}

pub fn get_nfts_for_sale() -> Vec<NFT> {
    update_demand_if_needed();
    NFT_STORAGE.with(|storage| {
        let mut storage = storage.borrow_mut();
        storage
            .values_mut()
            .filter(|nft| nft.for_sale && nft.auction_end_time.is_none())
            .map(|nft| {
                update_single_nft_price(nft);
                nft.clone()
            })
            .collect()
    })
}

pub fn get_nfts_by_rarity(rarity: Rarity) -> Vec<NFT> {
    update_demand_if_needed();
    NFT_STORAGE.with(|storage| {
        let mut storage = storage.borrow_mut();
        storage
            .values_mut()
            .filter(|nft| nft.rarity == rarity)
            .map(|nft| {
                update_single_nft_price(nft);
                nft.clone()
            })
            .collect()
    })
}

pub fn search_nfts(query: String) -> Vec<NFT> {
    update_demand_if_needed();
    NFT_STORAGE.with(|storage| {
        let mut storage = storage.borrow_mut();
        storage
            .values_mut()
            .filter(|nft| nft.name.to_lowercase().contains(&query.to_lowercase()))
            .map(|nft| {
                update_single_nft_price(nft);
                nft.clone()
            })
            .collect()
    })
}
pub fn get_total_nfts() -> Nat {
    NFT_STORAGE.with(|storage| Nat::from(storage.borrow().len() as u32))
}

pub fn update_rarity_thresholds(new_thresholds: RarityThresholds) -> Result<(), String> {
    if new_thresholds.common >= new_thresholds.uncommon
        || new_thresholds.uncommon >= new_thresholds.rare
        || new_thresholds.rare >= new_thresholds.epic
        || new_thresholds.epic >= 255
    {
        return Err("Invalid thresholds. They must be in ascending order and < 255.".to_string());
    }

    RARITY_THRESHOLDS.with(|thresholds| {
        *thresholds.borrow_mut() = new_thresholds;
    });

    Ok(())
}
