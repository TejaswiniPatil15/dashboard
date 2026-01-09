import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {
  loginUrl = 'https://dummyjson.com/auth/login';

  constructor(private http: HttpClient) {}

  login(data: any) {
    return this.http.post<any>(this.loginUrl, data);
  }

  private _user = new BehaviorSubject<any>(null);
  readonly user$ = this._user.asObservable();

  setUser(user: any) {
    this._user.next(user);
  }

  clear() {
    this._user.next(null);
  }

  loadCurrentUser(): Observable<any> {
    if (typeof window === 'undefined' || !window.localStorage?.getItem('token')) {
      this.clear();
      return of(null);
    }

    return this.http.get<any>('https://dummyjson.com/auth/me').pipe(
      tap((u) => this._user.next(u)),
      catchError((err) => {
        this.clear();
        return of(null);
      })
    );
  }

  logout() {
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.clear();
    }
    this.clear();
  }
}
