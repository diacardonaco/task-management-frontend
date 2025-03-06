import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: []
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks() {
    this.taskService.getTasks().subscribe((data) => {
      this.tasks = data;
    });
  }

  deleteTask(id?: number) {
    if (!id) return;
    this.taskService.deleteTask(id).subscribe(() => {
      this.tasks = this.tasks.filter((task) => task.id !== id);
    });
  }

  updateTaskStatus(task: Task) {
    const updatedTask = { ...task, status: this.getNextStatus(task.status) };
    // this.taskService.updateTask(task.id!, updatedTask).subscribe((newTask) => {
    //   this.tasks = this.tasks.map((t) => (t.id === newTask.id ? newTask : t));
    // });
  }

  getNextStatus(currentStatus: string): string {
    const statusOrder = ['TODO', 'IN_PROGRESS', 'COMPLETED'];
    const currentIndex = statusOrder.indexOf(currentStatus);
    return statusOrder[(currentIndex + 1) % statusOrder.length];
  }
}
