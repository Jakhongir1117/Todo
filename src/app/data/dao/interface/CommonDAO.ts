// standard methods CRUD (create, read, update, delete)

import {Observable} from 'rxjs';

// all methods return observable - for asynchronous and reactive style
export interface CommonDAO<T> {

  // get all values
  add(T): Observable<T>;

  // get one value by id
  get(id: number): Observable<T>;

  // update value
  update(T): Observable<T>;

  // delete value
  delete(id: number): Observable<T>;

  // add value
  getAll(): Observable<T[]>;

}


