import React, { Component } from 'react';
import * as ReactDOM from 'react-dom';
import FontAwesome from 'react-fontawesome';
import Sort from './components/Sort/Sort.js';
import './App.css';

class App extends Component {

  render() {
    return (
      <div className="todo">
        <div className="todo-header">
	   	<div className="logo-text">
			MANAGE ME
		</div>
	  	<div style={{display: 'block', width: '100%'}}>GET THINGS DONE BY CREATING YOUR OWN VIRTUAL LISTS</div>
        </div>
	   <Sort />
      </div>
    );
  }
}

export default App;
