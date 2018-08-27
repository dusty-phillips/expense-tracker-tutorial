import { combineReducers } from 'redux'
import { firebaseReducer } from 'react-redux-firebase'
import { firestoreReducer } from 'redux-firestore'
import { reducer as categoriesReducer, initialState as categoriesInitial } from './categories'

export const initialState = {
  categories: categoriesInitial
}

export const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  categories: categoriesReducer
})
