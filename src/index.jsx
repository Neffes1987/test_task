//index.js
import React from 'react'
import ReactDom from 'react-dom'
import {Router,Route,IndexRoute,browserHistory} from 'react-router'
import {routerMiddleware} from 'react-router-redux'
import {createStore,applyMiddleware} from 'redux'
import {Provider} from 'react-redux'
import reducer from '../reducer/rootReduce'

import Main from './components/main'
import Department from './components/Department'
import Employees from './components/Employees'
import createLogger from 'redux-logger'
const logger = createLogger();
const middleware = routerMiddleware(browserHistory)

const store = createStore(reducer,applyMiddleware(middleware,logger));

const routes = (
        <Route path='/' component={Main}>
            <IndexRoute component = {Department}/>
            <Route path='department/' component={Department}/>
            <Route path='employees/' component={Employees}/>
        </Route>
    )
ReactDom.render(
    <Provider store={store}>
        <Router history={browserHistory}>
            {routes}
        </Router>
    </Provider>,document.getElementById('app'));
