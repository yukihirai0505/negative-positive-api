from flask import Flask, jsonify, request
from flask_cors import CORS

from services.predict import Predict
from services.twitter import Twitter

# firebase_path = os.path.join(os.path.dirname(__file__), 'firebase.json')
#
# cred = credentials.Certificate(firebase_path)
# firebase_admin.initialize_app(cred)

app = Flask(__name__)
CORS(app)


@app.route('/predict')
def predict():
    q = request.args.get('q')
    return jsonify(Predict().classify(q))


@app.route('/diagnosis', methods=['post'])
def diagnosis():
    data = request.get_json(force=True)
    access_token = data['accessToken']
    secret = data['secret']
    twitter = Twitter(access_token, secret, count=200)

    return jsonify({
        'data': twitter.get_tweet({'count': 200})
    })
