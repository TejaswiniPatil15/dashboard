import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpErrorResponse,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let cloned = req;

    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const token = window.localStorage.getItem('token');
        if (token) {
          cloned = req.clone({
            setHeaders: {
              Authorization: `Bearer ${token}`,
            },
          });
        }
      }
    } catch (e) {
      // ignore access errors to localStorage
    }

    return next.handle(cloned).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === 401) {
          try {
            if (typeof window !== 'undefined' && window.localStorage) {
              window.localStorage.clear();
            }
          } catch (e) {}
          this.router.navigate(['/login']);
        }
        return throwError(() => err);
      })
    );
  }
}

export const AUTH_INTERCEPTOR_PROVIDER = {
  provide: HTTP_INTERCEPTORS,
  useClass: AuthInterceptor,
  multi: true,
};
