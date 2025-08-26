import { Component } from '@angular/core';

import { FaqModel } from '../../models/help-support/faq.model';
import { FaqService } from '../../service/help-support/faq.service';

@Component({
  selector: 'app-faq.components',
  standalone: false,
  templateUrl: './faq.components.html',
  styleUrl: './faq.components.css'
})
export class FaqComponents {

  constructor(private faqService: FaqService) {
  this.faqs = this.faqService.getFaqs();
}

 faqs: FaqModel[] = [
    {
      question: 'How do I reset my password?',
      answer: 'Click on "Forgot password" on the login screen and follow the instructions.'
    },
    {
      question: 'Where can I find my purchase history?',
      answer: 'Navigate to your profile and click on "Order History".'
    },
    {
      question: 'How do I contact support?',
      answer: 'Use the "Contact Us" form at the bottom of this page.'
    }
  ];

  toggleFaq(index: number) {
    this.faqs[index].isOpen = !this.faqs[index].isOpen;
  }
}

