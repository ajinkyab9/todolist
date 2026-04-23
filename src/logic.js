class todoMain {
  constructor(todoTitle, startDate, endDate, todoDescription, priority) {
    this.createTime = Date.now();
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
    this.projectName = projectName;
  }
  addTask(todo) {
    this.projectTasks.push(todo);
    console.log(`Successfully added: ${todo.todoTitle} to ${this.projectName}`);
  }
}

export { todoMain, Project };

