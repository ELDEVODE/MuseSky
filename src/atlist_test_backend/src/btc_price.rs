use candid::{CandidType, Deserialize};

#[derive(CandidType, Deserialize, Clone)]
pub struct BTCPrice {
    pub usd: f64,
    pub timestamp: u64,
}

pub fn get_btc_price() -> BTCPrice {
    // make the http outcall

    BTCPrice {
        usd: 50000.0,
        timestamp: ic_cdk::api::time(),
    }
}
