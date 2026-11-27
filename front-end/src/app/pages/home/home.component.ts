import { Component } from '@angular/core';
import { GrosstonetformComponent } from '../../components/grosstonetform/grosstonetform.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [GrosstonetformComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
