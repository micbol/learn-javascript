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
    const item = document.createElement("li");
    item.id = todo.Id;
    item.className = "todoList-item list-group-item w-100 ";
    item.draggable = true;
    item.ondragstart = (ev) => drag(ev);
    item.ondragover = (ev) => allowDrop(ev);
    item.ondrop = (ev) => drop(ev);

    const itemBody = item.appendChild(document.createElement("div"));
    itemBody.className = "item-body";

    const itemContent = itemBody.appendChild(document.createElement("h5"));
    itemContent.className = "item-title text-start";
    itemContent.innerHTML = todo.Caption;

    const itemActions = itemBody.appendChild(document.createElement("div"));
    itemActions.className = "d-flex flex-row-reverse";
  
    const buttonRemove = itemActions.appendChild(document.createElement("button"));
    buttonRemove.className = "btn btn-primary m-1";
    buttonRemove.innerText = "remove";

    buttonRemove.onclick = () => removeTodoById(todo.Id);
 
    container.appendChild(item);
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

function drag(ev){
  ev.dataTransfer.setData("text", ev.target.id);
  console.log (`Dragging element with id "${ev.target.id}"`);
}

function allowDrop(ev) {
  ev.preventDefault();
  // var data = ev.dataTransfer.getData("text");
  // console.log(`Allow drop data ${data} on element ${ev.target.id}`);
}


// function drop(ev){

//   ev.preventDefault();
//   let idSource = ev.dataTransfer.getData("text");
//   let idTarget = ev.currentTarget.id;

//   console.log(`Dropped element with id ${idSource} on element with id ${idTarget}`);
//   if (idSource === idTarget) return;

//   let ixSource = todos.findIndex( (t) => t.Id === idSource);
//   let ixTarget = todos.findIndex( (t) => t.Id === idTarget);

//   console.log(`Index of Source: ${ixSource}`);
//   let todo = todos[ixSource];
//   console.log(`Content of Source: ${todo.toString()}`);

//   todos.splice(ixSource, 1);
//   console.log(`Removing Todo : ${todos.toString()}`);

//   console.log(`Index of Target: ${ixTarget}`);

//   const newTodos = [
//     ...todos.slice(0, ixTarget),
//     todo,
//     ...todos.slice(ixTarget)
//   ];
//   todos = newTodos;

//   updateTodoListUI();
// }

function drop(ev){

  ev.preventDefault();
  const idSource = ev.dataTransfer.getData("text");
  const idTarget = ev.currentTarget.id;

  console.log(`Dropped element with id ${idSource} on element with id ${idTarget}`);
  if (idSource === idTarget) return;

  const ixSource = todos.findIndex( (t) => t.Id === idSource);
  const ixTarget = todos.findIndex( (t) => t.Id === idTarget);

  console.log(`Index of Source: ${ixSource}`);
  const todo = todos[ixSource];
  console.log(`Content of Source: ${JSON.stringify(todo)}`);

  todos.splice(ixSource, 1);
  console.log(`Removing dragged todo : ${JSON.stringify(todo)}`);
  console.log(`Index of target: ${ixTarget}`);

  // Note: 
  // The ixTarget can lie outside the range of the array.
  // The array.splice method implicitly limits it to the array boundaries. 

  // InsertAt() using the 
  //   const newTodos = [
  //     ...todos.slice(0, ixTarget),
  //     todo,
  //     ...todos.slice(ixTarget)
  //   ];
  //   todos = newTodos;

  // InsertAt() using array.splice() 
  todos.splice(ixTarget, 0, todo);

  updateTodoListUI();
}

// Write todo list to local storage
function writeLocaleStorage() 
{
  let jsonText = JSON.stringify(todos);
  localStorage.setItem("todos-v3", jsonText);
}