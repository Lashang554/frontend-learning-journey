// Array to store numbers
let numbers = [];

function addNumber() {
  let input = document.getElementById("numberInput");
  let value = Number(input.value);

  if (input.value === "") return;

  // Add number to array
  numbers.push(value);

  // Clear input
  input.value = "";

  // Update UI
  displayNumbers();
  calculateTotal();
}

// Display numbers using loop
function displayNumbers() {
  let list = "";

  for (let i = 0; i < numbers.length; i++) {
    list += numbers[i] + ", ";
  }

  document.getElementById("numbersList").innerText = list;
}

// Calculate total using loop
function calculateTotal() {
  let sum = 0;

  for (let i = 0; i < numbers.length; i++) {
    sum += numbers[i];
  }

  document.getElementById("total").innerText = sum;
}