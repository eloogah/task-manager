#!/usr/bin/env node

//imports
import { program } from 'commander';
import chalk from 'chalk';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs/promises';
import path from 'path';

interface Task {
    id: string;
    title: string;
    completed: boolean;
    createdAt: Date;
    completedAt?: Date;
}

class TaskManager {
    private tasksFile: string;
    private tasks: Task[];

    constructor() {
        this.tasksFile = path.join(process.cwd(), 'tasks.json');
        this.tasks = [];
    }

    async loadTasks(): Promise<void> {
        try {
            const data = await fs.readFile(this.tasksFile, 'utf-8');
            this.tasks = JSON.parse(data);
        } catch (error) {
            this.tasks = [];
            await this.saveTasks();
        }
    }

    async saveTasks(): Promise<void> {
        await fs.writeFile(this.tasksFile, JSON.stringify(this.tasks, null, 2));
    }

    async addTask(title: string): Promise<void> {
        const task: Task = {
            id: uuidv4(),
            title,
            completed: false,
            createdAt: new Date()
        };
        this.tasks.push(task);
        await this.saveTasks();
        console.log(chalk.green('✓ Task added successfully'));
    }

    async listTasks(showCompleted: boolean = true): Promise<void> {
        let filteredTasks = showCompleted 
            ? this.tasks 
            : this.tasks.filter(task => !task.completed);

        if (filteredTasks.length === 0) {
            console.log(chalk.yellow('No tasks found'));
            return;
        }

        filteredTasks.forEach(task => {
            const status = task.completed 
                ? chalk.green('✓') 
                : chalk.yellow('○');
            const title = task.completed 
                ? chalk.gray(task.title) 
                : task.title;
            console.log(`${status} ${title} (${task.id})`);
        });
    }

    async completeTask(id: string): Promise<void> {
        const task = this.tasks.find(t => t.id === id);
        if (!task) {
            console.log(chalk.red('Task not found'));
            return;
        }

        task.completed = true;
        task.completedAt = new Date();
        await this.saveTasks();
        console.log(chalk.green('✓ Task marked as completed'));
    }

    async deleteTask(id: string): Promise<void> {
        const taskIndex = this.tasks.findIndex(t => t.id === id);
        if (taskIndex === -1) {
            console.log(chalk.red('Task not found'));
            return;
        }

        this.tasks.splice(taskIndex, 1);
        await this.saveTasks();
        console.log(chalk.green('✓ Task deleted successfully'));
    }
}

const taskManager = new TaskManager();

program
    .version('1.0.0')
    .description('A simple CLI task manager');

program
    .command('add <title>')
    .description('Add a new task')
    .action(async (title) => {
        await taskManager.loadTasks();
        await taskManager.addTask(title);
    });

program
    .command('list')
    .description('List all tasks')
    .option('-a, --all', 'Show all tasks including completed ones')
    .action(async (options) => {
        await taskManager.loadTasks();
        await taskManager.listTasks(options.all);
    });

program
    .command('complete <id>')
    .description('Mark a task as completed')
    .action(async (id) => {
        await taskManager.loadTasks();
        await taskManager.completeTask(id);
    });

program
    .command('delete <id>')
    .description('Delete a task')
    .action(async (id) => {
        await taskManager.loadTasks();
        await taskManager.deleteTask(id);
    });

program.parse(process.argv);