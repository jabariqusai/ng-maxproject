import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { AuthResponse } from './auth-response.model';
import { User } from './user.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuthenticated: boolean;
  APIKey: string;
  authAPI: string;
  loginAPI: string;
  signupAPI: string;
  user: BehaviorSubject<User>;
  tokenExpirationTimer: any;

  constructor(
    private http: HttpClient,
    private router: Router
    ) {
    this.APIKey = 'AIzaSyD54Qw-f2KAqHTdBrnckvxolyVHW42QMeU';
    this.authAPI = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/`;
    this.signupAPI = this.authAPI + `signupNewUser?key=` + this.APIKey;
    this.loginAPI = this.authAPI + `verifyPassword?key=` + this.APIKey;
    this.isAuthenticated = false;
    this.user = new BehaviorSubject<User>(null);
  }

  signup(email: string, password: string): Observable<any> {
    return this.http.post<AuthResponse>(this.signupAPI, {
      email,
      password,
      returnSecureToken: true
    }).pipe(
      catchError(this.handleError),
      tap(res => {
        this.handleAuthentication(
          res.email,
          res.localId,
          res.idToken,
          +res.expiresIn
          );
      }));
  }

  login(email: string, password: string) {
    return this.http.post<AuthResponse>(this.loginAPI, {
      email,
      password,
      returnSecureToken: true
    }).pipe(
      catchError(this.handleError),
      tap(res => {
        this.handleAuthentication(
          res.email,
          res.localId,
          res.idToken,
          +res.expiresIn
          );
      }));
  }

  private handleError(error: HttpErrorResponse) {
    let message = 'An error occured';
    if (!error.error || !error.error.error) {
      message = 'An unknown error occured';
    } else {
      switch (error.error.error.message) {
        case 'EMAIL_NOT_FOUND':
        case 'INVALID_PASSWORD':
          message = 'Invalid Credentials';
          break;
        case 'USER_DISABLED':
          message = 'This user has been disabled';
          break;
        case 'EMAIL_EXISTS':
          message = 'A user with the same email already exists';
          break;
      }
    }
    return throwError(message);
  }

  private handleAuthentication(email: string, id: string, token: string, expiresIn: number) {
    const expirationDate = new Date((new Date()).getTime() + expiresIn * 1000);
    const user = new User(email, id, token, expirationDate);
    this.user.next(user);
    this.autoLogout(expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(user));
  }

  logout() {
    this.user.next(null);
    localStorage.removeItem('userData');
    this.router.navigate(['/auth']);

    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  autoLogin() {
    const userData: {
      email: string,
      id: string,
      _token: string,
      _tokenExpiration: string
    } = JSON.parse(localStorage.getItem('userData'));

    if (!userData) {
      return;
    }

    const user = new User(
      userData.email,
      userData.email,
      userData._token,
      new Date(userData._tokenExpiration)
    );

    if (user.token) {
      // user.token is a getter that returns null in case of expired token
      this.user.next(user);
      const expirationDuration = new Date(userData._tokenExpiration).getTime() - new Date().getTime();
      this.autoLogout(expirationDuration);
    }
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }
}
