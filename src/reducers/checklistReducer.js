

import { NEW_CHECKLIST, ALL_CHECKLISTS, SINGLE_CHECKLIST, UPDATE_STEPS, CHANGE_CHECKLIST_NAME, CHANGE_STEP_NAME, ADD_STEPS } from '../actions/checklist';

const INITIAL_STATE = {

}


export default function(state = INITIAL_STATE, action){

	switch(action.type){

		case NEW_CHECKLIST:

			console.log("new checklist reducer");

			return state;

		case ALL_CHECKLISTS:

			console.log("all checklists reducer", action.payload);

			let checklists = action.payload;

			console.log(checklists);

			return { ...state, checklists }

		case SINGLE_CHECKLIST:

			console.log("single_checklist reducer", action.payload);

			return { ...state, 'current_checklist' : action.payload }

		case UPDATE_STEPS:

			console.log("update steps reducer", action.payload);
			let checkId = action.payload.checklistId;
			console.log(checkId);
			console.log('state', state.checklists)

			checklists = state.checklists;

			
			return { ...state, [action.payload.checklistId] : (Object.assign({}, checklists[action.payload.checklistId],  {
						steps: [
							action.payload.steps
						]
					})
				)
			}

		case CHANGE_CHECKLIST_NAME: 
			console.log("change checklist name reducer", action.payload);

			console.log("STATE", state);
			console.log("STATE.CHECKLISTS", state.checklists);

			console.log("THIS IS THE ONE WERE WORKING WITH", state.checklists[action.payload.checklistId])

			return { ...state,
						checklists : {
							...state.checklists,
							[action.payload.checklistId] : {
								...state.checklists[action.payload.checklistId],
								name: action.payload.name
							}

						}
					}


		case CHANGE_STEP_NAME:

			console.log(state.checklists[action.payload.checklistId].steps)

			//here is where we are going to loop through the array of step

			let steps = state.checklists[action.payload.checklistId].steps;

			steps.forEach((step, index) => {
				console.log(index, step);

				if(step.id === action.payload.stepId){
					step.name = action.payload.name
				}
			})

			console.log('steps', steps);



			return { ...state,
						checklists : {
							...state.checklists,
							[action.payload.checklistId] : {
								...state.checklists[action.payload.checklistId],
									steps: steps
								}
							}
						}

		case ADD_STEPS:


			return { ...state,
						checklists : {
							...state.checklists,
							[action.payload.checklistId] : {
								...state.checklists[action.payload.checklistId],
									steps: action.payload.steps
								}
							}
						}



		default: 
			return state;
	}

}