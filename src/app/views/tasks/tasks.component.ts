import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {DataHandlerService} from '../../service/data-handler.service';
import {Task} from '../../model/Task';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {EditTaskDialogComponent} from '../../dialog/edit-task-dialog/edit-task-dialog.component';
import {MatDialog} from '@angular/material/dialog';


@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {


  displayedColumns: string[] = ['color', 'id', 'title', 'date', 'priority', 'category'];
  dataSource: MatTableDataSource<Task>;

  @ViewChild (MatPaginator, {static: false}) private paginator: MatPaginator;
  @ViewChild (MatSort, {static: false}) private sort: MatSort;

  // current tasks to be displayed on the page
  @Input('tasks')
  private set setTasks(tasks: Task[]) {
    this.tasks = tasks;
    this.fillTable();
  }

  @Output()
  deleteTask = new EventEmitter<Task>();

  @Output()
  updateTask = new EventEmitter<Task>();


  tasks: Task[];


  constructor(
    private dataHandler: DataHandlerService,
    private dialog: MatDialog,

  ) {
  }

  ngOnInit(): void {

    this.dataSource = new MatTableDataSource();
    this.fillTable(); // fill tables with data(tasks) and all metadata
  }



  toggleTaskCompleted(task: Task) {
    task.completed = !task.completed;
  }


    private getPriorityColor(task: Task): string {

    // color of completed tasks
    if (task.completed) {
      return '#F8F9FA';  // TODO make colors constant
    }

    if (task.priority && task.priority.color) {
      return task.priority.color;
    }

    return '#fff';

  }

  // shows tasks using all current conditions (category, search, filters and etc)
  private fillTable(): void {

    if (!this.dataSource) {
      return;
    }

    this.dataSource.data = this.tasks;

    this.addTableObjects();


    // when when we receive new data
    // so that we can sort by columns
    this.dataSource.sortingDataAccessor = (task, colName) => {

    // by which fields to sort for each column
      switch (colName) {
        case  'priority' : {
          return task.priority ? task.priority.id : null;
        }
        case 'category' : {
          return task.category ? task.category.title : null;
        }
        case 'date' : {
          return task.date ? task.date.toDateString() : null;
        }
        case 'title' : {
          return task.title;
        }

      }

    };

  }

  private addTableObjects(): void {
    this.dataSource.sort = this.sort; // data sorting component
    this.dataSource.paginator = this.paginator; // update paging component
  }


  // dialog editing for adding a task
  private openEditTaskDialog(task: Task): void {

    // opening a dialog box
    const dialogRef = this.dialog.open(EditTaskDialogComponent, {data: [task, 'Task editing'], autoFocus: false});

    dialogRef.afterClosed().subscribe( result => {
        // processing of results

      if (result === 'delete') {
        this.deleteTask.emit(task);
        return;
      }

      if (result as Task) {
          this.updateTask.emit(task);
          return;
        }

    });


  }

}













