import { Component } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {

  name: string = '';
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  onRegister() {
    if (this.authService.register(this.name, this.email, this.password)) {
      this.router.navigate(['/login']);
    } else {
      alert('Registration failed');
    }
  }
}
