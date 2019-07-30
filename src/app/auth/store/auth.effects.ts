import { Actions, ofType, Effect } from '@ngrx/effects';
import { AuthResponse } from '../auth-response.model';
import { environment } from 'src/environments/environment';
import { switchMap, catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import * as AuthActions from './auth.actions';
import { of } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../user.model';
import { AuthService } from '../auth.service';

// Needs @injecatble so things can be injected into the class
@Injectable()
export class AuthEffects {
  APIKey: string;
  authAPI: string;
  loginAPI: string;
  signupAPI: string;

  // -------------------------------------------------------------------------------------
  @Effect()
  authLogin = this.actions$.pipe(
    ofType(AuthActions.LOGIN_START),
    switchMap((authData: AuthActions.LoginStart) => {
      return this.http.post<AuthResponse>(this.loginAPI, {
          email: authData.payload.email,
          password: authData.payload.password,
          returnSecureToken: true
        })
        .pipe(
            tap(resData => {
              this.authService.setLogoutTimer(+resData.expiresIn * 1000);
            }),
            map(resData =>
              this.handleAuthentication(
                resData.email,
                resData.localId,
                resData.idToken,
                +resData.expiresIn
              )
            ),
            catchError(this.handleError)
          );
    })
  );
  // -------------------------------------------------------------------------------------
  @Effect({ dispatch: false })
  authSuccess = this.actions$.pipe(
    ofType(AuthActions.AUTHENTICATE_SUCCESS),
    tap(() => this.router.navigate(['/recipes']))
  );
  // -------------------------------------------------------------------------------------
  @Effect()
  authSignup = this.actions$.pipe(
    ofType(AuthActions.SIGNUP_START),
    switchMap((authData: AuthActions.SignUpStart) => {
      return this.http.post<AuthResponse>(this.signupAPI, {
        email: authData.payload.email,
        password: authData.payload.password,
        returnSecureToken: true
      }).pipe(
        tap(resData => {
          this.authService.setLogoutTimer(+resData.expiresIn * 1000);
        }),
        map(resData =>
            this.handleAuthentication(
              resData.email,
              resData.localId,
              resData.idToken,
              +resData.expiresIn
              )
          ),
        catchError(this.handleError)
      );
    })
  );
   // -------------------------------------------------------------------------------------
   @Effect({ dispatch: false })
   authLogout = this.actions$.pipe(
     ofType(AuthActions.LOGOUT),
     tap(() => {
      this.authService.clearLogoutTimer();
      localStorage.removeItem('userData');
      this.router.navigate(['/auth']);
     })
   );
   // -------------------------------------------------------------------------------------
   @Effect()
   authAutoLogin = this.actions$.pipe(
     ofType(AuthActions.AUTO_LOGIN),
     map(this.autoLoginHandler.bind(this))
   );

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
    ) {
      this.APIKey = environment.firebaseAPIKey;
      this.authAPI = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/`;
      this.signupAPI = this.authAPI + `signupNewUser?key=` + this.APIKey;
      this.loginAPI = this.authAPI + `verifyPassword?key=` + this.APIKey;
    }

    private handleAuthentication(email: string, userId: string, token: string, expiresIn: number) {
      const expirationDate = new Date((new Date()).getTime() + expiresIn * 1000);
      const user = new User(email, userId, token, expirationDate);
      localStorage.setItem('userData', JSON.stringify(user));
      return new AuthActions.AuthenticateSuccess(
        {
          email,
          userId,
          token,
          expirationDate
        }
      );
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
      return of(new AuthActions.AuthenticateFail(message));
    }

    private autoLoginHandler() {
      const userData: {
        email: string,
        id: string,
        _token: string,
        _tokenExpiration: string
      } = JSON.parse(localStorage.getItem('userData'));

      if (!userData) {
        return { type: 'DUMMY' };
      }

      const user = new User(
        userData.email,
        userData.id,
        userData._token,
        new Date(userData._tokenExpiration)
      );

      if (user.token) {
        // user.token is a getter that returns null in case of expired token
        const expirationDuration =
          new Date(userData._tokenExpiration).getTime() -
          new Date().getTime();
        this.authService.setLogoutTimer(expirationDuration);
        return new AuthActions.AuthenticateSuccess({
          email: user.email,
          userId: user.id,
          token: user.token,
          expirationDate: new Date(userData._tokenExpiration)
        });
      }

      return { type: 'DUMMY' };
    }
}
