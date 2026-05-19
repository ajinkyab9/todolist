import { todoMain, Project } from "./logic.js";

const STORAGE_KEY = "todo_list_data";

export const saveToLocalStorage = (allProjectsArray) => {
  const serializedData = JSON.stringify(allProjectsArray);
  localStorage.setItem(STORAGE_KEY, serializedData);
};

export const loadFromLocalStorage = () => {
  const rawData = localStorage.getItem(STORAGE_KEY);

  if (!rawData) {
    return [new Project("Default Project")];
  }

  const parsedDataArray = JSON.parse(rawData);
  const retrievedProjects = [];

  parsedDataArray.forEach((projectData) => {
    const projectReconstruct = new Project(
      projectData.projectName || "New Project",
    );

    projectReconstruct.projectId = projectData.projectId;

    projectData.projectTasks.forEach((taskData) => {
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

    // to add projects to the new array
    retrievedProjects.push(projectReconstruct);
  });

  return retrievedProjects;
};