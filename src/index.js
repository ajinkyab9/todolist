import { todoMain, Project } from "./logic.js";
import { triggerNewTodo, refreshUI } from "./ui_handler.js";
import { saveToLocalStorage, loadFromLocalStorage } from "./state_manager.js";
import "./styles.css";


// const newProject = new Project();
const newProject = loadFromLocalStorage();
const todoForm = document.getElementById("todoForm");
const listContainer = document.getElementById("todo-list-container");

refreshUI(newProject.projectTasks);

todoForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const editingId = todoForm.dataset.editingId;

  const title = document.getElementById("todoTitle").value;
  const desc = document.getElementById("todoDescription").value;
  const due = document.getElementById("dueDate").value;
  const priority = document.getElementById("selectPriority").value;
  const notes = document.getElementById("todoNotes").value;

  if (editingId) {
    const taskToUpdate = newProject.getTaskId(editingId);

    if (taskToUpdate) {
      taskToUpdate.todoTitle = title;
      taskToUpdate.todoDescription = desc;
      taskToUpdate.dueDate = due;
      taskToUpdate.priority = priority;
      taskToUpdate.todoNotes = notes;
    }
    delete todoForm.dataset.editingId;
  } else {
    const newTask = new todoMain(title, due, desc, priority, notes);
    newProject.addTask(newTask);
  }

  refreshUI(newProject.projectTasks);
  saveToLocalStorage(newProject);
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
    saveToLocalStorage(newProject);
  }

  if (e.target.classList.contains("editTaskBtn")) {
    const taskToEdit = newProject.getTaskId(taskId);
    document.getElementById("todoTitle").value = taskToEdit.todoTitle;
    document.getElementById("todoDescription").value =
      taskToEdit.todoDescription;
    document.getElementById("dueDate").value = taskToEdit.dueDate;
    document.getElementById("selectPriority").value = taskToEdit.priority;
    document.getElementById("todoNotes").value = taskToEdit.todoNotes || "";

    /**NOTE: to ensure that task knows the todo is being edited */
    todoForm.dataset.editingId = taskId;

    /**Open the modal for editing */
    triggerNewTodo.showModal();
  }

  if (e.target.classList.contains("todoCheck")) {
    const taskToToggle = newProject.projectTasks.find(
      (t) => t.todoId === taskId,
    );
    if (taskToToggle) {
      taskToToggle.toggleStatus();
      refreshUI(newProject.projectTasks);

      saveToLocalStorage(newProject);
    }
  }
});
