import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { AuthResponse } from './auth-response.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {
  isLoginMode: boolean;
  loading: boolean;
  error: string;

  constructor(
    private authService: AuthService,
    private router: Router
    ) {
    this.isLoginMode = true;
    this.loading = false;
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  authSubmit(authForm: NgForm) {
    if (!authForm.valid) {
      return;
    }
    const email = authForm.value.email;
    const password = authForm.value.password;

    let authObservable: Observable<AuthResponse>;
    this.loading = true;
    this.error = '';

    if (this.isLoginMode) {
      authObservable = this.authService.login(email, password);
    } else {
      authObservable = this.authService.signup(email, password);
    }

    authObservable
      .subscribe(res => {
        console.log(res);
        // this.loading = false;
        this.router.navigate(['/recipes']);
      }, error => {
        this.error = error;
        this.loading = false;
      });
  }
}
