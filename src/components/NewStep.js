


import React, { Component } from 'react';
import { connect } from 'react-redux';


import * as routes from '../constants/routes';

//action creator
import {  getChecklist, addFirstStep, addStep } from '../actions/checklist';

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});


class NewStep extends Component{

	constructor(props){
		super(props);

		if(this.props.user.uid === ''){
			this.props.history.push(routes.LANDING);
		}

		this.state = {
			name: '',
			steps: ''
		}
	}

	componentDidMount = () => {

		console.log("CHECKLIST MOUNTED");
		
		const id = this.props.match.params.id;

		console.log("CHECKLIST ID", id);

		this.props.getChecklist(this.props.user.uid, this.props.match.params.id);
	}

	

	onSubmit = (event) => {

		console.log("form Submit", this.state.name);
		//console.log(this.props.checklists.checklists.length);

		console.log("this.props", this.props);

		console.log("test", this.props.checklists.steps);

		


		//This is used to add the checklist object to the users object
		if(this.props.checklists.steps == null){
			console.log("this is the first step");

			//here is where we are going to add the step to the database

			let step = { 0: {
					id: 0,
					name: this.state.name,
					finished: false
				}
			}

		 	this.props.addFirstStep(this.props.user.uid, this.props.checklists.checklistId, step, () => {
		 		this.props.history.push(`/checklist/${this.props.match.params.id}`)
		 	});

		 	this.setState({
				name: ''
			})
		} else {

			console.log(this.props.checklists.steps);

			let steps = this.props.checklists.steps;

			console.log("steps", steps);

			console.log("steps.length", steps.length);

			console.log("newid", steps.length + 1);

			let newStep = {
				finished: false,
				id: steps.length,
				name: this.state.name
			}

			console.log("newStep", newStep);

			steps.push(newStep);

			console.log("steps", steps);

			this.props.addFirstStep(this.props.user.uid, this.props.checklists.checklistId, steps, () => {
				this.props.history.push(`/checklist/${this.props.match.params.id}`)
			})

			this.setState({
				name: ''
			})
		}


		event.preventDefault();
	}

	

	render(){

		const isInvalid =
	      this.state.name === ''


		return(

			<div>
				<h1>NEW STEP</h1>

				<form onSubmit={this.onSubmit} className="signUpForm" >

					<input
						className="loginInput"
						value={this.state.name}
						onChange={event => this.setState(byPropKey('name', event.target.value))}
						type="text"
						placeholder="Step Name"
					/>

					<button disabled={isInvalid} type="submit"> 
						Add Step
					</button>

				</form>
				
			</div>
		)	
	}
}

function mapStateToProps(state){

	console.log("mapStateToProps NEWSTEP COMPONENT", state);

	return { user: state.user,
			 checklists: state.checklists.current_checklist };	
}


export default connect(mapStateToProps, {
	getChecklist: getChecklist,
	addFirstStep: addFirstStep,
	addStep: addStep,
})(NewStep);