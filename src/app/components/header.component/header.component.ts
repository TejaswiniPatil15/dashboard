import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  constructor(private http: HttpClient) {}

  user: any = {};

  ngOnInit() {
    if (typeof window !== 'undefined' && window.localStorage) {
      const h = new HttpHeaders({
        Authorization: `Bearer ${window.localStorage.getItem('token')}`,
      });
      this.http
        .get('https://dummyjson.com/auth/me', { headers: h })
        .subscribe((res) => (this.user = res));
    }
  }
}
