// function App() {

// const users = ["Ram","Hari","Sita"];

// return (
//   <div>
//    {users.map((user,index)=>(
//       <p key={index}>{user}</p>
//    ))}
//   </div>
// )

// }

// export default App;


// map object
// function App() {

// const users = [
//  {id:1,name:"Ram",age:20},
//  {id:2,name:"Hari",age:22},
//  {id:3,name:"Sita",age:19}
// ];

// return (
// <div>
// <h1>Users</h1>

// {users.map((user)=>(
// <div key={user.id}>
// <h3>{user.name}</h3>
// <p>{user.age}</p>
// </div>
// ))}

// </div>
// )

// }

// export default App;


// Product cards
// function App(){

// const products = [
// {id:1,name:"Laptop",price:900},
// {id:2,name:"Phone",price:500}
// ]

// return(
// <div>

// {products.map(product=>(
// <div key={product.id}>
// <h2>{product.name}</h2>
// <p>${product.price}</p>
// </div>
// ))}

// </div>
// )

// }

// export default App


// Add search + map 
import {useState} from "react";

function App(){

const [search,setSearch] = useState("");

const users = ["Ram","Hari","Sita"];

const filtered = users.filter(user =>
 user.toLowerCase().includes(search.toLowerCase())
);

return(
<div>

<input
value={search}
onChange={(e)=>setSearch(e.target.value)}
placeholder="search"
/>

{filtered.map((user,index)=>(
<p key={index}>{user}</p>
))}

</div>
)

}

export default App
