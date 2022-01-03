let mainDiv = document.querySelector(".main");
let gridContainer = document.querySelector("#sketchpad");
let ratioIndicator = document.querySelector(".ratio-indicator");

let numberOfRows = 100;
let numberOfCols = 100;
let originalRowCount;
let originalColCount;

let normal = true;
let sickomode = false;
let eraser = false;

// HELPER METHODS
const createCell = () => {
    let cell = document.createElement("div");
    cell.classList.add("cell");
    gridContainer.appendChild(cell);
}
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
const attachGridEventListener = () => {
    // for landscape mode
    let landscapeButton = document.getElementById("toggle");
    landscapeButton.addEventListener("click", () => {
        console.log(`chechhcehch: ${landscapeButton.textContent}`);
        if (landscapeButton.textContent != "Square Mode") {
            console.log("here @sq");
            gridContainer.classList.add("grid-transformed");
            // once the animation of being wider get finished,
            gridContainer.addEventListener("animationend", () => {
                gridContainer.style.width = "900px";
                switchToLandscapeMode();
            });
            landscapeButton.textContent = "Square Mode";
        }

        else if (landscapeButton.textContent == "Square Mode") {
            console.log(`chechhcehch: ${landscapeButton.textContent}`);
            gridContainer.classList.remove("grid-transformed");
            gridContainer.classList.add("grid-transformed-narrow");
            gridContainer.addEventListener("animationend", () => {
                console.log("here");
                gridContainer.style.width = "650px;";
                initializeGrid();
                //switchToSquareMode();
            });
            landscapeButton.textContent = "Landscape Mode";

        }
    });
    
    /*
    landscapeButton.addEventListener("click", () => {
        if (landscapeButton.textContent == "Square Mode") {
            landscapeButton.textContent = "Landscape Mode";
            gridContainer.style.width = "650px;";

            gridContainer.classList.add("grid-transformed-narrow");
            // once the animation of being wider get finished,
            gridContainer.addEventListener("animationend", () => {
                console.log("here");
                gridContainer.style.width = "650px;";
                switchToSquareMode();
            });
            landscapeButton.textContent = "Landscape Mode";
            //console.log(e);
        }
    });
    */

}
const replaceExistingSketchPad = (padToReplace) => {
    //console.log(`MAIN DIV BEFORE:`);
    //(mainDiv.childNodes).forEach((child) => {
       // console.log(child);
    //})

    // get all the sketchpads
    let sketchpads = document.querySelectorAll("#sketchpad");
    // remove the first one because we no longer need it
    
    // replace it with the inputted pad
    mainDiv.appendChild(padToReplace);
    mainDiv.removeChild(sketchpads[0]);
    
   gridContainer = document.querySelector("#sketchpad");
}
// HELPER METHODS

