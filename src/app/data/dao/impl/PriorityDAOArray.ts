import {PriorityDAO} from '../interface/PriorityDAO';
import {Priority} from '../../../model/Priority';
import {Observable, of} from 'rxjs';
import {TestData} from '../../TestData';
import {Category} from '../../../model/Category';

export class PriorityDAOArray implements PriorityDAO {

  static priorities = TestData.priorities;

  add(priority: Priority): Observable<Priority> {

    if (priority.id === null || priority.id === 0) {
      priority.id = this.getLastIdPriority();
    }

    PriorityDAOArray.priorities.push(priority);

    return of(priority);
  }

  delete(id: number): Observable<Priority> {

    TestData.tasks.forEach(task => {
      if (task.priority && task.priority.id === id) {
        task.priority = null;
      }
    });

    const tmpPriority = PriorityDAOArray.priorities.find( t => t.id === id);
    PriorityDAOArray.priorities.splice(PriorityDAOArray.priorities.indexOf(tmpPriority), 1);

    return of (tmpPriority);

  }

  get(id: number): Observable<Priority> {
    return of(PriorityDAOArray.priorities.find( priority => priority.id === id));
  }

  getAll(): Observable<Priority[]> {
    return of(PriorityDAOArray.priorities);
  }

  update(priority: Priority): Observable<Priority> {

    const tmp = TestData.priorities.find( t => t.id === priority.id);
    PriorityDAOArray.priorities.splice(PriorityDAOArray.priorities.indexOf(tmp), 1, priority);

    return of (priority);
  }

  getLastIdPriority(): number {
    return Math.max.apply(Math, TestData.priorities.map(c => c.id)) + 1;
  }

}
