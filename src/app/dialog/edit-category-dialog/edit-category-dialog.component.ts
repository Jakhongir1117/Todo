import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {ConfirmDialogComponent} from '../confirm-dialog/confirm-dialog.component';
import {OperType} from '../OperType';

@Component({
  selector: 'app-edit-category-dialog',
  templateUrl: './edit-category-dialog.component.html',
  styleUrls: ['./edit-category-dialog.component.css']
})
export class EditCategoryDialogComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<EditCategoryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: [string, string, OperType],
    private dialog: MatDialog

  ) {
  }

  dialogTitle: string;
  categoryTitle: string;
  operType: OperType;


  ngOnInit(): void {

    this.categoryTitle = this.data[0];
    this.dialogTitle = this.data[1];
    this.operType = this.data[2];



  }


  onConfirm(): void {
    this.dialogRef.close(this.categoryTitle);
  }


  onCancel(): void {
    this.dialogRef.close(false);
  }


  delete(): void {

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '500px',
      data: {
        dialogTitle: 'Confirm action',
        message: `Do you really want to delete task: "${this.categoryTitle}"? (tasks will remain)`
      },
      autoFocus: false
    });


    dialogRef.afterClosed().subscribe( result => {
      if (result) {
        this.dialogRef.close('delete');
      }
    });


  }

  canDelete(): boolean {
    return this.operType === OperType.EDIT;
  }


}
