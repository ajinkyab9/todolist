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
}

function addTask() {
  todoLists.push(projectTasks);
  console.log(todoLists);
}

addTask("Buy Keyboard");