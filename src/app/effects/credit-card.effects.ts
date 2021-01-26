import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { switchMap, map } from 'rxjs/operators';

import { PaymentService } from '../shared/services/payment.service';
import {
    refreshCardsRequest, refreshCardsDone, addCardRequest,
    replaceCardRequest, deleteCardRequest
} from '../actions/credit-card.actions';
import { of } from 'rxjs';

@Injectable()
export class CreditCardEffects {

    constructor(
        private cardService: PaymentService,
        private actions$: Actions,
    ) { }

    refreshCards$ = createEffect(() => this.actions$.pipe(
        ofType(refreshCardsRequest),
        switchMap(() => {
            return this.cardService.all().pipe(
                map(cards => refreshCardsDone({ cards })),
            );
        }),
    ));

    addCard$ = createEffect(() => this.actions$.pipe(
        ofType(addCardRequest),
        switchMap((action) => {
            return this.cardService.add(action.card).pipe(
                map(() => refreshCardsRequest()),
            );
        }),
    ));

    replaceCard$ = createEffect(() => this.actions$.pipe(
        ofType(replaceCardRequest),
        switchMap((action) => {
            return this.cardService.replace(action.card).pipe(
                map(() => refreshCardsRequest()),
            );
        }),
    ));

    deleteCard$ = createEffect(() => this.actions$.pipe(
        ofType(deleteCardRequest),
        switchMap((action) => {
            return this.cardService.delete(action.cardId).pipe(
                map(() => refreshCardsRequest()),
            );
        }),
    ));
}