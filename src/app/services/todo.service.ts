// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import  {environment}  from '../../environments/environment';

// @Injectable({
//   providedIn: 'root',
// })
// export class TodoService {
//   private baseUrl = `${environment.apiBaseUrl}/book`;


//   constructor(private http: HttpClient) {}

//   getAllBooks(data: any) {
//     return this.http.get(`${this.baseUrl}/all`, data);
//   }


//   createBook(data: any) {
//     return this.http.post(`${this.baseUrl}/create`, data);
//   }


//   updateBook(id: string, data: any) {
//     return this.http.put(`${this.baseUrl}/update/${id}`, data);
//   }


//   deleteBook(id: string) {
//     return this.http.delete(`${this.baseUrl}/delete/${id}`);
//   }


// }





import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

interface Book {
  _id: string;
  title: string;
  author: string;
  description?: string;
}

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private baseUrl = `${environment.apiBaseUrl}/book`;

  constructor(private http: HttpClient) {}

  getAllBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.baseUrl}/all`);
  }

  createBook(data: Omit<Book, '_id'>): Observable<Book> {
    return this.http.post<Book>(`${this.baseUrl}/create`, data);
  }

  updateBook(id: string, data: Partial<Book>): Observable<Book> {
    return this.http.put<Book>(`${this.baseUrl}/update/${id}`, data);
  }

  deleteBook(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/delete/${id}`);
  }
}
