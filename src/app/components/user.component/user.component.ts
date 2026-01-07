import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-user.component',
  standalone: true,
  imports: [CommonModule, TableModule, TagModule, ButtonModule],
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent {
  constructor(private http: HttpClient, private router: Router) {}

  users: any[] = [];
  filtered: any[] = [];

  ngOnInit() {
    this.http
      .get<any>('https://dummyjson.com/users')
      .subscribe((router) => (this.users = router.users));
  }
  search(v: string) {
    this.filtered = this.users.filter((u) => u.firstName.toLowerCase().includes(v.toLowerCase()));
  }
}
