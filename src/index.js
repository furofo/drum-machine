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
const DISPLAY = "DISPLAY";


// redux logic


//reducers to be combined in one reducer
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

const displayReducer = (state = '', action) => {
   switch(action.type)  {
       case DISPLAY:
           return action.displayText;
        default:
            return state;
   }
}

const heaterKitReducer = (state = {
    Q: {
        name: 'Heater-1', 
        url:'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3',
    },
    W: {
        name: 'Heater-2',
        url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3'
    },
    E: {
        name: 'Heater-3',
        url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3',
    },
    A: {
        name: 'Heater-4',
        url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3',
    },
    S: {
        name: 'Heater-6',
        url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3'
    },
    D: {
        name: 'Drums Oh',
        url: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3',
    },
    Z: {
        name: 'Kick and Hat',
        url: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3',
    },
    X: {
        name: 'Kick 1',
        url: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3',
    },
    C: {
        name: 'Cev H2',
        url: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3',
    }
                                    }) => {
    return state;
};
const pianoKitSounds = {
    Q: <audio className = "clip"  id = 'Q' src = "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3"></audio>
}

// this is reducer that will combine all reducers
const rootReducer = combineReducers({
    power: powerReducer,
    volume: volumeReducer,
    kit: kitReducer,
    displayText: displayReducer,
    heaterKit: heaterKitReducer,
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
        this.handleClick = this.handleClick.bind(this);
    }
    handleChange(event) {
        this.props.currentVolumeDispatch(event.target.value);
        setTimeout(function(){$('#display-text').fadeIn()}, 10);
        $('#display-text').html('Volume' + this.props.displayDispatch(event.target.value));
        setTimeout(function(){$('#display-text').fadeOut()}, 2000);
    }
    
    handleClick(event) {
        console.log(event.target);
        //console.log('id ' + id);
       // playAudio(event.target.childNodes[1]);
       let id = $(event.target.childNodes[1]).attr('id');
       console.log(id);
       let button = event.target;
       $('#' +id).attr('src', this.props.heaterKit[id].url);
       console.log($(id).attr('src'));
       playAudio(id);
       $(button).css('background-color', '#FFA500');
            
     setTimeout(function(){$(button).css('background-color', '#808080'); }, 50);
        console.log('okay this was clicked again');
        console.log(this.props);
    $('#display-text').html(id);
    }

    componentDidMount() {
    /*    $(".drum-machine-button").click(function(event) {
            
            let audioElement = this.childNodes[1];
            let id = $(audioElement).attr('id');
            let button = this;
            playAudio(id);
            $(button).css('background-color', '#FFA500');
            
            setTimeout(function(){$(button).css('background-color', '#808080'); }, 50);
            
        }); */
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
                    <button className = "drum-machine-button" onClick = {this.handleClick} value = 'yes'> <audio className = "clip"  id = 'Q' src = ""></audio>Q </button>
                    <button className = "drum-machine-button" onClick = {this.handleClick}  >  <audio className = "clip"  id = 'W' src = ""></audio>W </button>
                    <button className = "drum-machine-button" onClick = {this.handleClick} > <audio className = "clip"  id = 'E' src = ""></audio> E </button>
                </div>

                <div className = "drum-machine-row">
                    <button className = "drum-machine-button" onClick = {this.handleClick}> <audio className = "clip"  id = 'A' src = ""></audio>A </button>
                    <button className = "drum-machine-button" onClick = {this.handleClick}> <audio className = "clip"  id = 'S' src = ""></audio>S </button>
                    <button className = "drum-machine-button" onClick = {this.handleClick}> <audio className = "clip"  id = 'D' src = ""></audio>D </button>
                </div>

                <div className = "drum-machine-row">
                    <button className = "drum-machine-button" onClick = {this.handleClick}> <audio className = "clip"  id = 'Z' src = ""></audio>Z </button>
                    <button className = "drum-machine-button" onClick = {this.handleClick}> <audio className = "clip"  id = 'X' src = ""></audio>X </button>
                    <button className = "drum-machine-button" onClick = {this.handleClick}> <audio className = "clip"  id = 'C' src = ""></audio>C </button>
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
                    <p id = "display-text">{this.props.displayText}</p>
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
        kit: state.kit,
        displayText: state.displayText,
        heaterKit: state.heaterKit,
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
        },
        displayDispatch: (text) => {
            dispatch({type: DISPLAY, displayText: text})
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