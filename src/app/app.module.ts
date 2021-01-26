import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from './shared/shared.module';
import { MaterialModule } from './material/material.module';
import { SimpleNotificationsModule } from 'angular2-notifications';

import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';

import { CreditCardEffects } from './effects/credit-card.effects';
import { cardsReducer, editCardIdReducer } from './reducers/credit-card.reducers';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    SimpleNotificationsModule.forRoot(),
    StoreModule.forRoot({
      cards: cardsReducer,
      editCardId: editCardIdReducer,
    }),
    StoreDevtoolsModule.instrument(),
    EffectsModule.forRoot([CreditCardEffects]),
    BrowserAnimationsModule,
    SharedModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
