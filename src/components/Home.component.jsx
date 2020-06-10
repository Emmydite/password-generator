import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import {FaClipboard, FaHeart, FaTimes, FaGithub,FaLinkedin, FaFacebook,FaTwitter } from 'react-icons/fa'


class Home extends Component {

    constructor(props){
        super(props);

        this.state = {
            result : '',
            length : 20,
            upperCase : false,
            lowerCase : false,
            numbers : false,
            symbols : false, 
            socialPanelCont : 'social-panel-container'
        }

        this.handelClick = this.handelClick.bind(this);
    }

    // const [appState, setAppState] = useState({
    //     result : '',
    //     length : 20,
    //     upperCase : false,
    //     lowerCase : false,
    //     numbers : false,
    //     symbols : false
    // });

  handleInput = e =>{

     this.setState({
        [e.target.name] : e.target.value
     })
   }

    toggleUpper = () =>{
        this.setState(prevState => ({
            upperCase : !prevState.upperCase
        }));    
    }

    toggleLower = () =>{
        this.setState( prevState => ({
            lowerCase : !prevState.lowerCase
        }))    
    }
    toggleNumbers = () =>{
        this.setState({
            numbers : !this.state.numbers
        })     
    }
    toggleSymbols = () =>{
        this.setState({
            symbols : !this.state.symbols
        })     
    }


     getRandomLower = () => {
         return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
    }
     getRandomUpper = () => {
        return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
   }
    getRandomNumber = () => {
    return +String.fromCharCode(Math.floor(Math.random() * 10) + 48);
    }
    getRandomSymbol = () => {
        const symbols = '!@#$%^&*(){}[]=<>/,.';
        return symbols[Math.floor(Math.random() * symbols.length)];
   }

     randomFunc = {
        lower: this.getRandomLower,
        upper : this.getRandomUpper,
        number : this.getRandomNumber,
        symbol : this.getRandomSymbol
    }

     generatePassword = (lower, upper, number, symbol, length) =>{
        let generatedPassword = '';
        const typesCount = lower + upper + number + symbol;
        const typesArr = [{lower}, {upper}, {number}, {symbol}].filter(item => Object.values(item)[0]);

        //no selected type
        if(typesCount === 0){
            return '';
        }

        //create a loop
        for(let i =0; i<length; i+=typesCount){
            typesArr.forEach(type => {
                const funcName = Object.keys(type)[0];
                generatedPassword += this.randomFunc[funcName]();
            });
        }

        const finalPassword = generatedPassword.slice(0, length);
        return finalPassword;
    }
    
     handelClick = () => {
         const length = this.state.length;
         const hasLower = this.state.lowerCase;
         const hasUpper = this.state.upperCase;
         const hasNumber = this.state.numbers;
         const hasSymbol = this.state.symbols;

         const res = this.generatePassword(hasLower, hasUpper, hasNumber, hasSymbol, length);

         this.setState({result:res});

    }


    handleCopy = () => {
        const textarea = document.createElement('textarea');
        const password = this.state.result;

        if(!password){return;}

        textarea.value = password;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        textarea.remove();
        alert('Password copied to clipboard');
    }


    //social panel
    //getSocialCont = document.querySelector('.social-panel-container')
    handleFloatingbtn = ()=>{
        let css = (this.state.socialPanelCont === 'social-panel-container') ? ' visible' : 'social-panel-container'
        this.setState({
            socialPanelCont : css
        });
    }

    handleClosebtn = ()=>{
        let css = (this.state.socialPanelCont === 'social-panel-container') ? 'visible' : 'social-panel-container'
        this.setState({
            socialPanelCont : css
        });
    }

 render(){

    return(
        <>
        <div className="container">
            <h2>Password Generator</h2>

            <div className="result-container">
              <span id="result">{this.state.result}</span>
                <button className="btn" id="clipboard" onClick={this.handleCopy}>
                    <FaClipboard />
                </button>
            </div>

            <div className="settings">
                <div className="setting">
                    <label htmlFor="length">Password length</label>
                    <input  type="number" name="length" id="length" min="4" max="20" defaultValue={this.state.length} onChange={this.handleInput}/>
                </div>
                <div className="setting">
                    <label htmlFor="uppercase">Include uppercase letters</label>
                    <input type="checkbox" name="upperCase" id="uppercase" defaultChecked={this.state.upperCase}  onChange={this.toggleUpper}/>
                </div>
                <div className="setting">
                    <label htmlFor="lowercase">Include lowercase letters</label>
                    <input type="checkbox" name="lowerCase" id="lowercase" defaultChecked={this.state.lowerCase}  onChange={this.toggleLower}/>
                </div>
                <div className="setting">
                    <label htmlFor="numbers">Include numbers</label>
                    <input type="checkbox" name="numbers" id="numbers" defaultChecked={this.state.numbers}  onChange={this.toggleNumbers}/>
                </div>
                <div className="setting">
                    <label htmlFor="symbols">Include symbols</label>
                    <input type="checkbox" name="symbols" id="symbols" defaultChecked={this.state.symbols} onChange={this.toggleSymbols}/>
                </div>

                <button className="btn btn-large" id="generate" onClick={this.handelClick}>
                    Generate Password
                </button>
            </div>
        </div>

                {/* social panel */}
                <div className={this.state.socialPanelCont}>
                <div className="social-panel">
                  <p>Created with <FaHeart /> by E~Steve</p>
                  <button className="close-btn" onClick={() => this.handleClosebtn()}>
                      <FaTimes />
                  </button>
                  <h4>Get in touch on</h4>
                  <ul>
                      <li>
                          <a href="https://www.github.com/emmydite" target="_blank" rel="noopener noreferrer"> <FaGithub /></a>
                      </li>
                      <li>
                          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer"> <FaFacebook /></a>
                      </li>
                      <li>
                          <a href="https://www.linkedin.com/in/emmanuelsteve" target="_blank" rel="noopener noreferrer"> <FaLinkedin /></a>
                      </li>
                      <li>
                          <a href="https://www.twitter.com/emmacomessi" target="_blank" rel="noopener noreferrer"> <FaTwitter /></a>
                      </li>
                  </ul>
                </div>
               </div>
               <button  className="floating-btn" onClick={this.handleFloatingbtn.bind(this)}>
                 Get in touch
               </button>
               </>
    )

 }

}

export default Home;