import '../style.css';

//dependencies
import React, { Component } from 'react';
import { connect } from 'react-redux';


import _ from 'lodash';

//constants for routes
import * as routes from '../constants/routes';

//action creators
import { getChecklist } from '../actions/checklist';

//components
import ChecklistItem from './ChecklistItem';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


class Checklist extends Component{

	constructor(props){
		super(props);

		if(this.props.user.uid === ''){
			this.props.history.push(routes.LANDING);
		}

		this.state = {
			checklistId: this.props.match.params.id
		}
	}

	componentDidMount = () => {

		console.log("checklist mounted")
		const checklistId = this.props.match.params.id;

		this.props.getChecklist(this.props.user.uid, checklistId);
	}

	getName = () => {

		if(this.props.checklists.current_checklist){
			return this.props.checklists.current_checklist.name
		}
	}

	goHome = () => {
		this.props.history.push('/home');
	}

	addStep = () => {
		console.log("go")

		this.props.history.push(`/checklist/${this.props.match.params.id}/new-step`)
	}



	displaySteps = () => {
		if(this.props.checklists.current_checklist){

			console.log("THIS IS DISPLAYING THE STEPS IN THE CHECKLIST COMPONENT")
			console.log("THIS.PROPS.CHECKLISTS.CHECKLISTS", this.props.checklists.checklists);
			console.log("THIS.STATE", this.state);

			console.log(this.props.checklists.checklists[this.state.checklistId]);

			let checklist = this.props.checklists.checklists[this.state.checklistId];

			let steps = checklist.steps;


			
			return _.map(steps, step => {

				console.log("STEP", step);

				if(step !== undefined){
					return (
						<ChecklistItem key={step.id} step={step} />
					)
				}
			})
		}
	}

	render(){
		return(

			<div className='checklistWrapper'>

				<div className='checklistTop'>
					<h1>{this.getName()}</h1>
					
					<FontAwesomeIcon className='checklistTopAdd' icon={['fal', 'plus']} onClick={this.addStep} />
				</div>

				<div className='checklistItems'>
					{this.displaySteps()}
				</div>


				<div className='checklistBot'>
					<FontAwesomeIcon className='checklistBack' onClick={this.goHome} icon={['fal', 'arrow-alt-left']} />
				</div>
			</div>
		)	
	}
}

function mapStateToProps(state){

	//console.log("mapStateToProps", state);

	return { 
		user: state.user,
		checklists: state.checklists 
	};	
}

export default connect(mapStateToProps, {
	getChecklist: getChecklist
})(Checklist);