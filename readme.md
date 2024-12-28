TypeScript CLI Task Manager
A simple command-line task manager built with TypeScript that helps you manage your daily tasks.
Features

Add new tasks
List all tasks (with option to show/hide completed tasks)
Mark tasks as completed
Delete tasks
Persistent storage using JSON file
Colorful command-line interface

Installation

Clone the repository:

git clone https://github.com/eloogah/task-manager.git
cd task-manager

Install dependencies:

npm install
Usage
The following commands are available:
Add a new task
npm start -- add "Complete the project"
List all tasks
npm start -- list
List only incomplete tasks
npm start -- list -a
Complete a task (replace <id> with the task ID)
npm start -- complete <id>
Delete a task (replace <id> with the task ID)
npm start -- delete <id>
Development

Build the project:

npm run build

Run in development mode:

npm start
Dependencies

commander - Command-line interface
chalk - Terminal styling
uuid - Unique ID generation
TypeScript
ts-node

License
This project is licensed under the MIT License - see the LICENSE file for details.
Contributing

Fork the repository
Create your feature branch (git checkout -b feature/amazing-feature)
Commit your changes (git commit -m 'Add some amazing feature')
Push to the branch (git push origin feature/amazing-feature)
Open a Pull Request