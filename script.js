const mainContainer = document.querySelector("#mainContainer");
const newButton = document.querySelector("#newGridButton");
const clearButton = document.querySelector("#clearGridButton");
const brushToggle = document.querySelector("#toggleBrush");
const randomColorToggle = document.querySelector("#toggleColor");
let brush = true;
brushToggle.checked = brush;
let colorToggle = false;
randomColorToggle.checked = colorToggle;
let color = "rgb(0,255,0)";

<!-- prettier-ignore-start -->
function colorSelection(e) {    
  let parsedColor = e.srcElement.style.backgroundColor.match(/\d{1,3}/g);
  return `rgb(${Math.round(parsedColor[0] / 1.05)},${Math.round(parsedColor[1] / 1.05)},${Math.round(parsedColor[2] / 1.05)})`;
}
<!-- prettier-ignore-end -->

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
      randomColorToggle.blur();  
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
    elementName.addEventListener("mouseover", (x) => {
      if (brush) {
        if (colorToggle) {
          elementName.style.backgroundColor = randomColor();
        } else {          
          if(x.srcElement.style.backgroundColor === ""){
            elementName.style.backgroundColor = color;
          } else{
            elementName.style.backgroundColor = colorSelection(x);
          }
        }
      }
    });    
  }
  
}
function randomColor() {
  let randomCol = "";
  for (let i = 0; i < 3; i++) {
    randomCol += Math.floor(Math.random() * (255 - 1)).toString(16);
  }
  return "#" + randomCol;
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
  paintedDivs.forEach((x) => (x.style.backgroundColor = ""));
  this.blur();
}
