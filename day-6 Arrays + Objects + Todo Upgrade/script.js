// 1. Create array to store tasks
let tasks = [];

// 2. Add task function
function addTask() {
  let input = document.getElementById("taskInput");
  let value = input.value;

  if (value === "") return;

  // 3. Add task to array
  tasks.push(value);

  console.log(tasks);

  input.value = "";
}