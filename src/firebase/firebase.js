

//The file where all the configuration goes that you have seen previously on your Firebase dashboard. 
//In addition, Firebase itself will be instantiated in this file.




import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const config = {
	apiKey: "AIzaSyDHA2eP9Qa8qcK_A-oO0OV1BKM8AIBqvPg",
	authDomain: "reactfirebase-2c145.firebaseapp.com",
	databaseURL: "https://reactfirebase-2c145.firebaseio.com",
	projectId: "reactfirebase-2c145",
	storageBucket: "reactfirebase-2c145.appspot.com",
	messagingSenderId: "162095875407"
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const auth = firebase.auth();
const db = firebase.database();

export {
  auth,
  db
};
