import React, { Component } from 'react';
import fire from './fire';
import firebase from 'firebase';
import Phaser from 'phaser';
import Canvas from './Canvas';
import io from 'socket.io-client'
import { WSAEINVALIDPROVIDER } from 'constants';

const socket = io('http://localhost:5010');

const config = {
	type: Phaser.AUTO,
	width: window.innerWidth,
	height: window.innerHeight-150,
	physics: {
			default: 'arcade',
			arcade: {
				gravity: { y: 0 }
			}
	},
	scene: {
			preload: preload,
			create: create
	},
	canvasStyle: "position: absolute; left: 0; top: 150px; width: 100vw; height: calc( 100vh - 150px );" // object-fit:contain;"
};
function preload () {
		this.load.setBaseURL('http://labs.phaser.io');

		this.load.image('sky', 'assets/skies/space3.png');
		this.load.image('logo', 'assets/sprites/phaser3-logo.png');
		this.load.image('red', 'assets/particles/red.png');
}

var boxA;
var boxB;
var ground;

function create () {
	this.add.image(400, 300, 'sky');

	boxA = this.physics.add.image(80, 80, 'logo');
	boxB = this.physics.add.image(80, 80, 'logo');
	ground = this.physics.add.image(810, 60, 'logo');
}

class Game extends Component {
	render() {
		return (
			<React.Fragment>
				<h1>Game</h1>
				<p>Box A position: (<span id='bAPosX'/>, <span id='bAPosY'/>)</p>
				<p>Box A velocity: (<span id='bAVelX'/>, <span id='bAVelY'/>)</p>
			</React.Fragment>
		);
	}

	componentDidMount() {
		var game = new Phaser.Game(config);
		window.addEventListener('resize', e => {
			console.log();
			game.resize(window.innerWidth, window.innerHeight - 150);
			game.scene.getAt(0).cameras.cameras[0].setSize(window.innerWidth, window.innerHeight - 150);
		});

		socket.on('spatial update', (space)=>{
			if (boxA) {
				boxA.setPosition(space.objects['1'].position.x, space.objects['1'].position.y);
				boxA.setVelocity(space.objects['1'].velocity.x, space.objects['1'].velocity.y);
				boxA.setAngle(space.objects['1'].angle * (180/Math.PI));
				boxA.setAngularVelocity(space.objects['1'].angularVelocity * (180/Math.PI));
				boxB.setPosition(space.objects['2'].position.x, space.objects['2'].position.y);
				boxB.setVelocity(space.objects['2'].velocity.x, space.objects['2'].velocity.y);
				boxB.setAngle(space.objects['2'].angle * (180/Math.PI));
				boxB.setAngularVelocity(space.objects['2'].angularVelocity * (180/Math.PI));
				ground.setPosition(space.objects['3'].position.x, space.objects['3'].position.y);
				ground.setVelocity(space.objects['3'].velocity.x, space.objects['3'].velocity.y);
				ground.setAngle(space.objects['3'].angle * (180/Math.PI));
				ground.setAngularVelocity(space.objects['3'].angularVelocity * (180/Math.PI));
			}
			document.getElementById('bAPosX').innerText = space.objects['1'].position.x;
			document.getElementById('bAPosY').innerText = space.objects['1'].position.y;
			document.getElementById('bAVelX').innerText = space.objects['1'].velocity.x;
			document.getElementById('bAVelY').innerText = space.objects['1'].velocity.y;
		});
	}
}

export default Game;
