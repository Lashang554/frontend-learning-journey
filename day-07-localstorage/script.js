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

// let tasks = [];

// function addTask() {
//   let input = document.getElementById("taskInput");
//   let value = input.value;

//   if (value === "") return;

//   tasks.push(value);

//   input.value = "";

//   displayTasks(); // show tasks
// }

// // 3. Display tasks
// function displayTasks() {
//   let list = document.getElementById("taskList");

//   list.innerHTML = "";

//   for (let i = 0; i < tasks.length; i++) {
//     let li = document.createElement("li");
//     li.innerText = tasks[i];

//     list.appendChild(li);
//   }
// }



// 1. Task array
let tasks = [];

// 2. Load tasks from localStorage
function loadTasks() {
  let saved = localStorage.getItem("tasks");

  if (saved) {
    tasks = JSON.parse(saved);
  }
}

// 3. Save tasks
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// 4. Add task
function addTask() {
  let input = document.getElementById("taskInput");
  let value = input.value;

  if (value === "") return;

  tasks.push(value);

  input.value = "";

  saveTasks();     // save data
  displayTasks();  // update UI
}

// 5. Display tasks
function displayTasks() {
  let list = document.getElementById("taskList");

  list.innerHTML = "";

  for (let i = 0; i < tasks.length; i++) {
    let li = document.createElement("li");
    li.innerText = tasks[i];

    list.appendChild(li);
  }
}

// 6. Run on load
loadTasks();
displayTasks();