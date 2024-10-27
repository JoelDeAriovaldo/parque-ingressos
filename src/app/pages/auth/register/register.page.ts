import { Component } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  username: string = '';
  email: string = '';
  password: string = '';
  showPassword: boolean = false;

  constructor(private authService: AuthService, private router: Router) { }

  onSubmit() {
    if (this.authService.register(this.username, this.email, this.password)) {
      this.router.navigate(['/login']);
    } else {
      alert('Registration failed');
    }
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }
}
