let tasks = [];

// Add Task
function addTask() {
  let input = document.getElementById("taskInput");
  let value = input.value;

  if (value === "") return;

  // Store as object (NEW 🔥)
  tasks.push({
    text: value,
    completed: false
  });

  input.value = "";
  displayTasks();
}


// Show Tasks
function displayTasks() {
  let list = document.getElementById("taskList");
  list.innerHTML = "";

  for (let i = 0; i < tasks.length; i++) {

    let task = tasks[i];

    let li = document.createElement("li");
    li.className = "flex justify-between items-center bg-gray-100 p-3 rounded-lg shadow-sm";

    // Task text
    let span = document.createElement("span");
    span.innerText = task.text;

    // If completed → strike
    if (task.completed) {
      span.className = "line-through text-gray-400";
    }

    // Buttons container
    let div = document.createElement("div");
    div.className = "flex gap-2";

    // Complete button
    let completeBtn = document.createElement("button");
    completeBtn.innerText = "✔";
    completeBtn.className = "text-green-500";

    completeBtn.onclick = function () {
      tasks[i].completed = !tasks[i].completed;
      displayTasks();
    };

    // Delete button
    let deleteBtn = document.createElement("button");
    deleteBtn.innerText = "✖";
    deleteBtn.className = "text-red-500";

    deleteBtn.onclick = function () {
      tasks.splice(i, 1);
      displayTasks();
    };

    div.appendChild(completeBtn);
    div.appendChild(deleteBtn);

    li.appendChild(span);
    li.appendChild(div);

    list.appendChild(li);
  }
}


// Clear All Tasks
function clearAll() {
  tasks = [];
  displayTasks();
}