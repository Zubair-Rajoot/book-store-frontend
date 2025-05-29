import { Component, OnInit } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  books: any[] = [];
  loading = true;
  totalBooks = 0;
  currentPage = 0; 
  pageSize = 5;

  
  constructor(
    private todoService: TodoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getBooks();
  }

  getBooks() {
    this.loading = true;
    this.todoService.getAllBooks(this.currentPage + 1, this.pageSize).subscribe((res: any) => {
      this.books = res.books;
      this.totalBooks = res.totalBooks;
      this.loading = false;
    });
  }

  onPageChange(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getBooks();
  }

  navigateToOrder(bookId: string) {
    this.router.navigate(['/order', bookId]);
  }
}

