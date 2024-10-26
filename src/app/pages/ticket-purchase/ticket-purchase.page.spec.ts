import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TicketPurchasePage } from './ticket-purchase.page';

describe('TicketPurchasePage', () => {
  let component: TicketPurchasePage;
  let fixture: ComponentFixture<TicketPurchasePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketPurchasePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
