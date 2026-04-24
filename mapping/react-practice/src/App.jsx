function App() {

const users = ["Ram","Hari","Sita"];

return (
  <div>
   {users.map((user,index)=>(
      <p key={index}>{user}</p>
   ))}
  </div>
)

}

export default App;