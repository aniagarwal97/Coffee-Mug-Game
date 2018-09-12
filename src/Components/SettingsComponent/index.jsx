import React, { Component } from 'react'
import './styles.css';
export default class Settings extends Component {
	constructor() {
		super();
		this.state = {
			cupsCount: 1,
		}
		this.onAdditionButtonClicked = this.onAdditionButtonClicked.bind(this);
		this.onSubtractionButtonClicked = this.onSubtractionButtonClicked.bind(this);
		this.onChangeCupValue = this.onChangeCupValue.bind(this);
		this.handleSettingsSubmit = this.handleSettingsSubmit.bind(this);
	}

	componentDidMount() {
		if (!localStorage.getItem('minutes') && !localStorage.getItem('seconds')) {
			localStorage.setItem('minutes', 0)
			localStorage.setItem('seconds', 0)
		}
	}
	
	onAdditionButtonClicked() {
		if (this.state.cupsCount < 8) {
			this.setState({ cupsCount: this.state.cupsCount + 1 })
		}
	}
	
	onSubtractionButtonClicked() {
		if (this.state.cupsCount > 1) {
			this.setState({ cupsCount: this.state.cupsCount - 1 })
		}
	}
	
	onChangeCupValue(event) {
		if (event.target.validity.valid) {
			this.setState({
				cupsCount: event.target.value
			})
		}
		else {
			alert('Not an acceptable input value')
		}
	}
	
	handleSettingsSubmit() {
		localStorage.setItem('numberOfCoffeeMugs', this.state.cupsCount)
		if (localStorage.getItem('hideDescription')) { //conditional path selection
			this.props.history.push('/game')
		}
		else {
			this.props.history.push('/description')
		}

	}
	
	render() {
		return (
			<div className="cups-count">
				<p>Number of cups:</p>
				<div className="cups-input-button">
					<input className="cups-input" type="text" pattern="[1-8]*" value={this.state.cupsCount} onChange={event => this.onChangeCupValue(event)} />
					<div className="arrows">
						<button style={{ height: 27 }} onClick={this.onAdditionButtonClicked}><p className="arrow-icon">&#708;</p></button>
						<button style={{ marginTop: 10, height: 27 }} onClick={this.onSubtractionButtonClicked}><p className="arrow-icon">&#709;</p></button>
					</div>
				</div>
				<button className="start-button" onClick={this.handleSettingsSubmit}>Start</button>
			</div>
		)
	}
}
