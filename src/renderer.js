// Sound effects
const beepSound = document.getElementById('beepSound');
const clickSound = document.getElementById('clickSound');
const strikeThroughSound = document.getElementById('strikeThroughSound');
const crumplingPaperSound = document.getElementById('crumplingPaperSound');

function playClickSound() {
  clickSound.currentTime = 0;
  clickSound.play().catch(err => console.log('Click sound play failed:', err));
}

function playBeepSound() {
  beepSound.currentTime = 0;
  beepSound.play().catch(err => console.log('Beep sound play failed:', err));
}

function playStrikeThroughSound() {
  strikeThroughSound.currentTime = 0;
  strikeThroughSound.play().catch(err => console.log('Strike-through sound play failed:', err));
}

function playCrumplingPaperSound() {
  crumplingPaperSound.currentTime = 0;
  crumplingPaperSound.play().catch(err => console.log('Crumpling paper sound play failed:', err));
}

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
  playStrikeThroughSound();
  renderTasks();
}

function deleteTask(index) {
  playCrumplingPaperSound();
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

addTaskBtn.addEventListener('click', () => {
  playClickSound();
  addTask();
});
taskInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    playClickSound();
    addTask();
  }
});

// Timer functionality
const timerMinutes = document.getElementById('timerMinutes');
const timerSeconds = document.getElementById('timerSeconds');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');
const presetBtns = document.querySelectorAll('.preset-btn');

let initialTime = 30 * 60; // 30 minutes in seconds
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
  playClickSound();
  pauseTimer();
  initialTime = minutes * 60;
  timeLeft = initialTime;
  updateDisplay();
  updatePresetButtonStates();
}

function updatePresetButtonStates() {
  presetBtns.forEach((btn) => {
    const btnText = btn.textContent.trim();
    let btnMinutes;
    
    if (btnText === '30m') btnMinutes = 30;
    else if (btnText === '1h') btnMinutes = 60;
    else if (btnText === '1h30m') btnMinutes = 90;
    else if (btnText === '2h') btnMinutes = 120;
    else btnMinutes = parseInt(btnText);
    
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
      playBeepSound();
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

startBtn.addEventListener('click', () => {
  playClickSound();
  startTimer();
});
pauseBtn.addEventListener('click', () => {
  playClickSound();
  pauseTimer();
});
resetBtn.addEventListener('click', () => {
  playClickSound();
  resetTimer();
});

// Initialize display with default 30 minutes
initialTime = 30 * 60;
updateDisplay();
updatePresetButtonStates();

// Background switcher functionality
function switchBackground(bg) {
  playClickSound();
  
  const backgroundImages = {
    ocean: 'ocean.jpg',
    sunset: 'sunset.jpg',
    mountains: 'mountains.jpg'
  };

  const themeColors = {
    ocean: '#7FB3D5',      // Muted pastel blue
    sunset: '#E8B4A8',     // Pastel warm peachy
    mountains: '#A8A375'   // Pastel olive green
  };

  const themeColorHovers = {
    ocean: '#5A8FB3',      // Dark blue
    sunset: '#D4876B',     // Dark peachy
    mountains: '#7A7B52'   // Dark olive green
  };

  const themeTitleColors = {
    ocean: '#5A8AB8',      // Light ocean blue
    sunset: '#C07A55',     // Light sunset orange
    mountains: '#6A8A4A'   // Light mountain green
  };

  const imageName = backgroundImages[bg];
  const themeColor = themeColors[bg];
  const themeColorHover = themeColorHovers[bg];
  const themeTitleColor = themeTitleColors[bg];
  
  document.body.style.backgroundImage = `url('../images/${imageName}')`;
  document.documentElement.style.setProperty('--theme-color', themeColor);
  document.documentElement.style.setProperty('--theme-color-hover', themeColorHover);
  document.documentElement.style.setProperty('--theme-title-color', themeTitleColor);

  // Update active circle
  const circles = document.querySelectorAll('.bg-circle');
  circles.forEach((circle) => {
    circle.classList.remove('active');
  });
  document.querySelector(`[data-bg="${bg}"]`).classList.add('active');
}
