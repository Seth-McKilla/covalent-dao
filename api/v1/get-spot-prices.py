import os
from dotenv import load_dotenv
from http.server import BaseHTTPRequestHandler
from urllib.parse import urlparse
from urllib.parse import parse_qs
import requests
import json

# Environment variables
load_dotenv()
COVALENT_API_KEY = os.getenv("COVALENT_API_KEY")

class handler(BaseHTTPRequestHandler):

  def do_GET(self):
    self.send_response(200)
    self.send_header("Content-type", "application/json")
    self.end_headers()
    query = urlparse(self.path).query
    ticker = parse_qs(query)["ticker"][0]

    response = requests.get(f"https://api.covalenthq.com/v1/pricing/tickers/?tickers={ticker}&key={COVALENT_API_KEY}")
    spot_prices = response.json()["data"]["items"]
    
    self.wfile.write(json.dumps({"spot_prices": spot_prices}).encode())
    return