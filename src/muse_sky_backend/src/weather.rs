use candid::{CandidType, Deserialize, Nat};
use ic_cdk::api;
use ic_cdk::api::management_canister::http_request::{
    http_request, CanisterHttpRequestArgument, HttpHeader, HttpMethod, HttpResponse, TransformArgs,
    TransformContext, TransformFunc,
};

#[derive(CandidType, Deserialize, Clone, Default, Debug, PartialEq, Eq, Hash)]
pub enum Condition {
    #[default]
    Sunny,
    Raining,
    Cloudy,
    Windy,
    Snowing,
}

#[derive(CandidType, Deserialize, Clone)]
pub struct WeatherData {
    pub location: String,
    pub temperature: f64,
    pub condition: Condition,
    pub timestamp: Nat,
}

#[ic_cdk::update]
pub async fn get_weather(location: String) -> WeatherData {
    let api_key = "f6db12fb6cb7445e8eb01223243108"; // Replace with your WeatherAPI key
    let host = "api.weatherapi.com";
    let url = format!(
        "https://{}/v1/current.json?key={}&q={}",
        host, api_key, location
    );

    let request_headers = vec![
        HttpHeader {
            name: "Host".to_string(),
            value: format!("{host}:443"),
        },
        HttpHeader {
            name: "User-Agent".to_string(),
            value: "weather_canister".to_string(),
        },
    ];

    let request = CanisterHttpRequestArgument {
        url: url.clone(),
        method: HttpMethod::GET,
        body: None,
        max_response_bytes: None,
        transform: Some(TransformContext {
            function: TransformFunc(candid::Func {
                principal: api::id(),
                method: "transform".to_string(),
            }),
            context: vec![],
        }),
        headers: request_headers,
    };

    let cycles = 230_949_972_000;
    match http_request(request, cycles).await {
        Ok((response,)) => {
            let body = String::from_utf8(response.body).expect("Response is not UTF-8 encoded.");
            let json_data: serde_json::Value = serde_json::from_str(&body).expect("Invalid JSON");

            let condition_code = json_data["current"]["condition"]["code"]
                .as_u64()
                .unwrap_or(1000) as u16; // Default to Sunny if code is missing

            let temperature = json_data["current"]["temp_c"].as_f64().unwrap_or(0.0); // Default to 0.0 if temp is missing

            let mapped_condition = Condition::from_code(condition_code);

            WeatherData {
                location,
                temperature,
                condition: mapped_condition,
                timestamp: api::time().into(),
            }
        }
        Err((r, m)) => {
            ic_cdk::api::print(format!(
                "HTTP request failed: RejectionCode: {r:?}, Error: {m}"
            ));
            WeatherData {
                location,
                temperature: 0.0,
                condition: Condition::Sunny,
                timestamp: api::time().into(),
            }
        }
    }
}

#[ic_cdk::query]
fn transform(raw: TransformArgs) -> HttpResponse {
    HttpResponse {
        status: raw.response.status.clone(),
        body: raw.response.body.clone(),
        headers: vec![],
    }
}

impl Condition {
    pub fn from_code(code: u16) -> Self {
        match code {
            1000 => Condition::Sunny,
            1003 | 1006 | 1009 => Condition::Cloudy,
            1063 | 1072 | 1150 | 1153 | 1168 | 1180 | 1183 | 1186 | 1189 | 1192 | 1195 | 1198
            | 1201 | 1240 | 1243 | 1246 | 1273 | 1276 => Condition::Raining,
            1066 | 1069 | 1087 | 1114 | 1117 | 1147 | 1171 | 1204 | 1207 | 1210 | 1213 | 1216
            | 1219 | 1222 | 1225 | 1237 | 1255 | 1258 | 1261 | 1264 | 1279 | 1282 => {
                Condition::Snowing
            }
            1030 | 1135 | 143 | 248 | 260 | 143 | 227 | 230 => Condition::Windy,
            _ => Condition::Cloudy,
        }
    }
}

#[ic_cdk::update]
pub async fn get_raw_weather_data(location: String) -> Result<String, String> {
    let api_key = "f6db12fb6cb7445e8eb01223243108"; // Replace with your WeatherAPI key
    let host = "api.weatherapi.com";
    let url = format!(
        "https://{}/v1/current.json?key={}&q={}",
        host, api_key, location
    );

    let request_headers = vec![
        HttpHeader {
            name: "Host".to_string(),
            value: format!("{host}:443"),
        },
        HttpHeader {
            name: "User-Agent".to_string(),
            value: "weather_canister".to_string(),
        },
    ];

    let request = CanisterHttpRequestArgument {
        url: url.clone(),
        method: HttpMethod::GET,
        body: None,
        max_response_bytes: None,
        transform: Some(TransformContext {
            function: TransformFunc(candid::Func {
                principal: api::id(),
                method: "transform".to_string(),
            }),
            context: vec![],
        }),
        headers: request_headers,
    };

    let cycles = 230_949_972_000; // You may need to adjust this based on your needs
    match http_request(request, cycles).await {
        Ok((response,)) => {
            let body = String::from_utf8(response.body)
                .map_err(|err| format!("Response is not UTF-8 encoded: {}", err))?;
            Ok(body) // Return the raw JSON as a string
        }
        Err((r, m)) => {
            ic_cdk::api::print(format!(
                "HTTP request failed: RejectionCode: {r:?}, Error: {m}"
            ));
            Err(format!(
                "HTTP request failed: RejectionCode: {r:?}, Error: {m}"
            ))
        }
    }
}
