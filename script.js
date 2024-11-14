const taskInput = document.getElementById("taskInput");
const category = document.getElementById("category");
const priority = document.getElementById("priority");
const addTask = document.getElementById("addTask");
const taskList = document.getElementById("taskList");
const searchInput = document.getElementById("searchInput");
const filterCategory = document.getElementById("filterCategory");
const themeToggle = document.getElementById("themeToggle");

// Load tasks from local storage
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
renderTasks(tasks);

// Add new task
addTask.addEventListener("click", () => {
  const taskText = taskInput.value.trim();
  if (taskText) {
    const task = {
      text: taskText,
      category: category.value,
      priority: priority.value,
      done: false,
    };
    tasks.push(task);
    saveTasks();
    renderTasks(tasks);
    taskInput.value = ""; // Clear input
  }
});

// Render tasks
function renderTasks(taskArray) {
  taskList.innerHTML = "";
  taskArray.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = task.done ? "done" : "";
    li.innerHTML = `
      <span>${task.text} - [${task.category}] - [${task.priority}]</span>
      <div>
        <button class="complete">${task.done ? "Undo" : "Done"}</button>
        <button class="delete">Delete</button>
      </div>
    `;
    li.querySelector(".complete").addEventListener("click", () => toggleDone(index));
    li.querySelector(".delete").addEventListener("click", () => deleteTask(index));
    taskList.appendChild(li);
  });
}

// Toggle task done
function toggleDone(index) {
  tasks[index].done = !tasks[index].done;
  saveTasks();
  renderTasks(tasks);
}

// Delete task
function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks(tasks);
}

// Save tasks to local storage
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Search tasks
searchInput.addEventListener("input", () => {
  const searchTerm = searchInput.value.toLowerCase();
  const filteredTasks = tasks.filter((task) =>
    task.text.toLowerCase().includes(searchTerm)
  );
  renderTasks(filteredTasks);
});

// Filter by category
filterCategory.addEventListener("change", () => {
  const selectedCategory = filterCategory.value;
  const filteredTasks =
    selectedCategory === "All"
      ? tasks
      : tasks.filter((task) => task.category === selectedCategory);
  renderTasks(filteredTasks);
});

// Theme toggle
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
});
