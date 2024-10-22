use candid::{CandidType, Deserialize, Nat, Principal};
use collection::Collection;
use ic_cdk::api::management_canister::http_request::{HttpResponse, TransformArgs};
use ic_cdk_macros::*;
use wallet::Currency;

mod btc_price;
mod collection;
mod nft;
mod social_media;
mod wallet;
mod weather;

use btc_price::BTCPrice;
use weather::WeatherData;

#[init]
fn init() {
    nft::init();
    collection::init();
    wallet::init();
    nft::start_weather_update_timer();
    nft::init_pricing_factors();
}

#[update]
async fn mint_nft(
    collection_id: Nat,
    name: String,
    price: Nat,
    currency: Currency,
    sunny_image: Vec<u8>,
    raining_image: Vec<u8>,
    windy_image: Vec<u8>,
    cloudy_image: Vec<u8>,
    location: String,
) -> Result<Nat, String> {
    nft::mint_nft(
        collection_id,
        name,
        price,
        currency,
        location,
        sunny_image,
        raining_image,
        cloudy_image,
        windy_image,
    )
    .await
}

#[query]
async fn get_nft(id: Nat) -> Option<nft::NFT> {
    nft::get_nft(id).await
}

#[query]
fn get_nfts_in_collection(collection_id: Nat) -> Vec<nft::NFT> {
    nft::get_nfts_in_collection(collection_id)
}

#[update]
fn create_collection(
    name: String,
    image: Vec<u8>,
    description: String,
    website: Option<String>,
    x: Option<String>,
    instagram: Option<String>,
    discord: Option<String>,
    telegram: Option<String>,
    creator_name: String,
    tags: Vec<String>,
) -> Nat {
    collection::create_collection(
        name,
        image,
        description,
        website,
        x,
        instagram,
        discord,
        telegram,
        creator_name,
        tags,
    )
}

#[query]
fn get_all_collections() -> Vec<collection::Collection> {
    collection::get_all_collections()
}

#[update]
fn update_balance(owner: Principal, amount: Nat, currency: Currency) -> Result<Nat, String> {
    wallet::update_balance(owner, amount, currency)
}

#[query]
async fn get_weather_data(location: String) -> weather::WeatherData {
    weather::get_weather(location).await
}

#[query]
async fn get_raw_data(location: String) -> Result<String, String> {
    weather::get_raw_weather_data(location).await
}

#[query]
async fn get_btc_price_f() -> btc_price::BTCPrice {
    btc_price::get_btc_price().await
}

#[query]
fn get_user_profile(user: Principal) -> UserProfile {
    let is_new_user = !wallet::principal_exists(user);
    let collections = collection::get_collections_by_owner(user);
    let nfts = nft::get_nfts_by_owner(user);
    let wallet = wallet::get_wallet(user);

    UserProfile {
        principal: user,
        is_new_user,
        collections,
        nfts,
        wallet,
    }
}

#[derive(CandidType, Deserialize)]
struct UserProfile {
    principal: Principal,
    is_new_user: bool,
    collections: Vec<collection::Collection>,
    nfts: Vec<nft::NFT>,
    wallet: wallet::Wallet,
}

#[query]
fn get_dashboard_data() -> DashboardData {
    let total_collections = collection::get_total_collections();
    let total_nfts = nft::get_total_nfts();
    let active_auctions = nft::get_active_auctions();
    let nfts_for_sale = nft::get_nfts_for_sale();

    DashboardData {
        total_collections,
        total_nfts,
        active_auctions,
        nfts_for_sale,
    }
}

#[derive(CandidType, Deserialize)]
struct DashboardData {
    total_collections: Nat,
    total_nfts: Nat,
    active_auctions: Vec<nft::NFT>,
    nfts_for_sale: Vec<nft::NFT>,
}

// #[update]
// fn update_rarity_thresholds(new_thresholds: nft::RarityThresholds) -> Result<(), String> {
//     nft::update_rarity_thresholds(new_thresholds)
// }

#[update]
fn list_nft_for_sale(id: Nat, price: Nat) -> Result<(), String> {
    nft::list_for_sale(id, price)
}

#[update]
fn buy_nft(id: Nat, currency: Currency) -> Result<(), String> {
    nft::buy_nft(id, currency)
}

#[update]
fn start_auction(id: Nat, starting_price: Nat, duration: u64) -> Result<(), String> {
    nft::start_auction(id, starting_price, duration)
}

#[update]
fn place_bid(id: Nat, bid_amount: Nat, currency: Currency) -> Result<(), String> {
    nft::place_bid(id, bid_amount, currency)
}
#[update]
fn end_auction(id: Nat) -> Result<(), String> {
    nft::end_auction(id)
}

#[query]
fn get_collections_by_owner(owner: Principal) -> Vec<collection::Collection> {
    collection::get_collections_by_owner(owner)
}

#[query]
fn get_nfts_by_owner(owner: Principal) -> Vec<nft::NFT> {
    nft::get_nfts_by_owner(owner)
}

#[query]
fn get_active_auctions() -> Vec<nft::NFT> {
    nft::get_active_auctions()
}

#[query]
fn get_nfts_for_sale() -> Vec<nft::NFT> {
    nft::get_nfts_for_sale()
}

#[query]
fn get_wallet_balance(owner: Principal, currency: Currency) -> Nat {
    wallet::get_balance(owner, currency)
}

#[update]
fn transfer(to: Principal, amount: Nat, currency: Currency) -> Result<(), String> {
    let from = ic_cdk::api::caller();
    wallet::transfer(from, to, amount, currency)
}

#[query]
fn get_collection_details(id: Nat) -> Option<Collection> {
    collection::get_collection_details(id)
}

ic_cdk::export_candid!();
