import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ReplaySubject, Observable } from "rxjs";
import { map } from "rxjs/operators";

import { AuthResponse } from "../../models/auth-response";
import { User } from "../../models/user";
import { AuthRequest } from "../../models/auth-request";

const API_URL = "https://devmobil-voice-it.herokuapp.com/";

/**
 * Authentication service for login/logout.
 */
@Injectable({ providedIn: "root" })
export class AuthService {
  #auth$: ReplaySubject<AuthResponse | undefined>;

  constructor(private http: HttpClient) {
    this.#auth$ = new ReplaySubject(1);
    // Emit an empty value on startup for now
    this.#auth$.next();
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
    const authUrl = `${API_URL}/auth`;
    return this.http.post<AuthResponse>(authUrl, authRequest).pipe(
      map((auth) => {
        this.#auth$.next(auth);
        console.log(`User ${auth.user.name} logged in`);
        return auth.user;
      })
    );
  }

  logOut(): void {
    this.#auth$.next(null);
    console.log("User logged out");
  }

  register(authRequest: AuthRequest): Observable<User> {
    const authUrl = `${API_URL}/auth`;
    return this.http.post<AuthResponse>(authUrl, authRequest).pipe(
      map((auth) => {
        this.#auth$.next(auth);
        console.log(`User ${auth.user.name} registered`);
        return auth.user;
      })
    );
  }
  
}