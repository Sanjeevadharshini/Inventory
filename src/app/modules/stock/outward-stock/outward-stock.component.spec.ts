import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutwardStockComponent } from './outward-stock.component';

describe('OutwardStockComponent', () => {
  let component: OutwardStockComponent;
  let fixture: ComponentFixture<OutwardStockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OutwardStockComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OutwardStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
