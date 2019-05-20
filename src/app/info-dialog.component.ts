import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'info-dialog',
  templateUrl: './info-dialog.component.html',
})
export class InfoDialog {

  constructor(
    public dialogRef: MatDialogRef<InfoDialog>,

    @Inject(MAT_DIALOG_DATA)
    public data: {title: string, content: string[]}
  ) {}

  close() {
    this.dialogRef.close();
  }

}