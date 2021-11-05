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
    dayRange = parse_qs(query)["dayRange"][0]

    response = requests.get(f"https://api.covalenthq.com/v1/{chainId}/address/{contractId}/portfolio_v2/?days={dayRange}&key=ckey_ec93e26420d24cab8b09ef796f4%27")
    transactions = response.json()["data"]["items"]
    
    self.wfile.write(json.dumps({"spot_prices": transactions}).encode())
    return