// ui_handler.js
const triggerNewTodo = document.getElementById("newTodoTrigger");
const openButton = document.getElementById("triggerTodoModal");
const closeButton = document.getElementById("closeModal");

openButton.onclick = () => triggerNewTodo.showModal();
closeButton.onclick = () => {
  // Clear the editing flag if the user cancels
  const todoForm = document.getElementById("todoForm");
  delete todoForm.dataset.editingId;
  todoForm.reset();
  triggerNewTodo.close();
};

export const createTodoCard = (task) => {
  const todoCard = document.createElement("div");
  todoCard.classList.add("taskCard");
  todoCard.setAttribute("data-id", task.todoId);

  if (task.todoComplete) {
    todoCard.classList.add("completed");
  }

  const priorityClass = `priority-${task.priority.toLowerCase()}`;

  todoCard.innerHTML = `
    <span class="priority-tag ${priorityClass}">${task.priority}</span>
    
    <span class="displayTitle"></span>
    
    <div class="content-body">
        <p class="taskDetails"><strong>Due:</strong> <span class="displayDueDate"></span></p>
        <p class="taskDetails"><span class="displayDescription"></span></p>
        <span class="displayNotes"></span>
    </div>

    <div class="card-actions">
        <label class="checkbox-container">
            <input type="checkbox" class="todoCheck" ${task.todoComplete ? "checked" : ""}>
            Done
        </label>
        <hr>
        <button type="button" class="editTaskBtn">Edit</button>
        <button type="button" class="deleteTaskBtn">Delete</button>
    </div>
  `;

  todoCard.querySelector(".displayTitle").textContent = task.todoTitle;
  todoCard.querySelector(".displayDescription").textContent =
    task.todoDescription;
  todoCard.querySelector(".displayDueDate").textContent = task.dueDate;
  todoCard.querySelector(".displayNotes").textContent = task.todoNotes || "";

  return todoCard;
};

export const refreshUI = (tasksArray) => {
  const listContainer = document.getElementById("todo-list-container");
  if (!listContainer) return;
  listContainer.innerHTML = "";

  tasksArray.forEach((task) => {
    const newCard = createTodoCard(task);
    listContainer.appendChild(newCard);
  });
};

export const renderSidebar = (projectsArray, activeProjectId) => {
  const projectList = document.getElementById("project-list");
  if (!projectList) return;

  projectList.innerHTML = "";

  projectsArray.forEach((project) => {
    const listLi = document.createElement("li");
    listLi.classList.add("project-item");

    //to highlight the working project
    if (project.projectId === activeProjectId) {
      listLi.classList.add("active");
    }

    listLi.setAttribute("data-proj-id", project.projectId);
    listLi.textContent = project.projectName;

    projectList.appendChild(listLi);
  });
};

export { triggerNewTodo };
