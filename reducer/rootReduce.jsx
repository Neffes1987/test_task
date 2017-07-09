//rootReduce.jsx
//import {Map} from 'immutable'
import { routerReducer } from 'react-router-redux'
import { combineReducers } from 'redux'

import alerts from './Alerts'
import ReactSpinner from './ReactSpinner'
import custom_data from './custom_data'

const rootReducer = combineReducers({
    routerReducer,
    alerts,
    custom_data,
    ReactSpinner
});

export default rootReducer
