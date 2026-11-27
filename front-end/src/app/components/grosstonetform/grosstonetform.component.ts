import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { GrosstonetService } from '../../services/grosstonet.service';
import { Salary } from '../../types';

@Component({
  selector: 'app-grosstonetform',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatRadioModule],
  templateUrl: './grosstonetform.component.html',
  styleUrl: './grosstonetform.component.css'
})
export class GrosstonetformComponent {

  formBuilder = inject(FormBuilder);
  grosstonetService = inject(GrosstonetService)

  form = new FormGroup({
    amount: new FormControl<number>(0, { nonNullable: true }),
    frequency: new FormControl<'year' | 'month'>('year', { nonNullable: true }),
    status: new FormControl<'executive' | 'non-executive'>('non-executive', { nonNullable: true }),
    ratePAS: new FormControl<number>(0, { nonNullable: true })
  })

  onSubmit() {
    this.grosstonetService.grossToNet(this.form.value as Salary)
  }

}
