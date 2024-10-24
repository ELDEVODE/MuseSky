use crate::social_media::SocialMediaLinks;
use crate::wallet::Currency; // Import the Currency enum from wallet.rs
use candid::{CandidType, Deserialize, Nat, Principal};
use std::cell::RefCell;
use std::collections::HashMap;

#[derive(CandidType, Deserialize, Clone)]
pub struct Collection {
    pub id: Nat,
    pub name: String,
    pub image: Vec<u8>,
    pub description: String,
    pub social_media_links: Option<SocialMediaLinks>,
    pub supply: Nat,
    pub owner: Principal,
    pub creator_name: String,
    pub tags: Vec<String>,
    pub date_of_mint: Nat, // Use u64 for timestamp
}

thread_local! {
    static COLLECTION_STORAGE: RefCell<HashMap<Nat, Collection>> = RefCell::new(HashMap::new());
    static NEXT_ID: RefCell<Nat> = RefCell::new(Nat::from(1_u32))
}

pub fn init() {
    COLLECTION_STORAGE.with(|storage| storage.borrow_mut().clear());
    NEXT_ID.with(|id| *id.borrow_mut() = Nat::from(1_u32))
}

pub fn create_collection(
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
    let id = NEXT_ID.with(|id| {
        let current_id = id.borrow().clone();
        *id.borrow_mut() += Nat::from(1_u32);
        current_id
    });

    let social_media_links = if website.is_some()
        || x.is_some()
        || instagram.is_some()
        || discord.is_some()
        || telegram.is_some()
    {
        Some(SocialMediaLinks::new(
            website, x, instagram, discord, telegram,
        ))
    } else {
        None
    };

    let date_of_mint = ic_cdk::api::time().into();

    let collection = Collection {
        id: id.clone(),
        name,
        image,
        description,
        social_media_links,
        supply: Nat::from(0_u32),
        owner: ic_cdk::caller(),
        creator_name,
        tags,
        date_of_mint,
    };

    COLLECTION_STORAGE.with(|storage| storage.borrow_mut().insert(id.clone(), collection));

    id
}

pub fn get_all_collections() -> Vec<Collection> {
    COLLECTION_STORAGE.with(|storage| storage.borrow().values().cloned().collect())
}

pub fn get_collections_by_owner(owner: Principal) -> Vec<Collection> {
    COLLECTION_STORAGE.with(|storage| {
        storage
            .borrow()
            .values()
            .filter(|collection| collection.owner == owner)
            .cloned()
            .collect()
    })
}

pub fn get_collection_details(id: Nat) -> Option<Collection> {
    COLLECTION_STORAGE.with(|storage| storage.borrow().get(&id).cloned())
}

pub fn get_total_collections() -> Nat {
    COLLECTION_STORAGE.with(|storage| Nat::from(storage.borrow().len() as u32))
}
