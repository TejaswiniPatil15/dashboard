import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent {
  user: any = {};
  sidebarOpen = true;
  private sub: Subscription | null = null;

  constructor(private auth: AuthService) {}

  onSidebarToggle(open: boolean) {
    this.sidebarOpen = !!open;
  }

  ngOnInit() {
    this.auth.loadCurrentUser().subscribe();
    this.sub = this.auth.user$.subscribe((u) => (this.user = u || {}));
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }
}
