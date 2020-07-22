import {Category} from './Category';
import {Priority} from './Priority';

export class Task {
  id: number;
  title: string;
  completed: boolean;
  category?: Category;
  priority?: Priority;
  date?: Date;


  constructor(id: number, title: string, completed: boolean, category?: Category, priority?: Priority, date?: Date) {
    this.id = id;
    this.title = title;
    this.completed = completed;
    this.category = category;
    this.priority = priority;
    this.date = date;
  }
}
