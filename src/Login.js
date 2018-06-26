import React, { Component } from 'react';
import * as firebaseui from 'firebaseui';
import fire from './fire';
import firebase from 'firebase';

class App extends Component {
	render() {
		return (
			<div className="App">
				<header className="App-header">
					<h1 className="App-title">Login</h1>
				</header>
				<div id="firebaseui-auth-container"></div>
			</div>
		);
	}

	constructor(props) {
		super(props);
		var uiConfig = {
			signInSuccessUrl: '/',
			signInOptions: [
				// Leave the lines as is for the providers you want to offer your users.
				firebase.auth.GoogleAuthProvider.PROVIDER_ID,
				firebase.auth.EmailAuthProvider.PROVIDER_ID,
				// firebase.auth.GithubAuthProvider.PROVIDER_ID,
				// firebase.auth.FacebookAuthProvider.PROVIDER_ID,
				// firebase.auth.TwitterAuthProvider.PROVIDER_ID
			],
			// tosUrl: '<your-tos-url>'
		};

		var ui = new firebaseui.auth.AuthUI(fire.auth());
		
		// The start method will wait until the DOM is loaded.
		ui.start('#firebaseui-auth-container', uiConfig);
	}
}

export default App;
