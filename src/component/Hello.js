import React from "react";

// export const Hello = () => {
//     return (
//     <div>
//         <h1>Hello World jsx</h1>
//     </div>)
// };

const Hellojsx = ()=>{
    return React.createElement('div',{id:'Hello', className:'dummyclass'},
    React.createElement('h1',null,'Hello World jsx'))
}

export default Hellojsx
