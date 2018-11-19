import os

import MeCab
import fasttext as ft


def get_surfaces(content):
    tagger = MeCab.Tagger('')
    tagger.parse('')
    surfaces = []
    node = tagger.parseToNode("".join(content))

    while node:
        surfaces.append(node.surface)
        node = node.next

    return surfaces


class Predict:
    def __init__(self):
        model_path = os.path.join(os.path.dirname(__file__), '../model.bin')
        self.classifier = ft.load_model(model_path)

    def classify(self, content):
        words = " ".join(get_surfaces(content))
        result = self.classifier.predict_proba([words], k=2)
        labels = result[0]
        first_label = labels[0][0]
        if first_label == '__label__1,':
            return {
                'positive': labels[0][1],
                'negative': labels[1][1],
            }
        else:
            return {
                'positive': labels[1][1],
                'negative': labels[0][1],
            }
