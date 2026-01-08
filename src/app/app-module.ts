import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing-module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { App } from './app';
import { LoginComponent } from './auth/login.component/login.component';
import { ProfileComponent } from './components/profile.component/profile.component';
import { UserComponent } from './components/user.component/user.component';
import { ProductComponent } from './components/product.component/product.component';
import { AuthGuard } from './auth/auth.guard';
import { SidebarComponent } from './layout/sidebar.component/sidebar.component';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';
import { HeaderComponent } from './components/header.component/header.component';
import { AUTH_INTERCEPTOR_PROVIDER } from './auth/auth.interceptor';

@NgModule({
  declarations: [App],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    SidebarComponent,
    LoginComponent,
    ProfileComponent,
    UserComponent,
    ProductComponent,
    HeaderComponent,
  ],
  providers: [
    AuthGuard,
    AUTH_INTERCEPTOR_PROVIDER,
    providePrimeNG({
      theme: {
        preset: Aura,
        options: {
          darkModeSelector: '.my-app-dark',
        },
      },
    }),
  ],
  bootstrap: [App],
})
export class AppModule {}
