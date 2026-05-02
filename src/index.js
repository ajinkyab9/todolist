import { startOfMinute } from "date-fns";
import { todoMain, Project } from "./logic.js";
import {
  triggerNewTodo,
  deleteTaskBtn,
  createTodoCard,
  refreshUI,
} from "./ui_handler.js";
import "./styles.css";

const newProject = new Project();

const todoForm = document.getElementById("todoForm");

todoForm.addEventListener("submit", (e) => {
  e.preventDefault();

  //grabbing values
  const title = document.getElementById("todoTitle").value;
  const desc = document.getElementById("todoDescription").value;
  const start = document.getElementById("startDate").value;
  const end = document.getElementById("endDate").value;
  const priority = document.getElementById("selectPriority").value;

  //creating new task
  const newTask = new todoMain(title, start, end, desc, priority);
  newProject.addTask(newTask);

  //to render the cards
  refreshUI(newProject.projectTasks);
  todoForm.reset();
  console.log(newProject);
});

//deleting a task

// index.js
const listContainer = document.getElementById("todo-list-container");

listContainer.addEventListener("click", (e) => {
  // Check if they clicked the delete button (using a CLASS, not ID)
  if (e.target.classList.contains("deleteTaskBtn")) {
    // Find the parent card and grab the UUID we stored there
    const card = e.target.closest(".taskCard");
    const taskId = card.getAttribute("data-id");

    // 1. Update the Data
    newProject.deleteTask(taskId);

    // 2. Update the UI
    // You'll need to create a function in uihandler to "redraw" the list
    refreshUI(newProject.projectTasks);
  }
});
