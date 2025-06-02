import { Component, OnInit } from '@angular/core';
import { TodoService } from '../../../services/todo.service';
import { Book } from '../../../models/book.model'; 

import { PageEvent } from '@angular/material/paginator';

import { MatPaginator } from '@angular/material/paginator';


import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  books: Book[] = [];
  loading = true;

  orders: any[] = [];
showOrders = false;




   totalBooks = 0;
  currentPage = 0; 
  pageSize = 5;

  totalOrders = 0;
currentOrderPage = 0;
orderPageSize = 5;




  editingBookId: string | null = null;
  editedBook: Partial<Book> = {};


  newBook: {
  title: string;

  description?: string;
} = {
  title: '',

  description: ''
};


   

  constructor(private todoService: TodoService,  private toastr: ToastrService) {}

  ngOnInit(): void {
    this.getBooks();
    this.getOrders();
  }

 getBooks() {
    this.loading = true;
    this.todoService.getAllBooks(this.currentPage + 1, this.pageSize).subscribe((res: any) => {
      this.books = res.books;
      this.totalBooks = res.totalBooks;
      this.loading = false;
    });
  }


  
getOrders() {
  this.loading = true;
  this.todoService.getAllOrders(this.currentOrderPage + 1, this.orderPageSize).subscribe(
    (res: any) => {
      this.orders = res.orders; 
      this.totalOrders = res.totalOrders;
      this.loading = false;
      this.showOrders = true;
      this.toastr.success('Orders loaded successfully', 'Load Orders');
    },
    (error) => {
      this.toastr.error('Failed to load orders', 'Error');
      
      this.loading = false;
    }
  );
}



  enableEdit(book: Book) {
    this.editingBookId = book._id;
    this.editedBook = { ...book };
    
  }

  cancelEdit() {
    this.editingBookId = null;
    this.editedBook = {};
  }

  updateBook() {
    if (this.editingBookId) {
      this.todoService.updateBook(this.editingBookId, this.editedBook).subscribe(() => {
        this.getBooks();
        this.cancelEdit();
      });
    }
  }

  deleteBook(id: string) {
    if (confirm('Are you sure you want to delete this book?')) {
      this.todoService.deleteBook(id).subscribe(() => this.getBooks());
      this.toastr.success('Book deleted successfully', 'Delete Book');
    }
  }


 

createBook() {
  if (this.newBook.title) {
    this.todoService.createBook(this.newBook).subscribe(() => {
      this.getBooks();
      this.newBook = { title: '', description: '' }; 
      this.toastr.success('Book created successfully', 'Create Book');
    });
  } else {

    this.toastr.error('Title is required to create a book', 'Create Book');
  }
}




  onPageChange(event: PageEvent) {
  this.currentPage = event.pageIndex;
  this.pageSize = event.pageSize;
  this.getBooks();
}

onOrderPageChange(event: PageEvent) {
  this.currentOrderPage = event.pageIndex;
  this.orderPageSize = event.pageSize;
  this.getOrders();
  this.showOrders = true; 
}
 
}
