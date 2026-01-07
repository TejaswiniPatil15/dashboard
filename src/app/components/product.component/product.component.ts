import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-product.component',
  standalone: true,
  imports: [CommonModule, TableModule, TagModule, ButtonModule],
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent {
  constructor(private http: HttpClient) {}
  products: any[] = [];

  ngOnInit() {
    this.http
      .get<any>('https://dummyjson.com/products')
      .subscribe((r) => (this.products = r.products));
  }
  sort() {
    this.products.sort((a, b) => a.price - b.price);
  }
}
