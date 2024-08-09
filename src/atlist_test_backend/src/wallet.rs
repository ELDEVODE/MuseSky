use candid::{CandidType, Deserialize};
use candid::{Nat, Principal};
use std::cell::RefCell;
use std::collections::HashMap;

#[derive(CandidType, Deserialize, Clone)]
pub struct Wallet {
    pub owner: Principal,
    pub balance: Nat, // Balance in satoshis
}

thread_local! {
    static WALLETS: RefCell<HashMap<Principal, Wallet>> = RefCell::new(HashMap::new());
}

pub fn init() {
    WALLETS.with(|wallets| wallets.borrow_mut().clear())
}

pub fn create_wallet(owner: Principal) -> Wallet {
    let wallet = Wallet {
        owner,
        balance: Nat::from(100000_u32), // Starting balance of 0.001 BTC (100,000 satoshis)
    };
    WALLETS.with(|wallets| {
        wallets.borrow_mut().insert(owner, wallet.clone());
    });
    wallet
}

pub fn get_balance(owner: Principal) -> Nat {
    WALLETS.with(|wallets| {
        wallets
            .borrow()
            .get(&owner)
            .map(|w| w.balance.clone())
            .unwrap_or(Nat::from(0_u32))
    })
}

pub fn update_balance(owner: Principal, amount: Nat) -> Result<Nat, String> {
    WALLETS.with(|wallets| {
        let mut wallets = wallets.borrow_mut();
        if let Some(wallet) = wallets.get_mut(&owner) {
            wallet.balance += amount;
            Ok(wallet.balance.clone())
        } else {
            Err("Wallet not found".to_string())
        }
    })
}

pub fn update_balance_subtract(owner: Principal, amount: Nat) -> Result<Nat, String> {
    WALLETS.with(|wallets| {
        let mut wallets = wallets.borrow_mut();
        if let Some(wallet) = wallets.get_mut(&owner) {
            if wallet.balance < amount {
                Err("Insufficient balance".to_string())
            } else {
                wallet.balance -= amount;
                Ok(wallet.balance.clone())
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

pub fn transfer(from: Principal, to: Principal, amount: Nat) -> Result<(), String> {
    if from == to {
        return Err("Cannot transfer to self".to_string());
    }

    update_balance_subtract(from, amount.clone())?;
    update_balance(to, amount)?;

    Ok(())
}

// Helper function to convert satoshis to BTC for display purposes
pub fn satoshi_to_btc(satoshis: &Nat) -> Nat {
    (satoshis.0.clone() / 100_000_000_u64).into()
}

// Helper function to convert BTC to satoshis for internal calculations
pub fn btc_to_satoshi(btc: Nat) -> Nat {
    (btc * 100_000_000_u64).into()
}

// pub fn get_total_supply() -> Nat {
//     WALLETS.with(|wallets| {
//         wallets
//             .borrow()
//             .values()
//             .fold(Nat::from(0_u32), |acc, wallet| acc + wallet.balance.clone())
//     })
// }

// pub fn get_all_wallets() -> Vec<Wallet> {
//     WALLETS.with(|wallets| wallets.borrow().values().cloned().collect())
// }
