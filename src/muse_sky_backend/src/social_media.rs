use candid::{CandidType, Deserialize};

#[derive(CandidType, Deserialize, Clone, Default)]
pub struct SocialMediaLinks {
    pub website: Option<String>,
    pub x: Option<String>,
    pub instagram: Option<String>,
    pub discord: Option<String>,
    pub telegram: Option<String>,
}

impl SocialMediaLinks {
    pub fn new(
        website: Option<String>,
        x: Option<String>,
        instagram: Option<String>,
        discord: Option<String>,
        telegram: Option<String>,
    ) -> Self {
        SocialMediaLinks {
            website,
            x,
            instagram,
            discord,
            telegram,
        }
    }
}
