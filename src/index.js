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

// const declarations  used to make typo mistakes harder to make
const ACTION = 'ACTION';
const ADDVOLUME = 'ADDVOLUME';
const SUBTRACTVOLUME = 'SUBTRACTVOLUME';
const CURRENTVOLUME = 'CURRENTVOLUME';
const DISPLAY = "DISPLAY";
const CHECKED = "CHECKED";
// redux logic
//reducers to be combined in one reducer
const powerReducer = (state = true, action) => { //true means power on false means power off
    switch(action.type) {
        case ACTION:
            return !state;
        default: 
            return state;
}
}
const volumeReducer = (state = 100, action) => { 
    switch(action.type) {
        case CURRENTVOLUME:
            return action.currentVolume; 
        default:
            return state;
        
    }
}
const kitReducer = (state = 'heaterKit', action) => { // used to switch between sound tracks or kits
    switch(action.type) {
        case 'pianoKit':
            return 'heaterKit';
        case 'heaterKit':
            return 'pianoKit';
        default:
            return state;
    }
}
const displayReducer = (state = '', action) => { // this is text that goes into display block beneath power button
   switch(action.type)  {
       case DISPLAY:
           return action.displayText;
        default:
            return state;
   }
}
const heaterKitReducer = (state = { //object with all sounds and names for heater kit
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
const pianoKitReducer = ( // object for all pianoKit names and sounds
    state = {
        Q: {
            name: 'Chord 1',
            url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3',
        },

        W: {
            name: 'Chord 2',
            url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3',
        },

        E: {
            name: 'Chord 3',
            url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3',
        },

        A: {
            name: 'Light',
            url: 'https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3',
        },
        S: {
            name: 'Ohh',
            url: 'https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3',
        },
        D: {
            name: 'BLD H1',
            url: 'https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3',
        },
        Z: {
            name: 'Kick 1',
            url: 'https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3',
        },
        X: {
            name: 'Stick 1',
            url: 'https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3',
        },
        C: {
            name: 'Brk',
            url: 'https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3',
        }


    }
) => {
    return state;
}
const bankCheckedReducer = (state = false, action) => { //used for bank toggle button had to move logic for checked into react
    switch (action.type) {
        case CHECKED:
            return action.checked;
        default: 
            return state;
    }
}

const powerCheckedReducer = (state = true, action) => { //used for power toggle button had to move logic for checked into react
    switch (action.type) {
        case CHECKED:
            return action.checked;
        default: 
            return state;
    }
}
// this is reducer that will combine all reducers
const rootReducer = combineReducers({
    power: powerReducer,
    volume: volumeReducer,
    kit: kitReducer,
    displayText: displayReducer,
    heaterKit: heaterKitReducer,
    pianoKit: pianoKitReducer,
    isBankChecked: bankCheckedReducer,
    isPowerChecked: powerCheckedReducer,
});
//this is store tat will get all the state asign to it
let store = createStore(rootReducer);
//react Logic
function playAudio(id) {  //logic to play audio on click restarts audio if already playing so you click buttons fast tor restart sound
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
        this.bankButtonClick = this.bankButtonClick.bind(this);
        this.powerButtonClick = this.powerButtonClick.bind(this);
    }
    handleChange(event) {
        this.props.currentVolumeDispatch(event.target.value);
        setTimeout(function(){$('#display-text').fadeIn()}, 10);
        $('#display-text').html('Volume: ' + event.target.value);
        setTimeout(function(){$('#display-text').fadeOut()}, 2000);
    }
    handleClick(event) { //click logic for sound buttons
        if(this.props.power){ // if has power basically
            if(this.props.kit == 'heaterKit'){ // which heater kit is it heater or piano? If heater this
            let id = $(event.target.childNodes[1]).attr('id'); // this gets id of audio element spefically
            document.getElementById(id).volume = (this.props.volume / 100);  // the onlyi way to manually set volume tha ti found
            $('#display-text').html(this.props.heaterKit[id].name);
            let button = event.target;
            $('#' +id).attr('src', this.props.heaterKit[id].url);
            playAudio(id);
            $(button).css('background-color', '#FFA500');     
            setTimeout(function(){$(button).css('background-color', '#808080'); }, 50);
                }
            else {
            let id = $(event.target.childNodes[1]).attr('id');
            document.getElementById(id).volume = (this.props.volume / 100); 
            let button = event.target;
            $('#' +id).attr('src', this.props.pianoKit[id].url);
            playAudio(id);
            $(button).css('background-color', '#FFA500');    
            setTimeout(function(){$(button).css('background-color', '#808080'); }, 50);
            $('#display-text').html(this.props.pianoKit[id].name);
        }
            }
        else {
            console.log('make sure power is turned on!'); // here if people inspect lol
        }
    }

    powerButtonClick() {
        this.props.actionDispatch(); // switches state of power 
    }

    bankButtonClick() {
       this.props.kitDispatch(this.props.kit); //swaps kit between pianoKit and Heater Kit
       setTimeout(() => {
        if(this.props.kit == 'pianoKit') {
            $('#display-text').html('Piano Kit');
           }
    
           else {
            $('#display-text').html('Heater Kit');
           }
       }, 50); // put on timeout since it takes a second to update
       this.props.bankCheckDispatch(this.props.isBankChecked); //switches boolean state of isBankChecked prop
    }

    componentDidMount() {
        $(function() { // waits until component mounts and everything loads gravily
            $(document).keydown(function(e) {
             switch(e.which) { 
                case 81:
                    $("#q-button").click();
                    break;

                case 87:
                    $("#w-button").click();
                    break;

                case 69:
                    $("#e-button").click();
                    break;
                
                case 65:
                    $("#a-button").click();
                    break;

                case 83:
                    $("#s-button").click();
                    break;
                
                case 68:
                    $("#d-button").click();
                    break;
                case 90:
                    $("#z-button").click();
                    break;
                case 88:
                    $("#x-button").click();
                    break;
                case 67:
                    $("#c-button").click();
                    break;
             } 
         });
         });
    }
    render(){
        return(
            <div id = "drum-machine">
            <div className = "absolute-center">
            <div id = "drum-machine-content">
            <div className ="numpad">
                <div className = "drum-machine-row">
                    <button className = "drum-pad drum-machine-button" onClick = {this.handleClick} value = 'yes' id = 'q-button'> <audio className = "clip"  id = 'Q' src = ""  ></audio>Q </button>
                    <button className = "drum-pad drum-machine-button" onClick = {this.handleClick} id = 'w-button' >  <audio className = "clip"  id = 'W' src = ""></audio>W </button>
                    <button className = "drum-pad drum-machine-button" onClick = {this.handleClick} id = 'e-button'> <audio className = "clip"  id = 'E' src = ""></audio> E </button>
                </div>

                <div className = "drum-machine-row">
                    <button className = "drum-pad drum-machine-button" onClick = {this.handleClick} id = 'a-button'> <audio className = "clip"  id = 'A' src = ""></audio>A </button>
                    <button className = "drum-pad drum-machine-button" onClick = {this.handleClick} id = 's-button'> <audio className = "clip"  id = 'S' src = ""></audio>S </button>
                    <button className = "drum-pad drum-machine-button" onClick = {this.handleClick} id = 'd-button'> <audio className = "clip"  id = 'D' src = ""></audio>D </button>
                </div>

                <div className = "drum-machine-row">
                    <button className = "drum-pad drum-machine-button" onClick = {this.handleClick} id = 'z-button'> <audio className = "clip"  id = 'Z' src = ""></audio>Z </button>
                    <button className = "drum-pad drum-machine-button" onClick = {this.handleClick} id = 'x-button'> <audio className = "clip"  id = 'X' src = ""></audio>X </button>
                    <button className = "drum-pad drum-machine-button" onClick = {this.handleClick} id = 'c-button'> <audio className = "clip"  id = 'C' src = ""></audio>C </button>
                </div>
                </div>
                <div className ="buttons">
                <div className = "center" id="power-text">
                         <h3>Power</h3>
                </div>
                <div className = "center powerbutton">
                <label className = "switch">
                    <input type = "checkbox" defaultChecked = {this.props.isPowerChecked}/>
                     <span className = "slider" id = "power-button" onClick = {this.powerButtonClick}></span>  
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
                    <input type = "checkbox" defaultChecked = {this.props.isBankChecked}/>
                     <span className = "slider" id = "bank-button" onClick = {this.bankButtonClick}></span>  
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
const mapStateToProps = (state) => { // this maps redux state to properties react can use the only thing that can change these states are dispatch
    return {
        power: state.power,
        volume: state.volume,
        kit: state.kit,
        displayText: state.displayText,
        heaterKit: state.heaterKit,
        pianoKit: state.pianoKit,
        isBankChecked: state.isBankChecked,
        isPowerChecked: state.isPowerChecked,
    }
}

const mapDispatchToProps = (dispatch) => { //this maps dispatch methods to properties react can use like normal. Dispatch is the only thing that can change redux state. 
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
            dispatch({type: DISPLAY, displayText: text});
        },
        bankCheckDispatch: (state) => {
           dispatch({type: CHECKED, checked: !state});
        },
        powerCheckDispatch: (state) => {
            dispatch({type: CHECKED, checked: !state});
        }
    }
}

const Container = connect(mapStateToProps, mapDispatchToProps)(DrumContainer); // this acutally connects redux state and react state together in a const Contaier
class DrumContent extends React.Component {
    constructor(props) {
        super(props)
    }
    render() { // here is logic to finalize connecting redux and react state together
        return(
            <Provider store = {store}> 
                <Container />
            </Provider> 
        );
    }
}
ReactDom.render(<DrumContent />, document.getElementById('root'));