import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { LoginApi } from './api/Login-api';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private tokenKey = 'token';

  constructor(
    private LoginApi: LoginApi,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  public login(username: string, password: string): void {
    this.LoginApi.login(username, password).subscribe((token) => {
      localStorage.setItem(this.tokenKey, token.replaceAll('"', ''));
      this.snackBar.open('Successful Login', 'OK' , { duration: 3000 })
      this.router.navigate(['/dashboard']);
    },  err => {
      this.snackBar.open("Invalid Email and Password", "OK", { duration: 10000 });
   });
  }

  public logout() {
    localStorage.removeItem(this.tokenKey);
    this.router.navigate(['/login']);
  }

  public isLoggedIn(): boolean {
    let token = localStorage.getItem(this.tokenKey);
    return token != null && token.length > 0;
  }

  public getToken(): string | null {
    return this.isLoggedIn() ? localStorage.getItem(this.tokenKey) : null;
  }

}
