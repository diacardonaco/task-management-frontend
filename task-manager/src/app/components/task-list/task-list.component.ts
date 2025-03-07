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
    if (!task?.id) return; // Evita errores si task es null o undefined
  
    const updatedTask: Task = { 
      ...task, 
      status: this.getNextStatus(task.status) // Ya no hace falta `as TaskStatus` si `getNextStatus()` está bien definida
    };
  
    this.taskService.updateTask(task.id, updatedTask).subscribe({
      next: (newTask) => {
        this.tasks = this.tasks.map((t) => (t.id === newTask.id ? newTask : t));
      },
      error: (err) => {
        console.error("Error al actualizar la tarea:", err);
      }
    });
  }
  

  getNextStatus(currentStatus: 'TODO' | 'IN_PROGRESS' | 'COMPLETED'): 'TODO' | 'IN_PROGRESS' | 'COMPLETED' {
    const statusMap: Record<'TODO' | 'IN_PROGRESS' | 'COMPLETED', 'TODO' | 'IN_PROGRESS' | 'COMPLETED'> = {
      TODO: 'IN_PROGRESS',
      IN_PROGRESS: 'COMPLETED',
      COMPLETED: 'TODO' // O cualquier otro flujo que necesites
    };
  
    return statusMap[currentStatus]; // Esto asegurará que siempre devuelva un valor válido
  }
  
}
