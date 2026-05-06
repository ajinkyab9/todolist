import { todoMain, Project } from "./logic.js";
import { triggerNewTodo, refreshUI } from "./ui_handler.js";
import "./styles.css";

const newProject = new Project();
const todoForm = document.getElementById("todoForm");
const listContainer = document.getElementById("todo-list-container");

todoForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const title = document.getElementById("todoTitle").value;
  const desc = document.getElementById("todoDescription").value;
  const due = document.getElementById("dueDate").value;
  const priority = document.getElementById("selectPriority").value;
  const notes = document.getElementById("todoNotes").value;

  const newTask = new todoMain(title, due, desc, priority, notes);
  newProject.addTask(newTask);

  refreshUI(newProject.projectTasks);
  todoForm.reset();
  triggerNewTodo.close();
  console.log(newProject);
});

listContainer.addEventListener("click", (e) => {
  const card = e.target.closest(".taskCard");
  if (!card) return;
  const taskId = card.getAttribute("data-id");

  if (e.target.classList.contains("deleteTaskBtn")) {
    newProject.deleteTask(taskId);
    refreshUI(newProject.projectTasks);
  }

  if (e.target.classList.contains("todoCheck")) {
    const taskToToggle = newProject.projectTasks.find(
      (t) => t.todoId === taskId,
    );
    if (taskToToggle) {
      taskToToggle.toggleStatus();
      refreshUI(newProject.projectTasks);
    }
  }
});
