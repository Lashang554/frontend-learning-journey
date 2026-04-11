// "use client";

// import { useState } from "react";

// export default function Home() {
//   const [count, setCount] = useState(0);

//   return (
//     <div style={{ padding: "20px", textAlign: "center" }}>
//       <h1>Counter App</h1>

//       <h2>{count}</h2>

//       <button onClick={() => setCount(count + 1)}>
//         ➕ Increase
//       </button>

//       <button onClick={() => setCount(count - 1)} style={{ marginLeft: "10px" }}>
//         ➖ Decrease
//       </button>
//     </div>
//   );
// }



"use client";

import { useState } from "react";

export default function Home() {
  const [task, setTask] = useState("");

  return (
    <div style={{ padding: "20px" }}>
      <h1>Todo App</h1>

      <input
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Enter task"
      />

      <button>Add</button>
    </div>
  );
}