// To-Do List functionality
const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');

let tasks = [];
let draggedIndex = null;

function renderTasks() {
  if (tasks.length === 0) {
    taskList.innerHTML = '<li class="placeholder">No tasks yet. Add one to get started!</li>';
    return;
  }

  taskList.innerHTML = tasks
    .map(
      (task, index) => `
    <li class="${task.completed ? 'completed' : ''}" draggable="true" ondragstart="handleDragStart(event, ${index})" ondragend="handleDragEnd(event)" ondrop="handleDrop(event)" ondragover="handleDragOver(event)">
      <input type="checkbox" class="task-checkbox" ${task.completed ? 'checked' : ''} onchange="toggleTask(${index})">
      <div class="task-content">
        <span class="task-text">${escapeHtml(task.text)}</span>
      </div>
      <button class="delete-btn" onclick="deleteTask(${index})">🗑️</button>
    </li>
  `
    )
    .join('');
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

function addTask() {
  const task = taskInput.value.trim();
  if (task === '') return;

  tasks.push({ text: task, completed: false });
  taskInput.value = '';
  renderTasks();
}

function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  renderTasks();
}

function handleDragStart(event, index) {
  draggedIndex = index;
  event.currentTarget.classList.add('dragging');
  event.dataTransfer.effectAllowed = 'move';
}

function handleDragEnd(event) {
  event.currentTarget.classList.remove('dragging');
}

function handleDragOver(event) {
  event.preventDefault();
  event.dataTransfer.dropEffect = 'move';
}

function handleDrop(event) {
  event.preventDefault();
  if (event.target.closest('li') && draggedIndex !== null) {
    const targetIndex = Array.from(taskList.querySelectorAll('li')).indexOf(event.target.closest('li'));
    if (targetIndex !== -1 && targetIndex !== draggedIndex) {
      const draggedTask = tasks[draggedIndex];
      tasks.splice(draggedIndex, 1);
      tasks.splice(targetIndex, 0, draggedTask);
      renderTasks();
    }
  }
}

addTaskBtn.addEventListener('click', addTask);
taskInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') addTask();
});

// Timer functionality
const timerMinutes = document.getElementById('timerMinutes');
const timerSeconds = document.getElementById('timerSeconds');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');
const presetBtns = document.querySelectorAll('.preset-btn');

let initialTime = 25 * 60; // 25 minutes in seconds
let timeLeft = initialTime;
let isRunning = false;
let timerInterval = null;

function updateDisplay() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  timerMinutes.textContent = String(minutes).padStart(2, '0');
  timerSeconds.textContent = String(seconds).padStart(2, '0');
}

function setTimer(minutes) {
  pauseTimer();
  initialTime = minutes * 60;
  timeLeft = initialTime;
  updateDisplay();
  updatePresetButtonStates();
}

function updatePresetButtonStates() {
  presetBtns.forEach((btn) => {
    const btnMinutes = parseInt(btn.textContent);
    if (initialTime === btnMinutes * 60) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });
}

function startTimer() {
  if (isRunning) return;
  isRunning = true;

  timerInterval = setInterval(() => {
    if (timeLeft > 0) {
      timeLeft--;
      updateDisplay();
    } else {
      clearInterval(timerInterval);
      isRunning = false;
      alert('Time is up!');
    }
  }, 1000);
}

function pauseTimer() {
  if (timerInterval) {
    clearInterval(timerInterval);
    isRunning = false;
  }
}

function resetTimer() {
  pauseTimer();
  timeLeft = initialTime;
  updateDisplay();
}

startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);

// Initialize display with default 25 minutes
initialTime = 25 * 60;
updateDisplay();
updatePresetButtonStates();
