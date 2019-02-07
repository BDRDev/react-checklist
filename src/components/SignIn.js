


import React, { Component } from 'react';
import { connect } from 'react-redux';


import * as routes from '../constants/routes';

//action creator
import { logIn } from '../actions';

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});

class SignInPage extends Component {

	constructor(props) {
		super(props);

		this.state = {
			email: 'blaker1136@gmail.com',
			password: 'password',
			error: '',
		}
	}

	//This runs when a user has tried to log in, if we get an id returned
	//we take the, to the homepage
	componentWillReceiveProps(nextProps){
		console.log("nextProps", nextProps);

		if(nextProps.user.uid){
			this.toHomePage();
		}
	}

	toHomePage = () => {
		console.log("toHomePage");
		this.props.history.push(routes.HOME);
	}

	onSubmit = (event) => {
		console.log("Form has been Submitted");

		console.log("form", this.state);

		this.props.logIn(this.state.email, this.state.password);

		event.preventDefault();
	}

	render(){

		const isInvalid =
	      this.state.password === '' ||
	      this.state.email === '';

		return(
			<div>
			<h1>Sign In Page</h1>

			<form onSubmit={this.onSubmit} className="signInForm">

			

			<input
				className="loginInput"
				value={this.state.email}
				onChange={event => this.setState(byPropKey('email', event.target.value))}
				type="email"
				placeholder="Email"
			/>

			<input
				className="loginInput"
				value={this.state.password}
				onChange={event => this.setState(byPropKey('password', event.target.value))}
				type="password"
				placeholder="Password"
			/>

			<button disabled={isInvalid} type="submit"> 
				Sign In
			</button>

			</form>	
			</div>
		)
	}
}

function mapStateToProps(state){

	console.log("mapStateToProps", state.user);

	return { user: state.user };	
}

export default connect(mapStateToProps, {
	logIn: logIn
})(SignInPage);