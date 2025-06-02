

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

interface Book {
  _id: string;
  title: string;
  description?: string;
}

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private baseUrl = `${environment.apiBaseUrl}/book`;
  private orderBaseUrl = `${environment.apiBaseUrl}/order`;

  constructor(private http: HttpClient) {}

 

  getAllBooks(page: number = 1, limit: number = 5) {
  return this.http.get(`http://localhost:5000/api/book/all?page=${page}&limit=${limit}`);
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


 

createOrder(bookId: string, borrowFrom: Date, borrowTo: Date): Observable<void> {
  const token = localStorage.getItem('token');
  
  if (!token) {
    throw new Error('Token not found in local storage');
  }

  try {
    
    const payload = JSON.parse(atob(token.split('.')[1])); 
    const userId = payload._id;

    return this.http.post<void>(`${this.orderBaseUrl}/create`, {
      userId,
      bookId,
      borrowFrom: borrowFrom.toISOString(),
      borrowTo: borrowTo.toISOString()
    });

  } catch (error) {
    throw new Error('Failed to decode token or extract user ID');
  }
}


getAllOrders(page: number = 1, limit: number = 5): Observable<any> {
   return this.http.get(`http://localhost:5000/api/order?page=${page}&limit=${limit}`);
  
}

}

