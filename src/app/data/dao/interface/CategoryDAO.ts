import {CommonDAO} from './CommonDAO';
import {Category} from '../../../model/Category';
import {Observable} from 'rxjs';

// specific methods for working with categories (which are not included in regular CRUD)
export interface CategoryDAO extends CommonDAO<Category> {

  // search categories by title
  search(title: string): Observable<Category[]>;

}
