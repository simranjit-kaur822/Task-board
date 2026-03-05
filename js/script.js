const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addtaskBtn');
const taskList = document.getElementById('taskList');

const totalTasks = document.getElementById('totalTask');
const completedTasks = document.getElementById('completedTask');
const pendingTasks = document.getElementById('pendingTask');

const taskChart = document.getElementById('taskChart').getContext('2d');

addTaskBtn.addEventListener('click', addTask);

function addTask(){
    const tasktext = taskInput.value.trim();
    if(tasktext === ''){
        alert('please enter a task');
        return;
    }
    const li = document.createElement('li');
    li.className = 'flex  items-center bg-gray-100 p-4 rounded-lg';
    li.innerHTML = `
        <span class="flex-1">${tasktext}</span>
        <button id="completeBtn" class="px-3 mx-1 py-1 bg-green-500 text-white rounded hover:bg-green-700 cursor-pointer">Complete</button>
        <button id="deleteBtn" class="px-3 mx-1 py-1 bg-red-500 text-white rounded hover:bg-red-700 cursor-pointer">Delete</button>`
    taskList.appendChild(li);
    taskInput.value = '';
    // Add event listener to the complete button
    const completeBtn = li.querySelector('#completeBtn');
    completeBtn.addEventListener('click', function(){
        li.classList.toggle('completed');
        // Toggle button text
        if(li.classList.contains('completed')){
            completeBtn.textContent = 'Undo';
        }else{
            completeBtn.textContent = 'Complete';
        }
        updateCompletedTasks();
    })

    // Add event listener to the delete button
    const deleteBtn = li.querySelector('#deleteBtn');
    deleteBtn.addEventListener('click', function(){
        taskList.removeChild(li);
        updatetotalTasks();
        updateCompletedTasks();
        updatePendingTasks();
        updateChart();
    })

    updatetotalTasks();
    updateCompletedTasks();
    updatePendingTasks();
    updateChart();
}

// Function to update total tasks count
function updatetotalTasks(){
    const total = taskList.children.length;
    totalTasks.textContent = total;
}

// Function to update completed tasks count
function updateCompletedTasks(){
    const completed = taskList.querySelectorAll('.completed').length;
    completedTasks.textContent =completed;
    updatePendingTasks();
    updateChart();
}

// Function to update pending tasks count
function updatePendingTasks(){
    const total = taskList.children.length;
    const completed = taskList.querySelectorAll('.completed').length;
    const pending = total - completed;
    pendingTasks.textContent = pending;
    updateChart();
}

// Initialize Chart.js
const chart = new Chart(taskChart, {
    type: 'doughnut',
    data: {
        labels: ['Completed', 'Pending'],   
        datasets: [{
            data: [0, 0],
            backgroundColor: ['#77f1b0', '#fcff4e']
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: 'bottom',
            }
        }
    }
    
})

// Function to update the chart
function updateChart(){
    const completed = taskList.querySelectorAll('.completed').length;
    const total = taskList.children.length;
    const pending = total - completed;
    chart.data.datasets[0].data = [completed, pending];
    chart.update();
}