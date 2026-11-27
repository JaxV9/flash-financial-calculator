import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrosstonetresultsComponent } from './grosstonetresults.component';

describe('GrosstonetresultsComponent', () => {
  let component: GrosstonetresultsComponent;
  let fixture: ComponentFixture<GrosstonetresultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GrosstonetresultsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GrosstonetresultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
