import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {Task} from '../../model/Task';
import {DataHandlerService} from '../../service/data-handler.service';
import {Category} from '../../model/Category';
import {Priority} from '../../model/Priority';
import {ConfirmDialogComponent} from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-edit-task-dialog',
  templateUrl: './edit-task-dialog.component.html',
  styleUrls: ['./edit-task-dialog.component.css']
})
export class EditTaskDialogComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<EditTaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: [Task, string],
    private dataHandler: DataHandlerService,
    private dialog: MatDialog,

  ) {
  }

    categories : Category[];
    priorities : Priority[];


    dialogTitle: string; // window title
    task: Task; // task for editing/creating


    tmpTitle: string;
    tmpCategory: Category;
    tmpPriority: Priority;
    tmpDate: Date;


    ngOnInit(): void {
    this.task = this.data[0]; // task for editing/creating
    this.dialogTitle = this.data[1]; // text for the dialog window



    this.tmpTitle = this.task.title;
    this.tmpCategory = this.task.category;
    this.tmpPriority = this.task.priority;
    this.tmpDate = this.task.date;



    this.dataHandler.getAllCategories().subscribe(items => this.categories = items);
    this.dataHandler.getAllPriorities().subscribe( items => this.priorities = items);

  }


    onConfirm(): void {

    this.task.title = this.tmpTitle;
    this.task.category = this.tmpCategory;
    this.task.priority = this.tmpPriority;
    this.task.date = this.tmpDate;



    this.dialogRef.close(this.task);

  }

    // clicked cancel
    onCancel(): void {
    this.dialogRef.close(null);
  }


  // clicked delete
  delete() {

      const dialogRef = this.dialog.open(ConfirmDialogComponent, {
        maxWidth: '500px',
        data: {
          dialogTitle: 'Confirm action',
          message: `Do you really want to delete task: "${this.task.title}"?`
        },
        autoFocus: false
      });

      dialogRef.afterClosed().subscribe( result => {
        if(result) {
          this.dialogRef.close('delete'); // clicked delete
        }
      });
    }

    // clicked complete task
    complete() {
      this.dialogRef.close('complete');

    }

    //clicked activate task
    activate() {
      this.dialogRef.close('activate');
    }


}
