import { Component, HostListener } from '@angular/core';

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
  host: {
    '(document:keypress)': 'handleKeyboardEvent($event)',
  },
})
export class AppComponent {
  showMarkdown = false;
  markdown = ``;

  key: any;

  ngOnInit() {
    this.markdown = localStorage.getItem('markdown');
  }

  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    console.log(event);
    this.key = event.key;
    console.log(this.key);
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

// Method Decorator
function Confirmable(message: string) {
  return function (
    target: Object,
    key: string | symbol,
    descriptor: PropertyDescriptor
  ) {
    const original = descriptor.value;

    descriptor.value = function (...args: any[]) {
      const allow = confirm(message);

      if (allow) {
        const result = original.apply(this, args);
        return result;
      } else {
        return null;
      }
    };

    return descriptor;
  };
}
