
import '../style.css';

import React, { Component } from 'react';
import { connect } from 'react-redux';

//action creator
import { updateStep, deleteItem, changeStepName } from '../actions/checklist';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});


class ChecklistItem extends Component{

	constructor(props){
		super(props)

		this.state = {
			finished: '',
			id: '',
			name: '',
			class: '',
			subMenuIcon: 'hiddenIcon',
			editName: false,
			isShowing: true
		}
	}

	componentDidMount = () => {
		console.log("this.props", this.props);

		this.setState({
			finished: this.props.step.finished,
			id: this.props.step.id,
			name: this.props.step.name
		})

		console.log("this.state", this.state);
	}

	changeFinished = () => {

		console.log("THIS.STATE", this.state);

		console.log("change finish");

		console.log("this.props", this.props.step);

		let step = this.props.step;

		step.finished = (this.props.step.finished ? false : true);

		//console.log("step", step);

		this.setState({
			finished: step.finished
		})

		//here we need to update the step
		this.props.updateStep(this.props.user.uid, this.props.checklists.current_checklist.checklistId, this.props.step.id, step)

	}

	isFinished = () => {

		if(this.props.step.finished === false){ 
			return(
				<FontAwesomeIcon onClick={this.changeFinished} icon={['fal', 'square']} className='checklistItemNotFinished' />
			)
		} else {
			return(
				<FontAwesomeIcon onClick={this.changeFinished} icon={['fal', 'check-square']} className='checklistItemFinished' />
			)
		}
	}

	//need to make sure I get this
	deleteItem = () => {

		console.log("delete item");

		this.props.deleteItem(this.props.user.uid, this.props.checklists.current_checklist.checklistId, this.state.id)

		this.setState({
			isShowing: false
		})
	}

	editName = () => {

		this.setState({
			editName: true
		})
	}

	changeName = (event) => {

		console.log(this.state.name);
		this.props.changeStepName(this.props.user.uid, this.props.checklists.current_checklist.checklistId, this.props.step.id, this.state.name)

		this.setState({
			editName: false,
			class: 'hideChecklistItemMenu',
			subMenuIcon: 'hiddenIcon'
		})

		event.preventDefault();
	}

	slide = () => {
		console.log("slide");


		if(this.state.class === '' || this.state.class === 'hideChecklistItemMenu'){
			this.setState({
				class: 'showChecklistItemMenu',
				subMenuIcon: 'showingIcon'
			})
		} else {
			this.setState({
				class: 'hideChecklistItemMenu',
				subMenuIcon: 'hiddenIcon'
			})
		}
	}

	renderName = () => {
		//console.log("THIS>PROPS", this.props)
		if(this.state.editName){

			return (
				<form onSubmit={this.changeName} >
					<input
						className="newChecklistName"
						value={this.state.name}
						onChange={event => this.setState(byPropKey('name', event.target.value))}
						onBlur={this.changeName}
						onSubmit={this.changeName}
						type="text"	
					/>
				</form>
			)

		} else {
			return( 
				
				<span className='itemNameWrapper'> {this.state.name} </span>
			)
		}
	}

	printItem = () => {

		if(this.state.isShowing){
			return (
				<div className="checklistItem">

					<span className="checklistItemName">
						<div className={this.state.class} id={this.state.id} >

							<FontAwesomeIcon onClick={this.deleteItem} icon={['fal', 'trash-alt']} className={this.state.subMenuIcon} />

							<FontAwesomeIcon onClick={this.editName} icon={['fal', 'pen']} className={this.state.subMenuIcon} />

						</div>


						<span onClick={this.slide} className='itemOptionBuffer'></span>	
						<FontAwesomeIcon onClick={this.slide} icon={['fal', 'ellipsis-v']} className='checklistItemOption' />
						<span onClick={this.slide} className='itemOptionBuffer'></span>	
						
						
						<span className='itemNameWrapper'>
							{this.renderName()}
						</span>
					</span>

					

					{this.isFinished()}

				</div>
			)
		} else {
			
		}
	}



	render(){
		return(

			<div>
				{this.printItem()}
			</div>
			
		)	
	}
}

function mapStateToProps(state){

	console.log("mapStateToProps", state);


	return { 
		user: state.user,
		checklists: state.checklists,
		};	
}



export default connect(mapStateToProps, {
	updateStep: updateStep,
	deleteItem: deleteItem,
	changeStepName: changeStepName
})(ChecklistItem);