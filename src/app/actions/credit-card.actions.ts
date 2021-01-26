import { createAction, props } from '@ngrx/store';
import { CreditCard } from '../models/credit-card.models';

export const refreshCardsRequest = createAction('[Card] Refresh Cards Request');
export const refreshCardsDone = createAction('[Card] Refresh Cards Done', props<{ cards: CreditCard[] }>());
export const addCardRequest = createAction('[Card] Add Card Request', props<{ card: CreditCard }>());
export const replaceCardRequest = createAction('[Card] Replace Card Request', props<{ card: CreditCard }>());
export const deleteCardRequest = createAction('[Card] Delete Card Request', props<{ cardId: number }>());