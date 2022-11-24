const todoButton = document.getElementById("todo-button");
const todoList = document.getElementById("todo-list");
const todoInput = document.getElementById("todo-input");
const filterOption = document.querySelector(".filter-todo");
const deleteAllButton = document.getElementById("deleteButton");
let todo = [];
console.log(todo);

todoButton.addEventListener("click", createTodo);
todoList.addEventListener("click", deleteTodo);
filterOption.addEventListener("change", filterTodo);
window.addEventListener("load", reloadTodos);

function createTodo(event) {
  event.preventDefault();
  if (todoInput.value === "") {
    return;
  }
  // to do DIV
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");
  //Create LI
  const newTodo = document.createElement("li");
  newTodo.innerText = todoInput.value;
  newTodo.classList.add("todo-item");
  todoDiv.appendChild(newTodo);
  //ADD TODO TO LOCAL STORAGE

  //CHECK MARK BUTTON*
  const completedButton = document.createElement("button");
  completedButton.innerHTML = '<i class="fa-solid fa-check"></i>';
  completedButton.classList.add("complete-btn");
  todoDiv.appendChild(completedButton);
  //CHECK trash BUTTON*
  const trashButton = document.createElement("button");
  trashButton.innerHTML = '<i class="fa-solid fa-trash"></i>';
  trashButton.classList.add("trash-btn");
  todoDiv.appendChild(trashButton);
  //APPEND TO LIST
  todoList.appendChild(todoDiv);
  todo.push({ todo: todoInput.value, state: "uncompleted" });
  saveLocalTodos({ todo: todoInput.value, state: "uncompleted" });
  todoInput.value = "";
}

function deleteTodo(e) {
  todo = JSON.parse(localStorage.getItem("todos"));
  const item = e.target;
  //DELETE TODO
  if (item.classList[0] === "trash-btn") {
    const todoParent = item.parentElement;
    todo.forEach((elem) => {
      if (elem.todo === todoParent.innerText)
        console.log(todo.splice(todo.indexOf(elem), 1));
    });
    //Animation
    todoParent.classList.add("fall");
    todoParent.addEventListener("transitionend", function () {
      todoParent.remove();
    });
  }

  //CHECK MARK
  if (item.classList[0] === "complete-btn") {
    item.parentElement.classList.toggle("completed");
  }
  localStorage.setItem("todos", JSON.stringify(todo));
}

function filterTodo(e) {
  todo = JSON.parse(localStorage.getItem("todos"));
  const selectors = e.target;
  const todos = document.querySelectorAll(".todo");

  for (let index = 0; index < todos.length; index++) {
    if ([...todos[index].classList].includes("completed")) {
      todo[index].state = "completed";
      todos[index].style.display = "none";
    } else if (![...todos[index].classList].includes("completed")) {
      todo[index].state = "uncompleted";
      todos[index].style.display = "flex";
    }
  }
  console.log(todo);

  if (selectors.value === "uncompleted") {
    for (let index = 0; index < todo.length; index++) {
      if (todo[index].state === "completed") {
        todos[index].style.display = "none";
      } else if (todo[index].state === "uncompleted") {
        todos[index].style.display = "flex";
      }
    }
  } else if (selectors.value === "completed") {
    for (let index = 0; index < todo.length; index++) {
      if (todo[index].state === "completed") {
        todos[index].style.display = "flex";
      } else if (todo[index].state === "uncompleted") {
        todos[index].style.display = "none";
      }
    }
  } else if (selectors.value === "all") {
    for (let index = 0; index < todo.length; index++) {
      if (todo[index].state === "completed") {
        todos[index].style.display = "flex";
      } else if (todo[index].state === "uncompleted") {
        todos[index].style.display = "flex";
      }
    }
  }
  localStorage.setItem("todos", JSON.stringify(todo));
}

function saveLocalTodos(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function reloadTodos() {
  let data = JSON.parse(localStorage.getItem("todos"));
  console.log(data);
  for (let index = 0; index < data.length; index++) {
    const todoDiv = document.createElement("div");

    todoDiv.classList.add("todo");
    if (data[index].state === "completed") {
      todoDiv.classList.add("completed");
    } else if (data[index].state === "uncompleted") {
      todoDiv.classList.remove("completed");
    }
    //Create LI
    const newTodo = document.createElement("li");

    newTodo.innerText = data[index].todo;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);
    //CHECK MARK BUTTON*
    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class="fa-solid fa-check"></i>';
    completedButton.classList.add("complete-btn");
    completedButton.addEventListener("click", () => {
      if (data[index].state === "completed") {
        data[index].state = "uncompleted";
      } else if (data[index].state === "uncompleted") {
        data[index].state = "completed";
      }
      localStorage.setItem("todos", JSON.stringify(data));
    });
    todoDiv.appendChild(completedButton);
    //CHECK trash BUTTON*
    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class="fa-solid fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);
    //APPEND TO LIST
    todoList.appendChild(todoDiv);
  }
  localStorage.setItem("todos", JSON.stringify(data));
  console.log(data);
}
