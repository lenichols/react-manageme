import React, { Component, In } from 'react';
import * as ReactDOM from 'react-dom';
import FontAwesome from 'react-fontawesome';
import { Panel } from 'react-bootstrap';

var cols = document.querySelectorAll('#columns .column');

class NewBlankPanel extends Component {
   //return {"insert":false};
   render() {

	   this.setState({insert: false});

	   return(
		   <Panel className="panel" draggable="true" onDragStart={this.dragStart} onDragOver={this.preventDefault} onDrop={this.drop}>
		   	<label>Create a New To-Do Item</label>
				<input type="text" className="form-control" placeholder="Enter a title" />
				<textarea className="form-control" placeholder="Now enter a description for this task..." rows="4"></textarea>
				<button type="button" className="btn btn-info">SAVE</button>
			</Panel>
		)
   }
}


export default class Sort extends Component {
	constructor(props){
		super(props);

		this.state = {
			insert: false,

		}

		this.createPanel = this.createPanel.bind(this);

		//this.setState({"insert":false});
	//
	//
	//
	// 	// this.state = {
	// 	// 	accessToken: this.props.accessToken,
	// 	// 	onItemSelected: React.PropTypes.func.isRequired,
	// 	// 	name: "",
	// 	// 	image: "../../images/default-avatar.png",
	// 	// }
	//
	}
	//



	handleDragStart(e) {
	  this.style.opacity = '0.4';  // this / e.target is the source node.
	}





	componentDidMount(){
		//this.getTokenFound();
		//this.setState({"insert": "no"});
	}

	preventDefault(event) {
	    event.preventDefault();
	}

	dragStart(event) {

	  var data = {
	    name: 'foobar',
	    age: 15
	  };

	  event.dataTransfer.setData('text', JSON.stringify(data));

	}

	drop(event) {

    		event.preventDefault();

    		var data;

    		try {
			data = 			JSON.parse(event.dataTransfer.getData('text'));
    		} catch (e) {
      	// If the text data isn't parsable we'll just ignore it.
      		return;
    		}

    		// Do something with the data
    		console.log(data);

  	}


	createPanel(){

		this.setState({ insert: true});


		// var el1 = document.querySelector('.heading');
		//
		// el1.insertAdjacentHTML('afterend', '<br><Panel class="panel" draggable="true" onDragStart={this.dragStart} onDragOver={this.preventDefault} onDrop={this.drop}><label>Create a New To-Do Item</label><input type="text" class="form-control" placeholder="Enter a title"><br/><textarea class="form-control" placeholder="Now enter a description for this task..." rows="4"></textarea> <button type="button" class="btn btn-info">SAVE</button></Panel>');



	}


	render() {

		var view;
	     if(this.state.insert === true) {
	      	view = <NewBlankPanel />;
		} else {
			view = '';
		}
	    //console.log("img found: "+uri);

	//     let newname = this.state.name;
	//     let newlocation = this.state.location;
	    //const foundImage = this.state.image;

	    return (
	      <div className="panelArea">
		 	<button onClick={this.createPanel} >
				Add a ToDo

			</button>
		 	<div id="todoStart"  className="columnInsets" onDrop={this.drop}  onDragOver={this.preventDefault}>
			  	<h3 className="heading">Start</h3>
				{view}
			</div>

			<div id="todoInProgress" className="columnInsets" onDrop={this.drop} onDragOver={this.preventDefault} >
				<h3 className="heading">In-Progress</h3>
			</div>

			<div id="todoDone" className="columnInsets" onDrop={this.drop} onDragOver={this.preventDefault} >
			  	<h3 className="heading">Done</h3>
			</div>


		 </div>
	    );
	}

}
