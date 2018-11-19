import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

export const app = !firebase.apps.length
  ? firebase.initializeApp({
      apiKey: 'AIzaSyD0emanhkKGnXqmAVVpBEvgKjDQggY9sA4',
      authDomain: 'twinegaposi.firebaseapp.com',
      databaseURL: 'https://twinegaposi.firebaseio.com',
      projectId: 'twinegaposi',
      storageBucket: 'twinegaposi.appspot.com',
      messagingSenderId: '255489787424'
    })
  : firebase.app()

export const auth = app.auth()
export const database = app.database()
export const providerTwitter = new firebase.auth.TwitterAuthProvider()
export default firebase
