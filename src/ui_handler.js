const triggerNewTodo = document.getElementById("newTodoTrigger");
const openButton = document.getElementById("triggerTodoModal");
const closeButton = document.getElementById("closeModal");

openButton.onclick = () => triggerNewTodo.showModal();
closeButton.onclick = () => triggerNewTodo.close();

export const createTodoCard = (task) => {
  const todoCard = document.createElement("div");
  todoCard.classList.add("taskCard");
  todoCard.setAttribute("data-id", task.todoId);

  if (task.todoComplete) {
    todoCard.classList.add("completed");
  }

  todoCard.innerHTML = `
    <input type="checkbox" class="todoCheck" name="todoCheck" ${task.todoComplete ? "checked" : ""}>
    <label for="todoCheck">Mark as complete</label>
    <p class="taskDetails">Task Name: <span class="displayTitle"></span></p>
    <p class="taskDetails">Description: <span class="displayDescription"></span></p>
    <p class="taskDetails">Due Date: <span class="displayDueDate"></span></p>
    <p class="taskDetails">Priority: <span class="displayPriority"></span></p>
    <p class="taskDetails">Notes: <span class="displayNotes"></span></p>
    <button type="button" class="deleteTaskBtn">Delete Task</button>
  `;

  todoCard.querySelector(".displayTitle").textContent = task.todoTitle;
  todoCard.querySelector(".displayDescription").textContent =
    task.todoDescription;
  todoCard.querySelector(".displayDueDate").textContent = task.dueDate;
  todoCard.querySelector(".displayPriority").textContent = task.priority;
  todoCard.querySelector(".displayNotes").textContent = task.todoNotes;

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

export { triggerNewTodo };
