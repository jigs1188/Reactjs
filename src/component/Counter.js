import React, { Component } from 'react'

export class Counter extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
         count:0
      }
    }

    increment(){
    //     this.setState({
    //         count: this.state.count+1
    //     }
    // )

    // five increment 
      this.setState((prevState)=>{
        return {count:prevState.count+1}
      })

    }
    increFive(){
      this.increment()
      this.increment()
      this.increment()
      this.increment()
      this.increment()
    }
  render() {
    return (
      <div>
        <div>count - {this.state.count}</div>
        <button onClick={() => this.increment()}>Increment</button>
        <hr />
        <button onClick={() => this.increFive()}>Increment5</button>
      </div>
    )
  }
}

export default Counter
