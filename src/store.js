import {combineReducers, applyMiddleware, createStore} from 'redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import promise from 'redux-promise-middleware'

import app from 'app/reducer'
import board from 'board/reducer'

const reducers = combineReducers({
        app,
        board
      })
    , middleware = applyMiddleware(promise(), thunk, logger())

export default createStore(reducers, middleware)