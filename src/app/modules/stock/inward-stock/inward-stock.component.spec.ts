import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InwardStockComponent } from './inward-stock.component';

describe('InwardStockComponent', () => {
  let component: InwardStockComponent;
  let fixture: ComponentFixture<InwardStockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InwardStockComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InwardStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
