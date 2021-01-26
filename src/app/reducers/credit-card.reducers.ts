import { createReducer, on } from '@ngrx/store';

import { refreshCardsDone, deleteCardRequest } from '../actions/credit-card.actions';
import { CreditCard } from '../models/credit-card.models';

export const cardsReducer = createReducer<CreditCard[]>([],
    on(refreshCardsDone, (_, action) => action.cards),
);

export const editCardIdReducer = createReducer<number>(-1,
    on(deleteCardRequest, (_, action) => action.cardId),
    on(refreshCardsDone, () => -1),
);