use candid::{CandidType, Deserialize};
use candid::{Nat, Principal};
use std::cell::RefCell;
use std::collections::HashMap;

#[derive(CandidType, Deserialize, Clone, Debug, Eq, Hash, PartialEq)]
pub enum Currency {
    BTC,
    ETH,
    SOL,
    ICP,
}

#[derive(CandidType, Deserialize, Clone, Debug)]
pub struct Balance {
    pub amount: Nat,
    pub currency: Currency,
}

#[derive(CandidType, Deserialize, Clone, Debug, PartialEq)]
pub struct Wallet {
    pub owner: Principal,
    pub balances: HashMap<Currency, Nat>,
}

thread_local! {
    static WALLETS: RefCell<HashMap<Principal, Wallet>> = RefCell::new(HashMap::new());
}

pub fn init() {
    WALLETS.with(|wallets| wallets.borrow_mut().clear())
}

pub fn create_wallet(owner: Principal) -> Wallet {
    let mut balances = HashMap::new();
    balances.insert(Currency::BTC, Nat::from(100000_u32)); // 0.001 BTC
    balances.insert(Currency::ETH, Nat::from(1000000000000000000_u64)); // 1 ETH
    balances.insert(Currency::SOL, Nat::from(1000000000_u32)); // 1 SOL
    balances.insert(Currency::ICP, Nat::from(100000000_u32)); // 1 ICP

    let wallet = Wallet { owner, balances };
    WALLETS.with(|wallets| {
        wallets.borrow_mut().insert(owner, wallet.clone());
    });
    wallet
}

pub fn get_balance(owner: Principal, currency: Currency) -> Nat {
    WALLETS.with(|wallets| {
        wallets
            .borrow()
            .get(&owner)
            .and_then(|w| w.balances.get(&currency).cloned())
            .unwrap_or(Nat::from(0_u32))
    })
}

pub fn update_balance(owner: Principal, amount: Nat, currency: Currency) -> Result<Nat, String> {
    WALLETS.with(|wallets| {
        let mut wallets = wallets.borrow_mut();
        if let Some(wallet) = wallets.get_mut(&owner) {
            let balance = wallet.balances.entry(currency).or_insert(Nat::from(0_u32));
            *balance += amount;
            Ok(balance.clone())
        } else {
            Err("Wallet not found".to_string())
        }
    })
}

pub fn update_balance_subtract(
    owner: Principal,
    amount: Nat,
    currency: Currency,
) -> Result<Nat, String> {
    WALLETS.with(|wallets| {
        let mut wallets = wallets.borrow_mut();
        if let Some(wallet) = wallets.get_mut(&owner) {
            let balance = wallet.balances.entry(currency).or_insert(Nat::from(0_u32));
            if *balance < amount {
                Err("Insufficient balance".to_string())
            } else {
                *balance -= amount;
                Ok(balance.clone())
            }
        } else {
            Err("Wallet not found".to_string())
        }
    })
}

pub fn principal_exists(principal: Principal) -> bool {
    WALLETS.with(|wallets| wallets.borrow().contains_key(&principal))
}

pub fn get_wallet(owner: Principal) -> Wallet {
    WALLETS.with(|wallets| {
        wallets
            .borrow()
            .get(&owner)
            .cloned()
            .unwrap_or_else(|| create_wallet(owner))
    })
}

pub fn transfer(
    from: Principal,
    to: Principal,
    amount: Nat,
    currency: Currency,
) -> Result<(), String> {
    if from == to {
        return Err("Cannot transfer to self".to_string());
    }

    update_balance_subtract(from, amount.clone(), currency.clone())?;
    update_balance(to, amount, currency)?;

    Ok(())
}

// Helper functions for currency conversions (simplified for example purposes)
pub fn to_smallest_unit(amount: Nat, currency: Currency) -> Nat {
    match currency {
        Currency::BTC => amount * Nat::from(100000000_u64), // Satoshis
        Currency::ETH => amount * Nat::from(1000000000000000000_u64), // Wei
        Currency::SOL => amount * Nat::from(1000000000_u64), // Lamports
        Currency::ICP => amount * Nat::from(100000000_u64), // E8s
    }
}

pub fn from_smallest_unit(amount: Nat, currency: Currency) -> Nat {
    match currency {
        Currency::BTC => amount / Nat::from(100000000_u64),
        Currency::ETH => amount / Nat::from(1000000000000000000_u64),
        Currency::SOL => amount / Nat::from(1000000000_u64),
        Currency::ICP => amount / Nat::from(100000000_u64),
    }
}

pub fn get_all_balances(owner: Principal) -> HashMap<Currency, Nat> {
    WALLETS.with(|wallets| {
        wallets
            .borrow()
            .get(&owner)
            .map(|w| w.balances.clone())
            .unwrap_or_else(HashMap::new)
    })
}

pub fn get_total_supply(currency: Currency) -> Nat {
    WALLETS.with(|wallets| {
        wallets
            .borrow()
            .values()
            .fold(Nat::from(0_u32), |acc, wallet| {
                acc + wallet
                    .balances
                    .get(&currency)
                    .cloned()
                    .unwrap_or(Nat::from(0_u32))
            })
    })
}

pub fn get_all_wallets() -> Vec<Wallet> {
    WALLETS.with(|wallets| wallets.borrow().values().cloned().collect())
}
