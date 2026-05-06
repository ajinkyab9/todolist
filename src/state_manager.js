import { todoMain, Project } from "./logic.js";

const STORAGE_KEY = "todo_list_data";

export const saveToLocalStorage = (project) => {
  const serializedData = JSON.stringify(project);
  localStorage.setItem(STORAGE_KEY, serializedData);
};

//load to get string then parse it and retrieve classes

export const loadFromLocalStorage = () => {
  const rawData = localStorage.getItem(STORAGE_KEY);
  console.log(rawData);

  if (!rawData) {
    return new Project("Default Project");
  }

  const parsedData = JSON.parse(rawData);
  console.log("//Below is parsed raw data");
  console.log(parsedData);

  //recalibration of data

  const projectReconstruct = new Project(parsedData.projectName || "My Tasks");
  console.log("below is reconstructed project");
  console.log(projectReconstruct);

  parsedData.projectTasks.forEach((taskData) => {
    const taskReconstruct = new todoMain(
      taskData.todoTitle,
      taskData.dueDate,
      taskData.todoDescription,
      taskData.priority,
      taskData.todoNotes,
    );

    taskReconstruct.todoId = taskData.todoId;
    taskReconstruct.todoComplete = taskData.todoComplete;
    taskReconstruct.createTime = taskData.createTime;

    projectReconstruct.addTask(taskReconstruct);
  });
  return projectReconstruct;
};
