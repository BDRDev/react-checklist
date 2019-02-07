import { db } from './firebase';

// User API

export const doCreateUser = (id, email, first, last) =>
  db.ref(`users/${id}/userData`).set({
    email,
    first,
    last
  });
  

export const onceGetUsers = () => 
  db.ref('users').once('value');


export const getSingleUser = (id) => 
	db.ref('users/' + id + '/userData').once('value')

// Other Entity APIs ...


//CHECK LIST CALLS

export const doCreateChecklist = (id, checklistId, name) =>
	db.ref(`users/${id}/checklists/${checklistId}`).set({
		name,
		checklistId
	});

export const addFirstStepToChecklist = (id, checklistId, steps) => 
	db.ref(`users/${id}/checklists/${checklistId}/`).update({
		steps
		
	})

export const addStepToChecklist = (id, checklistId, steps) => 
	db.ref(`users/${id}/checklists/${checklistId}/`).update({
		1: steps
		
	})
  
export const getAllChecklists = userId => 
	db.ref(`users/${userId}/checklists`).once('value');


export const getSingleChecklist = (userId, checklistId) =>
	db.ref(`users/${userId}/checklists/${checklistId}`).once('value');

export const updateStep = (userId, checklistId, stepId, step) => 
	db.ref(`users/${userId}/checklists/${checklistId}/steps/`).update({
		[stepId] : step
	})

export const updateSteps = (userId, checklistId, steps) => 
	db.ref(`users/${userId}/checklists/${checklistId}/`).update({
		steps
	})

export const deleteStep = (userId, checklistId, stepId) => 
	db.ref(`users/${userId}/checklists/${checklistId}/steps/${stepId}`).remove();


export const deleteChecklist = (userId, checklistId) => 
	db.ref(`users/${userId}/checklists/${checklistId}`).remove();


export const updateChecklistName = (userId, checklistId, name) => 
	db.ref(`users/${userId}/checklists/${checklistId}/`).update({
		'name': name
	})

export const updateStepName = (userId, checklistId, stepId, name) => 
	db.ref(`users/${userId}/checklists/${checklistId}/steps/${stepId}/`).update({
		'name' : name
	})

export const newChecklistId = () => {
	return db.ref().child('users').push().key;
}
