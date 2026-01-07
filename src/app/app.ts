import { Component, signal, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrls: ['./app.css'],
})
export class App implements OnInit, OnDestroy {
  protected readonly title = signal('dashboard');
  sidebarOpen = true;
  showSidebar = true;
  private sub?: Subscription;

  constructor(private router: Router) {}

  ngOnInit() {
    this.updateSidebarByUrl(this.router.url);
    this.sub = this.router.events.subscribe((ev) => {
      if (ev instanceof NavigationEnd) {
        this.updateSidebarByUrl(ev.urlAfterRedirects || ev.url);
      }
    });
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }

  private updateSidebarByUrl(url: string) {
    const hideOn = ['/login', '/register'];
    this.showSidebar = !hideOn.some((p) => url.startsWith(p));
    if (!this.showSidebar) {
      this.sidebarOpen = false;
    } else {
      this.sidebarOpen = true;
    }
  }

  onSidebarToggle(open: boolean) {
    this.sidebarOpen = !!open;
  }
}
