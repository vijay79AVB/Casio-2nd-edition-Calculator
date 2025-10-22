let display = document.getElementById("display");
let currentInput = "";
let shiftActive = false;
let powerOn = true;

// Append input
function append(value) {
  if (!powerOn) return; // ignore if calculator is off
  currentInput += value;
  updateDisplay();
}

// SHIFT toggle
function appendShift() {
  if (!powerOn) return;
  shiftActive = !shiftActive;
  // Optional: visually show shift mode (change background color)
  display.style.background = shiftActive
    ? "linear-gradient(180deg, #e5fdd07a 0%, #e5fdd07a 0%)"
    : "linear-gradient(180deg, #e5fdd07a 0%, #e5fdd07a 0%)";
}

// AC button
function clearAll() {
  if (!powerOn) return;

  // If Shift is active, turn off screen
  if (shiftActive) {
    powerOn = false;
    shiftActive = false;
    display.textContent = "";
    display.style.background = "#222"; // dark screen (off)
    display.style.boxShadow = "inset 0 0 10px #000";
    return;
  }

  // Normal AC clears input
  currentInput = "";
  updateDisplay();
}

// Turn ON (using "On" button)
function pushFunc(funcName) {
  if (funcName === "On") {
    powerOn = true;
    display.style.background =
      "linear-gradient(180deg, #dbe3c6 0%, #c7d1a3 100%)";
    updateDisplay();
    return;
  }

  // other functions
  if (!powerOn) return;

  switch (funcName) {
    case "log()":
      currentInput += "Math.log10(";
      break;
    case "sqrt( )":
      currentInput += "Math.sqrt(";
      break;
    case "sin( )":
      currentInput += "Math.sin(";
      break;
    case "cos( )":
      currentInput += "Math.cos(";
      break;
    case "tan( )":
      currentInput += "Math.tan(";
      break;
    case "xʸ":
      currentInput += "**";
      break;
    default:
      currentInput += funcName;
      break;
  }
  updateDisplay();
}

// Delete last character
function deleteOne() {
  if (!powerOn) return;
  currentInput = currentInput.slice(0, -1);
  updateDisplay();
}

// Evaluate result
function Result() {
  if (!powerOn) return;
  try {
    let expression = currentInput
      .replace(/÷/g, "/")
      .replace(/×/g, "*")
      .replace(/x/g, "*");
    let result = eval(expression);
    display.textContent = result;
    currentInput = result.toString();
  } catch {
    display.textContent = "Error";
    currentInput = "";
  }
}

function updateDisplay() {
  if (!powerOn) return;
  display.textContent = currentInput || "0";
}
