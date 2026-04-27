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
function App() {

const users = [
 {id:1,name:"Ram",age:20},
 {id:2,name:"Hari",age:22},
 {id:3,name:"Sita",age:19}
];

return (
<div>
<h1>Users</h1>

{users.map((user)=>(
<div key={user.id}>
<h3>{user.name}</h3>
<p>{user.age}</p>
</div>
))}

</div>
)

}

export default App;
