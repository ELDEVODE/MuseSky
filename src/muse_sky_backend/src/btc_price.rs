use candid::{CandidType, Deserialize};
use ic_cdk::api;
use ic_cdk::api::management_canister::http_request::{
    http_request, CanisterHttpRequestArgument, HttpHeader, HttpMethod, HttpResponse, TransformArgs,
    TransformContext, TransformFunc,
};
use serde_json::Value;

#[derive(CandidType, Deserialize, Clone)]
pub struct BTCPrice {
    pub usd: f64,
    pub timestamp: u64,
}

#[derive(Deserialize)]
struct PairPrice {
    lprice: String,
    curr1: String,
    curr2: String,
}

#[ic_cdk::update]
pub async fn get_btc_price() -> BTCPrice {
    let host = "cex.io";
    let url = format!("https://{}/api/last_price/BTC/USD", host);

    let request_headers = vec![
        HttpHeader {
            name: "Host".to_string(),
            value: format!("{host}:443"),
        },
        HttpHeader {
            name: "User-Agent".to_string(),
            value: "btc_price_canister".to_string(),
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
            let json_data: PairPrice = serde_json::from_str(&body).expect("Invalid JSON");

            BTCPrice {
                usd: json_data.lprice.parse().expect("Invalid price format"),
                timestamp: api::time(),
            }
        }
        Err((r, m)) => {
            ic_cdk::api::print(format!(
                "HTTP request failed: RejectionCode: {r:?}, Error: {m}"
            ));
            BTCPrice {
                usd: 0.0,
                timestamp: api::time(),
            }
        }
    }
}
