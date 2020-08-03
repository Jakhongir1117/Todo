import { Component, OnInit } from '@angular/core';
import {DataHandlerService} from './service/data-handler.service';
import { Task } from './model/Task';
import {Category} from './model/Category';
import {Priority} from './model/Priority';
import {zip} from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'Todo2';
  tasks: Task[];
  categories: Category[]; // all categories
  priorities: Priority[]; // all priorities

  // statistics
  totalTasksCountInCategory: number;
  completedCountInCategory: number;
  uncompletedCountInCategory: number;
  uncompletedTotalTasksCount: number;


  showStat = true;



  selectedCategory: Category = null;

  // search
  searchTaskText = '';
  statusFilter: boolean;

  // filtration
  priorityFilter: Priority;
  searchCategoryText: string;


  constructor(
    private dataHandler: DataHandlerService, // facade for working with data
  ) {
  }

  ngOnInit(): void {
    //this.dataHandler.getAllTasks().subscribe( tasks => this.tasks = tasks);
    this.dataHandler.getAllCategories().subscribe(categories => this.categories = categories);
    this.dataHandler.getAllPriorities().subscribe(priorities => this.priorities = priorities);

    this.onSelectCategory(null);

  }

  // change category
  onSelectCategory(category: Category) {

    this.selectedCategory = category;

    this.updateTasksAndStats();

  }

  //updating tasks
  onUpdateTask(task: Task) {

    this.updateTasksAndStats();

  }


  // deleting task
  onDeleteTask(task: Task) {
    this.dataHandler.deleteTask(task.id).subscribe( cat => {
        this.updateTasksAndStats();
    });

  }


  // deleting category
  onDeleteCategory(category:Category) {
    this.dataHandler.deleteCategory(category.id).subscribe( cat => {
        this.selectedCategory = null;
        this.onSearchCategory(this.searchCategoryText);
    });

  }


  onUpdateCategory(category:Category) {
    this.dataHandler.updateCategory(category).subscribe( () => {
      this.onSearchCategory(this.searchCategoryText);
    });

  }


  onSearchTasks(searchstring: string) {
    this.searchTaskText = searchstring;
    this.updateTasks();
  }


  onFilterTasksByStatus(status: boolean) {
    this.statusFilter = status;
    this.updateTasks();
  }

  onFilterTasksByPriority(priority: Priority) {
    this.priorityFilter = priority;
    this.updateTasks();
  }


  updateTasks() {
    this.dataHandler.searchTasks(
        this.selectedCategory,
        this.searchTaskText,
        this.statusFilter,
        this.priorityFilter
    ).subscribe( (tasks:Task[]) => {
        this.tasks = tasks;
    });
  }



  onAddTask(task: Task) {

    this.dataHandler.addTask(task).subscribe( result => {

      this.updateTasksAndStats();

    });

  }

  onAddCategory(title: string) {
    this.dataHandler.addCategory(title).subscribe( () => this.updateCategories());
  }

  updateCategories() {
      this.dataHandler.getAllCategories().subscribe( categories => this.categories = categories);
  }

  // search category
  onSearchCategory(title: string) {

    this.searchCategoryText = title;

    this.dataHandler.searchCategories(title).subscribe(categories =>{
      this.categories = categories;
    });

  }


  updateTasksAndStats() {

    this.updateTasks();

    this.updateStats();
  }


  // update statistics
  updateStats() {
    zip(
        this.dataHandler.getTotalCountInCategory(this.selectedCategory),
        this.dataHandler.getCompletedCountInCategory(this.selectedCategory),
        this.dataHandler.getUncompletedCountInCategory(this.selectedCategory),
        this.dataHandler.getUncompletedTotalCount())

      .subscribe( array => {
          this.totalTasksCountInCategory = array[0];
          this.completedCountInCategory = array[1];
          this.uncompletedCountInCategory = array[2];
          this.uncompletedTotalTasksCount = array[3];
      });
  }


  toggleStat(showStat: boolean) {
    this.showStat = showStat;
  }




}



