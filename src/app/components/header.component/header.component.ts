import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  user: any = {};
  private sub: Subscription | null = null;

  constructor(private auth: AuthService) {}

  ngOnInit() {
    this.auth.loadCurrentUser().subscribe();
    this.sub = this.auth.user$.subscribe((u) => (this.user = u));
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }
}
