import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import boardSettings from './boardSettings'

const reducer = combineReducers({
  boardSettings
})
const store = configureStore({
  reducer
})

export default store;