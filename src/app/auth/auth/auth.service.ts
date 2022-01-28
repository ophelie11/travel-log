import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ReplaySubject, Observable, from } from "rxjs";
import { delayWhen, map } from "rxjs/operators";

import { AuthResponse } from "../../models/auth-response";
import { User } from "../../models/user";
import { AuthRequest } from "../../models/auth-request";

import { Storage } from "@ionic/storage";

import { environment } from "src/environments/environment";
import { RegisterRequest } from "src/app/models/register-request";

/**
 * Authentication service for login/logout.
 */
@Injectable({ providedIn: "root" })
export class AuthService {
  #auth$: ReplaySubject<AuthResponse | undefined>;

  constructor(private http: HttpClient, private storage: Storage) {
    this.#auth$ = new ReplaySubject(1);
    this.storage.get('auth').then((auth) => {
      this.#auth$.next(auth);
    });
  }

  isAuthenticated$(): Observable<boolean> {
    return this.#auth$.pipe(map((auth) => Boolean(auth)));
  }

  getUser$(): Observable<User> {
    return this.#auth$.pipe(map((auth) => auth?.user));
  }

  getToken$(): Observable<string> {
    return this.#auth$.pipe(map((auth) => auth?.token));
  }

  logIn$(authRequest: AuthRequest): Observable<User> {
    const authUrl = `${environment.apiUrl}/auth`;
    return this.http.post<AuthResponse>(authUrl, authRequest).pipe(
      delayWhen((auth) => this.saveAuth$(auth)),
      map((auth) => {
        this.#auth$.next(auth);
        console.log(`User ${auth.user.name} logged in`);
        return auth.user;
      })
    );
  }

  logOut(): void {
    this.#auth$.next(null);
  // Remove the stored authentication from storage when logging out.
  this.storage.remove('auth');
  console.log('User logged out');
  }

  // register(authRequest: AuthRequest): Observable<User> {
  //   const authUrl = `${environment.apiUrl}/auth`;
  //   return this.http.post<AuthResponse>(authUrl, authRequest).pipe(
  //     delayWhen((auth) => this.saveAuth$(auth)),
  //     map((auth) => {
  //       this.#auth$.next(auth);
  //       console.log(`User ${auth.user.name} registered`);
  //       return auth.user;
  //     })
  //   );
  // }

  register$(registerRequest: RegisterRequest){
    return this.http.post(environment.apiUrl + "/users", registerRequest);
  }

  private saveAuth$(auth: AuthResponse): Observable<void> {
    return from(this.storage.set('auth', auth));
  }
}