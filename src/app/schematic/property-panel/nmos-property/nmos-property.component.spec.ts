import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NmosPropertyComponent } from './nmos-property.component';

describe('NmosPropertyComponent', () => {
  let component: NmosPropertyComponent;
  let fixture: ComponentFixture<NmosPropertyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NmosPropertyComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NmosPropertyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
