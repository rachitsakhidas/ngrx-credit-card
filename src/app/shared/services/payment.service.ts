import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { CreditCard } from '../../models/credit-card.models';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  _baseUrl = 'http://localhost:4250/cards';

  constructor(private httpClient: HttpClient) { }

  private getCollectionUrl() {
    return this._baseUrl;
  }

  private getElementUrl(elementId: any) {
    return this._baseUrl + '/' + encodeURIComponent(String(elementId));
  }

  all() {
    return this.httpClient.get<CreditCard[]>(this.getCollectionUrl());
  }

  add(card: CreditCard) {
    return this.httpClient.post<CreditCard>(this.getCollectionUrl(), card);
  }

  replace(card: CreditCard) {
    return this.httpClient.put<CreditCard>(this.getElementUrl(card.id), card);
  }

  getCard(cardId: number) {
    return this.httpClient.get<CreditCard[]>(this.getElementUrl(cardId));
  }

  delete(cardId: number) {
    return this.httpClient.delete<CreditCard>(this.getElementUrl(cardId));
  }

}
