use candid::{CandidType, Deserialize, Nat};
use ic_cdk_macros::*;
use sha2::{Digest, Sha256};
use std::cell::RefCell;
use std::collections::HashMap;

#[derive(Clone, Debug, CandidType, Deserialize)]
struct Post {
    id: String,
    title: String,
    content: String,
    author: String,
    date: Nat,
    excerpt: String,
    image_link: String,
}

type PostStore = HashMap<String, Post>;

const ADMIN_USERNAME: &str = "admin";
const ADMIN_PASSWORD: &str = "secure_password_123";

thread_local! {
    static POSTS: RefCell<PostStore> = RefCell::new(HashMap::new());
}

#[update]
fn list_posts() -> Vec<Post> {
    POSTS.with(|posts| {
        posts
            .borrow()
            .values()
            .cloned()
            .map(|mut post| {
                post.content = String::new(); // Clear the content
                post
            })
            .collect()
    })
}

fn is_admin(username: &str, password: &str) -> bool {
    username == ADMIN_USERNAME && password == ADMIN_PASSWORD
}

fn generate_id() -> String {
    let now = ic_cdk::api::time();
    let rand = ic_cdk::api::call::arg_data_raw();

    let mut hasher = Sha256::new();
    hasher.update(now.to_be_bytes());
    hasher.update(&rand);

    let result = hasher.finalize();
    hex::encode(&result[..16])
}

#[update]
fn create_post(
    username: String,
    password: String,
    title: String,
    content: String,
    author: String,
    image_link: String,
) -> Result<String, String> {
    if !is_admin(&username, &password) {
        return Err("Invalid credentials".to_string());
    }

    // Validate image_link is not empty
    if image_link.trim().is_empty() {
        return Err("Image link cannot be empty".to_string());
    }

    let id = generate_id();
    let post = Post {
        id: id.clone(),
        title,
        content: content.clone(),
        author,
        date: ic_cdk::api::time().into(),
        excerpt: content.chars().take(100).collect(),
        image_link,
    };

    POSTS.with(|posts| posts.borrow_mut().insert(id.clone(), post));

    Ok(id)
}

#[query]
fn get_post(id: String) -> Option<Post> {
    POSTS.with(|posts| posts.borrow().get(&id).cloned())
}

#[update]
fn update_post(
    username: String,
    password: String,
    id: String,
    title: String,
    content: String,
    author: String,
    image_link: String,
) -> Result<(), String> {
    if !is_admin(&username, &password) {
        return Err("Invalid credentials".to_string());
    }

    // Validate image_link is not empty
    if image_link.trim().is_empty() {
        return Err("Image link cannot be empty".to_string());
    }

    POSTS.with(|posts| {
        if let Some(post) = posts.borrow_mut().get_mut(&id) {
            post.title = title;
            post.content = content;
            post.author = author;
            post.image_link = image_link;
            Ok(())
        } else {
            Err("Post not found".to_string())
        }
    })
}

#[update]
fn delete_post(username: String, password: String, id: String) -> Result<(), String> {
    if !is_admin(&username, &password) {
        return Err("Invalid credentials".to_string());
    }

    POSTS.with(|posts| {
        if posts.borrow_mut().remove(&id).is_some() {
            Ok(())
        } else {
            Err("Post not found".to_string())
        }
    })
}

ic_cdk::export_candid!();
