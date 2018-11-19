from flask import Flask, jsonify, request
from flask_cors import CORS

from services.predict import Predict
from services.twitter import Twitter
from services.firebase import Firebase

app = Flask(__name__)
CORS(app)


@app.route('/predict')
def predict():
    q = request.args.get('q')
    return jsonify(Predict().classify(q))


@app.route('/users', methods=['post'])
def save_user_info():
    data = request.get_json(force=True)
    id_token = data['idToken']
    access_token = data['accessToken']
    secret = data['secret']
    firebase = Firebase(id_token)
    firebase.save_user_info(access_token, secret)
    return jsonify({
        'data': 'ok'
    })


@app.route('/users/diagnosis', methods=['post'])
def diagnosis():
    data = request.get_json(force=True)
    id_token = data['idToken']
    firebase = Firebase(id_token)
    access_token, secret = firebase.get_user_info()
    twitter = Twitter(access_token, secret, count=200)

    return jsonify({
        'data': twitter.get_tweet({'count': 200})
    })
