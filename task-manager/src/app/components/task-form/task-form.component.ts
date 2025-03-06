import { Component, EventEmitter, Output } from '@angular/core';
import { Task } from '../../models/task.model';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: []
})
export class TaskFormComponent {
  @Output() taskAdded = new EventEmitter<Task>();

  task: Task = { title: '', description: '', status: 'TODO' };

  constructor(private taskService: TaskService) {}

  onStatusChange(event: any) {
    this.task.status = event.target.value as 'TODO' | 'IN_PROGRESS' | 'COMPLETED';
  }
  
  onSubmit() {
    this.taskService.createTask(this.task).subscribe((newTask) => {
      this.taskAdded.emit(newTask);
      this.task = { title: '', description: '', status: 'TODO' }; // Reset form
    });
  }
}
