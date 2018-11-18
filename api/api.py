import json
import os

import MeCab
import fasttext as ft
import firebase_admin
from dotenv import load_dotenv
from firebase_admin import credentials
from flask import Flask, jsonify, request
from flask_cors import CORS
from requests_oauthlib import OAuth1Session

firebase_path = os.path.join(os.path.dirname(__file__), 'firebase.json')

cred = credentials.Certificate(firebase_path)
firebase_admin.initialize_app(cred)

dotenv_path = os.path.join(os.path.dirname(__file__), '../.env')
load_dotenv(dotenv_path)

CK = os.environ.get('TWITTER_CONSUMER_KEY')
CS = os.environ.get('TWITTER_CONSUMER_SECRET')

app = Flask(__name__)
CORS(app)


class Predict:
    def __init__(self):
        self.classifier = ft.load_model('model.bin')

    def get_surfaces(self, content):
        tagger = MeCab.Tagger('')
        tagger.parse('')
        surfaces = []
        node = tagger.parseToNode("".join(content))

        while node:
            surfaces.append(node.surface)
            node = node.next

        return surfaces

    def classify(self, content):
        words = " ".join(self.get_surfaces(content))
        return self.classifier.predict_proba([words], k=2)


@app.route('/predict')
def predict():
    q = request.args.get('q')
    return jsonify(Predict().classify(q))


@app.route('/diagnosis', methods=['post'])
def diagnosis():
    data = request.get_json(force=True)
    access_token = data['accessToken']
    secret = data['secret']
    twitter = OAuth1Session(CK, CS, access_token, secret)
    results = []
    count = 200
    pre = Predict()

    def get_tweet(params, num=0):
        if num == 1:
            return results
        req = twitter.get(
            'https://api.twitter.com/1.1/statuses/user_timeline.json',
            params=params
        )
        if req.status_code == 200:
            tweets = json.loads(req.text)
            for tweet in tweets:
                text = tweet['text']
                results.append((text, pre.classify(text)))
            max_id = tweets[-1]['id_str']
            return get_tweet({'count': count, 'max_id': max_id}, num + 1)
        else:
            print("Error: %d" % req.status_code)
            return results

    return jsonify({
        'data': get_tweet({'count': count})
    })
