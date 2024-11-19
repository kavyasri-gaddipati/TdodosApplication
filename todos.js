let todoItemsContainer = document.getElementById("todoItemsContainer");
let addTodoButton = document.getElementById("addTodoButton");
let saveTodoButton = document.getElementById("saveTodoButton");

// Get Todos from LocalStorage
function getTodoListFromLocalStorage() {
    let stringifiedTodoList = localStorage.getItem("todoList");
    return stringifiedTodoList ? JSON.parse(stringifiedTodoList) : [];
}

let todoList = getTodoListFromLocalStorage();
let todosCount = todoList.length;

// Save Todos to LocalStorage
saveTodoButton.onclick = function() {
    localStorage.setItem("todoList", JSON.stringify(todoList));
};

// Add Todo
function onAddTodo() {
    let userInputElement = document.getElementById("todoUserInput");
    let userInputValue = userInputElement.value;

    if (userInputValue === "") {
        alert("Enter valid text!");
        return;
    }

    todosCount += 1;

    let newTodo = {
        text: userInputValue,
        uniqueNo: todosCount,
        isChecked: false,
    };
    todoList.push(newTodo);
    createAndAppendTodo(newTodo);
    userInputElement.value = "";
}

addTodoButton.onclick = onAddTodo;

// Update Todo Status
function onTodoStatusChange(checkboxId, labelId, todoId) {
    let checkboxElement = document.getElementById(checkboxId);
    let labelElement = document.getElementById(labelId);
    labelElement.classList.toggle("checked");

    let todoIndex = todoList.findIndex(
        (todo) => "todo" + todo.uniqueNo === todoId
    );
    todoList[todoIndex].isChecked = checkboxElement.checked;
}

// Delete Todo
function onDeleteTodo(todoId) {
    let todoElement = document.getElementById(todoId);
    todoItemsContainer.removeChild(todoElement);

    todoList = todoList.filter((todo) => "todo" + todo.uniqueNo !== todoId);
}

// Create and Append Todo
function createAndAppendTodo(todo) {
    let todoId = "todo" + todo.uniqueNo;
    let checkboxId = "checkbox" + todo.uniqueNo;
    let labelId = "label" + todo.uniqueNo;

    let todoElement = document.createElement("li");
    todoElement.className = "todo-item-container";
    todoElement.id = todoId;

    let inputElement = document.createElement("input");
    inputElement.type = "checkbox";
    inputElement.id = checkboxId;
    inputElement.checked = todo.isChecked;
    inputElement.className = "checkbox-input";
    inputElement.onclick = function() {
        onTodoStatusChange(checkboxId, labelId, todoId);
    };

    let labelElement = document.createElement("label");
    labelElement.htmlFor = checkboxId;
    labelElement.id = labelId;
    labelElement.className = "checkbox-label";
    labelElement.textContent = todo.text;
    if (todo.isChecked) {
        labelElement.classList.add("checked");
    }

    let deleteIconContainer = document.createElement("span");
    deleteIconContainer.className = "delete-icon-container";
    deleteIconContainer.innerHTML = '<i class="fas fa-trash-alt"></i>';
    deleteIconContainer.onclick = function() {
        onDeleteTodo(todoId);
    };

    todoElement.append(inputElement, labelElement, deleteIconContainer);
    todoItemsContainer.appendChild(todoElement);
}

// Load existing Todos
todoList.forEach(createAndAppendTodo);