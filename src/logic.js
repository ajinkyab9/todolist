class todoMain {
  constructor(todoTitle, startDate, endDate, todoDescription, priority) {
    this.createTime = Date.now();
    this.todoId = crypto.randomUUID();
    this.todoTitle = todoTitle;
    this.startDate = startDate;
    this.endDate = endDate;
    this.todoDescription = todoDescription;
    this.priority = priority;
    this.todoComplete = false;
  }
  toggleStatus() {
    this.todoComplete = !this.todoComplete;
  }
}

class Project {
  constructor(projectName) {
    this.projectTasks = [];
  }
  addTask(todo) {
    this.projectTasks.push(todo);
    console.log(`Successfully added: ${todo.todoTitle}`);
  }

  deleteTask(id) {
    this.projectTasks = this.projectTasks.filter(task => task.todoId !== id);
  }
}



export { todoMain, Project };

