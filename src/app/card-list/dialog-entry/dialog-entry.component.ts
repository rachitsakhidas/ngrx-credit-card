import { Component, OnInit } from '@angular/core';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AddEditCardComponent } from '../add-edit-card/add-edit-card.component';

import { CreditCard } from '../../models/credit-card.models';

@Component({
  selector: 'app-dialog-entry',
  templateUrl: './dialog-entry.component.html',
  styleUrls: ['./dialog-entry.component.scss']
})
export class DialogEntryComponent implements OnInit {

  private data: any;

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.route.paramMap.subscribe(paramMap => {
      this.openDialog({ id: paramMap.get('id') });
    });
  }

  ngOnInit(): void {

  }

  setParam(params?: any) {
    this.data.id = params.id;
  }

  openDialog(data?: any): void {
    const dialogRef = this.dialog.open(AddEditCardComponent, {
      height: '600px',
      width: '500px',
      data
    });
    dialogRef.afterClosed().subscribe(result => {
      this.router.navigate(['card-list']);
    });
  }

}
