import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { EventEmitter, Output, Input } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterModule, CommonModule, DialogModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
  constructor(private router: Router, private auth: AuthService) {}

  @Input() isOpen = true;
  @Output() toggle = new EventEmitter<boolean>();
  showDeleteDialog = false;

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

  onLogoutClick() {
    this.showDeleteDialog = true;
  }

  onDeleteConfirm() {
    this.showDeleteDialog = false;
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
