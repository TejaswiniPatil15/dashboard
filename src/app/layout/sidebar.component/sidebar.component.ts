import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
  constructor(private router: Router) {}

  @Input() isOpen = true;
  @Output() toggle = new EventEmitter<boolean>();

  @HostListener('window:resize')
  onResize() {
    this.setSidebarByScreen();
  }

  private setSidebarByScreen() {
    if (window.innerWidth < 1024) {
      this.isOpen = false;
    } else {
      this.isOpen = true;
    }
    this.toggle.emit(this.isOpen);
  }

  toggleSidebar() {
    this.isOpen = !this.isOpen;
    this.toggle.emit(this.isOpen);
  }
  logout() {
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.clear();
    }
    this.router.navigate(['/login']);
  }
}
