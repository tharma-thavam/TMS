import React from 'react';
import ReactDOM from 'react-dom';
import './Common/style/Main.scss';
import Routes from './Routes'
import thunkMiddleware from 'redux-thunk'
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import MainStore from './Store'
import {applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import promise from 'redux-promise-middleware'
import 'bootstrap/dist/css/bootstrap.css';

const store = createStore(MainStore, applyMiddleware(promise(), thunkMiddleware, createLogger()))

ReactDOM.render(
    <Provider store={store}>
        <Routes className='container-fluid'/>
    </Provider>,
    document.getElementById('root')
)

