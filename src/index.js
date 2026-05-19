import { todoMain, Project } from "./logic.js";
import { triggerNewTodo, refreshUI, renderSidebar } from "./ui_handler.js";
import { saveToLocalStorage, loadFromLocalStorage } from "./state_manager.js";
import "./styles.css";

// any instance of newProject was used for when the app had only one project, and any such commended code is for switching to an app containing multiple projects
// const newProject = new Project();
//const newProject = loadFromLocalStorage(); this was a test feature for a single project
let allProjects = loadFromLocalStorage(); // this is for the transition from single to multiple projects
let currentProject = allProjects[0];

// following selectors are for project modal
const projectModal = document.getElementById("newProjectModal");
const projectForm = document.getElementById("projectForm");
const addProject = document.getElementById("addProjectBtn");
const closeProjectBtn = document.getElementById("closeProjectModal");
// project modal selectors enf


const todoForm = document.getElementById("todoForm");
const listContainer = document.getElementById("todo-list-container");
const projectListUI = document.getElementById("project-list");
addProject.onclick = () => projectModal.showModal();
closeProjectBtn.onclick = () => projectModal.close();

// refreshUI(newProject.projectTasks); again this was for the app which had only one project

refreshUI(currentProject.projectTasks);
renderSidebar(allProjects, currentProject.projectId); //to track the projects

//to populate sidebar with current projects

projectListUI.addEventListener("click", (e) => {
  const projectItem = e.target.closest(".project-item");
  if (!projectItem) return;

  const clickedProjectId = projectItem.getAttribute("data-proj-id");

  currentProject = allProjects.find((p) => p.projectId === clickedProjectId);

  refreshUI(currentProject.projectTasks);

  renderSidebar(allProjects, currentProject.projectId);
});

// for project form
projectForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const activeProjectName = document.getElementById("projectName");
  const projectNameValue = activeProjectName.value;

  const createNewProject = new Project(projectNameValue);
  allProjects.push(createNewProject);

  //to switch to new project by default

  currentProject = createNewProject;

  console.log(currentProject);

  saveToLocalStorage(allProjects);
  renderSidebar(allProjects, currentProject.projectId);
  refreshUI(currentProject.projectTasks);

  projectForm.reset();
  projectModal.close();
});


todoForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const editingId = todoForm.dataset.editingId;

  const title = document.getElementById("todoTitle").value;
  const desc = document.getElementById("todoDescription").value;
  const due = document.getElementById("dueDate").value;
  const priority = document.getElementById("selectPriority").value;
  const notes = document.getElementById("todoNotes").value;

  if (editingId) {
    //const taskToUpdate = newProject.getTaskId(editingId);
    const taskToUpdate = currentProject.getTaskId(editingId);

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
    //newProject.addTask(newTask);
    currentProject.addTask(newTask);
  }

  refreshUI(currentProject.projectTasks);
  // saveToLocalStorage(newProject);
  saveToLocalStorage(allProjects);
  todoForm.reset();
  triggerNewTodo.close();
  console.log(currentProject);
});

listContainer.addEventListener("click", (e) => {
  const card = e.target.closest(".taskCard");
  if (!card) return;
  const taskId = card.getAttribute("data-id");

  if (e.target.classList.contains("deleteTaskBtn")) {
    // newProject.deleteTask(taskId);
    currentProject.deleteTask(taskId);
    refreshUI(currentProject.projectTasks);
    saveToLocalStorage(allProjects);
  }

  if (e.target.classList.contains("editTaskBtn")) {
    const taskToEdit = currentProject.getTaskId(taskId);
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
    const taskToToggle = currentProject.projectTasks.find(
      (t) => t.todoId === taskId,
    );
    if (taskToToggle) {
      taskToToggle.toggleStatus();
      refreshUI(currentProject.projectTasks);
      saveToLocalStorage(allProjects);
    }
  }
});
