from http.server import BaseHTTPRequestHandler
from urllib.parse import urlparse
from urllib.parse import parse_qs
import requests
import json

class handler(BaseHTTPRequestHandler):

  def do_GET(self):
    self.send_response(200)
    self.send_header("Content-type", "application/json")
    self.end_headers()
    query = urlparse(self.path).query
    chainId = parse_qs(query)["chainId"][0]
    contractId = parse_qs(query)["contractId"][0]

    response = requests.get(f"https://api.covalenthq.com/v1/{chainId}/address/{contractId}/transactions_v2/?page-size=250&key=ckey_ec93e26420d24cab8b09ef796f4%27")
    transactions_v2 = response.json()["data"]["items"]

    transactions = []
    for transaction in transactions_v2:
      date = transaction["block_signed_at"].split("T")[0].replace("2021-", "").replace("-", "/")

      if not any(d["date"] == date for d in transactions):
        transactions.insert(0, {"date": date, "transactions": 1})
      else:
        ex_transaction_date = next(d for d in transactions if d["date"] == date)
        ex_transaction_date["transactions"] += 1
    
    self.wfile.write(json.dumps({"transactions": transactions}).encode())
    return