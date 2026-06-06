import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = this.getApiUrl();
  private authStatusSubject = new BehaviorSubject<boolean>(this.isAuthenticated());
  authStatus$ = this.authStatusSubject.asObservable();

  constructor(private http: HttpClient) {}

  private getApiUrl(): string {
    if (typeof window === 'undefined') {
      return '/api/auth';
    }
    const host = window.location.hostname;
    if (host === 'localhost' || host === '127.0.0.1') {
      return '/api/auth';
    }
    if (host.includes('app.132.145.196.104.nip.io')) {
      return 'https://api.132.145.196.104.nip.io/api/auth';
    }
    if (host.startsWith('app.')) {
      return `https://${host.replace('app.', 'api.')}/api/auth`;
    }
    return '/api/auth';
  }

  register(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user);
  }

  login(credentials: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, credentials).pipe(
      tap(response => {
        if (response && response.token) {
          this.saveToken(response.token);
          this.saveUser({ username: response.username, email: response.email });
          this.authStatusSubject.next(true);
        }
      })
    );
  }

  saveToken(token: string): void {
    localStorage.setItem('auth_token', token);
  }

  getToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('auth_token');
  }

  saveUser(user: any): void {
    localStorage.setItem('auth_user', JSON.stringify(user));
  }

  getUser(): any {
    if (typeof window === 'undefined') return null;
    const user = localStorage.getItem('auth_user');
    return user ? JSON.parse(user) : null;
  }

  isAuthenticated(): boolean {
    return this.getToken() !== null;
  }

  logout(): void {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_user');
    this.authStatusSubject.next(false);
  }
}
