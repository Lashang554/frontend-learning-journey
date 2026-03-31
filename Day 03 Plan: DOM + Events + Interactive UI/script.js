// Counter Logic
let count = 0;

const countDisplay = document.getElementById("count");
const increaseBtn = document.getElementById("increase");
const decreaseBtn = document.getElementById("decrease");

increaseBtn.addEventListener("click", function () {
  count++;
  countDisplay.innerText = count;
});

decreaseBtn.addEventListener("click", function () {
  count--;
  countDisplay.innerText = count;
});


// Todo Logic
const todoInput = document.getElementById("todoInput");
const addTodoBtn = document.getElementById("addTodo");
const todoList = document.getElementById("todoList");

addTodoBtn.addEventListener("click", function () {
  let task = todoInput.value;

  if (task === "") return;

  let li = document.createElement("li");
  li.innerText = task;

  todoList.appendChild(li);

  todoInput.value = "";
});