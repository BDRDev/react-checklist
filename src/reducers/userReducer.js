
import { ACTION_TEST, LOGIN, SIGN_UP, LOGOUT, GET_SINGLE_USER, OTHER_FORM_DATA } from '../actions';

//mine: uJ5ndoZbXxcpaXCdkPfsIJ9FZNj2
const INITIAL_STATE = {
	uid: ''
}

export default function(state = INITIAL_STATE, action){

	switch(action.type){

		case ACTION_TEST: 

			console.log("ACTION_TEST case from reducer");

			return state;

		case LOGIN: 

			console.log("LOGIN case from reducer");
			console.log("action", action);

			return { ...state, 'uid': action.payload }


		case SIGN_UP:

			console.log("signup from reduces");
			console.log("action", action);

			console.log("ACTION.PAYLOAD.USER", action.payload.user);

			return { ...state, 'uid': action.payload.user.uid,
				'email': action.payload.user.email}

		case LOGOUT:



			console.log("logout from reduces");
			console.log("STATE", state);
			console.log("action", action);

			if(action.payload === "success"){
				console.log("user has logged out");

				state = INITIAL_STATE;
			}

			return state

		case GET_SINGLE_USER:

			console.log("get single user from reducer");
			console.log("action.payload", action.payload);

			return {...state, 'userData': action.payload}

		case OTHER_FORM_DATA:

			console.log("other form date reducer");
			console.log("action.payload", action.payload);

			let additionalFormData = action.payload;

			return {...state, additionalFormData}

		default: 
			return state;
	}
}