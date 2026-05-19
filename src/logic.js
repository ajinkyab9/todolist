class todoMain {
  constructor(todoTitle, dueDate, todoDescription, priority, todoNotes) {
    this.createTime = Date.now();
    this.todoId = crypto.randomUUID();
    this.todoTitle = todoTitle;
    this.dueDate = dueDate;
    this.todoDescription = todoDescription;
    this.priority = priority;
    this.todoNotes = todoNotes;
    this.todoComplete = false;
  }
  toggleStatus() {
    this.todoComplete = !this.todoComplete;
  }
}

class Project {
  constructor(projectName) {
    this.projectName = projectName;
    this.projectId = crypto.randomUUID();
    this.projectTasks = [];
  }
  addTask(todo) {
    this.projectTasks.push(todo);
    console.log(`Successfully added: ${todo.todoTitle}`);
  }

  deleteTask(id) {
    this.projectTasks = this.projectTasks.filter((task) => task.todoId !== id);
  }

  getTaskId(id) {
    return this.projectTasks.find((task) => task.todoId === id);
  }
}

export { todoMain, Project };

