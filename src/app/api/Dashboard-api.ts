import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DashboardApi {
  constructor(private http: HttpClient) {}

  getDashboardData(): Observable<any> {
    return this.http.get(environment.apiUrl + 'api/dashboard');
  }
}
