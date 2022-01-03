let masterDiv = document.querySelector(".grid-container");

for (let rowCount = 0; rowCount < 16; rowCount++) {
    let subDiv = document.createElement("div");
        subDiv.classList.add("master-div");
    for (let columnCount = 0; columnCount < 16; columnCount++) {
        let colDiv = document.createElement("div");
        colDiv.classList.add("sub-div");
        subDiv.appendChild(colDiv);
        colDiv.addEventListener("mouseover", () => {
            colDiv.classList.add("sub-style");
        });
    }
    masterDiv.appendChild(subDiv);
}
