import React, { Component } from 'react'
import { Provider } from "react-redux"

import store from "./redux/store"
import AuthButton from "./components/AuthButton"


class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <AuthButton />
      </Provider>
    )
  }
}

export default App
