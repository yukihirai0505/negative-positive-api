## Setup

```
$ python3 -m venv venv
$ source ./venv/bin/activate
$ brew install mecab mecab-ipadic
$ pip install --no-cache-dir -r requirements.txt
```

## Prediction

collect data

```
$ python src/tweet_get.py
```

create model

```
$ cat __label__1.txt __label__2.txt > model.txt
$ python src/learning.py model.txt model
```

prediction

```
$ python src/prediction.py "text"
```
