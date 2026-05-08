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
  updateSummary();
}

// Display numbers using loop
function displayNumbers() {
  document.getElementById("numbersList").innerText =
    numbers.length === 0 ? "No numbers added yet" : numbers.join(", ");
}

// Calculate total and average using loop
function updateSummary() {
  let sum = 0;

  for (let i = 0; i < numbers.length; i++) {
    sum += numbers[i];
  }

  document.getElementById("total").innerText = sum;
  document.getElementById("average").innerText =
    numbers.length === 0 ? 0 : (sum / numbers.length).toFixed(2);
}

function handleNumberKeydown(event) {
  if (event.key === "Enter") {
    addNumber();
  }
}
