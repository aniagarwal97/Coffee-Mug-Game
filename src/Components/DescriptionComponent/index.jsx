import React, { Component } from 'react'
//importing styles
import './styles.css';

export default class Description extends Component {
	constructor() {
		super();
		this.state = {
			hideDescription: false
		}
		this.handleCheckboxClick = this.handleCheckboxClick.bind(this);
		this.handleDescriptionSubmit = this.handleDescriptionSubmit.bind(this)
	}

	handleCheckboxClick(event) {
		this.setState({
			hideDescription: event.target.checked
		})
	}

	handleDescriptionSubmit() {
		localStorage.setItem('hideDescription', this.state.hideDescription)
		this.props.history.push('/game')
	}
	
	render() {
		return (
			<div className="description-page">
				<p className="description-heading">How to play the coffee game:</p>
				<p>The cups will fill from time to time. You can drink them empty by clicking on a cup. Try to drink all cups before they get too full. <br /> The speed of the filling process will increase after time.</p>
				<div><input type="checkbox" style={{ verticalAlign: 'middle' }} onChange={(event) => this.handleCheckboxClick(event)} /> Don't show this description again</div>
				<div style={{ textAlign: 'center' }}>
					<button className="start-button" onClick={this.handleDescriptionSubmit} style={{ textAlign: 'Center' }}>Start</button>
				</div>
			</div>
		)
	}
}
