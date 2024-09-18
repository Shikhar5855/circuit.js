import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NpnPropertyComponent } from './npn-property.component';

describe('NpnPropertyComponent', () => {
  let component: NpnPropertyComponent;
  let fixture: ComponentFixture<NpnPropertyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NpnPropertyComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NpnPropertyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
