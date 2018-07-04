import React, { Component } from 'react';

class GameCanvas extends Component {

	render() {
		const style = {
			width: "100%",
			height: "100%",
			objectFit: "contain"
		}

		return (
			<canvas style={style} />
		)
	}
}

export default GameCanvas