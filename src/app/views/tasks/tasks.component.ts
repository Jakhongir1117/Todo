import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {DataHandlerService} from '../../service/data-handler.service';
import {Task} from '../../model/Task';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {EditTaskDialogComponent} from '../../dialog/edit-task-dialog/edit-task-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmDialogComponent} from '../../dialog/confirm-dialog/confirm-dialog.component';
import {Category} from '../../model/Category';
import {Priority} from '../../model/Priority';
import {OperType} from '../../dialog/OperType';


@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {


  displayedColumns: string[] = ['color', 'id', 'title', 'date', 'priority', 'category', 'operations', 'select'];
  dataSource: MatTableDataSource<Task>;

  @ViewChild (MatPaginator, {static: false}) private paginator: MatPaginator;
  @ViewChild (MatSort, {static: false}) private sort: MatSort;



  @Output()
  deleteTask = new EventEmitter<Task>();

  @Output()
  updateTask = new EventEmitter<Task>();

  @Output()
  selectCategory = new EventEmitter<Category>();

  @Output()
  filterByTitle = new EventEmitter<string>();

  @Output()
  filterByStatus = new EventEmitter<boolean>();

  @Output()
  filterByPriority = new EventEmitter<Priority>();

  @Output()
  addTask = new EventEmitter<Task>();



  searchTaskText: string;
  selectedStatusFilter: boolean = null;
  selectedPriorityFilter: Priority = null;



  priorities: Priority[];
  tasks: Task[];


  // current tasks to be displayed on the page
  @Input('tasks')
  private set setTasks(tasks: Task[]) {
    this.tasks = tasks;
    this.fillTable();
  }

  @Input('priorities')
  set setPriorities(priorities: Priority[]) {
    this.priorities = priorities;
  }

  @Input()
  selectedCategory: Category;



  constructor(
    private dataHandler: DataHandlerService,
    private dialog: MatDialog,

  ) {
  }

  ngOnInit(): void {

    this.dataSource = new MatTableDataSource();

    this.onSelectCategory(null);

    // this.fillTable(); // fill tables with data(tasks) and all metadata
  }





    getPriorityColor(task: Task): string {

    // color of completed tasks
    if (task.completed) {
      return '#F8F9FA';
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
     openEditTaskDialog(task: Task): void {

    // opening a dialog box
    const dialogRef = this.dialog.open(EditTaskDialogComponent, {data: [task, 'Task editing', OperType.EDIT], autoFocus: false});

    dialogRef.afterClosed().subscribe( result => {
        // processing of results

      if (result === 'complete') {
        task.completed = true;
        this.updateTask.emit(task);
      }

      if (result === 'activate') {
        task.completed = false;
        this.updateTask.emit(task);
        return;
      }

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


  // delete confirmation dialog
  openDeleteDialog(task:Task) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '500px',
      data:
        {dialogTitle: 'Confirm action',
        message: `Do you really want to delete task: "${task.title}"?`
      },
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe( result => {
      if(result) {
        this.deleteTask.emit(task);
      }
    });
  }


  onToggleStatus(task:Task) {
    task.completed = !task.completed;
    this.updateTask.emit(task);
  }

  onSelectCategory(category:Category) {
    this.selectCategory.emit(category);
  }

  onFilterByTitle() {
    this.filterByTitle.emit(this.searchTaskText);
  }

  onFilterByStatus(value: boolean) {

    if (value !== this.selectedStatusFilter) {
      this.selectedStatusFilter = value;
      this.filterByStatus.emit(this.selectedStatusFilter);
    }
  }

  onFilterByPriority(value: Priority) {

    if (value !== this.selectedPriorityFilter) {
      this.selectedPriorityFilter = value;
      this.filterByPriority.emit(this.selectedPriorityFilter);
    }
  }

  openAddTaskDialog() {

    const task = new Task(null, '', false, null, this.selectedCategory);

    const dialogRef = this.dialog.open(EditTaskDialogComponent, {data: [task, 'Adding a task', OperType.ADD]});

    dialogRef.afterClosed().subscribe( result => {
      if (result) {
        this.addTask.emit(task);
      }
    });

  }


}













