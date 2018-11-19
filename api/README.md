## Setup

```
$ pyenv local 3.6.5
$ python3 -m venv venv
$ source ./venv/bin/activate
$ brew install mecab mecab-ipadic
$ pip install cython==0.29
$ pip install --no-cache-dir -r requirements.txt
```

Start API Server

```
$ export FLASK_APP=api.py
$ flask run
# => Running on http://127.0.0.1:5000/
```

