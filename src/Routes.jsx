import React, { Component } from 'react'
import { Route } from 'react-router-dom'; //importing route from react-router-dom

// importing components
import Description from './Components/DescriptionComponent';
import Settings from './Components/SettingsComponent';
import GameScreen from './Components/GameScreen';

export default class Routes extends Component {
    render() {
        return (
            <div>
                <Route exact path="/" component={Settings} />
                <Route path="/description" component={Description} /> 
                <Route path="/game" component={GameScreen} />
            </div>
        )
    }
}