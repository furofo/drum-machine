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
const CURRENTVOLUME = 'CURRENTVOLUME';


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
const volumeReducer = (state = 100, action) => {
    switch(action.type) {
        case CURRENTVOLUME:
            return action.currentVolume;
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
            return 'pianoKit';
        case 'heaterKit':
            return 'heaterKit';
        default:
            return state;
    }
}

const pianoKitSounds = {
    Q: <audio className = "clip"  id = 'Q' src = "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3"></audio>
}

// this is reducer that will combine all reducers
const rootReducer = combineReducers({
    power: powerReducer,
    volume: volumeReducer,
    kit: kitReducer,
})


let store = createStore(rootReducer);


/*let buttonClick = function () {
    console.log('a button was clicked hello there');
   console.log(this);
  $(this).css("background-color", "yellow");
} */

//react Logic
function playAudio(id) {
    var audio = document.getElementById(id);
    if (audio.paused) {
        audio.play();
    }else{
        audio.currentTime = 0
    }
}
class DrumContainer extends React.Component {
    constructor(props) {
        super(props)

        this.handleChange = this.handleChange.bind(this);
       
    }
    handleChange(event) {
        this.props.currentVolumeDispatch(event.target.value);
    }
    

    componentDidMount() {
        $(".drum-machine-button").click(function(event) {
            let button = this;
            console.log('event is');
            console.log(event.target.id);
            playAudio('Q');
            $(button).css('background-color', '#FFA500');
            
            setTimeout(function(){$(button).css('background-color', '#808080'); }, 50);
        }); 
    }
    componentDidUpdate() {
        
    }
    render(){
        return(
            <div id = "drum-machine">
            <div className = "absolute-center">
            <div id = "drum-machine-content">
            <div className ="numpad">
                <div className = "drum-machine-row">
                    <button className = "drum-machine-button" > <audio className = "clip"  id = 'Q' src = "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3"></audio>Q </button>
                    <button className = "drum-machine-button" > W </button>
                    <button className = "drum-machine-button" > E </button>
                </div>

                <div className = "drum-machine-row">
                    <button className = "drum-machine-button" > A </button>
                    <button className = "drum-machine-button" > S </button>
                    <button className = "drum-machine-button" > D </button>
                </div>

                <div className = "drum-machine-row">
                    <button className = "drum-machine-button" > Z </button>
                    <button className = "drum-machine-button" > X </button>
                    <button className = "drum-machine-button" > C </button>
                </div>
                </div>
                <div className ="buttons">
                <div className = "center" id="power-text">
                         <h3>Power</h3>
                </div>
                <div className = "center powerbutton">
                <label className = "switch">
                    <input type = "checkbox" />
                     <span className = "slider"></span>  
                </label>
                </div>
                <div className ='display-container'>
                <div id = "display">
                </div>
                </div>
                <div className = "slidecontainer">
                <input type="range" min="0" max = "100"  value = {this.props.volume} onChange = {this.handleChange} classNameName="slider2" id = "myRange"/>
                </div>

                <div className = "center" id="bank-text">
                         <h3>Bank</h3>
                </div>
                <div className = "center powerbutton">
                <label className = "switch">
                    <input type = "checkbox" />
                     <span className = "slider"></span>  
                </label>
                </div>

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
           
        },
        currentVolumeDispatch: (volume) => {
            dispatch({type: CURRENTVOLUME, currentVolume: volume});
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