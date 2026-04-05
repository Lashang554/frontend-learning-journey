let tasks = [];

function addTask() {
  let input = document.getElementById("taskInput");
  let value = input.value;

  if (value === "") return;

  tasks.push(value);
  input.value = "";

  displayTasks();
}

function displayTasks() {
  let list = document.getElementById("taskList");
  list.innerHTML = "";

  for (let i = 0; i < tasks.length; i++) {

    let li = document.createElement("li");
    li.className = "flex justify-between bg-gray-200 p-2 rounded";

    // Task text
    let span = document.createElement("span");
    span.innerText = tasks[i];

    // Delete button
    let btn = document.createElement("button");
    btn.innerText = "Delete";
    btn.className = "text-red-500";

    // 5. Delete logic
    btn.onclick = function () {
      tasks.splice(i, 1); // remove item
      displayTasks();     // refresh UI
    };

    li.appendChild(span);
    li.appendChild(btn);

    list.appendChild(li);
  }
}