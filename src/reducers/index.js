import { combineReducers } from 'redux';

import userReducer from './userReducer'
import checklistReducer from './checklistReducer';

const rootReducer = combineReducers({
   user: userReducer,
   checklists: checklistReducer
});

export default rootReducer;