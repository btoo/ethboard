import { combineReducers, applyMiddleware, createStore } from 'redux'
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'
import promise from 'redux-promise-middleware'

import app from 'app/reducer'
import board from 'board/reducer'

const reducers = combineReducers({
  app,
  board
})

const middleware = applyMiddleware(promise(), thunk, createLogger())

export default createStore(reducers, middleware)