import React from 'react';
import ReactDom from 'react-dom';
import { render } from 'react-dom'
import './style.css';
import $ from "jquery";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Provider } from 'react-redux'
import { createStore } from 'redux';
import { combineReducers } from 'redux'
const ACTION = 'ACTION';
const ADDVOLUME = 'ADDVOLUME';
const SUBTRACTVOLUME = 'SUBTRACTVOLUME';



const powerReducer = (state = true, action) => {
    switch(action.type) {
        case ACTION:
            return !state
        default: 
            return state
}
}
const volumeReducer = (state = 0, action) => {
    switch(action.type) {
        case ADDVOLUME: 
            return state.volume + action.addValue;
        

        case SUBTRACTVOLUME:
            return state.volume - state.subtractValue;

        default:
            return state
        
    }
}

const kitReducer = (state = 'heaterKit', action) => {
    switch(action.type) {
        case 'pianoKit':
            return 'pianoKit'
        case 'heaterKit':
            return 'heaterKit'
        default:
            return state
    }
}



const rootReducer = combineReducers({
    power: powerReducer,
    volume: volumeReducer,
    kit: kitReducer,
})

let store = createStore(rootReducer);

console.log(store.getState());
store.dispatch({type: ACTION});
console.log(store.getState());
store.dispatch({type: 'pianoKit'});
console.log(store.getState());