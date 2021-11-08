import os
from dotenv import load_dotenv
from urllib.parse import parse_qs, urlparse
from http.server import BaseHTTPRequestHandler
from textblob import TextBlob
import tweepy
import json

# Environment Variables
load_dotenv()
TWITTER_CONSUMER_KEY = os.getenv("TWITTER_CONSUMER_KEY")
TWITTER_CONSUMER_SECRET = os.getenv("TWITTER_CONSUMER_SECRET")
TWITTER_ACCESS_TOKEN = os.getenv("TWITTER_ACCESS_TOKEN")
TWITTER_ACCESS_TOKEN_SECRET = os.getenv("TWITTER_ACCESS_TOKEN_SECRET")

class handler(BaseHTTPRequestHandler):

  def do_GET(self):
    self.send_response(200)
    self.send_header("Content-type","application/json")
    self.end_headers()
    query = urlparse(self.path).query
    keyword = parse_qs(query)["keyword"][0]

    auth = tweepy.OAuthHandler(TWITTER_CONSUMER_KEY, TWITTER_CONSUMER_SECRET)
    auth.set_access_token(TWITTER_ACCESS_TOKEN, TWITTER_ACCESS_TOKEN_SECRET)
    api = tweepy.API(auth)

    def percentage(part,whole):
      return 100 * float(part)/float(whole)

    # Number of Tweets fetched is set to 100 (Limitation of the API)
    tweets = api.search_tweets(q=keyword, count=100)
 
    positive = []
    negative = []
    neutral = []

    for tweet in tweets:
      analysis = TextBlob(tweet.text)    
      x1 = analysis.sentiment.polarity
      if x1 > 0:
          positive.append(x1)
      elif x1 < 0:
          negative.append(x1)
      else:
          neutral.append(x1)
        
    positive = percentage(len(positive), 100)
    negative = percentage(len(negative), 100)
    neutral = percentage(len(neutral), 100)
    positive = format(positive, '.1f')
    negative = format(negative, '.1f')
    neutral = format(neutral, '.1f')

    self.wfile.write(json.dumps({
      "positive": positive,
      "negative": negative,
      "neutral": neutral,
      }).encode())
    return