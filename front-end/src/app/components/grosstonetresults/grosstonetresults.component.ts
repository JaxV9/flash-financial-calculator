import { Component, computed, inject, ViewEncapsulation } from '@angular/core';
import { GrosstonetService } from '../../services/grosstonet.service';

@Component({
    selector: 'app-grosstonetresults',
    imports: [],
    templateUrl: './grosstonetresults.component.html',
    styleUrl: './grosstonetresults.component.css',
    encapsulation: ViewEncapsulation.ShadowDom
})
export class GrosstonetresultsComponent {
  grosstonetService = inject(GrosstonetService)

  getGross = computed(() => {
    const frequency = this.grosstonetService.frequency();
    const result = this.grosstonetService.result();

    if (frequency === 'month') return `${result.gross} € brut annuel`

    if (frequency === 'year') return `${result.gross} € brut mensuel`
    return '0 brut'
  })
}
