


import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import * as routes from '../constants/routes';

import { logout } from '../actions';

class Navigation extends Component{

	logOut = () => {

		console.log(this.props.user);
		this.props.logout();
	}

	renderNav = () => {

		if(this.props.user.uid !== ""){
			return(
				<div className="navBar">
					<div><Link to={routes.LANDING}>Landing</Link></div>
					<div><Link to={routes.HOME}>Home</Link></div>
					<div className="logOut" onClick={this.logOut}>Log Out</div>
				</div>
			)
		} else {
			return(
				<div className="navBar">
					<div><Link to={routes.LANDING}>Landing</Link></div>
					<div><Link to={routes.SIGN_IN}>Sign In</Link></div>
					<div><Link to={routes.SIGN_UP}>Sign Up</Link></div>
				</div>
			)
		}

	}


	render(){

		return(

		<div>
			<div>
				
				{this.renderNav()}

				
			</div>
		</div>
		)
	}

}

function mapStateToProps(state){

	//console.log("mapStateToProps FROM NAVIGATION", state.user);

	return { user: state.user };	
}

export default connect(mapStateToProps, {logout: logout})(Navigation);