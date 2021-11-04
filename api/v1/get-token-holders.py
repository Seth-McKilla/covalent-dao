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

    token_holders = requests.get(f"https://api.covalenthq.com/v1/{chainId}/tokens/{contractId}/token_holders/?page-size=100000&key=ckey_ec93e26420d24cab8b09ef796f4%27")
    total_count = token_holders.json()["data"]["pagination"]["total_count"]
    top_token_holders = token_holders.json()['data']['items'][0:5]
    
    self.wfile.write(json.dumps({"total_count": total_count, "token_holders": top_token_holders}).encode())
    return