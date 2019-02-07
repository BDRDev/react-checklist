

import { db } from '../firebase';


export const NEW_CHECKLIST = 'new_checklist';
export const ALL_CHECKLISTS = 'all_checklists';
export const SINGLE_CHECKLIST = 'single_checklist';
export const UPDATE_STEPS = 'update_steps';
export const CHANGE_CHECKLIST_NAME = 'change_chacklist_name';
export const CHANGE_STEP_NAME = 'change_step_name';
export const ADD_STEPS = 'add_steps';



//later on may need to generate an id for this instead of just doing it by name
//or we will have to check for the name and if the name exists just add a 2 to the end of it idk
export function createNewChecklist(id, name, callback){

	console.log("create a new checklist action");

	let newKey = db.newChecklistId()

	let newChecklist = db.doCreateChecklist(id, newKey, name).then(() => callback())


	return {
		type: NEW_CHECKLIST,
		payload: newChecklist
	}

}

export const deleteChecklist = (id, checklistId) => async dispatch => {
	
	let deleteChecklist = await db.deleteChecklist(id, checklistId);

	return {
		type: NEW_CHECKLIST,
		payload: deleteChecklist
	}
}

export const getAllChecklists = userId => async (dispatch, getState) => {

	console.log("getAllChecklists action", userId);

	const allChecklists = await db.getAllChecklists(userId);

	console.log('allChecklists', allChecklists.val());

	dispatch({
		type: ALL_CHECKLISTS,
		payload: allChecklists.val()
	})


}

export const getChecklist = (id, checklistId) => async (dispatch) => {

	const checklist = await db.getSingleChecklist(id, checklistId);

	dispatch({
		type: SINGLE_CHECKLIST,
		payload: checklist.val()
	});
}

export function addFirstStep(id, checklistId, steps, callback){

	console.log("add first step to a checklist");

	console.log("THIS IS ADDING A STEP STEP: ", steps);

	let newStep = db.addFirstStepToChecklist(id, checklistId, steps).then(() => {
		callback();
	})


	let data = {
		checklistId: checklistId,
		steps: steps
	}

	return {
		type: ADD_STEPS,
		payload: data
	}
}

export function addStep(id, checklistId, step){
	console.log("add another step to checklist");

	let newStep = db.addStepToChecklist(id, checklistId, step)

	return {
		type: NEW_CHECKLIST,
		payload: 'test for now'
	}
}

export function updateStep(id, checklistId, stepId, step){
	console.log("update a checklist step");

	let newStep = db.updateStep(id, checklistId, stepId, step);

	return {
		type: NEW_CHECKLIST,
		payload: 'test for now'
	}
}

export const updateSteps = (id, checklistId, steps) => async dispatch => {

	let newSteps = await db.updateSteps(id, checklistId, steps);

	return {
		type: UPDATE_STEPS,
		payload: {
			'checklistId' : checklistId,
			'steps' : steps,
			'other': newSteps
		}
	}
}

export function deleteItem(id, checklistId, stepId, callback){

	db.deleteStep(id, checklistId, stepId);

	return {
		type: NEW_CHECKLIST,
		payload: 'test for now'
	}
}

export function changeChecklistName(userId, checklistId, name){

	db.updateChecklistName(userId, checklistId, name);

	let data = {
		userId: userId,
		checklistId: checklistId,
		name: name
	}

	return {
		type: CHANGE_CHECKLIST_NAME,
		payload: data
	}
}

export function changeStepName(userId, checklistId, stepId, name){

	console.log("chamge step name");

	db.updateStepName(userId, checklistId, stepId, name);

	let data = {
		userId : userId,
		checklistId : checklistId,
		stepId : stepId,
		name : name
	}

	return {
		type: CHANGE_STEP_NAME,
		payload: data
	}

}