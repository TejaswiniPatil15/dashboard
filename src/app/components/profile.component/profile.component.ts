import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent {
  constructor(private http: HttpClient) {}

  user: any = {};
  sidebarOpen = true;

  onSidebarToggle(open: boolean) {
    this.sidebarOpen = !!open;
  }

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
