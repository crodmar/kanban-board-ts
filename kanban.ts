// Selected element
let selected: HTMLElement | null = null;

function updateSelected() {
    // All draggable elements
    let elements: NodeListOf<HTMLElement> = document.querySelectorAll(".box");

    // Adding eventListeners for each element
    elements.forEach(element => addListeners(element));
}

function addListeners(element: HTMLElement) {
    // When one of the boxes is being dragged, the event saves the box in selected
    element.addEventListener("dragstart", () => {
        selected = element;
    });
    // When the box is no longer being dragged, the selected element is null again
    element.addEventListener("dragend", () => {
        selected = null;
    });
}

updateSelected();

// Activated when the element is dragged over the document
document.addEventListener("dragover", (event) => {
    event.preventDefault();
});

// When an event is dropped
document.addEventListener("drop", (event) => {
    // Place where the element is dropped
    let target: HTMLElement | null = event.target as HTMLElement | null;

    if (target != null && selected != null) {
        // If the target is a column, the selected element is added to the column
        if (target.classList.contains("column")) {
            target.appendChild(selected);
            // If the target is a box, it is added before the next box
        } else if (target.classList.contains("box")) {
            target.parentNode?.insertBefore(selected, target.nextSibling);
        }
    }
});

function addTask() {
    let target: HTMLElement | null = document.getElementById("toDo");
    let input: HTMLInputElement = (document.getElementById("add") as HTMLInputElement);
    let text: string = input.value;

    if (text) {
        let newTask: HTMLElement = document.createElement("div");
        // Adding the text to the box
        newTask.innerHTML = text;
        // Adding the class 'box' to add styles
        newTask.className = "box";
        // Making the box draggable
        newTask.setAttribute("draggable", "true");
        // Adding listeners to the new task
        addListeners(newTask);
        // Adding the new task to the target (to do tasks)
        target?.appendChild(newTask);
        // Deleting the input text
        input.value = "";
    }
}

function searchTasks() {
    // Saving the search text
    let input: HTMLInputElement = (document.getElementById('search') as HTMLInputElement);
    let searchText: string = input.value.toLowerCase();
    // Obtaining the list of all tasks
    let list: HTMLCollectionOf<HTMLElement> = document.getElementsByClassName("box") as HTMLCollectionOf<HTMLElement>;

    // Iterating the elements of the list
    for (let i = 0; i < list.length; i++) {
        let boxText: string | undefined = list[i].textContent?.toLowerCase();
        // Showing or hidding elements according on the search
        if (boxText && boxText.indexOf(searchText) > -1) {
            list[i].style.display = '';
        } else {
            list[i].style.display = 'none';
        }
    }
}