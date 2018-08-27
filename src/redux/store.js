import { createStore, compose } from 'redux'
import { reactReduxFirebase } from 'react-redux-firebase'
import { reduxFirestore } from 'redux-firestore'


import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

import firebaseConfig from '../firebaseConfig.js'
import { initialState, rootReducer } from './reducers'

firebase.initializeApp(firebaseConfig)
firebase.firestore().settings({ timestampsInSnapshots: true })

const enhancers = [
  reduxFirestore(firebase),
  reactReduxFirebase(firebase, {
    userProfile: 'users',
    useFirestoreForProfile: true,
  }),
]

const reduxDevToolsExtension = window.devToolsExtension
if (
  process.env.NODE_ENV === "development" &&
  typeof reduxDevToolsExtension === "function"
) {
  enhancers.push(reduxDevToolsExtension())
}

const composedEnhancers = compose(
  ...enhancers
)

const store = createStore(rootReducer, initialState, composedEnhancers)


export default store
