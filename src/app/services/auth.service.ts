import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private jwtHelper = new JwtHelperService();

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}


  login(credentials: { email: string, password: string }): Observable<{ token: string }> {
  return this.http.post<{ token: string }>(`${environment.apiBaseUrl}/auth/login`, credentials).pipe(
    tap((response) => {
      localStorage.setItem('access_token', response.token);
      const decodedToken = this.jwtHelper.decodeToken(response.token);
   
    })
  );
}


  signup(userData: { email: string, password: string, name: string }): Observable<any> {
    return this.http.post(`${environment.apiBaseUrl}/auth/register`, userData);
  }


  logout(): void {
    localStorage.removeItem('access_token');
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('access_token');
    return !this.jwtHelper.isTokenExpired(token);
  }

  isAdmin(): boolean {
    const token = localStorage.getItem('access_token');
    if (!token) return false;
    
    try {
      const decoded = this.jwtHelper.decodeToken(token);
      return decoded?.isAdmin === 'admin';
    } catch {
      return false;
    }
  };


  getCurrentUserId(): string | null {
    const token = localStorage.getItem('access_token');
    return token ? this.jwtHelper.decodeToken(token).sub : null;
  }

  getToken(): string | null {
    return localStorage.getItem('access_token');
  }
}