import React, { Component } from 'react'
import { Provider } from "react-redux"

import store from "./redux/store"
import AuthButton from "./components/AuthButton"
import CategoryList from "./components/CategoryList"
import ExpenseList from "./components/ExpenseList"

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div>
          <AuthButton />
          <CategoryList />
          <ExpenseList />
        </div>
      </Provider>
    )
  }
}

export default App
