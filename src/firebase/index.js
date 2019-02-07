
//This file is a simple entry point file to the Firebase module
//used to group and expose all the functionalities from the module to other modules in one file

//Shouldnt be necessary for other modules in this app to access any other file than
//this one to use its functionalities


import * as auth from './auth';
import * as firebase from './firebase';
import * as db from './db'

export {
  auth,
  firebase,
  db
};