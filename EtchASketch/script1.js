// containers
let mainDiv = document.querySelector(".main");
let gridContainer = document.querySelector("#sketchpad");

// row and col counters
let originalRowCount;
let originalColCount;

// buttons
let slider = document.querySelector(".slider");
let button = document.querySelector("#toggle");
let sliderShow = document.querySelector(".slider-value");
let clearBtn = document.getElementById("clear");
let sickoModeBtn = document.getElementById("sickoMode");
let eraserBtn = document.getElementById("eraser");
let picassoInput = document.getElementById("picasso");
let ratioIndicator = document.querySelector(".ratio-indicator");

// writing modes
let normal = true;
let sickomode = false;
let eraser = false;

// HELPER METHODS
// responsible for creating the cells
const createCell = () => {
    let cell = document.createElement("div");
    cell.classList.add("cell");
    gridContainer.appendChild(cell);
}
// reposonsible for adding event listeners to each of those cells
const attachCellEventListeners = () => {
    let cells = document.querySelectorAll(".cell");
    cells.forEach((cell) => {
        cell.addEventListener("mouseover", () => {
            if (normal) {
                //picassoInput.value
                cell.style.backgroundColor = `${picassoInput.value}`;
            }
            else if (sickomode) {
                let redVal = Math.floor(Math.random() * 255);
                let greenVal = Math.floor(Math.random() * 255);
                let blueVal = Math.floor(Math.random() * 255);
                cell.style.backgroundColor = `rgb(${redVal}, ${greenVal}, ${blueVal})`;
            }
            else if (eraser) {
                cell.style.backgroundColor = "wheat";
            }
        });
    });

};
// responsible for turning the canvas into either landscape mode or square mode
const attachGridEventListener = () => {
    // for landscape mode
    let landscapeButton = document.getElementById("toggle");
    landscapeButton.addEventListener("click", () => {
        if (landscapeButton.textContent != "Square Mode") {
            gridContainer.classList.add("grid-transformed");
            gridContainer.addEventListener("animationend", () => {
                gridContainer.style.width = "900px";
                switchToLandscapeMode();
            });
            landscapeButton.textContent = "Square Mode";
        }
        else if (landscapeButton.textContent == "Square Mode") {
            gridContainer.classList.remove("grid-transformed");
            gridContainer.classList.add("grid-transformed-narrow");
            gridContainer.addEventListener("animationend", () => {
                gridContainer.style.width = "650px;";
                initializeGrid();
            });
            landscapeButton.textContent = "Landscape Mode";
        }
    });
    // for sicko mode
    sickoModeBtn.addEventListener("click", () => {
        // normal writing when it was pressed
        if (!sickomode) {
            normal = false;
            sickomode = true;
            eraser = false;
        }
        // this button was pressed again to refer back to normal writing
        else {
            normal = true;
            sickomode = false;
            eraser = false;
        }
    });
    // for eraser mode
    eraserBtn.addEventListener("click", () => {
        // normal writing when it was pressed
        if (!eraser) {
            normal = false;
            sickomode = false;
            eraser = true;
        }
        else {
            normal = true;
            sickomode = false;
            eraser = false;
        }
    });
    // for clear button
    clearBtn.addEventListener("click", () => {
        if (button.textContent != "Square Mode") {
            initializeGrid();
        }
        else {
            switchToLandscapeMode();
        }
    });
}
// responsible for getting rid of the old sketchpads
const replaceExistingSketchPad = (padToReplace) => {
    // need to explicitly update the sketchpads present just to make sure
    let sketchpads = document.querySelectorAll("#sketchpad");
    // replace it with the inputted pad
    mainDiv.appendChild(padToReplace);
    mainDiv.removeChild(sketchpads[0]);
    // the grid container should be the only sketchpad present
   gridContainer = document.querySelector("#sketchpad");
}

// MAIN METHODS
const initializeGrid = () => {
    // get necessary data and update the main div with the current div (this is def unnecessary)
    let newSketchpadFractionals = "";
    let newNumOfCol = numberOfCols;
    let newNumOfRow = numberOfRows;
    let newSketchpad = document.createElement("div");
    mainDiv = document.querySelector(".main");
    
    // make the new div or "grid container" to resemble as much as the old grid
    newSketchpad.id = "sketchpad";
    newSketchpad.style.width = "650px";
    newSketchpad.classList.add("grid-container");
    newSketchpad.classList.add("nes-container");
    newSketchpad.classList.add("is-rounded");
    
    // update the slider indicator
    ratioIndicator.innerHTML = `${newNumOfRow} x ${newNumOfCol}`;

    // constructing the grid
    for (let rowCount = 0; rowCount < newNumOfRow; rowCount++) {
        for (let colCount = 0; colCount < newNumOfCol; colCount++) {
            let cell = document.createElement("div");
            cell.classList.add("cell");
            newSketchpad.appendChild(cell);
        }
        newSketchpadFractionals += "1fr ";
    }
    newSketchpad.style.gridTemplateColumns = newSketchpadFractionals; 
    
    // IMPORTANT!! make sure you now set the grid container variable to this one
    gridContainer = newSketchpad;
    replaceExistingSketchPad(newSketchpad);
    attachCellEventListeners();
}
// responsible for switching the pad to landscape mode
const switchToLandscapeMode = () => {
    // update the main div with this current div
    mainDiv = document.querySelector(".main");
    
    // make the new container grid and replicate it as much as possible to the original one
    let landScapePad = document.createElement("div");
    landScapePad.id = "sketchpad";
    landScapePad.classList.add("wider-grid-container");
    landScapePad.classList.add("nes-container");
    landScapePad.classList.add("is-rounded");
    let landscapeFractionals = "";

    // grid reconstruction should take place here
    // below equation is possible for cells to retain near to 1:1 ratio
    let newNumOfCol = Math.floor((gridContainer.offsetHeight * numberOfRows)/(gridContainer.offsetWidth));

    ratioIndicator.innerHTML = `${numberOfRows} x ${newNumOfCol}`;
    // grid construction
    for (let rowCount = 0; rowCount < numberOfRows; rowCount++) {
        for (let colCount = 0; colCount < newNumOfCol; colCount++) {
            // replicate the cell as much as possible
            let cell = document.createElement("div");
            cell.classList.add("cell");
            // append the child to the new sketchpad div
            landScapePad.appendChild(cell);
            
        }
        landscapeFractionals += "1fr ";
    }
    landScapePad.style.gridTemplateColumns = landscapeFractionals; 

    // IMPORTANT!! make sure you now set the grid container variable to this one
    gridContainer = landScapePad;
    replaceExistingSketchPad(landScapePad);
    attachCellEventListeners();
}
// responsible for actually starting the settings necessary for the grid!
const start = () => {
    // means that we are in square mode right now
    numberOfRows = slider.value;
    numberOfCols = slider.value;
    initializeGrid();
    attachGridEventListener();


    slider.oninput = function() {
        if (button.textContent != "Square Mode") {
            slider.min = 2;
            slider.max = 100;
            ratioIndicator.innerHTML = `${this.value} x ${this.value}`;
            //sliderShow.innerHTML = this.value;
            numberOfRows = slider.value;
            numberOfCols = slider.value;
            initializeGrid();
        }
        else {
            numberOfRows = slider.value;
            numberOfCols = slider.value;
            switchToLandscapeMode();
        }
    }
}

start();


