import MeCab
import fasttext as ft
from flask import Flask, jsonify, request

app = Flask(__name__)


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
        result = self.classifier.predict_proba([words], k=2)
        return jsonify(result)


@app.route("/predict")
def predict():
    q = request.args.get('q')
    pre = Predict()
    return pre.classify(q)
