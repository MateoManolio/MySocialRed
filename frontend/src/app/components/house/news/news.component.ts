import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { News } from '../../../interfaces/news';


@Component({
  selector: 'app-news',
  standalone: true,
  imports: [],
  templateUrl: './news.component.html',
  styleUrl: './news.component.css'
})

export class NewsComponent {

  constructor(
    public dialogRef: MatDialogRef<NewsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { news: News }
  ) {}

  onBackClick(): void {
    this.dialogRef.close();
  }
}


