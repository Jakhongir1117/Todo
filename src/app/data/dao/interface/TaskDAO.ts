import {CommonDAO} from './CommonDAO';
import {Task} from '../../../model/Task';
import {Category} from '../../../model/Category';
import {Priority} from '../../../model/Priority';
import {Observable} from 'rxjs';

// specific methods for working with tasks (which are not included in regular CRUD)
export interface TaskDAO extends CommonDAO<Task> {

  // search for tasks by all parameters
  // if any parameter is null - it will not be taken into account when searching
  search(category: Category, searchText: string, status: boolean, priority: Priority): Observable<Task[]>;

  // number of completed tasks in a given category (if category == null, then for all categories)
  getCompletedCountInCategory(category: Category): Observable<number>;

  // number of uncompleted tasks in a given category (if category == null, then for all categories)
  getUncompletedCountInCategory(category: Category): Observable<number>;

  // number of all tasks in a given category (if category == null, then for all categories)
  getTotalCountInCategory(category: Category): Observable<number>;

  // number of all tasks in total
  getTotalCount(): Observable<number>;

}
