import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DataHandlerService} from '../../service/data-handler.service';
import {Category} from '../../model/Category';
import {MatDialog} from '@angular/material/dialog';
import {EditCategoryDialogComponent} from '../../dialog/edit-category-dialog/edit-category-dialog.component';
import {OperType} from '../../dialog/OperType';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  @Input()
  categories: Category[];

  @Input()
  selectedCategory: Category;


  @Output()
  selectCategory = new EventEmitter<Category>();

  @Output()
  deleteCategory = new EventEmitter<Category>();

  @Output()
  updateCategory = new EventEmitter<Category>();

  @Output()
  addCategory = new EventEmitter<string>();

  @Output()
  searchCategory = new EventEmitter<string>();





  indexMouseMove: number;
  showEditIconCategory: boolean;
  searchCategoryTitle: string;


  constructor(
    private dataHandler: DataHandlerService,
    private dialog: MatDialog,

  ) {
  }

  ngOnInit(): void {
      // this.dataHandler.getAllCategories().subscribe(categories => this.categories = categories);
  }

  showTasksByCategory(category: Category): void {


    if(this.selectedCategory === category) {
      return;
    }

    this.selectedCategory = category;

    this.selectCategory.emit(this.selectedCategory);
  }


    showEditIcon(index: number) {
    this.indexMouseMove = index;
  }

  openEditDialog(category: Category) {
    const dialogRef = this.dialog.open(EditCategoryDialogComponent, {
      data: [category.title, 'Editing category', OperType.EDIT],
      width: '400px'
    });

    dialogRef.afterClosed().subscribe( result => {

      if (result === 'delete') {

        this.deleteCategory.emit(category);

        return;
      }

      if (typeof (result)  === 'string') {
        category.title = result as string;

        this.updateCategory.emit(category);
        return;
      }


    });

  }

  // dialog window for adding categories
  openAddDialog() {

    const dialogRef = this.dialog.open(EditCategoryDialogComponent, {data: ['', 'adding category', OperType.ADD], width: '400px'});

    dialogRef.afterClosed().subscribe( result => {
      if (result) {
        this.addCategory.emit(result as string);
      }

    });

  }

  search() {

    if (this.searchCategoryTitle == null) {
      return;
    }

    this.searchCategory.emit(this.searchCategoryTitle);
  }


}
