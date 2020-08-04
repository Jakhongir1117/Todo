import {Component, Inject, OnInit} from '@angular/core';
import {OperType} from '../OperType';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {Priority} from '../../model/Priority';
import {ConfirmDialogComponent} from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-edit-priority-dialog',
  templateUrl: './edit-priority-dialog.component.html',
  styleUrls: ['./edit-priority-dialog.component.css']
})
export class EditPriorityDialogComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<EditPriorityDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: [string, string, OperType],
    private dialog: MatDialog

  ) { }


  dialogTitle: string;
  priorityTitle: string;
  operType: OperType;


  ngOnInit(): void {

    this.priorityTitle = this.data[0];
    this.dialogTitle = this.data[1];
    this.operType = this.data[2];
  }


  onConfirm() {
    this.dialogRef.close(this.priorityTitle);
  }


  onCancel() {
    this.dialogRef.close(false);
  }



  delete() {

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '500px',
      data: {
        dialogTitle: 'Confirm action',
        message: `Do you really want to delete priority: "${this.priorityTitle}"?`
      },
      autoFocus: false
    });


    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.dialogRef.close('delete');
      }
    });

  }




  canDelete(): boolean {
    return this.operType == OperType.EDIT;
  }


}
