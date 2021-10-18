const GRID_16 = 256;
const GRID_32 = 1024;
const GRID_48 = 2304;
const GRID_64 = 4096;

let currentColor = "#323232";
let currentMode = "dark";

const darkBtn = document.querySelector("#darkBtn");
const rainbowBtn = document.querySelector("#rainbowBtn");
const eraserBtn = document.querySelector("#eraserBtn");
const clearBtn = document.querySelector("#clearBtn");

const sketchDiv = document.querySelector("#sketch-container");

darkBtn.onclick = () => changeMode("dark");
rainbowBtn.onclick = () => changeMode("rainbow");
eraserBtn.onclick = () => changeMode("eraser");
clearBtn.onclick = () => clearScreen();

function changeMode(newMode) {
  toggleButton(newMode);
  currentMode = newMode;
}

// Draw a grid inside sketch container
function drawGrid(grid_size, grid_area) {
  sketchDiv.replaceChildren();
  sketchDiv.removeAttribute("style");
  sketchDiv.setAttribute(
    "style",
    `background-color: #f8f8f2; grid-template-columns: repeat(${grid_size}, 1fr); grid-template-rows: repeat(${grid_size}, 1fr);`
  );

  for (let i = 0; i < grid_area; i++) {
    let div = document.createElement("div");
    sketchDiv.addEventListener("mouseover", changeColor);
    sketchDiv.appendChild(div);
  }
}
// Wire input range and display value
const slider = document.getElementById("grid-size");
const sliderValue = document.getElementById("grid-size-value");
sliderValue.textContent = slider.value + " x " + slider.value;

// Draw grid according to size selection
slider.oninput = function () {
  sliderValue.textContent = this.value + " x " + this.value;

  switch (parseInt(this.value)) {
    case 16:
      drawGrid(16, GRID_16);
      break;
    case 32:
      drawGrid(32, GRID_32);
      break;
    case 48:
      drawGrid(48, GRID_48);
      break;
    case 64:
      drawGrid(64, GRID_64);
      break;
  }
};

// Resets the grid back to default
function clearScreen() {
  let children = [...sketchDiv.childNodes];
  children.forEach(function (child) {
    child.setAttribute("style", "background-color: #f8f8f2");
  });

  if (currentMode == "eraser") {
    changeMode("dark");
  }
}

// Changes current color mode on button press
function changeColor(e) {
  if (currentMode == "rainbow") {
    let r_value = Math.floor(Math.random() * 256);
    let g_value = Math.floor(Math.random() * 256);
    let b_value = Math.floor(Math.random() * 256);

    e.target.style.backgroundColor = `rgb(${r_value}, ${g_value}, ${b_value})`;
  } else if (currentMode == "dark") {
    e.target.style.backgroundColor = "#44475a";
  } else if (currentMode == "eraser") {
    e.target.style.backgroundColor = "#fefefe";
  }
}

// Toggles buttons for easier understanding of current mode
function toggleButton(newMode) {
  switch (currentMode) {
    case "rainbow":
      rainbowBtn.classList.remove("toggle");
      break;
    case "eraser":
      eraserBtn.classList.remove("toggle");
      break;
    case "dark":
      darkBtn.classList.remove("toggle");
      break;
  }

  switch (newMode) {
    case "rainbow":
      rainbowBtn.classList.add("toggle");
      break;
    case "eraser":
      eraserBtn.classList.add("toggle");
      break;
    case "dark":
      darkBtn.classList.add("toggle");
      break;
  }
}

window.onload = () => {
  drawGrid(16, GRID_16);
  toggleButton(currentMode);
};
