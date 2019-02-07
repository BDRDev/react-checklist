
import '../style.css';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import _ from 'lodash';



import * as routes from '../constants/routes';

import ChecklistTitle from './ChecklistTitle';

//action creator
import { createNewChecklist, getAllChecklists } from '../actions/checklist';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


class ChecklistIndex extends Component{

	constructor(props){
		super(props);

		this.state = {}
	}

	componentDidMount = () => {

		console.log("ChecklistIndex Did Mount");

		console.log("this.props", this.props.user.uid);

		this.props.getAllChecklists(this.props.user.uid);
	}

	newChecklist = () => {

		console.log("new checklist");

		console.log("this.props", this.props);

		this.props.createNewChecklist(this.props.user.uid, "myFirstChecklist");
	}

	addChecklist = () => {

		console.log(this.props)
	}

	items = (checklist) => {
		console.log('checklist', checklist);

		let items = checklist.steps
		let numItems = 0;
		let completedItems = 0;


		//here is where we need to look into changing an object into an array
		if(items && Array.isArray(items)){
			items.forEach((val, index) => {

				console.log(index, val)

				numItems++

				if(val.finished){ completedItems++ }
			})

			let toReturn = (completedItems + ' / ' + numItems)

			return toReturn;
		} else {
			return '0 / 0'
		}
	}


	displayChecklists = () => {

		console.log("DISPLAY CHECKLISTS");

		console.log("I THINK THIS IS ALL THE CHECKLISTS", this.props.checklists.checklists);

		return _.map(this.props.checklists.checklists, checklist => {

			console.log("checklist", checklist);

			return (
				<ChecklistTitle key={checklist.checklistId} checklist={checklist} />
			)
			
		})
	}

	render(){
		return(

			<div>
				<div className="checklistTop">
					<h1>CHECKLISTS</h1>

					<Link to={routes.NEW_CHECKLIST} >
					<FontAwesomeIcon className='checklistTopAdd' icon={['fal', 'plus']} onClick={this.addChecklist} />
					</Link>

					
				</div>

				<div className="allChecklists">
					{this.displayChecklists()}
				</div>
			</div>
		)	
	}
}

function mapStateToProps(state){

	console.log("mapStateToProps FROM CHECKLIST INDEX", state);

	return { 
		user: state.user,
		checklists: state.checklists 
	};	
}

export default connect(mapStateToProps, {
	createNewChecklist: createNewChecklist,
	getAllChecklists: getAllChecklists
})(ChecklistIndex);