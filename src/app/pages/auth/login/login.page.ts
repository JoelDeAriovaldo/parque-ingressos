import { Component } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  email: string = '';
  password: string = '';
  showPassword: boolean = false;
  rememberMe: boolean = false;
  isLoading: boolean = false;

  constructor(private authService: AuthService, private router: Router) { }

  onLogin() {
    if (this.authService.login(this.email, this.password)) {
      this.router.navigate(['/home']);
    } else {
      alert('Invalid credentials');
    }
  }

  forgotPassword() {
    // Implementar navegação para recuperação de senha
  }

  register() {
    // Implementar navegação para registro
  }
}


