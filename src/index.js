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

// const declarations
const ACTION = 'ACTION';
const ADDVOLUME = 'ADDVOLUME';
const SUBTRACTVOLUME = 'SUBTRACTVOLUME';


// reudux logic


//reducer to be combined in one reducer
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
            console.log(action.addValue);
            return state + parseInt(action.addValue);
        

        case SUBTRACTVOLUME:
            return state - parseInt(action.subtractValue);

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


// this is reducer that will combine all reducers
const rootReducer = combineReducers({
    power: powerReducer,
    volume: volumeReducer,
    kit: kitReducer,
})


let store = createStore(rootReducer);



//react Logic

class DrumContainer extends React.Component {
    constructor(props) {
        super(props)

        this.buttonClick = this.buttonClick.bind(this);
    }

    buttonClick = () => {
        console.log('a button was clicked hello there');
    }

    componentDidMount() {
        console.log('logging props...');
        console.log(this.props);
        this.props.actionDispatch();
        console.log('loggin props again');
        console.log(this.props);
        this.props.volumeDispatch(70, 'ADD');
        console.log(this.props);
        this.props.volumeDispatch(40, 'SUBTRACT');
        console.log(this.props);
    }
    componentDidUpdate() {
        console.log("third time?");
        console.log(this.props);
    }
    render(){
        return(
            <div id = "drum-machine">
            <div class = "absolute-center">
            <div id = "drum-machine-content">
                <div class = "drum-machine-row">
                    <button class = "drum-machine-button" onClick = {this.buttonClick}> Q </button>
                    <button class = "drum-machine-button" onClick = {this.buttonClick}> W </button>
                    <button class = "drum-machine-button" onClick = {this.buttonClick}> E </button>
                </div>

                <div class = "drum-machine-row">
                    <button class = "drum-machine-button" onClick = {this.buttonClick}> A </button>
                    <button class = "drum-machine-button" onClick = {this.buttonClick}> S </button>
                    <button class = "drum-machine-button" onClick = {this.buttonClick}> D </button>
                </div>

                <div class = "drum-machine-row">
                    <button class = "drum-machine-button" onClick = {this.buttonClick}> Z </button>
                    <button class = "drum-machine-button" onClick = {this.buttonClick}> X </button>
                    <button class = "drum-machine-button" onClick = {this.buttonClick}> C </button>
                </div>
            </div>
            </div>
                
            </div>
        )
    }
}



//react-reduxLogic

const mapStateToProps = (state) => {
    return {
        power: state.power,
        volume: state.volume,
        kit: state.kit
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        actionDispatch: () => {
            dispatch({type: ACTION})
        },
        kitDispatch: (kitType) => {
            dispatch({type: kitType})
        },
        volumeDispatch: (volume, addOrSubtract) => {
            if(addOrSubtract == 'ADD'){
                dispatch({type: ADDVOLUME, addValue: volume})

            }
            else {
                dispatch({type: SUBTRACTVOLUME, subtractValue: volume});
            }
           
        }
    }
}

const Container = connect(mapStateToProps, mapDispatchToProps)(DrumContainer);
class DrumContent extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return(
            <Provider store = {store}>
                <Container />
            </Provider> 
        );
    }
}
ReactDom.render(<DrumContent />, document.getElementById('root'));