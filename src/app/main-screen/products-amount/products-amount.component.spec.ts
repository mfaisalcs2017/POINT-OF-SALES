import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsAmountComponent } from './products-amount.component';

describe('ProductsAmountComponent', () => {
  let component: ProductsAmountComponent;
  let fixture: ComponentFixture<ProductsAmountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductsAmountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsAmountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
