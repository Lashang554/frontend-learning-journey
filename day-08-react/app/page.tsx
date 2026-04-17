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



// "use client";

// import { useState } from "react";

// export default function Home() {
//   const [task, setTask] = useState<string>("");
//   const [tasks, setTasks] = useState<string[]>([]);

//   const addTask = () => {
//     if (task.trim() === "") return;

//     setTasks([...tasks, task]);
//     setTask("");
//   };

//   const deleteTask = (index: number) => {
//     setTasks(tasks.filter((_, i) => i !== index));
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-4">

//       {/* Card */}
//       <div className="w-full max-w-md bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl p-6">

//         {/* Title */}
//         <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
//           📝 My Todo App
//         </h1>

//         {/* Input Section */}
//         <div className="flex gap-2 mb-6 text-gray-900">
//           <input
//             value={task}
//             onChange={(e) => setTask(e.target.value)}
//             placeholder="Write a task..."
//             className="flex-1 px-4 py-2 border rounded-xl outline-none focus:ring-2 focus:ring-purple-400"
//           />

//           <button
//             onClick={addTask}
//             className="px-5 py-2 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition"
//           >
//             Add
//           </button>
//         </div>

//         {/* Task List */}
//         <ul className="space-y-3">
//           {tasks.length === 0 ? (
//             <p className="text-center text-gray-500">
//               No tasks yet 🚀 Add your first task
//             </p>
//           ) : (
//             tasks.map((t, index) => (
//               <li
//                 key={index}
//                 className="flex justify-between items-center bg-gray-100 p-3 rounded-xl shadow-sm hover:shadow-md transition"
//               >
//                 <span className="text-gray-800">{t}</span>

//                 <button
//                   onClick={() => deleteTask(index)}
//                   className="text-red-500 hover:text-red-700 font-bold"
//                 >
//                   ✖
//                 </button>
//               </li>
//             ))
//           )}
//         </ul>

//       </div>
//     </div>
//   );
// }





// "use client";

// import { useState, useEffect } from "react";

// export default function Home() {
//   const [task, setTask] = useState<string>("");
//   type Task = {
//     text: string;
//     completed: boolean;
//   };

//   const [tasks, setTasks] = useState<Task[]>([]);

//   const addTask = () => {
//     if (task.trim() === "") return;

//     setTasks([...tasks, { text: task, completed: false }]);
//     setTask("");
//   };

//   const deleteTask = (index: number) => {
//     setTasks(tasks.filter((_, i) => i !== index));
//   };
//   const toggleComplete = (index: number) => {
//     const newTasks = [...tasks];
//     newTasks[index].completed = !newTasks[index].completed;
//     setTasks(newTasks);
//   };

//   // load tasks
//   useEffect(() => {
//     const saved = localStorage.getItem("tasks");
//     if (saved) {
//       setTasks(JSON.parse(saved));
//     }
//   }, []);

//   // save tasks
//   useEffect(() => {
//     localStorage.setItem("tasks", JSON.stringify(tasks));
//   }, [tasks]);


//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-4">

//       {/* Card */}
//       <div className="w-full max-w-md bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl p-6">

//         {/* Title */}
//         <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
//           📝 My Todo App
//         </h1>

//         {/* Input Section */}
//         <div className="flex gap-2 mb-6 text-gray-900">
//           <input
//             value={task}
//             onChange={(e) => setTask(e.target.value)}
//             placeholder="Write a task..."
//             className="flex-1 px-4 py-2 border rounded-xl outline-none focus:ring-2 focus:ring-purple-400"
//           />

//           <button
//             onClick={addTask}
//             className="px-5 py-2 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition"
//           >
//             Add
//           </button>
//         </div>

//         {/* Task List */}
//         <ul className="space-y-3">
//           {tasks.length === 0 ? (
//             <p className="text-center text-gray-500">
//               No tasks yet 🚀 Add your first task
//             </p>
//           ) : (
//             tasks.map((t, index) => (
//               <li
//                 key={index}
//                 className="flex justify-between items-center bg-gray-100 p-3 rounded-xl shadow-sm hover:shadow-md transition"
//               >
//                 <span
//                   onClick={() => toggleComplete(index)}
//                   className={`cursor-pointer ${t.completed ? "line-through text-gray-400" : "text-gray-800"
//                     }`}
//                 >
//                   {t.text}
//                 </span>
//                 <button
//                   onClick={() => deleteTask(index)}
//                   className="text-red-500 hover:text-red-700 font-bold"
//                 >
//                   ✖
//                 </button>
//               </li>
//             ))
//           )}
//         </ul>

