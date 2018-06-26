import firebase from 'firebase';
import React, { Component } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import Game from './Game';
import Login from './Login';

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			user: null
		}

		firebase.auth().onAuthStateChanged(user => {
			console.log('Auth changed', user);
			this.setState({ user: user });
		});
	}

	render() {
		return (
			<BrowserRouter>
				<Switch>
					{this.state.user ?
						<React.Fragment>
							<Route exact path='/' component={Game} />
							<Redirect from='/login' to='/' />
						</React.Fragment>
						:
						<React.Fragment>
							<Route path='/login' component={Login} />
							<Redirect exact from='/' to='/login' />
						</React.Fragment>
					}
				</Switch>
			</BrowserRouter>
		);
	}
}

export default App;
