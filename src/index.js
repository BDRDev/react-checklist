import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

import './style.css';

import thunk from 'redux-thunk';

import App from './components/App';

import reducers from './reducers';

//used for FontAwesome Icons
import { library } from '@fortawesome/fontawesome-svg-core';

import { faEllipsisV, faSquare, faCheckSquare, faPlus, faArrowAltLeft, faTrashAlt, faPen, faRedo, faAt, faUser } from '@fortawesome/pro-light-svg-icons';



library.add(faEllipsisV, faSquare, faCheckSquare, faPlus, faArrowAltLeft, faTrashAlt, faPen, faRedo, faAt, faUser);

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
  	<div className='fullPage' >
	    <App />
    </div>
  </Provider>
  , document.querySelector('#root'));