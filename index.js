const addContactNumberButton = document.getElementById("plus-sign-div-container");

const nameNumberMap = new Map();

addContactNumberButton.addEventListener("click", () => {

    const name = prompt("Type The Name")
    const number = prompt("Type The Number")
    const category = prompt("Type The Category");

    nameNumberMap.set(name, number);

    const nameNumberElement = document.createElement("h1");
    nameNumberElement.textContent = `${name}:  ${number}`;

    const contactInfoDiv = document.createElement("div");
    contactInfoDiv.className = "contact-div-container";

    const editElement = document.createElement("button");
    editElement.textContent = "Edit";
    editElement.className = "edit-button";
    editElement.id = "edit-button";

    const deleteElement = document.createElement("button");
    deleteElement.textContent = "Delete";
    deleteElement.className = "delete-button";
    deleteElement.id = "delete-button";

    const categoryLabel = document.createElement("label");
    categoryLabel.className = "category-label";
    categoryLabel.textContent = `Category: ${category}`;    
    
    const editDeleteDivContainer = document.createElement("div");
    
    editDeleteDivContainer.appendChild(editElement);
    editDeleteDivContainer.appendChild(deleteElement);
    editDeleteDivContainer.appendChild(categoryLabel);

    contactInfoDiv.appendChild(nameNumberElement);
    contactInfoDiv.appendChild(editDeleteDivContainer);

    const contactDivContainer = document.getElementById("contact-div-containers");
    contactDivContainer.appendChild(contactInfoDiv);

    editElement.addEventListener("click", (event) => {
        const parentContactDivContainer = event.target.closest(".contact-div-container");

        const newName = prompt("Enter The New Name");
        const newNumber = prompt("Enter The New Number");
        const newCategory = prompt("Enter The New Category");

        const nameNumberElement = parentContactDivContainer.querySelector("h1");
        const currentName = nameNumberElement.textContent.split(":")[0].trim();

        nameNumberMap.delete(currentName);
        nameNumberMap.set(newName, newNumber);

        nameNumberElement.textContent = `${newName}:  ${newNumber}` 
        categoryLabel.textContent = `Category: ${newCategory}`;
    });

    deleteElement.addEventListener("click", (event) => {
        const parentContactDivContainer = event.target.closest(".contact-div-container");

        if (parentContactDivContainer) {
            const nameNumberElement = parentContactDivContainer.querySelector("h1");
            const nameToDelete = nameNumberElement.textContent.split(":")[0].trim();
            nameNumberMap.delete(nameToDelete);

            parentContactDivContainer.remove();
        }
    });
});

document.addEventListener("keydown", (event) => {
    if (event.key.toLowerCase() === "shift") {
        const popupSearch = document.getElementById("popup-search");
        if (popupSearch.style.visibility === "hidden") {
            popupSearch.style.visibility = "visible";
        } else {
            popupSearch.style.visibility = "hidden";
        }
    };
});

const searchButton = document.getElementById("search-person-button");
const nameNumberText = document.createElement("h1");
nameNumberText.className = "name-number-text-search";

searchButton.addEventListener("click", () => {
    const searchResult = document.getElementById("result-div");
    const searchArea = document.getElementById("search-person");

    nameNumberText.textContent = "";

    for (const [name, number] of nameNumberMap.entries()) {
        if (name.includes(searchArea.value)) {
            nameNumberText.textContent = `${name}:  ${number}`;
            searchResult.appendChild(nameNumberText);
        }
    }
})