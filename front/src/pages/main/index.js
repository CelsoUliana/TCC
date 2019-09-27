import React, { Component } from 'react'
import logo from '../../assets/images/favicon.ico'
import ButtonDefault from '../../Components/button/index'

import './style.css'

class MainPage extends Component {

    state = {
     btnText: ''   
    }

    componentDidMount() {

    }

    render() {
        return (
            <div className="home">
                <div className="image-container">
                    <img alt="app" src={logo} />
                </div>
                <div className="group-button">
                    <ButtonDefault text="mapa"/>
                    <ButtonDefault text="menu"/>
                </div>
            </div>
        )
    }
}

export default MainPage