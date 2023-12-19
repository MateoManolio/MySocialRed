import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-diag',
  standalone: true,
  imports: [],
  templateUrl: './confirm-diag.component.html',
  styleUrl: './confirm-diag.component.css'
})
export class ConfirmDiagComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmDiagComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { message: string }
  ) {}

  onCancelClick(): void {
    this.dialogRef.close(false);
  }

  onConfirmClick(): void {
    this.dialogRef.close(true);
  }
}
