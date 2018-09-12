// React Dependencies
import React from "react";
import ReactDOM from "react-dom";
// import 
// import components
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './Routes';
import Header from './Components/HeaderComponent';

export default class App extends React.Component {
	render() {
		return (
			<div>
				<Header />
				<Router>
					<Routes />
				</Router>
			</div>
		);
	}
}

ReactDOM.render(<App />, document.getElementById("root"));

// Hot Module Replacement
if (module.hot) {
	//dev mode
	module.hot.accept();
} else {
	// production mode
}
