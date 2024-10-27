import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor() { }

  async processPayment(paymentDetails: { amount: number; method: string; quantity: number }): Promise<boolean> {
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 1000));
    return true; // Simulate successful payment
  }
}
