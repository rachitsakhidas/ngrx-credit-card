import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';

import { AppState } from '../app-state';
import { refreshCardsRequest, deleteCardRequest } from '../actions/credit-card.actions';


@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss']
})
export class CardListComponent implements OnInit, OnDestroy {

  cardList: any;
  cards$ = this.store.pipe(select(state => state.cards)).subscribe((data) => {
    this.cardList = data;
  });

  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.store.dispatch(refreshCardsRequest());
  }

  ngOnDestroy() {

  }

  delete(item?: any) {
    if ((window as any).confirm("Are you sure to delete card: " + item.holderName)) {
      let cardId = item.id;
      this.store.dispatch(deleteCardRequest({ cardId }));
    }
  }

}
