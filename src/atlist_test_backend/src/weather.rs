use candid::{CandidType, Deserialize, Nat};
use ic_cdk::api;

#[derive(CandidType, Deserialize, Clone, Default, Debug, PartialEq, Eq, Hash)]
pub enum Condition {
    #[default]
    Sunny,
    Raining,
    Cloudy,
    Windy,
}

#[derive(CandidType, Deserialize, Clone)]
pub struct WeatherData {
    pub location: String,
    pub temperature: f64,
    pub condition: Condition,
    pub timestamp: Nat,
}

pub fn get_weather(location: String) -> WeatherData {
    // Implement HTTP outcall or mock data here
    WeatherData {
        location,
        temperature: 25.5,
        condition: Condition::Sunny, // Replace with real data
        timestamp: api::time().into(),
    }
}
