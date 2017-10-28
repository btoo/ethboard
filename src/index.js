import React, { Component } from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import store from './store'
import App from 'app'

window.addEventListener('load', _ => render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
))