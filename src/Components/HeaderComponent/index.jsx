import React, { Component } from 'react'
import './styles.css'
export default class Header extends Component {
  
  render() {
    return (
      <div className="header-bar">
        <span className='app-name'>Coffee game</span>
        <img className='header-image' src={require('../../Assets/cup_too_full.png')} />
      </div>
    )
  }
}