export default function handler(req, res) {
  const data = {
    "spot_prices": [
      {
        "contract_decimals": 18,
        "contract_name": "StakeWise",
        "contract_ticker_symbol": "SWISE",
        "contract_address": "0x48c3399719b582dd63eb5aadf12a40b4c3f52fa2",
        "supports_erc": null,
        "logo_url":
          "https://logos.covalenthq.com/tokens/0x48c3399719b582dd63eb5aadf12a40b4c3f52fa2.png",
        "quote_rate": 0.12611899,
        "rank": 1440,
      },
    ],
  };

  res.status(200).json({ ...data });
}
