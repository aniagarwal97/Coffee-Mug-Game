import React, { Component } from 'react'
import './styles.css';
import CoffeeCups from '../CoffeeCupsComponent';
import { minRandomNumberGenerator } from '../../Utils/Util';

export default class GameScreen extends Component {
    constructor() {
        super();
        this.state = {
            coffeeCupsArray: [
                require('../../Assets/cup_empty.png'),
                require('../../Assets/cup_fill_1.png'),
                require('../../Assets/cup_fill_2.png'),
                require('../../Assets/cup_fill_3.png'),
                require('../../Assets/cup_full.png'),
                require('../../Assets/cup_too_full.png')
            ],
            count: 0,
            minRandomNumber: 1000,
            isGamePause: false,
            clock: null,
            isGameOver: false
        }
        this.renderCups = this.renderCups.bind(this);
        this.handleGamePause = this.handleGamePause.bind(this);
        this.handleGameResume = this.handleGameResume.bind(this);
        this.gameOver = this.gameOver.bind(this);
        this.getRandomTime = this.getRandomTime.bind(this);
        this.calculateTime = this.calculateTime.bind(this);
        this.onRetryClick = this.onRetryClick.bind(this);
        this.onChangeSettingsClick = this.onChangeSettingsClick.bind(this);
    }

    componentDidMount() {
        this.time = 0;
        this.timer = setInterval(this.calculateTime, 1000);
        if (!this.state.isGamePause || !this.state.isGameOver) {
            this.interval = setInterval(this.getRandomTime, this.state.minRandomNumber);
        }
    }

    calculateTime() {  //Timer
        this.time += 1;
        this.minutes = Math.floor(this.time / 60);
        this.seconds = this.time - this.minutes * 60;
    }

    getRandomTime() {  //Random time for filling the cup
        var randomNumber = 0;
        randomNumber = minRandomNumberGenerator(this.state.minRandomNumber)
        this.setState((prevState) => {
            return {
                minRandomNumber: (randomNumber) ? (randomNumber) : prevState.minRandomNumber,
            }
        })
    }

    componentDidUpdate() {
        if (
            (!this.state.newHighScore
                &&
                (
                    (this.minutes > localStorage.getItem('minutes'))
                    ||
                    (
                        this.minutes == localStorage.getItem('minutes')
                        && this.seconds > localStorage.getItem('seconds')
                    )
                ))
        ) {
            this.setState({
                newHighScore: true
            })
        }
    }

    gameOver() { //when the game gets over
        if (this.state.newHighScore) {
            localStorage.setItem('minutes', this.minutes)
            localStorage.setItem('seconds', this.seconds)
        }
        clearInterval(this.interval);
        clearInterval(this.timer);
        this.setState({
            isGameOver: true
        })
    }

    componentWillUnmount() {
        clearInterval(this.interval);
        clearInterval(this.timer);
    }

    onRetryClick() {   //on pressing retry click when game over
        window.location.reload()
    }

    onChangeSettingsClick() {  //on pressing change settings button
        this.props.history.push('/')
    }

    renderCups() {
        var iterator;
        var coffeeCups = [];
        for (iterator = 0; iterator < localStorage.getItem('numberOfCoffeeMugs'); iterator++) {
            coffeeCups.push(
                <CoffeeCups
                    id={iterator}
                    key={iterator}
                    currentRandomTime={this.state.minRandomNumber}
                    gamePause={this.state.isGamePause}
                    onCupTooFull={this.gameOver}
                    isGameOver={this.state.isGameOver} />
            )
        }
        return coffeeCups
    }

    handleGamePause() {
        this.setState({
            isGamePause: true
        }, () => {
            clearInterval(this.interval)
            clearInterval(this.timer)
        })
    }

    handleGameResume() {  //
        this.setState({
            isGamePause: false
        })
        var x = 0;
        this.interval = setInterval(this.getRandomTime, this.state.minRandomNumber);
        this.timer = setInterval(this.calculateTime, 1000);
    }

    render() {
        return (
            <div style={{ textAlign: 'center', marginTop: 12 }}>
                {this.state.newHighScore ? <p>New High Score</p> : null}
                {this.renderCups()}
                <div>
                    <p style={{ color: 'blue', fontSize: 20 }}>{this.minutes}:{this.seconds}</p>
                    {
                        (this.state.isGameOver)
                        ?
                        <div>
                            <p>GAME OVER</p>
                            <button className="pause-button" onClick={this.onRetryClick}>Retry</button>
                            <br />
                            <button className="pause-button" onClick={this.onChangeSettingsClick}>Change Settings</button>
                        </div>
                        :
                        <div>
                            {(this.state.isGamePause) ?
                                <p style={{ color: '#e1b544', fontSize: 20 }}>Game Paused</p>
                                :
                                null
                            }
                            <button className="pause-button" onClick={(this.state.isGamePause) ? this.handleGameResume : this.handleGamePause} style={{ textAlign: 'Center' }}>{(this.state.isGamePause) ? 'Resume' : 'Pause'}</button>
                        </div>
                    }
                </div>
            </div>
        )
    }
}
