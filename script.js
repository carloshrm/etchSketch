const mainContainer = document.querySelector("#mainContainer");
const newButton = document.querySelector("#newGridButton");
const clearButton = document.querySelector("#clearGridButton");
const brushToggle = document.querySelector("#toggleBrush");
const randomColorToggle = document.querySelector("#toggleColor");
let brush = true;
brushToggle.checked = brush;
let colorToggle = false;
randomColorToggle.checked = colorToggle;
let colorSelection = "#00d0c0";

window.addEventListener("keydown", grabToggleKey);
newButton.addEventListener("click", makeNewGrid);
clearButton.addEventListener("click", clearGrid);
brushToggle.addEventListener("click", changeBrushState);
randomColorToggle.addEventListener("click", changeColorState);

function changeBrushState() {
  brush === true ? (brush = false) : (brush = true);
}
function changeColorState() {
  colorToggle === true ? (colorToggle = false) : (colorToggle = true);
}
function grabToggleKey(e) {
  if (e.keyCode === 32) {
    changeBrushState(brush);
    brushToggle.checked === true
      ? (brushToggle.checked = false)
      : (brushToggle.checked = true);
  }
}
makeGridElements(32);
function makeGridElements(number) {
  for (let i = 0; i < number; i++) {
    const divGrid = document.createElement("div");
    setupDivElement(divGrid);
    mainContainer.appendChild(divGrid);
  }
  subGridArray = Array.from(mainContainer.querySelectorAll("div"));
  subGridArray.forEach((div) => {
    for (let j = 0; j < number; j++) {
      const subGrid = document.createElement("div");
      setupDivElement(subGrid);
      div.appendChild(subGrid);
    }
  });

  function setupDivElement(elementName) {
    elementName.classList.add("divGrid");
    elementName.addEventListener("mouseover", () => {
      if (brush) {
        if (colorToggle) {
          elementName.style.backgroundColor = randomColor();
        } else {
          elementName.style.backgroundColor = colorSelection;
        }
      }
    });
  }
}
function randomColor() {
  let color = "";
  for (let i = 0; i < 3; i++) {
    color += Math.floor(Math.random() * (255 - 1)).toString(16);
  }
  return "#" + color;
}

function makeNewGrid() {
  let newGridSize = +window.prompt("Enter a number for the grid size: ");
  Math.floor(newGridSize, 100);
  while (mainContainer.hasChildNodes()) {
    mainContainer.removeChild(mainContainer.lastChild);
  }
  makeGridElements(newGridSize);
  this.blur();
}

function clearGrid() {
  let paintedDivs = document.querySelectorAll(".divGrid");
  paintedDivs.forEach((x) => (x.style.backgroundColor = "#ffffff"));
  this.blur();
}
