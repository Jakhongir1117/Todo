import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent implements OnInit {
  dialogTitle: string;
  message: string;

  constructor(
    private dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: {dialogTitle: string, message: string}
  ) {
    this.dialogTitle = data.dialogTitle; // title
    this.message = data.message; // message
  }

  ngOnInit(): void {
  }


  // clicked ok
    onConfirm(): void {
    this.dialogRef.close(true);
  }

  // clicked cancel
    onCancel(): void {
    this.dialogRef.close(false);
  }



}