//       </div>
//     </div>
//   );
// }




// {🔍 Search tasks
// 🎯 Filter (All / Active / Completed)
// 🎨 Tabs UI}

"use client";

import { useState, useEffect } from "react";

type Task = {
  text: string;
  completed: boolean;
};

export default function Home() {
  const [task, setTask] = useState<string>("");
  const [tasks, setTasks] = useState<Task[]>([]);

  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");
  const [search, setSearch] = useState<string>("");

  // ➕ Add task
  const addTask = () => {
    if (task.trim() === "") return;

    setTasks([...tasks, { text: task, completed: false }]);
    setTask("");
  };

  // ❌ Delete
  const deleteTask = (index: number) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  // ✔ Toggle complete
  const toggleComplete = (index: number) => {
    const newTasks = [...tasks];
    newTasks[index].completed = !newTasks[index].completed;
    setTasks(newTasks);
  };

  // 💾 Load
  useEffect(() => {
    const saved = localStorage.getItem("tasks");
    if (saved) {
      setTasks(JSON.parse(saved));
    }
  }, []);

  // 💾 Save
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // 🔍 Filter logic
  const filteredTasks = tasks.filter((t) => {
    if (filter === "active" && t.completed) return false;
    if (filter === "completed" && !t.completed) return false;

    if (!t.text.toLowerCase().includes(search.toLowerCase())) return false;

    return true;
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-4">
      <div className="w-full max-w-md bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl p-6">

        {/* Title */}
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">
          📝 My Todo App
        </h1>

        {/* 🔍 SEARCH */}
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search tasks..."
          className="w-full mb-4 px-4 py-2 border rounded-xl"
        />

        {/* 🎯 FILTER BUTTONS */}
        <div className="flex justify-between mb-4">
          <button
            onClick={() => setFilter("all")}
            className={`px-3 py-1 rounded ${
              filter === "all" ? "bg-purple-600 text-white" : "bg-gray-200"
            }`}
          >
            All
          </button>

          <button
            onClick={() => setFilter("active")}
            className={`px-3 py-1 rounded ${
              filter === "active" ? "bg-purple-600 text-white" : "bg-gray-200"
            }`}
          >
            Active
          </button>

          <button
            onClick={() => setFilter("completed")}
            className={`px-3 py-1 rounded ${
              filter === "completed"
                ? "bg-purple-600 text-white"
                : "bg-gray-200"
            }`}
          >
            Completed
          </button>
        </div>

        {/* Input */}
        <div className="flex gap-2 mb-6 text-gray-900">
          <input
            value={task}
            onChange={(e) => setTask(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") addTask();
            }}
            placeholder="Write a task..."
            className="flex-1 px-4 py-2 border rounded-xl outline-none focus:ring-2 focus:ring-purple-400"
          />

          <button
            onClick={addTask}
            className="px-5 py-2 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition"
          >
            Add
          </button>
        </div>

        {/* Task List */}
        <ul className="space-y-3">
          {filteredTasks.length === 0 ? (
            <p className="text-center text-gray-500">
              No tasks found 🚀
            </p>
          ) : (
            filteredTasks.map((t, index) => (
              <li
                key={index}
                className="flex justify-between items-center bg-gray-100 p-3 rounded-xl shadow-sm hover:shadow-md transition"
              >
                <span
                  onClick={() => toggleComplete(index)}
                  className={`cursor-pointer ${
                    t.completed
                      ? "line-through text-gray-400"
                      : "text-gray-800"
                  }`}
                >
                  {t.text}
                </span>

                <button
                  onClick={() => deleteTask(index)}
                  className="text-red-500 hover:text-red-700 font-bold"
                >
                  ✖
                </button>
              </li>
            ))
          )}
        </ul>

      </div>
    </div>
  );
}