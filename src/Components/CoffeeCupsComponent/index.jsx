import React, { Component } from 'react'

export default class CoffeeCups extends Component {
    constructor(props) {
        super(props);
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
            randomTime: this.props.currentRandomTime
        }
        this.handleCupClick = this.handleCupClick.bind(this);
    }
    
    componentWillReceiveProps(newProps) {
        if (newProps.gamePause || newProps.isGameOver) {
            return clearTimeout(this.timeOut)
        }
        else if (this.state.count < this.state.coffeeCupsArray.length - 1 && !newProps.gamePause && !newProps.isGameOver) {
            this.timeOut = setTimeout(() => {
                this.setState((prevState) => {
                    if (!newProps.gamePause && !newProps.isGameOver)
                        return { count: prevState.count + 1 }
                })
            }, newProps.currentRandomTime);
        }
        if (this.state.count == 5) {
            this.props.onCupTooFull() //when the cup gets too full
            clearTimeout(this.timeOut)
        }
    }

    handleCupClick() { //Cup Click handler
        if (this.timeOut) {
            clearTimeout(this.timeOut)
        }
        if (!this.props.gamePause) {
            this.setState({
                count: 0
            })
        }
    }

    render() {
        return (
            <div style={{ display: 'inline-block', width: '25%', margin: '10 0' }}>
                <img src={(this.state.coffeeCupsArray[this.state.count])} onClick={this.handleCupClick} />
            </div>
        )
    }
}
