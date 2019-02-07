


import React, { Component } from 'react';
import { connect } from 'react-redux';



import * as routes from '../constants/routes';

//action creator
import { getSingleUser } from '../actions';

import ChecklistIndex from './ChecklistIndex';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'



class HomePage extends Component{

	constructor(props){
		super(props)

		if(this.props.user.uid === ''){
			this.props.history.push(routes.LANDING);
		}
	}

	componentWillReceiveProps = (nextProps) => {
		console.log("nextProps", nextProps);

		if(nextProps.user.uid === ''){
			this.props.history.push(routes.LANDING);
		}
	}

	componentDidMount = () => {

		console.log("component did mount");

		console.log("user id", this.props.user.uid);

		if(this.props.user.uid){
			this.props.getSingleUser(this.props.user.uid);
		}
	}

	showEmail = () => {
		if(this.props.user.userData){
			return <span>{this.props.user.userData.email}</span>
		}
	}

	showName = () => {
		if(this.props.user.userData){
			return <span>{this.props.user.userData.first} {this.props.user.userData.last}</span>
		}
	}

	render(){
		return(

			<div className='homeWrapper'>
				<div className="homeHolder">
					<div className='profileWrappper'>
						<h1>User Data</h1>

						<div>
							<FontAwesomeIcon className='profileIcon' icon={['fal', 'user']} />
							{this.showName()}
						</div>

						<div>
							<FontAwesomeIcon className='profileIcon' icon={['fal', 'at']} />
							{this.showEmail()}
						</div>
					</div>


					<div className='checklistWrapper'>
						<ChecklistIndex />
					</div>
				</div>
			</div>
		)	
	}
}

function mapStateToProps(state){
	return { user: state.user };	
}

export default connect(mapStateToProps, {
	getSingleUser: getSingleUser
})(HomePage);