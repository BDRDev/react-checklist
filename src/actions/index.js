
//import all of the react authentication and database functions

import { auth, db, firebase } from '../firebase'; 


export const ADD_DATA = 'add_data';
export const SIGN_UP = 'sign_up';
export const CREATE_USER = 'create_user';
export const LOGOUT = 'logout';
export const LOGIN = 'logIn';
export const GET_SINGLE_USER = 'get_single_user';
export const OTHER_FORM_DATA = 'other_form_data';
export const ACTION_TEST = 'action_test';


export function addData(name, email){

	console.log("addData() from the action creator");

	//var newKey = firebase.database().ref().child('users').push().key;

	firebase.database().ref('users/blake').set({
	username: name,
	email: email

	}).then(() => {

		//here we need to make a call to get the data we just got. Everything is going to be based off of email
		console.log("data was successfuly added");

		firebase.database().ref('/users/blake').once('value').then(function(snapshot){
		    console.log(snapshot.val());
		  })
	});

	return {
		type: ACTION_TEST,
		payload: "test"
	}
}

export const signUp = (email, password) => async dispatch => {

	const data = await auth.doCreateUserWithEmailAndPassword(email, password);

	dispatch({
		type: SIGN_UP,
		payload: data
	});
}

export const createUser = (uid, email, first, last) => async dispatch => {

	let user = db.doCreateUser(uid, email, first, last);

	dispatch({
		type: CREATE_USER,
		data: user
	});
}

export const logout = uid => async dispatch => {

	console.log('logout action')

	// const data = auth.doSignOut().then(function(){
	// 	console.log("success");

	// 	return "success"
	// }).catch(function(){
	// 	console.log("error");

	// 	return "error"
	// })

	const data = await auth.doSignOut();

	console.log('data', data);

	dispatch({
		type: LOGOUT,
		payload: 'success'
	});
}

export const getSingleUser = uid => async (dispatch) => {

	const data = await db.getSingleUser(uid);

	dispatch({
		type: GET_SINGLE_USER,
		payload: data.val()
	});
}


//this can be expanded, is used for saving sign up form data then put into the user account when its created
export function saveOtherFormData(first, last){

	let formData = {
		'first': first,
		'last': last
	}

	console.log("FORM DATA", formData);

	return {
		type: OTHER_FORM_DATA,
		payload: formData
	}
}

export const logIn = (email, password) => async(dispatch, getState) => {

	const data = await auth.doSignInWithEmailAndPassword(email, password);

	dispatch({
		type: LOGIN,
		payload: data.user.uid
	});
}