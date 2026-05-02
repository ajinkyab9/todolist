import { isThisSecond } from "date-fns";

const triggerNewTodo = document.getElementById("newTodoTrigger");
const openButton = document.getElementById("triggerTodoModal");
const closeButton = document.getElementById("closeModal");
const deleteTaskBtn = document.getElementsByClassName("deleteTaskBtn");

openButton.onclick = () => triggerNewTodo.showModal();
closeButton.onclick = () => triggerNewTodo.close();

export const createTodoCard = (task) => {
  const todoCard = document.createElement("div");
  todoCard.classList.add("taskCard");
  todoCard.setAttribute("data-id", task.todoId);

  //markup structure

  todoCard.innerHTML = `
    <p class="taskDetails">Task Name: <span class="displayTitle"></span></p>
    <p class="taskDetails">Description: <span class="displayDescription"></span></p>
    <p class="taskDetails">Start Date: <span class="displayStartDate"></span></p>
    <p class="taskDetails">End Date: <span class="displayEndDate"></span></p>
    <p class="taskDetails">Priority: <span class="displayPriority"></span></p>
    <button type="button" class="deleteTaskBtn">Delete Task</button>
`;

  todoCard.querySelector(".displayTitle").textContent = task.todoTitle;
  todoCard.querySelector(".displayDescription").textContent =
    task.todoDescription;
  todoCard.querySelector(".displayStartDate").textContent = task.startDate;
  todoCard.querySelector(".displayEndDate").textContent = task.endDate;
  todoCard.querySelector(".displayPriority").textContent = task.priority;

  return todoCard;

  //markup structure
};

export const refreshUI = (tasksArray) => {
  const listContainer = document.getElementById("todo-list-container");

  listContainer.innerHTML = "";

  tasksArray.forEach((task) => {
    const newCard = createTodoCard(task);
    listContainer.appendChild(newCard);
  });
};

export { triggerNewTodo, deleteTaskBtn };
