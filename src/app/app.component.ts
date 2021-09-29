import { Component, VERSION } from '@angular/core';

@Component({
  selector: 'my-app',
  template: `
  <button class="btn-success" (click)="toggleMarkdown()">
    <span *ngIf="!showMarkdown">Compile</span>
    <span *ngIf="showMarkdown">Edit</span>
  </button>
  <button class="btn-primary" (click)="saveMarkdown()">SAVE</button>
  <button class="btn-danger" (click)="clear()">CLEAR</button>

  <div *ngIf="!showMarkdown" class="textWrapper">
    <textarea [(ngModel)]="markdown"></textarea>
  </div>

  <div *ngIf="showMarkdown" class="markdownWrapper">
    <markdown [data]="markdown"></markdown>
  </div>
  `,
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  showMarkdown = false;
  markdown = ``;

  ngOnInit() {
    this.markdown = localStorage.getItem('markdown');
  }

  saveMarkdown() {
    localStorage.setItem('markdown', this.markdown);
  }
  clear() {
    this.markdown = '';
  }
  toggleMarkdown() {
    if (this.showMarkdown) {
      this.showMarkdown = false;
    } else {
      this.showMarkdown = true;
    }
  }
}
