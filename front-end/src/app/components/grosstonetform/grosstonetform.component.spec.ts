import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrosstonetformComponent } from './grosstonetform.component';

describe('GrosstonetformComponent', () => {
  let component: GrosstonetformComponent;
  let fixture: ComponentFixture<GrosstonetformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GrosstonetformComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GrosstonetformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
