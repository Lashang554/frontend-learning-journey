// 1. Store tasks
let tasks = [];

// 2. Add task
function addTask() {
  let input = document.getElementById("taskInput");
  let value = input.value;

  if (value === "") return;

  tasks.push(value);

  console.log(tasks); // check in console

  input.value = "";
}