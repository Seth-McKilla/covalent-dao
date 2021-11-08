import os
from dotenv import load_dotenv, find_dotenv
from urllib.parse import parse_qs, urlparse
from http.server import BaseHTTPRequestHandler
from textblob import TextBlob
import tweepy
import nltk
nltk.download("vader_lexicon",download_dir="nltk_data/")
from nltk.sentiment.vader import SentimentIntensityAnalyzer
from nltk.sentiment.vader import SentimentIntensityAnalyzer
import json

# Environment Variables
load_dotenv(find_dotenv())
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
    positive = 0
    negative = 0
    neutral = 0
    polarity = 0
    tweet_list = []
    neutral_list = []
    negative_list = []
    positive_list = []

    for tweet in tweets:
      tweet_list.append(tweet.text)
      analysis = TextBlob(tweet.text)
      score = SentimentIntensityAnalyzer().polarity_scores(tweet.text)
      neg = score["neg"]
      pos = score["pos"]
      polarity += analysis.sentiment.polarity
      
      if neg > pos:
        negative_list.append(tweet.text)
        negative += 1
      elif pos > neg:
        positive_list.append(tweet.text)
        positive += 1
      
      elif pos == neg:
        neutral_list.append(tweet.text)
        neutral += 1
        
    positive = percentage(positive, 100)
    negative = percentage(negative, 100)
    neutral = percentage(neutral, 100)
    polarity = percentage(polarity, 100)
    positive = format(positive, ".1f")
    negative = format(negative, ".1f")
    neutral = format(neutral, ".1f")

    self.wfile.write(json.dumps({
      "positive": positive,
      "negative": negative,
      "neutral": neutral,
      }).encode())
    return