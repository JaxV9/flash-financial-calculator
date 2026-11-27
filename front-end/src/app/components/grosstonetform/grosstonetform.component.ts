import { Component, inject, signal, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { GrosstonetService } from '../../services/grosstonet.service';
import { Salary } from '../../types';

@Component({
    selector: 'app-grosstonetform',
    imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatRadioModule],
    templateUrl: './grosstonetform.component.html',
    styleUrl: './grosstonetform.component.css',
    encapsulation: ViewEncapsulation.ShadowDom
})
export class GrosstonetformComponent {

  formBuilder = inject(FormBuilder);
  grosstonetService = inject(GrosstonetService);
  isLoading = signal(false);

  form = new FormGroup({
    amount: new FormControl<number>(0, { nonNullable: true }),
    frequency: new FormControl<'year' | 'month'>('year', { nonNullable: true }),
    status: new FormControl<'executive' | 'non-executive'>('non-executive', { nonNullable: true }),
    ratePAS: new FormControl<number>(0, { nonNullable: true }),
    taxParts: new FormControl<number>(1, { nonNullable: true })
  })

  async onSubmit() {
    if (this.isLoading()) {
      return;
    }
    this.isLoading.set(true);
    try {
      await this.grosstonetService.grossToNet(this.form.value as Salary);
    } finally {
      this.isLoading.set(false);
    }
  }

}
