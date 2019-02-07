
//Component that will hold the form to allow users to Sign Up

import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as routes from '../constants/routes';

//action creator
import { signUp, createUser, saveOtherFormData } from '../actions';

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});

class SignUpPage extends Component {

	constructor(props){
		super(props);

		this.state = {
			first: 'Blake',
			last: 'Robertson',
			email: 'blaker1136@gmail.com',
			passwordOne: 'password',
			passwordTwo: 'password',
			error: ''
		}

	}


	componentWillReceiveProps(nextProps){
		console.log("nextProps", nextProps);

		if(nextProps.user.uid){
			console.log("signUp Component", nextProps.user.uid, nextProps.user.email);


			//additionalFormData is completely optional, this is my method of saving user data from the signUp form
			this.props.createUser(nextProps.user.uid, nextProps.user.email, nextProps.user.additionalFormData.first, nextProps.user.additionalFormData.last,)

			if(nextProps.user.uid){
				this.toHomePage();
			}
		}
	}

	toHomePage = () => {
		this.props.history.push(routes.HOME);
	}

	onSubmit = (event) => {
		console.log("Sign Up Form Submitted");

		console.log("form data", this.state);

		this.props.signUp(this.state.email, this.state.passwordOne);

		this.props.saveOtherFormData(this.state.first, this.state.last)


		event.preventDefault();
	}

	render(){

		 const isInvalid =
      this.state.passwordOne !== this.state.passwordTwo ||
      this.state.passwordOne === '' ||
      this.state.email === '' ||
      this.state.username === '';

		return(
			<div>
				<h1>Sign Up Page</h1>

				<form onSubmit={this.onSubmit} className="signUpForm">

				<input
					className="loginInput"
					value={this.state.first}
					onChange={event => this.setState(byPropKey('first', event.target.value))}
					type="text"
					placeholder="First"
				/>

				<input
					className="loginInput"
					value={this.state.last}
					onChange={event => this.setState(byPropKey('last', event.target.value))}
					type="text"
					placeholder="Last"
				/>

				<input
					className="signUpInput"
					value={this.state.email}
					onChange={event => this.setState(byPropKey('email', event.target.value))}
					type="email"
					placeholder="Email"
				/>

				<input
					className="signUpInput"
					value={this.state.passwordOne}
					onChange={event => this.setState(byPropKey('passwordOne', event.target.value))}
					type="password"
					placeholder="Password"
				/>

				<input
					className="signUpInput"
					value={this.state.passwordTwo}
					onChange={event => this.setState(byPropKey('passwordTwo', event.target.value))}
					type="password"
					placeholder="Confirm Password"
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


//connects component to action creator
export default connect(mapStateToProps, {
	signUp: signUp,
	createUser: createUser,
	saveOtherFormData: saveOtherFormData
})(SignUpPage);