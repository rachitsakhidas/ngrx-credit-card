import { CreditCard } from './models/credit-card.models';

export interface AppState {
    cards: CreditCard[],
    editCardId: number
}