import React, { Component }  from 'react'
import './style.css'

class ButtonApplication extends Component {

    render() {

        // props são os attributos que são passados junto da tag    
        const { onClick, text } = this.props

        return (
                <div>
                    <button className="btn-default" onClick={onClick}>{text} </button>   
                </div>
        )
    }
}

export default ButtonApplication