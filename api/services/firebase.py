import os

from firebase_admin import credentials, initialize_app, auth, firestore

firebase_path = os.path.join(os.path.dirname(__file__), '../firebase.json')

cred = credentials.Certificate(firebase_path)
initialize_app(cred)


class Firebase:
    def __init__(self, id_token):
        self.id_token = id_token
        self.user = auth.verify_id_token(self.id_token)

    def save_user_info(self, access_token, secret):
        uid = self.user['uid']
        db = firestore.client()
        doc_ref = db.collection(u'users').document(u'%s' % uid)
        doc_ref.set({
            u'access_token': u'%s' % access_token,
            u'secret': u'%s' % secret
        })

    def get_user_info(self):
        uid = self.user['uid']
        db = firestore.client()
        doc_ref = db.collection(u'users').document(u'%s' % uid).get()
        user = doc_ref.to_dict()
        return user['access_token'], user['secret']