const initializeGrid = () => {
    let newSketchpadFractionals = "";
    let newNumOfCol = numberOfCols;
    let newNumOfRow = numberOfRows;
    let newSketchpad = document.createElement("div");
    mainDiv = document.querySelector(".main");
    
    newSketchpad.id = "sketchpad";
    newSketchpad.style.width = "650px";
    newSketchpad.classList.add("grid-container");
    newSketchpad.classList.add("nes-container");
    newSketchpad.classList.add("is-rounded");
    
    ratioIndicator.innerHTML = `${newNumOfRow} x ${newNumOfCol}`;

    
    

    for (let rowCount = 0; rowCount < newNumOfRow; rowCount++) {
        for (let colCount = 0; colCount < newNumOfCol; colCount++) {
            let cell = document.createElement("div");
            cell.classList.add("cell");
            //cell.style.backgroundColor = "green";
            newSketchpad.appendChild(cell);
        }
        newSketchpadFractionals += "1fr ";
    }
    newSketchpad.style.gridTemplateColumns = newSketchpadFractionals; 
    //newSketchpad.style.width = "650px !important;";
    // IMPORTANT!! make sure you now set the grid container variable to this one
    gridContainer = newSketchpad;
    
    replaceExistingSketchPad(newSketchpad);
    attachCellEventListeners();
    //attachGridEventListener();
}
/*
// this method is reponsible for initializing the actual grid
const initializeGrid = () => {
    mainDiv = document.querySelector(".main");
    let fractionals = "";
    originalColCount  = numberOfCols;
    originalRowCount = numberOfRows;
    // grid construction
    for (let rowCount = 0; rowCount < numberOfRows; rowCount++) {
        for (let colCount = 0; colCount < numberOfCols; colCount++) {
            createCell();
        }
        fractionals += "1fr ";
    }
    gridContainer.style.gridTemplateColumns = fractionals; 
    attachCellEventListeners();
    attachGridEventListener();
    replaceExistingSketchPad(gridContainer);

}
*/
// delete this method:: this method replaces the original one
const testingReplaceGrid = () => {
    mainDiv = document.querySelector(".main");
    // replicate the original div as much as possible
    let newSketchpad = document.createElement("div");
    newSketchpad.id = "sketchpad";
    newSketchpad.classList.add("grid-container");
    newSketchpad.classList.add("nes-container");
    newSketchpad.classList.add("is-rounded");
    let newfractionals = "";

    // grid construction
    for (let rowCount = 0; rowCount < numberOfRows; rowCount++) {
        for (let colCount = 0; colCount < numberOfCols; colCount++) {
            // replicate the cell as much as possible
            let cell = document.createElement("div");
            cell.classList.add("cell");
            cell.style.backgroundColor = "violet";
            // append the child to the new sketchpad div
            newSketchpad.appendChild(cell);
            
        }
        newfractionals += "1fr ";
    }
    newSketchpad.style.gridTemplateColumns = newfractionals; 
    gridContainer = newSketchpad;
    replaceExistingSketchPad(newSketchpad);
    attachCellEventListeners();
    attachGridEventListener();
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
    //let originalCells = gridContainer.childNodes;

    ratioIndicator.innerHTML = `${numberOfRows} x ${newNumOfCol}`;
    // grid construction
    for (let rowCount = 0; rowCount < numberOfRows; rowCount++) {
        for (let colCount = 0; colCount < newNumOfCol; colCount++) {
            // replicate the cell as much as possible
            let cell = document.createElement("div");
            cell.classList.add("cell");
            //cell.style.backgroundColor = "green";
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
    //attachGridEventListener();
}

// responsible for switching the pad to square mode
const switchToSquareMode = () => {
    mainDiv = document.querySelector(".main");

    let newSketchpad = document.createElement("div");
    newSketchpad.id = "sketchpad";
    newSketchpad.style.width = "650px";
   //newSketchpad.style.border = "red 2px solid;";

    newSketchpad.classList.add("grid-container");
    newSketchpad.classList.add("nes-container");
    newSketchpad.classList.add("is-rounded");
    let newSketchpadFractionals = "";

    let newNumOfCol = originalColCount;
    let newNumOfRow = originalRowCount;

    for (let rowCount = 0; rowCount < newNumOfRow; rowCount++) {
        for (let colCount = 0; colCount < newNumOfCol; colCount++) {
            let cell = document.createElement("div");
            cell.classList.add("cell");
            //cell.style.backgroundColor = "green";
            newSketchpad.appendChild(cell);
        }
        newSketchpadFractionals += "1fr ";
    }
    newSketchpad.style.gridTemplateColumns = newSketchpadFractionals; 
    //newSketchpad.style.width = "650px !important;";
    // IMPORTANT!! make sure you now set the grid container variable to this one
    gridContainer = newSketchpad;
    
    replaceExistingSketchPad(newSketchpad);
    attachCellEventListeners();
    //attachGridEventListener();
}




let slider = document.querySelector(".slider");
let button = document.querySelector("#toggle");
let sliderShow = document.querySelector(".slider-value");
let clearBtn = document.getElementById("clear");
let sickoModeBtn = document.getElementById("sickoMode");
let eraserBtn = document.getElementById("eraser");
let picassoInput = document.getElementById("picasso");

// means that we are in square mode right now
numberOfRows = slider.value;
numberOfCols = slider.value;
initializeGrid();
attachGridEventListener();

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
/*
if (button.textContent != "Square Mode") {
    slider.min = 2;
    slider.max = 100;
    slider.oninput = function() {
        sliderShow.innerHTML = this.value;
        numberOfRows = slider.value;
        numberOfCols = slider.value;
        initializeGrid();
        //attachGridEventListener();

    }
}
*/
clearBtn.addEventListener("click", () => {
    if (button.textContent != "Square Mode") {
        initializeGrid();
    }
    else {
        switchToLandscapeMode();
    }
});

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


