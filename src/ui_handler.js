const triggerNewTodo = document.getElementById("newTodoTrigger");
const openButton = document.getElementById("triggerTodoModal");
const closeButton = document.getElementById("closeModal");

openButton.onclick = () => triggerNewTodo.showModal();
closeButton.onclick = () => triggerNewTodo.close();

export { triggerNewTodo };
