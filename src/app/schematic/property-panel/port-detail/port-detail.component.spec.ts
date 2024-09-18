import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortDetailComponent } from './port-detail.component';

describe('PortDetailComponent', () => {
  let component: PortDetailComponent;
  let fixture: ComponentFixture<PortDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PortDetailComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PortDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
