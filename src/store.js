import { combineReducers, applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'
import promise from 'redux-promise-middleware'

import app from 'app/reducer'
import board from 'board/reducer'

export const combinedReducers = combineReducers({
  app,
  board
})

const middleware = [
  promise(),
  thunk
]

if (process.env.NODE_ENV === "development") { // if in development, log updates to the redux store
  const { createLogger } = require('redux-logger')
  middleware.push(createLogger())
}

const appliedMiddleware = applyMiddleware(...middleware)

export default createStore(combinedReducers, appliedMiddleware)