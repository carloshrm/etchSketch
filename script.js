const mainContainer = document.querySelector("#mainContainer");
const newButton = document.querySelector("#newGridButton");
const clearButton = document.querySelector("#clearGridButton");
const brushToggle = document.querySelector("#toggleBrush");
let brush = true;
brushToggle.checked = brush;

window.addEventListener("keydown", grabToggleKey);

newButton.addEventListener("click", makeNewGrid);
clearButton.addEventListener("click", clearGrid);
brushToggle.addEventListener("click", changeBrushState);

function changeBrushState() {
  brush === true ? (brush = false) : (brush = true);
}
function grabToggleKey(e) {
  if (e.keyCode === 32) {
    changeBrushState();
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
      if (brush === true) {
        elementName.classList.add("divGridHover");
      }
    });
  }
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
  let paintedDivs = document.querySelectorAll(".divGridHover");
  paintedDivs.forEach((x) => x.classList.remove("divGridHover"));
  this.blur();
}
