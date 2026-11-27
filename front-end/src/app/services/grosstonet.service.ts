import { inject, Injectable, signal } from '@angular/core';
import { GrossToNetResult, Salary } from '../types';
import { HttpService } from './http.service';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GrosstonetService {

  httpService = inject(HttpService);

  result = signal<GrossToNetResult | undefined>(undefined);

  async grossToNet(salary: Salary) {
    const result = await firstValueFrom(this.httpService.grossToNet(salary));
    this.result.set(result)
    console.log(result)
  }
}
