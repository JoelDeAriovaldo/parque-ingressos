import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  notificationCount: number = 2;

  slideOpts = {
    initialSlide: 0,
    speed: 400,
    autoplay: true,
    loop: true
  };

  promotions = [
    {
      image: 'assets/promo1.jpg',
      title: 'Festival de Verão',
      subtitle: 'Aproveite 20% de desconto'
    },
    {
      image: 'assets/promo2.jpg',
      title: 'Show Internacional',
      subtitle: 'Pré-venda exclusiva'
    }
  ];

  upcomingEvents = [
    {
      id: 1,
      image: 'assets/event1.jpg',
      title: 'Rock in Rio 2024',
      date: new Date('2024-09-15'),
      location: 'Rio de Janeiro, RJ',
      tickets: 100
    },
    {
      id: 2,
      image: 'assets/event2.jpg',
      title: 'Lollapalooza',
      date: new Date('2024-03-22'),
      location: 'São Paulo, SP',
      tickets: 0
    }
  ];

  constructor(private router: Router) { }

  ngOnInit() {
    this.loadUpcomingEvents();
  }

  navigateToTicketPurchase() {
    this.router.navigate(['/ticket-purchase']);
  }

  navigateToPurchaseHistory() {
    this.router.navigate(['/purchase-history']);
  }

  navigateToUserProfile() {
    this.router.navigate(['/user-profile']);
  }

  navigateToNotifications() {
    this.router.navigate(['/notifications']);
  }

  seeAllEvents() {
    this.router.navigate(['/events']);
  }

  viewEventDetails(eventId: number) {
    this.router.navigate(['/event-details', eventId]);
  }

  contactSupport() {
    this.router.navigate(['/support']);
  }

  showFAQ() {
    this.router.navigate(['/faq']);
  }

  private loadUpcomingEvents() {
    // Implementar chamada à API para carregar eventos
  }
}
