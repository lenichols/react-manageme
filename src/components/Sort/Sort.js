import React, { Component } from 'react';
import * as ReactDOM from 'react-dom';
import SkyLight from 'react-skylight';
import FontAwesome from 'react-fontawesome';
import { Panel } from 'react-bootstrap';

export default class Sort extends Component {
	constructor(props){
		super(props);

		this.state = {
			newTitle: '',
			newDescription: '',
			time: null,
			date: null,
			updated: null,
			done: null,
			divs: []
		}

		this.start = this.start.bind(this);
		this.drag = this.drag.bind(this);
		this.drop = this.drop.bind(this);
		this.appendDiv = this.appendDiv.bind(this);

	}

	componentDidMount(){
		// no need for this in this use-case
	}


	today(){
		// get the date - reusable
		var today = new Date(),
		  dateNow = (today.getMonth() + 1) + '-' + today.getDate() + '-' + today.getFullYear();
		return dateNow;
	}

	time(){
		// get the time - reusable
		var timeNow = new Date().toTimeString().split(" ")[0];
		return timeNow;
	}

	start(event) {
		//on dragStart grab ID and set it to DT
		event.dataTransfer.setData("text/plain", event.target.id);
		console.log(event.target.id);
		//event.dataTransfer.dropEffect = "copy";
	}

	drag(event) {
		 event.preventDefault();
		 // on drag grab ID from selected item and keep it stored during move effect. store it to the drag event for reference
		 event.dataTransfer.setData("text", event.target.id);
		 event.dataTransfer.dropEffect = "move";
	}

	drop(event) {
	    event.preventDefault();
	    // on drop, get the panelItem data:id and append it to the drop column
	    var dragData = {id: event.target.id};
	    var data = event.dataTransfer.getData("text/plain");
	    var updatedDt = this.state.updated;

	    event.target.appendChild(document.getElementById(data));

	    document.getElementById('updated').innerHTML = ' ';
	    document.getElementById('updated').innerHTML = '<br/><small>Updated: '+this.today() + ' at ' + this.time()+'</small>';
  	}

	edit(){
		// do something here like replace the panel spans
		// with editable inputs
		alert("You would normally edit this panel!");
	}

	delete(item){
		// get the target item from the divs state array
		// and remove it
		var array = this.state.divs;
	  	var index = array.indexOf(item.target.value)
	  	array.splice(index, 1);
	  	this.setState({divs: array });
	}

	appendDiv(){
		// close modal first
		this.refs.addTodoBox.hide();
		// add date to new panel
	     this.setState({divs: [...this.state.divs, {title: this.state.newTitle, description: this.state.newDescription, time: this.time(), date: this.today()}]});
	}

	renderDivs = (div) => {
		// set panel state to an array in order for mapping
		var panelMap = [div];
		// dynamic panel (this is the new panel added
		// to todo column)
		const newGeneratedPanel = panelMap.map((data, x) => <div id="newpanel" className="panel" draggable="true" onDragStart={(event) => this.start(event)} key={x}>
		 <label>Created:&nbsp;</label>
		 <span className="date">{data.date}</span> at <span className="date">{data.time}</span>
		 <div className="itemTitle">{data.title}</div>
		 <br/>
		 <div className="itemDescription">{data.description}</div>
		 <button type="button" className="editButton btn btn-default" onClick={this.edit.bind(this)}>Edit</button>&nbsp;
		 <button type="button" className="deleteButton btn btn-danger" onClick={this.delete.bind(this)}>Delete</button>
		 <div id="updated"></div></div>);

		return newGeneratedPanel;

    	}

	render() {
		return (
	      <div className="panelArea">
		 	<button id="addAPanel" onClick={() => this.refs.addTodoBox.show()}>
			<FontAwesome
			    name='plus-circle'
			    className='plus-circle'
			    size='4x'  />
			</button>

		 	<div id="todoStart" className="columnInsets" onDragStart={this.start} onDrop={ this.drop}  onDragOver={this.drag}>
			  	<h3 id="heading1" className="heading">To Do</h3>
				{this.state.divs.map(this.renderDivs)}
			</div>

			<div id="todoInProgress" className="columnInsets" onDragStart={ this.start} onDrop={this.drop} onDragOver={this.drag} >
				<h3 id="heading3"  className="heading">In-Progress</h3>
			</div>

			<div id="todoDone" className="columnInsets" onDragStart={this.start} onDrop={ this.drop} onDragOver={this.drag} >
			  	<h3 id="heading3"  className="heading">Done</h3>
			</div>

			<SkyLight hideOnOverlayClicked ref="addTodoBox" title="Create a New To-Do Item">
	          	<br/>
				<div>
					<input type="text" className="form-control" placeholder="Enter a title" onChange= { (event)=> this.setState({newTitle: event.target.value})} />
					<br/>
					<textarea className="form-control" placeholder="Now enter a description for this task..." rows="4" onChange= { (event)=> this.setState({newDescription: event.target.value})}></textarea>
					<button type="button" className="saveButton btn btn-info" onClick={ this.appendDiv}>SAVE</button>
				</div>
	        </SkyLight>
		 </div>
	    );
	}

}
