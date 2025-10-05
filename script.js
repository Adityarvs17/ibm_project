let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function displayTasks() {
    const tasksList = document.getElementById('tasks');
    tasksList.innerHTML = '';
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.className = task.completed ? 'completed' : '';
        li.innerHTML = `
            <span>
                ${task.name} (${task.date}) - ${task.priority}
            </span>
            <span>
                <input type="checkbox" ${task.completed ? 'checked' : ''} onclick="toggleComplete(${index})">
                <button class="delete" onclick="deleteTask(${index})">Delete</button>
            </span>
        `;
        tasksList.appendChild(li);
        const today = new Date().toISOString().split('T')[0];
        if(task.date === today && !task.completed){
            alert(`Reminder: "${task.name}" is due today!`);
        }
    });
}

function addTask() {
    const taskName = document.getElementById('taskName').value.trim();
    const dueDate = document.getElementById('dueDate').value;
    const priority = document.getElementById('priority').value;

    if(taskName && dueDate){
        tasks.push({name: taskName, date: dueDate, priority, completed: false});
        localStorage.setItem('tasks', JSON.stringify(tasks));
        displayTasks();
        document.getElementById('taskName').value = '';
        document.getElementById('dueDate').value = '';
    } else {
        alert('Please enter task name and date.');
    }
}

function deleteTask(index){
    tasks.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    displayTasks();
}

function toggleComplete(index){
    tasks[index].completed = !tasks[index].completed;
    localStorage.setItem('tasks', JSON.stringify(tasks));
    displayTasks();
}

document.getElementById('addTask').addEventListener('click', addTask);

displayTasks();
