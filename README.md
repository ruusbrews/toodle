# Toodle - To-Do List Desktop App

### Welcome!

Toodle is a to-do list and timer app that lets you add, remove and strike through tasks, choose how much time you want to work for, and change the theme and background with just one click. I also added a bunch of cute sound effects!

**Watch the demo video here:** https://youtu.be/TTXHpAhk8QA

**Download and install the Toodle desktop app and try it for yourself**
👇 https://github.com/ruusbrews/toodle/releases/latest

Only on windows - find the file in Downloads and run the installer.

Feel free to follow the rest of the steps to try customising or editing the code for yourself.

## Installation

### Requirements
- Node.js (v14 or higher)
- npm (comes with Node.js)

### Setup (to customise or change code)

1. Clone directory:
   ```
   git clone https://github.com/ruusbrews/toodle.git
   ```

2. Navigate to folder in terminal

3. Install dependencies:
   ```
   npm install
   ```

   This will install Electron and any other dependencies listed in package.json

### Running the App

```
npm start
```

This will launch the Electron app with a fixed 1000x600 window containing:
- **Left Panel**: To-Do List - Add, view, and delete tasks
- **Right Panel**: Custom Timer - Start, pause, and reset a 25-minute timer

### Project Structure

```
toodle/
├── main.js              # Electron main process
├── preload.js           # Preload script for IPC
├── package.json         # Dependencies and scripts
├── src/
│   ├── index.html       # Main HTML file
│   ├── styles.css       # Styling
│   └── renderer.js      # UI logic
└── README.md            # This file
```

## Notes

- The window is set to a fixed size (1000x600) and cannot be resized
- No menu bar is shown for a cleaner desktop app experience
- All dependencies are local to the project (no system-level requirements)
