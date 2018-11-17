import sys
import fasttext as ft
import MeCab


class predict:
    def __init__(self):
        self.classifier = ft.load_model('model.bin')

    def get_surfaces(self, content):
        tagger = MeCab.Tagger('')
        tagger.parse('')
        surfaces = []
        node = tagger.parseToNode(content)

        while node:
            surfaces.append(node.surface)
            node = node.next

        return surfaces

    def classify(self, content):
        words = " ".join(self.get_surfaces(content))
        result = self.classifier.predict_proba([words], k=2)
        print(result)
        estimate = result[0][0]
        if estimate[0] == "__label__1,":
            print('positive', estimate[1])
        elif estimate[0] == "__label__2,":
            print('negative', estimate[1])


if __name__ == '__main__':
    pre = predict()
    pre.classify("".join(sys.argv[1:]))
