// test data as arrays (replaces database tables)

import {Category} from '../model/Category';
import {Priority} from '../model/Priority';
import {Task} from '../model/Task';
import {Test} from 'tslint';

export class TestData {

  static categories: Category[] = [
    {id: 1, title: 'Car'},
    {id: 2, title: 'Family'},
    {id: 3, title: 'Finance'},
    {id: 4, title: 'Food'},
    {id: 5, title: 'Friends'},
    {id: 6, title: 'Gadgets'},
    {id: 7, title: 'Health'},
    {id: 8, title: 'Job'},
    {id: 9, title: 'Rest'},
    {id: 10, title: 'Sport'},
    {id: 11, title: 'Study'},

  ];

  static priorities: Priority[] = [
    {id: 1, title: 'Low', color: '#e5e5e5'},
    {id: 2, title: 'Normal', color: '#85D1B2'},
    {id: 3, title: 'High', color: '#F1828D'},
    {id: 4, title: 'Very urgent', color: '#F1128D'},
  ];

  static tasks: Task[] = [
    {
      id: 1,
      title: 'Going to job',
      completed: true,
      category: TestData.categories[7],
      priority: TestData.priorities[3],
      date: new Date('2020-07-31')
    },

    {
      id: 2,
      title: 'Reading maths book',
      completed: false,
      category: TestData.categories[10],
      priority: TestData.priorities[0],
      date: new Date('2020-08-01')
    },

    {
      id: 3,
      title: 'Meeting with partners',
      completed: false,
      category: TestData.categories[7],
      priority: TestData.priorities[3],
      date: new Date('2020-08-02')
    },

    {
      id: 4,
      title: 'Paint my car to another color',
      completed: false,
      category: TestData.categories[0],
      priority: TestData.priorities[0],
    },

    {
      id: 5,
      title: 'Going to gym',
      completed: false,
      category: TestData.categories[9],
      priority: TestData.priorities[1],
      date: new Date('2020-08-10')
    },

    {
      id: 6,
      title: 'Buy pizza',
      completed: false,
    },

    {
      id: 7,
      title: 'Have dinner with my family',
      completed: false,
      category: TestData.categories[1],
      priority: TestData.priorities[2],
      date: new Date('2020-08-05')
    },

    {
      id: 8,
      title: 'Travel to Bali',
      completed: false,
      category: TestData.categories[8],
      priority: TestData.priorities[1],
    },

    {
      id: 9,
      title: 'Buy a new phone',
      completed: false,
      category: TestData.categories[5],
      priority: TestData.priorities[2],
      date: new Date('2020-08-13')
    },

    {
      id: 10,
      title: 'Pour fuel to car',
      completed: false,
      category: TestData.categories[0],
      priority: TestData.priorities[2],
      date: new Date('2020-08-20')
    },

    {
      id: 11,
      title: 'Run',
      completed: false,
      category: TestData.categories[9],
      priority: TestData.priorities[1],
    },

    {
      id: 12,
      title: 'Going to dentist',
      completed: false,
      category: TestData.categories[6],
      priority: TestData.priorities[3],
      date: new Date('2020-07-31')
    },

    {
      id: 13,
      title: 'Pay taxes',
      completed: false,
      category: TestData.categories[2],
      priority: TestData.priorities[3],
      date: new Date('2020-08-08')
    },

    {
      id: 14,
      title: 'Get salary',
      completed: false,
      category: TestData.categories[2],
      priority: TestData.priorities[3],
      date: new Date('2020-07-31')
    },

    {
      id: 15,
      title: 'Birthday of brother',
      completed: false,
      category: TestData.categories[1],
      priority: TestData.priorities[3],
      date: new Date('2020-08-20')
    },

    {
      id: 16,
      title: 'Watch Game Of Thrones',
      completed: false,
      category: TestData.categories[8],
    },

    {
      id: 17,
      title: 'Buy a new car',
      completed: false,
      category: TestData.categories[0],
      priority: TestData.priorities[0],
    },
  ];
}
