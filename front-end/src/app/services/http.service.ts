import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GrossToNetResult, Salary } from '../types';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private http = inject(HttpClient);
  private baseUrl = environment.httpBaseUrl.replace(/\/+$/, '');

  grossToNet(salary: Salary): Observable<GrossToNetResult> {
    return this.http.post<GrossToNetResult>(`${this.baseUrl}/grosstonet`, salary);
  }
}
