import { Injectable } from '@angular/core';
import { FaqModel } from '../../models/help-support/faq.model';


@Injectable({
  providedIn: 'root'
})
export class FaqService {

  getFaqs(): FaqModel[] {
    return [
      { question: 'Question 1?', answer: 'Answer 1.' },
      { question: 'Question 2?', answer: 'Answer 2.' }
    ];
  }
}


