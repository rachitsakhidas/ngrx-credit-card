import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';

import { CardListRoutingModule } from './card-list-routing.module';
import { CardListComponent } from './card-list.component';
import { AddEditCardComponent } from './add-edit-card/add-edit-card.component';
import { DialogEntryComponent } from './dialog-entry/dialog-entry.component';


@NgModule({
  declarations: [CardListComponent, AddEditCardComponent, DialogEntryComponent],
  imports: [
    CommonModule,
    CardListRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    MaterialModule
  ],
  exports: [
    AddEditCardComponent
  ]
})
export class CardListModule { }
