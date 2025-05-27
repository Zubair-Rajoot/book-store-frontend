import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TodoService } from '../services/todo.service';

@Component({
  selector: 'app-book-dialog',
  templateUrl: './book-dialog.component.html',
  styleUrls: ['./book-dialog.component.css']
})
export class BookDialogComponent {
  bookForm:any = FormGroup;
  mode: 'add' | 'edit';

  constructor(
    private fb: FormBuilder,
    private todoService: TodoService,
    public dialogRef: MatDialogRef<BookDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.mode = data.mode;
    this.initializeForm(data.book);
  }

  initializeForm(book?: any): void {
    this.bookForm = this.fb.group({
      title: [book?.title || '', Validators.required],
      author: [book?.author || '', Validators.required],
      description: [book?.description || '']
    });

    if (this.mode === 'edit') {
      this.bookForm.addControl('_id', this.fb.control(book?._id || ''));
    }
  }

  onSubmit(): void {
    if (this.bookForm.invalid) {
      return;
    }

    const formData = this.bookForm.value;

    if (this.mode === 'add') {
      this.todoService.createBook(formData).subscribe({
        next: () => this.dialogRef.close(true),
        error: (err) => console.error('Error creating book', err)
      });
    } else {
      this.todoService.updateBook(formData._id, formData).subscribe({
        next: () => this.dialogRef.close(true),
        error: (err) => console.error('Error updating book', err)
      });
    }
  }
}