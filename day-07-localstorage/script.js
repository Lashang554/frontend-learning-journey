// // 1. Store tasks
// let tasks = [];

// // 2. Add task
// function addTask() {
//   let input = document.getElementById("taskInput");
//   let value = input.value;

//   if (value === "") return;

//   tasks.push(value);

//   console.log(tasks); // check in console

//   input.value = "";
// }

let tasks = [];

function addTask() {
  let input = document.getElementById("taskInput");
  let value = input.value;

  if (value === "") return;

  tasks.push(value);

  input.value = "";

  displayTasks(); // show tasks
}

// 3. Display tasks
function displayTasks() {
  let list = document.getElementById("taskList");

  list.innerHTML = "";

  for (let i = 0; i < tasks.length; i++) {
    let li = document.createElement("li");
    li.innerText = tasks[i];

    list.appendChild(li);
  }
}