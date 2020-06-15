import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/functions';
import 'firebase/analytics';

// Your web app's Firebase configuration
const config = {
  apiKey: 'AIzaSyBJN6iQiAzL4K4-rxH6WZJ3KSI1zABRIHM',
  authDomain: 'listen-together-hf.firebaseapp.com',
  databaseURL: 'https://listen-together-hf.firebaseio.com',
  projectId: 'listen-together-hf',
  storageBucket: 'listen-together-hf.appspot.com',
  messagingSenderId: '825222209044',
  appId: '1:825222209044:web:92cf00b67151bfef041101',
  measurementId: 'G-XFPTGVP38S',
};

firebase.initializeApp(config);
firebase.analytics();

export default firebase;
