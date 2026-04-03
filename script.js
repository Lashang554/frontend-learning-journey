function calculate(type) {

  // 1. Convert values to number
  let num1 = Number(document.getElementById("num1").value);
  let num2 = Number(document.getElementById("num2").value);

  // 2. Store result
  let result;

  // 3. Perform operation
  if (type === "add") {
    result = num1 + num2;
  } 
  else if (type === "sub") {
    result = num1 - num2;
  } 
  else if (type === "mul") {
    result = num1 * num2;
  } 
  else if (type === "div") {
    result = num1 / num2;
  }

  // 4. Log result (for now)
  console.log(result);
}