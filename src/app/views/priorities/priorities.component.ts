import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Priority} from '../../model/Priority';
import {MatDialog} from '@angular/material/dialog';
import {EditCategoryDialogComponent} from '../../dialog/edit-category-dialog/edit-category-dialog.component';
import {OperType} from '../../dialog/OperType';
import {ConfirmDialogComponent} from '../../dialog/confirm-dialog/confirm-dialog.component';
import {EditPriorityDialogComponent} from '../../dialog/edit-priority-dialog/edit-priority-dialog.component';

@Component({
  selector: 'app-priorities',
  templateUrl: './priorities.component.html',
  styleUrls: ['./priorities.component.css']
})
export class PrioritiesComponent implements OnInit {

  static defaultColor = 'fff';


  @Input()
  priorities: [Priority];


  @Output()
  deletePriority = new EventEmitter<Priority>();

  @Output()
  updatePriority = new EventEmitter<Priority>();

  @Output()
  addPriority = new  EventEmitter<Priority>();



  constructor( private dialog: MatDialog

  ) {
  }

  ngOnInit(): void {
  }


  onAddPriority() {


    const dialogRef = this.dialog.open(EditCategoryDialogComponent, {data: ['', 'Adding priority', OperType.ADD], width: '400px'});

    dialogRef.afterClosed().subscribe( result => {
      if (result) {
        const newPriority = new Priority(null, result as string, PrioritiesComponent.defaultColor);
        this.addPriority.emit(newPriority);
      }
    });


  }


  onEditPriority(priority: Priority) {


    const dialogRef = this.dialog.open(EditPriorityDialogComponent, {data: [priority.title, 'Editing priority', OperType.EDIT]});

    dialogRef.afterClosed().subscribe( result => {
      if (result === 'delete') {
        this.deletePriority.emit(priority);
        return;
      }


      if (result) {
        priority.title = result as string;
        this.updatePriority.emit(priority);
        return;;
      }
    });


  }



  delete(priority: Priority) {

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '500px',
      data: {
        dialogTitle: 'Confirm action',
        message: `Do you really want to delete category: "${priority.title}"? (tasks will be assigned as 'No priority')`
      },
      autoFocus: false
    });


    dialogRef.afterClosed().subscribe( result => {
      if (result) {
        this.deletePriority.emit(priority);
      }
    });

  }

}
