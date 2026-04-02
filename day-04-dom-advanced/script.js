// =============================
// DARK MODE LOGIC
// =============================

// Get the <body> element
let body = document.getElementById("body");

// Get the button
let themeBtn = document.getElementById("toggleTheme");

// When user clicks the button
themeBtn.addEventListener("click", function () {

  // Toggle background color
  // If bg-black is NOT present → add it
  // If bg-black IS present → remove it
  body.classList.toggle("bg-black");

  // Toggle text color
  body.classList.toggle("text-white");
});


// =============================
// SHOW / HIDE BOX LOGIC
// =============================

// Get the box
let box = document.getElementById("box");

// Get the button
let boxBtn = document.getElementById("toggleBox");

// When user clicks the button
boxBtn.addEventListener("click", function () {

  // Toggle "hidden" class
  // hidden = display: none (element disappears)
  box.classList.toggle("hidden");
});