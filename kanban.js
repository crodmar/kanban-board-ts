// Selected element
var selected = null;
function updateSelected() {
    // All draggable elements
    var elements = document.querySelectorAll(".box");
    // Adding eventListeners for each element
    elements.forEach(function (element) { return addListeners(element); });
}
function addListeners(element) {
    // When one of the boxes is being dragged, the event saves the box in selected
    element.addEventListener("dragstart", function () {
        selected = element;
    });
    // When the box is no longer being dragged, the selected element is null again
    element.addEventListener("dragend", function () {
        selected = null;
    });
}
updateSelected();
// Activated when the element is dragged over the document
document.addEventListener("dragover", function (event) {
    event.preventDefault();
});
// When an event is dropped
document.addEventListener("drop", function (event) {
    var _a;
    // Place where the element is dropped
    var target = event.target;
    if (target != null && selected != null) {
        // If the target is a column, the selected element is added to the column
        if (target.classList.contains("column")) {
            target.appendChild(selected);
            // If the target is a box, it is added before the next box
        }
        else if (target.classList.contains("box")) {
            (_a = target.parentNode) === null || _a === void 0 ? void 0 : _a.insertBefore(selected, target.nextSibling);
        }
    }
});
function addTask() {
    var target = document.getElementById("toDo");
    var input = document.getElementById("add");
    var text = input.value;
    if (text) {
        var newTask = document.createElement("div");
        // Adding the text to the box
        newTask.innerHTML = text;
        // Adding the class 'box' to add styles
        newTask.className = "box";
        // Making the box draggable
        newTask.setAttribute("draggable", "true");
        // Adding listeners to the new task
        addListeners(newTask);
        // Adding the new task to the target (to do tasks)
        target === null || target === void 0 ? void 0 : target.appendChild(newTask);
        // Deleting the input text
        input.value = "";
    }
}
function searchTasks() {
    var _a;
    // Saving the search text
    var input = document.getElementById('search');
    var searchText = input.value.toLowerCase();
    // Obtaining the list of all tasks
    var list = document.getElementsByClassName("box");
    // Iterating the elements of the list
    for (var i = 0; i < list.length; i++) {
        var boxText = (_a = list[i].textContent) === null || _a === void 0 ? void 0 : _a.toLowerCase();
        // Showing or hidding elements according on the search
        if (boxText && boxText.indexOf(searchText) > -1) {
            list[i].style.display = '';
        }
        else {
            list[i].style.display = 'none';
        }
    }
}
