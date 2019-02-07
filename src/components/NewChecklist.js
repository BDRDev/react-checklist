


import React, { Component } from 'react';
import { connect } from 'react-redux';




import * as routes from '../constants/routes';

//action creator
import { createNewChecklist } from '../actions/checklist';

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});


class NewChecklist extends Component{

	constructor(props){
		super(props)

		if(this.props.user.uid === ''){
			this.props.history.push(routes.LANDING);
		}

		this.state = {
			name: ''
		}
	}

	newChecklist = () => {

		console.log("new checklist");

		console.log("this.props", this.props);

		this.props.createNewChecklist(this.props.user.uid, "myFirstChecklist");
	}

	onSubmit = (event) => {

		console.log("form Submit", this.state.name);
		console.log(this.props);

		this.props.createNewChecklist(this.props.user.uid, this.state.name, () => {

			console.log("GO BACK TO THE CHECKLIST INDEX PAGE")
			this.props.history.push('/home');
		});


		event.preventDefault();
	}

	

	render(){

		const isInvalid =
	      this.state.name === ''


		return(

			<div>
				<h1>NEW CHECKLIST</h1>

				<form onSubmit={this.onSubmit} className="signUpForm" >

					<input
						className="loginInput"
						value={this.state.name}
						onChange={event => this.setState(byPropKey('name', event.target.value))}
						type="text"
						placeholder="Checklist Name"
					/>

					<button disabled={isInvalid} type="submit"> 
						Create Checklist
					</button>

				</form>
				
			</div>
		)	
	}
}

function mapStateToProps(state){

	console.log("mapStateToProps", state);

	return { user: state.user };	
}


export default connect(mapStateToProps, {
	createNewChecklist: createNewChecklist
})(NewChecklist);