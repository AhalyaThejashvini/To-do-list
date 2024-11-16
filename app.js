document.addEventListener("DOMContentLoaded" , () => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (storedTasks) {
        storedTasks.forEach((task) => tasks.push(task));
        updateTasksList();
        updateStats();
    };
});

let tasks = [];

const saveTasks = () => {
    localStorage.setItem("tasks" , JSON.stringify(tasks));
};

const addTask = () => {
    const taskInput = document.getElementById("taskInput");
    const text = taskInput.value.trim();

    if(text){
        tasks.push({text: text , completed: false});
        taskInput.value = "";
        updateTasksList();
        updateStats();
        saveTasks();
    }    
};

const toggleTaskComplete = (index) => {
    tasks[index].completed = !tasks[index].completed;
    updateTasksList();
    updateStats();
    saveTasks();
};

const deleteTask = (index) => {
    tasks.splice(index, 1);
    updateTasksList();
    updateStats();
    saveTasks();
};

const editTask = (index) => {
    const taskInput = document.getElementById("taskInput");
    taskInput.value = tasks[index].text;

    tasks.splice(index, 1);
    updateTasksList();
    updateStats();
    saveTasks();
};

const updateStats = () => {
    const completedTasks = tasks.filter(task => task.completed).length;
    const totalTasks = tasks.length;
    const progress = (completedTasks / totalTasks) * 100;
    const progressBar = document.getElementById("progress");

    progressBar.style.width = `${progress}%`;

    if(tasks.length && completedTasks ==  totalTasks){
        blastConfetti();
    };

    document.getElementById("numbers").innerText = `${completedTasks} / ${totalTasks}`;
};

const updateTasksList = () => {
    const taskList = document.getElementById("task-list");
    taskList.innerHTML = "";

    tasks.forEach((task , index) => {
        const listItems = document.createElement("li");

        listItems.innerHTML = `
        <div class="taskItem">
            <div class="task ${task.completed ? "completed" : ""}">
                <input type="checkbox" class="checkbox" ${
                    task.completed ? "checked" : ""
                }/>
                <p>${task.text}</p>
            </div>
            <div class="icons">
                <img src="./img/edit.png" class="edit-btn" alt="Edit Task" />
                <img src="./img/bin.png" class="delete-btn" alt="Delete Task" />
            </div>
        </div>
        `;
        
        const checkbox = listItems.querySelector(".checkbox");
        listItems.addEventListener("change" , () => toggleTaskComplete(index));
        
        const editButton = listItems.querySelector(".edit-btn");
        editButton.addEventListener("click", () => editTask(index));

        const deleteButton = listItems.querySelector(".delete-btn");
        deleteButton.addEventListener("click", () => deleteTask(index));

        taskList.appendChild(listItems);
    });
};

document.getElementById("newTask").addEventListener("click" , function(e){
    e.preventDefault();

    addTask();
});

const blastConfetti = () => {
    const defaults = {
    spread: 360,
    ticks: 50,
    gravity: 0,
    decay: 0.94,
    startVelocity: 30,
    shapes: ["star"],
    colors: ["FFE400", "FFBD00", "E89400", "FFCA6C", "FDFFB8"],
    };
    
    function shoot() {
    confetti({
        ...defaults,
        particleCount: 40,
        scalar: 1.2,
        shapes: ["star"],
    });
    
    confetti({
        ...defaults,
        particleCount: 10,
        scalar: 0.75,
        shapes: ["circle"],
    });
    }
    
    setTimeout(shoot, 0);
    setTimeout(shoot, 100);
    setTimeout(shoot, 200);
}