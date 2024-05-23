import React from "react";

// function greet(){
//     return <h1>Hello World</h1>
// }

// const Greet = () => <h1>Hello World</h1>;


const Greet = (props) => {
    console.log=props

    return <h1>Hello {props.name}</h1>
};
export default Greet
