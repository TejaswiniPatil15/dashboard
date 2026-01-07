import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private r:Router){}
  canActivate(){
    const token = (typeof window !== 'undefined' && window.localStorage)
      ? window.localStorage.getItem('token')
      : null;
    if (token) return true;
    this.r.navigate(['/login']); return false;
  }
}
