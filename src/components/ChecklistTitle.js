
import '../style.css';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';


//action creator
import { deleteChecklist, updateSteps, changeChecklistName } from '../actions/checklist';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});


class ChecklistTitle extends Component{

	constructor(props){
		super(props)

		this.state = {
			name: '',
			class: '',
			subMenuIcon: 'hiddenIcon',
			editName: false,
			isShowing: true
		}


		console.log("CHECKLIST ITEM CONSTRUCTOR");
	}

	componentDidMount = () => {
		console.log("this.props", this.props);

		this.setState({
			name: this.props.checklist.name,
			checklistId: this.props.checklist.checklistId,
			class: '',
			subMenuIcon: 'hiddenIcon',
		})

		console.log("this.state", this.state);
	}

	//need to make sure I get this
	deleteItem = () => {

		console.log("delete item");

		//this.props.deleteItem(this.props.user.uid, this.props.checklists.current_checklist.checklistId, this.state.id)

		this.props.deleteChecklist(this.props.user.uid,this.props.checklist.checklistId);

		this.setState({
			isShowing: false
		})
	}

	editName = () => {

		this.setState({
			editName: true
		})

	}

	slide = () => {
		//console.log("slide");


		if(this.state.class === '' || this.state.class === 'hideChecklistTitleMenu'){
			this.setState({
				class: 'showChecklistTitleMenu',
				subMenuIcon: 'showingIcon'
			})
		} else {
			this.setState({
				class: 'hideChecklistTitleMenu',
				subMenuIcon: 'hiddenIcon'
			})
		}
	}

	resetItems = () => {
		console.log("reset items");

		console.log(this.props.checklist);

		let items = this.props.checklist.steps;

		if(items && Array.isArray(items)){

			items.forEach((val, index) => {
				val.finished = false;
			});

		};

		console.log('items', items);


		this.props.updateSteps(this.props.user.uid, this.props.checklist.checklistId, items);

		this.setState({
			class: 'hideChecklistTitleMenu',
			subMenuIcon: 'hiddenIcon'
		})

	}

	numItems = () => {
		let items = this.props.checklist.steps
		let numItems = 0;
		let completedItems = 0;


		//here is where we need to look into changing an object into an array
		if(items && Array.isArray(items)){
			items.forEach((val, index) => {

				//console.log(index, val)

				numItems++

				if(val.finished){ completedItems++ }
			})

			let toReturn = (completedItems + ' / ' + numItems)

			return toReturn;
		} else {
			return '0 / 0'
		}
	}

	changeName = () => {
		console.log("click out");

		console.log(this.props);

		console.log(this.state)

		console.log('THIS IS THE NAME THAT IS GOING', this.state.name);

		this.props.changeChecklistName(this.props.user.uid, this.props.checklist.checklistId, this.state.name)

		this.setState({
			editName: false,
			class: 'hideChecklistTitleMenu',
			subMenuIcon: 'hiddenIcon'
		})
	}

	renderName = () => {
		if(this.state.editName){

			return (
				<form onSubmit={this.changeName} >
					<input
						className="newChecklistName"
						value={this.state.name}
						onChange={event => this.setState(byPropKey('name', event.target.value))}
						onBlur={this.changeName}
						type="text"	
					/>
				</form>
			)

		} else {
			return( 
				<Link className="checklistLink" to={`/checklist/${this.state.checklistId}`}>
					<span className='itemNameWrapper'> {this.props.checklist.name} </span>
				</Link>

			)
		}
	}
	

	printItem = () => {

		if(this.state.isShowing){
			return (
				<div className="checklistItem">
				
					<span className="checklistItemName">
						<div className={this.state.class} id='' >

							<FontAwesomeIcon onClick={this.deleteItem} icon={['fal', 'trash-alt']} className={this.state.subMenuIcon} />

							<FontAwesomeIcon onClick={this.editName} icon={['fal', 'pen']} className={this.state.subMenuIcon} />

							<FontAwesomeIcon onClick={this.resetItems} icon={['fal', 'redo']} className={this.state.subMenuIcon} />

						</div>


						<span onClick={this.slide} className='itemOptionBuffer'></span>	
						<FontAwesomeIcon onClick={this.slide} icon={['fal', 'ellipsis-v']} className='checklistItemOption' />
						<span onClick={this.slide} className='itemOptionBuffer'></span>	
						
						
						
						{ this.renderName() }
						

				

					</span>

					<div className='singleChecklistEnd'>
						{this.numItems()}
					</div>
				</div>
			)
		} else {
			
		}
	}



	render(){
		return(

			<div>{this.printItem()}</div>
			
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
	deleteChecklist: deleteChecklist,
	updateSteps: updateSteps,
	changeChecklistName: changeChecklistName
})(ChecklistTitle);