# Toodle - To-Do List Desktop App

## Installation

### Requirements
- Node.js (v14 or higher)
- npm (comes with Node.js)

### Setup

1. Navigate to the project directory:
   ```
   cd c:\Users\muham\Desktop\toodle
   ```

2. Install dependencies:
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
