import firebase from 'firebase';

// Initialize Firebase
var config = {
	apiKey: "AIzaSyCvga9xfbFOWpjGBYUif4ILjUpaXOC7YCY",
  authDomain: "univer2e-68942.firebaseapp.com",
	databaseURL: "https://univer2e-68942.firebaseio.com",
	projectId: "univer2e-68942",
	storageBucket: "univer2e-68942.appspot.com",
	messagingSenderId: "717740353191"
};
const fire = firebase.initializeApp(config);

export default fire;