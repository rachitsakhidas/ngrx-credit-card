import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CardListComponent } from './card-list.component';
import { DialogEntryComponent } from './dialog-entry/dialog-entry.component';
import { AddEditCardComponent } from './add-edit-card/add-edit-card.component';

const routes: Routes = [
  {
    path: '',
    component: CardListComponent,
    children: [
      { path: 'add', component: DialogEntryComponent },
      { path: 'edit/:id', component: DialogEntryComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CardListRoutingModule { }
