import React from "react";

class Message extends React.Component {
    constructor(){
        super()
        this.state = {
            message: 'welcome visitor'
        }
    }

    changeState(){
        this.setState({
            message: 'thank you for subscribing'
        })
    }
    render() {
        return (
        <div>
            <h1>{this.state.message}</h1>
            <button onClick={() => this.changeState()}>subscribe</button>
        </div>
        )
    }
}

export default Message;