import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PnpPropertyComponent } from './pnp-property.component';

describe('PnpPropertyComponent', () => {
  let component: PnpPropertyComponent;
  let fixture: ComponentFixture<PnpPropertyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PnpPropertyComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PnpPropertyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
