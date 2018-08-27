import React, { Component } from 'react'
import { Provider } from "react-redux"

import store from "./redux/store"
import AuthButton from "./components/AuthButton"
import AddCategory from "./components/AddCategory"


class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div>
          <AuthButton />
          <AddCategory />
        </div>
      </Provider>
    )
  }
}

export default App
