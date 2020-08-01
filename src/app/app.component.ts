import { Component, OnInit } from '@angular/core';
import {DataHandlerService} from './service/data-handler.service';
import { Task } from './model/Task';
import {Category} from './model/Category';
import {Priority} from './model/Priority';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'Todo2';
  tasks: Task[];
  categories: Category[];
  priorities: Priority[];

  selectedCategory: Category = null;

  searchTaskText = '';
  statusFilter: boolean;
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

    this.updateTasks();

  }

  //updating tasks
  onUpdateTask(task: Task) {

    this.updateTasks();

  }


  // deleting task
  onDeleteTask(task: Task) {
    this.dataHandler.deleteTask(task.id).subscribe( cat => {
        this.onSelectCategory(this.selectedCategory);
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

      this.updateTasks();

    });

  }

  onAddCategory(title: string) {
    this.dataHandler.addCategory(title).subscribe( () => this.updateCategories());
  }

  updateCategories() {
      this.dataHandler.getAllCategories().subscribe( categories => this.categories = categories);
  }

  onSearchCategory(title: string) {

    this.searchCategoryText = title;

    this.dataHandler.searchCategories(title).subscribe(categories =>{
      this.categories = categories;
    });

  }


}



