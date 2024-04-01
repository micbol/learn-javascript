"use strict";

let todos;

Init();

function Init()
{
  todos = readLocaleStorage();
  console.log(`App started (${todos})`);
  updateUI();
}

// Create a unique Id for a single todo
function createId()
{
  return "ID" + Math.random().toString(16).slice(2);
}

// Add a new todo
function addTodo()
{
  console.log("Create new todo")

  const elem = document.getElementById("todoInput");
  if (elem.value == "") return false;

  let id = createId();
  // console.log(`Creating new Id "${Id}"`);
  while (todos.find((todo) => todo.Id == id))
  {
    id = createId();
    // console.log(`The Id already exists! Try new Id "${Id}"`);
  }

  let todo = { Id: id, Caption: elem.value, Done: false };
  todos.push(todo);
  console.log(todos);

  updateUI();

  elem.value = "";
  return false;
}

// Remove todo item by Id
function removeTodoById(id)
{
  console.log(`Remove todo item with Id "${id}"`);
  let ix = todos.findIndex( t => t.Id == id)
  console.log(`Found todo item at index ${ix}`);
  if (ix === -1) return;

  todos.splice(ix, 1);

  const containerEl = document.getElementById("todoList");
  const todoEl = document.getElementById(id);
  containerEl.removeChild(todoEl);

  updateTodoStatsUI();
  writeLocaleStorage()
}

// Update UI with todo statistics
function updateTodoStatsUI()
{
  const todo_counter = document.getElementById("todolist-counter");
  todo_counter.textContent = "";
  todo_counter.textContent = (todos.length > 0) ? `${todos.length} Todo(s)` : "No entries" ;
}

// Update UI with todo list
function updateTodoListUI()
{
  const container = document.getElementById("todoList");
  container.textContent = "";

  todos.forEach(todo =>
  {
    console.log(`Key: ${todo.Id}  value ${todo.Caption}`);
    const card = document.createElement("div");
    card.id = todo.Id;
    card.className = "todoList-item card w-100";

    const cardBody = card.appendChild(document.createElement("div"));
    cardBody.className = "card-body";

    const cardContent = cardBody.appendChild(document.createElement("h5"));
    cardContent.className = "card-title text-start";
    cardContent.innerHTML = todo.Caption;

    const cardActionsRow = cardBody.appendChild(document.createElement("div"));
    cardActionsRow.className = "d-flex flex-row-reverse";
    const cardActionsBody = cardActionsRow.appendChild(document.createElement("div"));

    const buttonRemove = cardActionsBody.appendChild(document.createElement("button"));
    buttonRemove.className = "btn btn-primary m-1";
    buttonRemove.innerText = "remove";

    buttonRemove.onclick = function ()
    {
      removeTodoById(todo.Id);
    }
 
    container.appendChild(card);
  })

  writeLocaleStorage()
}

// Update the UI
function updateUI()
{
  updateTodoStatsUI();
  updateTodoListUI();
}

// Read todo list from local storage
function readLocaleStorage() 
{
  try
  {
    let jsonText = localStorage.getItem("todos-v3");
    if (jsonText === null || jsonText.trim().length === 0) return new Array();
    return JSON.parse(jsonText);
  }
  catch (err)
  {
    console.log(`Failed to read stored data (${err})`);
    return new Array();
  }
}

// Write todo list to local storage
function writeLocaleStorage() 
{
  let jsonText = JSON.stringify(todos);
  localStorage.setItem("todos-v3", jsonText);
}