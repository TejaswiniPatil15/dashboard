import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class AuthService {
  loginUrl = 'https://dummyjson.com/auth/login';

  constructor(private http: HttpClient) {}

  login(data:any){
    return this.http.post<any>(this.loginUrl, data);
  }

  logout(){
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.clear();
    }
  }

  isLoggedIn(){
    return (typeof window !== 'undefined' && !!window.localStorage?.getItem('token')) || false;
  }
}
