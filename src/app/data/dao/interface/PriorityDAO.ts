import {CommonDAO} from './CommonDAO';
import {Priority} from '../../../model/Priority';

// specific methods for working with priorities (which are not included in regular CRUD)
export interface PriorityDAO extends CommonDAO<Priority> {

}
