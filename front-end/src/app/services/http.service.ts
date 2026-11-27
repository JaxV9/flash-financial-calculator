import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GrossToNetResult, Salary } from '../types';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private http = inject(HttpClient);
  private baseUrl = 'https://flash-financial-calculator-production.up.railway.app';

  grossToNet(salary: Salary): Observable<GrossToNetResult> {
    return this.http.post<GrossToNetResult>(`${this.baseUrl}/grosstonet`, salary);
  }
}
