import { inject, Injectable, signal } from '@angular/core';
import { GrossToNetResult, Salary } from '../types';
import { HttpService } from './http.service';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GrosstonetService {

  httpService = inject(HttpService);

  frequency = signal<'year' | 'month' | undefined>(undefined);
  result = signal<GrossToNetResult>({
    gross: 0,
    netMonth: 0,
    netYear: 0,
    incomeTaxMonth: 0,
    incomeTaxYear: 0,
    netAfterIncomeTaxMonth: 0,
    netAfterIncomeTaxYear: 0,
    bossCostMonth: 0,
    bossCostYear: 0
  });

  async grossToNet(salary: Salary) {
    const result = await firstValueFrom(this.httpService.grossToNet(salary));
    this.frequency.set(salary.frequency);
    this.result.set(result);
  }
}
