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
    ticker = parse_qs(query)["ticker"][0]
    print(ticker)

    response = requests.get(f"https://api.covalenthq.com/v1/pricing/tickers/?tickers={ticker}&key=ckey_ec93e26420d24cab8b09ef796f4%27")
    spot_prices = response.json()["data"]["items"]
    
    self.wfile.write(json.dumps({"spot_prices": spot_prices}).encode())
    return