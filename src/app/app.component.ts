import { Component, OnInit } from '@angular/core';
import {DataHandlerService} from './service/data-handler.service';
import { Task } from './model/Task';
import {Category} from './model/Category';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Todo2';
  tasks: Task[];
  categories: Category[];

  selectedCategory: Category = null;

  constructor(
    private dataHandler: DataHandlerService, // facade for working with data
  ) {
  }

  ngOnInit(): void {
    //this.dataHandler.getAllTasks().subscribe( tasks => this.tasks = tasks);
    this.dataHandler.getAllCategories().subscribe(categories => this.categories = categories);

    this.onSelectCategory(null);

  }

  // change category
  onSelectCategory(category: Category) {

    this.selectedCategory = category;

    this.dataHandler.searchTasks(
      this.selectedCategory,
      null,
      null,
      null
    ).subscribe( tasks=> {
        this.tasks = tasks;
    });
  }

  //updating tasks
  onUpdateTask(task: Task) {

        this.dataHandler.updateTask(task).subscribe( () => {

          this.dataHandler.searchTasks(
            this.selectedCategory,
            null,
            null,
            null
          ).subscribe( tasks => {
            this.tasks = tasks;
          });

        });

  }


  // deleting task
  onDeleteTask(task: Task) {

    this.dataHandler.deleteTask(task.id).subscribe( () => {
      this.dataHandler.searchTasks(
        this.selectedCategory,
        null,
        null,
        null
      ).subscribe( tasks => {
        this.tasks = tasks;
      });

    });

  }


  // deleting category
  onDeleteCategory(category:Category) {
    this.dataHandler.deleteCategory(category.id).subscribe( cat => {
        this.selectedCategory = null;
        this.onSelectCategory(this.selectedCategory);
    });

  }



  onUpdateCategory(category:Category) {
    this.dataHandler.updateCategory(category).subscribe( () => {
        this.onSelectCategory(this.selectedCategory);
    });

  }


}



