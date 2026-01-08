import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserStateService } from '../../services/user-state.service';
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

  constructor(private userState: UserStateService) {}

  ngOnInit() {
    this.userState.loadCurrentUser().subscribe();
    this.sub = this.userState.user$.subscribe((u) => (this.user = u));
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }
}
