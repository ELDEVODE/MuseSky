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
}

type PostStore = HashMap<String, Post>;

const ADMIN_USERNAME: &str = "admin";
const ADMIN_PASSWORD: &str = "secure_password_123";

thread_local! {
    static POSTS: RefCell<PostStore> = RefCell::new(HashMap::new());
}

// Convert list_posts to an update call instead of query
// Update calls have a larger size limit (5MB vs 2MB for query calls)
#[update]
fn list_posts() -> Vec<Post> {
    POSTS.with(|posts| posts.borrow().values().cloned().collect())
}

#[derive(Clone, Debug, CandidType, Deserialize)]
struct PostChunk {
    posts: Vec<Post>,
    chunk_index: u32,
    total_chunks: u32,
}

// Alternative method to get posts in chunks if needed
#[query]
fn get_posts_chunk(chunk_index: u32, chunk_size: u32) -> PostChunk {
    POSTS.with(|posts| {
        let all_posts: Vec<Post> = posts.borrow().values().cloned().collect();
        let total_posts = all_posts.len() as u32;
        let total_chunks = (total_posts + chunk_size - 1) / chunk_size;

        let start = (chunk_index * chunk_size) as usize;
        let end = std::cmp::min((chunk_index + 1) * chunk_size, total_posts) as usize;

        PostChunk {
            posts: all_posts[start..end].to_vec(),
            chunk_index,
            total_chunks,
        }
    })
}

// Rest of the code remains the same
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
) -> Result<String, String> {
    if !is_admin(&username, &password) {
        return Err("Invalid credentials".to_string());
    }

    let id = generate_id();
    let post = Post {
        id: id.clone(),
        title,
        content: content.clone(),
        author,
        date: ic_cdk::api::time().into(),
        excerpt: content.chars().take(100).collect(),
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
) -> Result<(), String> {
    if !is_admin(&username, &password) {
        return Err("Invalid credentials".to_string());
    }

    POSTS.with(|posts| {
        if let Some(post) = posts.borrow_mut().get_mut(&id) {
            post.title = title;
            post.content = content;
            post.author = author;
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
