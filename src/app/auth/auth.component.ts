import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AppState } from '../store/app.reducer';
import { Store } from '@ngrx/store';
import * as AuthActions from './store/auth.actions';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit, OnDestroy {
  isLoginMode: boolean;
  loading: boolean;
  error: string;
  storeSub: Subscription;

  constructor(private store: Store<AppState>) {
    this.isLoginMode = true;
    this.loading = false;
  }

  ngOnInit() {
    this.storeSub = this.store.select('auth').subscribe(authData => {
      this.loading = authData.loading;
      this.error = authData.authError;
    });
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

    this.loading = true;
    this.error = '';

    if (this.isLoginMode) {
      this.store.dispatch(new AuthActions.LoginStart({email, password}));
    } else {
      this.store.dispatch(new AuthActions.SignUpStart({email, password}));
    }
  }

  ngOnDestroy() {
    this.storeSub.unsubscribe();
  }
}
