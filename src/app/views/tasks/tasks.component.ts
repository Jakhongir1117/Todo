import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {DataHandlerService} from '../../service/data-handler.service';
import {Task} from '../../model/Task';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';


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

  @Input()
  private tasks: Task[];

  constructor(private dataHandler: DataHandlerService) {
  }

  ngOnInit(): void {

    this.dataSource = new MatTableDataSource();
    this.fillTable(); // fill tables with data(tasks) and all metadata
  }



  toggleTaskCompleted(task: Task) {
    task.completed = !task.completed;
  }


  private getPriorityColor(task: Task) {

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
  private fillTable() {

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

  private addTableObjects() {
    this.dataSource.sort = this.sort; // data sorting component
    this.dataSource.paginator = this.paginator; // update paging component
  }
}













