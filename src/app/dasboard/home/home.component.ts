import { Component, OnInit } from '@angular/core';
import { TodoService } from '../../services/todo.service';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  books: any[] = [];
  loading = true;

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.todoService.getAllBooks().subscribe((res: any) => {
      this.books = res?.data || res;
      this.loading = false;
    });
  }
}


