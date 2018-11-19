import json
import os
import re

from dotenv import load_dotenv
from requests_oauthlib import OAuth1Session

from services.predict import Predict

dotenv_path = os.path.join(os.path.dirname(__file__), '../.env')
load_dotenv(dotenv_path)


def format_text(text):
    text = re.sub(r'https?://[\w/:%#\$&\?\(\)~\.=\+\-…]+', "", text)
    text = re.sub(r'@[\w/:%#\$&\?\(\)~\.=\+\-…]+', "", text)
    text = re.sub(r'&[\w/:%#\$&\?\(\)~\.=\+\-…]+', "", text)
    text = re.sub(';', "", text)
    text = re.sub('RT', "", text)
    text = re.sub('\n', " ", text)
    return text


class Twitter:
    def __init__(self, access_token, secret, count):
        consumer_key = os.environ.get('TWITTER_CONSUMER_KEY')
        consumer_secret = os.environ.get('TWITTER_CONSUMER_SECRET')
        self.twitter_service = OAuth1Session(consumer_key, consumer_secret, access_token, secret)
        self.results = []
        self.predict = Predict()
        self.count = count

    def get_tweet(self, params, num=0):
        if num == 1:
            return self.results
        req = self.twitter_service.get(
            'https://api.twitter.com/1.1/statuses/user_timeline.json',
            params=params
        )
        if req.status_code == 200:
            tweets = json.loads(req.text)
            for tweet in tweets:
                text = format_text(tweet['text'])
                self.results.append(
                    {
                        'text': text,
                        'labels': self.predict.classify(text),
                        'date': tweet['created_at']
                    }
                )
            max_id = tweets[-1]['id_str']
            return self.get_tweet({'count': self.count, 'max_id': max_id}, num + 1)
        else:
            print("Error: %d" % req.status_code)
            return self.results
