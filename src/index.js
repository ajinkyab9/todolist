import { todoMain, Project } from "./logic.js";
import { triggerNewTodo } from "./ui_handler.js";

const defaultProject = new Project("General Task");

const testTask = new todoMain(
  "Clean Keyboard",
  "today",
  "tomorrow",
  "Routine keyboard maintenance",
  "High",
);

defaultProject.addTask(testTask);

console.log(defaultProject);
