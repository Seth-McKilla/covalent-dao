import os
from dotenv import load_dotenv
from http.server import BaseHTTPRequestHandler
from urllib.parse import parse_qs, urlparse
import requests
from datetime import date
from datetime import timedelta  
import json

# Environment Variables
load_dotenv()
COVALENT_API_KEY = os.getenv("COVALENT_API_KEY")

class handler(BaseHTTPRequestHandler):
  
  def do_GET(self):
    self.send_response(200)
    self.send_header('Content-type','application/json')
    self.end_headers()
    query = urlparse(self.path).query
    chainId = parse_qs(query)["chainId"][0]
    contractId = parse_qs(query)["contractId"][0]
    ticker = parse_qs(query)["ticker"][0]

    #Function to reverse the list
    def Reverse(lst):
        return [ele for ele in reversed(lst)]

    # Returns today's and yesterday's local date
    today = date.today()
    yesterday = today - timedelta(days = 1)

    block_height_data = requests.get(f"https://api.covalenthq.com/v1/{chainId}/block_v2/{str(yesterday)}/{str(today)}/?&key={COVALENT_API_KEY}")

    block_height = block_height_data.json()['data']['items'][-1]['height']

    token_holders_at_block = requests.get(f"https://api.covalenthq.com/v1/{chainId}/tokens/{contractId}/token_holders/?block-height={str(block_height)}&page-size=100000&key={COVALENT_API_KEY}")                        

    contract_decimals = token_holders_at_block.json()['data']['items'][0]['contract_decimals']

    #List of balance
    balance_list = []
    for i in token_holders_at_block.json()['data']['items']:
        balance_list.append(int(i['balance'])/(10**contract_decimals))

    spot_price = requests.get(f"https://api.covalenthq.com/v1/pricing/tickers/?tickers={ticker}&key={COVALENT_API_KEY}")

    #Convert balances to USD
    current_price = spot_price.json()['data']['items'][0]['quote_rate']
    balance_list_usd = [element*current_price for element in balance_list]

    balance_list_usd_reverse = Reverse(balance_list_usd)

    #Removing the dust wallets, i.e., wallets having balance < $10
    balance_list_usd_refined = []
    for i in balance_list_usd_reverse:
        if i > 10:
            balance_list_usd_refined.append(i)

    #Total number of Wallets after removing dust wallets
    total_wallets = len(balance_list_usd_refined)

    num_list = []
    for i in range(1,total_wallets+1):
        num_list.append(i)

    cumulative_population = []
    for i in range(1,total_wallets+1):
        x1 = num_list[i-1]/total_wallets
        cumulative_population.append(x1*100)

    #Proportion of Balance
    total_balance = sum(balance_list_usd_refined)

    proportion_of_balance = []

    for i in balance_list_usd_refined:
        x2 = i/total_balance
        proportion_of_balance.append(x2)

    #Cumulative Proportion of Balance
    cumulative_proportion_of_balance = [proportion_of_balance[0]]
    for i in range(1,len(proportion_of_balance)):
        x3 = proportion_of_balance[i-1] + proportion_of_balance[i]
        cumulative_proportion_of_balance.append(x3)


    #Area under the curve
    area_under_curve = [cumulative_proportion_of_balance[0]]
    for i in range(1, len(cumulative_proportion_of_balance)):
        x4 = 0.5*(cumulative_proportion_of_balance[i-1] + cumulative_proportion_of_balance[i])*(1/total_wallets)
        area_under_curve.append(x4)

    #Area under lorenz
    area_under_lorenz = sum(area_under_curve)

    #Area between the two curves
    area_between_the_curves = 0.5 - area_under_lorenz

    gini_coefficient = area_between_the_curves/0.5

    self.wfile.write(json.dumps({"giniIdx": gini_coefficient}).encode())
    return

