import re
import json
import MeCab
from requests_oauthlib import OAuth1Session
import os
from dotenv import load_dotenv

dotenv_path = os.path.join(os.path.dirname(__file__), '../.env')
load_dotenv(dotenv_path)

CK = os.environ.get('TWITTER_CONSUMER_KEY')
CS = os.environ.get('TWITTER_CONSUMER_SECRET')
AT = os.environ.get('TWITTER_ACCESS_TOKEN')
AS = os.environ.get('TWITTER_ACCESS_TOKEN_SECRET')

API_URL = "https://api.twitter.com/1.1/statuses/user_timeline.json"
SCREEN_NAMES = {
    '__label__1': [
        'positivekk_bot',
        'positive_bot_00',
        'botpositive',
        'positive_mot',
        'kami_positive',
        'positive_bot'
        'jinseiplusbot',
        'syuzou_genki',
        'genki_kotoba_m'
    ],
    '__label__2': [
        'negatizibu_bot',
        'inmydream19',
        'lewyfDanf',
        'positive_act_me',
        'pgmtmw',
        'yamik_bot',
        'cool_aroma',
        'nega_bot',
        'negativedbot',
        'H4Za5',
        'ymibot'
    ],

}


def main():
    for key in SCREEN_NAMES.keys():
        tweets = save_tweet(SCREEN_NAMES[key])
        surfaces = get_surfaces(tweets)
        write_txt(surfaces, key)


def save_tweet(screen_names):
    twitter = OAuth1Session(CK, CS, AT, AS)
    results = []

    def get_tweet(params, num=0):
        if num == 5:
            return results
        req = twitter.get(API_URL, params=params)
        if req.status_code == 200:
            tweets = json.loads(req.text)
            for tweet in tweets:
                results.append(tweet['text'])
            max_id = tweets[-1]['id_str']
            return get_tweet({'screen_name': screen_name, 'count': 200, 'max_id': max_id}, num + 1)
        else:
            print("Error: %d" % req.status_code)
            return results

    for screen_name in screen_names:
        get_tweet({'screen_name': screen_name, 'count': 200})
    return results


def get_surfaces(contents):
    """
    文書を分かち書きし単語単位に分割
    """
    results = []
    for row in contents:
        content = format_text(row)
        tagger = MeCab.Tagger('')
        tagger.parse('')
        surf = []
        node = tagger.parseToNode(content)
        while node:
            surf.append(node.surface)
            node = node.next
        results.append(surf)
    return results


def write_txt(contents, label):
    """
    create text for evaluation model
    """
    try:
        if len(contents) > 0:
            file_name = label + ".txt"
            label_text = label + ", "

            f = open(file_name, 'a')
            for row in contents:
                # 空行区切りの文字列に変換
                space_tokens = " ".join(row)
                result = label_text + space_tokens + "\n"
                # 書き込み
                f.write(result)
            f.close()

        print(str(len(contents)) + "line done")

    except Exception as e:
        print("fail to write text file")
        print(e)


def format_text(text):
    text = re.sub(r'https?://[\w/:%#\$&\?\(\)~\.=\+\-…]+', "", text)
    text = re.sub(r'@[\w/:%#\$&\?\(\)~\.=\+\-…]+', "", text)
    text = re.sub(r'&[\w/:%#\$&\?\(\)~\.=\+\-…]+', "", text)
    text = re.sub(';', "", text)
    text = re.sub('RT', "", text)
    text = re.sub('\n', " ", text)
    return text


if __name__ == '__main__':
    main()
