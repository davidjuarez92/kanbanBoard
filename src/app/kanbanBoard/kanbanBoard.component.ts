import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'kanban-board',
  templateUrl: './kanbanBoard.component.html',
  styleUrls: ['./kanbanBoard.component.scss']
})
export class KanbanBoard implements OnInit {
  tasks: Task[];
  stagesNames: string[];
  stagesTasks: any[]; //Only used for rendering purpose
  taskName: string = '';

  ngOnInit() {
    // Each task is uniquely identified by its name.
    // Therefore, when you perform any operation on tasks, make sure you pick tasks by names (primary key) instead of any kind of index or any other attribute.
    this.tasks = [
      { name: '0', stage: 0 },
      { name: '1', stage: 0 },
    ];
    this.stagesNames = ['Backlog', 'To Do', 'Ongoing', 'Done'];
    this.configureTasksForRendering();
  }

  // this function has to be called whenever tasks array is changed to construct stagesTasks for rendering purpose
  configureTasksForRendering = () => {
    this.stagesTasks = [];
    for (let i = 0; i < this.stagesNames.length; ++i) {
      this.stagesTasks.push([]);
    }
    for (let task of this.tasks) {
      const stageId = task.stage;
      this.stagesTasks[stageId].push(task);
    }
  }

  generateTestId = (name) => {
    return name.split(' ').join('-');
  }

  createTask = () => {
    if (this.taskName.trim() !== '') {
      this.stagesTasks[0].push({name: this.taskName, stage: 0});
    }
    this.taskName = '';
  }

  back = (index, i) => {
    if (i === 0) return;
    const newStage = i - 1;
    const task = this.stagesTasks[i][index];
    task.stage = newStage;
    this.stagesTasks[i].splice(index, 1);
    this.stagesTasks[newStage].push(task);
  }

  forward = (index, i) => {
    if (i === this.stagesTasks.length - 1) return;
    const newStage = i + 1;
    const task = this.stagesTasks[i][index];
    task.stage = newStage;
    this.stagesTasks[i].splice(index, 1);
    this.stagesTasks[newStage].push(task);
  }

  delete = (index, i) => {
    this.stagesTasks[i].splice(index, 1);
  }
}

interface Task {
  name: string;
  stage: number;
}
