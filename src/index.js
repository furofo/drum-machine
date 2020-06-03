import React from 'react';
import ReactDom from 'react-dom';
import { render } from 'react-dom'
import './style.css';
import $ from "jquery";

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Provider } from 'react-redux'
import { createStore } from 'redux';

const DefaultState = {
    power: true,
    volume: 0,
    bank: 'heaterKit',
    heaterkit: {q: ['Heater1', '<audio src = "#"> </audio>']}

}
const reducer = function(state = DefaultState ) {
    return state
}

let store = createStore(reducer);

console.log(store.getState());