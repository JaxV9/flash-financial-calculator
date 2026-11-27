import { Component, ViewEncapsulation } from '@angular/core';
import { GrosstonetformComponent } from '../../components/grosstonetform/grosstonetform.component';
import { GrosstonetresultsComponent } from '../../components/grosstonetresults/grosstonetresults.component';

@Component({
    selector: 'app-home',
    imports: [GrosstonetformComponent, GrosstonetresultsComponent],
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
    encapsulation: ViewEncapsulation.ShadowDom
})
export class HomeComponent {

}
