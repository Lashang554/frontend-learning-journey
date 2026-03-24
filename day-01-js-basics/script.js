// Variables
let message = "Welcome to Day 01 JavaScript!";
console.log(message);

// Functions
function add() {
  let num1 = Number(document.getElementById("num1").value);
  let num2 = Number(document.getElementById("num2").value);

  let result = num1 + num2;
  displayResult(result);
}

function subtract() {
  let num1 = Number(document.getElementById("num1").value);
  let num2 = Number(document.getElementById("num2").value);

  let result = num1 - num2;
  displayResult(result);
}

function multiply() {
  let num1 = Number(document.getElementById("num1").value);
  let num2 = Number(document.getElementById("num2").value);

  let result = num1 * num2;
  displayResult(result);
}

function divide() {
  let num1 = Number(document.getElementById("num1").value);
  let num2 = Number(document.getElementById("num2").value);

  if (num2 === 0) {
    displayResult("Cannot divide by zero");
    return;
  }

  let result = num1 / num2;
  displayResult(result);
}

// Helper function
function displayResult(value) {
  document.getElementById("result").innerText = "Result: " + value;
}