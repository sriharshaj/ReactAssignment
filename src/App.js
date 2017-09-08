import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';

const Star = function(){
	return(
  	<div className={'star'}>
    	*
    </div>
  );
}

class Number extends Component{
  getCssClass = () => {
  	if(this.props.clicked || this.props.used){
    	return 'usedNumber';
    }
    else{
    	return 'number';
    }
  }
  
  handleClick = () => {
  	if(!this.props.used){
    	if(this.props.clicked){
      	this.props.removeNumberFromClicked(this.props.value);
      }
      else{
      	this.props.addNumberToClicked(this.props.value);
      }
    }
  }
  render(){
  	return(
    	<div className={this.getCssClass()} onClick={this.handleClick}>
    	  {this.props.value}
    	</div>
    )
  }
}

class Button extends Component{
	render(){
  	return (
    	<button onClick={this.props.handleClick}>
      	{this.props.label}
      </button>
    );
  }
}

class Game extends Component{
	constructor(){
  	super();
  	this.state = {
  		clicked: [],
    	used: [],
      msg: '',
      stars: this.getRandomStars()
  	};
  }
  
  getRandomStars = () => {
  	return Math.floor(Math.random()*9+1);
  }
	
  addNumberToClicked = (num) => {
  	this.setState( prevState => {
    	return prevState.clicked.push(num);
    });
  }
  
  skip = () => {
  	this.setState((prevState) => {
      prevState.clicked = [];
      prevState.stars = this.getRandomStars();
      return prevState;
    });
  }
  
  evaluate = () => {
  	let count = 0;
    for(let i=0; i < this.state.clicked.length; i++){
    	count = count+this.state.clicked[i];
    }
    
    if(count === this.state.stars){
    	this.setState((prevState) => {
      	prevState.used = prevState.used.concat(prevState.clicked);
        prevState.clicked = [];
        prevState.stars = this.getRandomStars();
        prevState.msg = 'Valid';
        return prevState;
      });
    }
    else{
    	this.setState((prevState) => {
        prevState.msg = 'InValid';
        return prevState;
      });
    }
  }
  
  removeNumberFromClicked = (num) => {
  	this.setState( prevState => {
    	var index = prevState.clicked.indexOf(num);
      prevState.clicked = prevState.clicked.slice(0,index).concat(prevState.clicked.slice(index+1, prevState.clicked.length));
      return prevState;
    });
  }
	
  getNumbers = () => {
  	return (Array(9).fill().map((_, i) => {
    	let value, clicked, used;
      value = i+1;
      clicked = this.state.clicked.includes(value);
      used = this.state.used.includes(value)
    	return <Number key={i+1} value={value} clicked={clicked} used={used} addNumberToClicked={this.addNumberToClicked} removeNumberFromClicked={this.removeNumberFromClicked}/>
    }));
  }
  
	render(){
  	return (
    	<div style={{margin: "10"}}>
    	  <h3> 
        	Play Nine
        </h3>
        <div>
        	{Array(this.state.stars).fill().map((_, i) => <Star />)}
        </div>
        <div>
          {
          	this.getNumbers()
          }
        </div>
        <div>
          <Button label={"Eval"} handleClick={this.evaluate} />
        </div>
        <div>
          <Button label={"Skip"} handleClick={this.skip} />
        </div>
    	</div>
    )
  }
}

class App extends Component{
	render(){
  	return (
    	<div>
    	  <Game />
    	</div>
    );
  }
}

export default App;
