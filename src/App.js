import React, { Component } from 'react'
import { Provider } from "react-redux"

import store from "./redux/store"
import AuthButton from "./components/AuthButton"
import CategoryList from "./components/CategoryList"
import AddExpense from "./components/AddExpense"

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div>
          <AuthButton />
          <CategoryList />
          <AddExpense />
        </div>
      </Provider>
    )
  }
}

export default App
