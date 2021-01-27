import { Component, OnInit, OnDestroy, Inject } from '@angular/core';

import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';

import { Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { AppState } from '../../app-state';
import { CreditCard } from '../../models/credit-card.models';
import { addCardRequest, replaceCardRequest } from '../../actions/credit-card.actions';
import { Actions, ofType } from '@ngrx/effects';
import { CommonUtilService } from '../../shared/common-util.service';
import { PaymentService } from '../../shared/services/payment.service';

@Component({
  selector: 'app-add-edit-card',
  templateUrl: './add-edit-card.component.html',
  styleUrls: ['./add-edit-card.component.scss']
})
export class AddEditCardComponent implements OnInit, OnDestroy {

  public isLoading: boolean = false;
  public isSubmiting: boolean = false;
  public isForEdit: boolean = false;
  public isExpiryDateInValid: boolean = false;
  public creditCardForm: any;
  public destroyed$ = new Subject<boolean>();

  private monthList: any = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  private addSub!: Subscription;
  private editSub!: Subscription;

  constructor(
    public dialogRef: MatDialogRef<AddEditCardComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private store: Store<AppState>,
    private util: CommonUtilService,
    private paymentServ: PaymentService,
    private fb: FormBuilder,
    private updates$: Actions
  ) {
    this.listen();
  }

  // convenience getter for easy access to form fields
  get f() { return this.creditCardForm.controls; }

  listen() {
    this.addSub = this.updates$.pipe(
      ofType('[Card] Add Card Request'),
      takeUntil(this.destroyed$)
    ).subscribe(() => {
      this.isSubmiting = false;
      this.dialogRef.close();
      this.util.notification.success({
        title: 'Add New Credit Card',
        msg: 'Card Details Added Successfully...'
      });
    });

    this.editSub = this.updates$.pipe(
      ofType('[Card] Replace Card Request'),
      takeUntil(this.destroyed$)
    ).subscribe(() => {
      this.isSubmiting = false;
      this.dialogRef.close();
      this.util.notification.success({
        title: 'Update Credit Card',
        msg: 'Card Details Updated Successfully...'
      });
    });
  }

  ngOnInit(): void {
    this.init();
    this.loadData();
  }


  ngOnDestroy(): void {
    this.addSub.unsubscribe();
    this.editSub.unsubscribe();
  }

  init() {
    this.creditCardForm = this.fb.group({
      number: ['', Validators.required],
      holderName: ['', Validators.required],
      expiryMonth: ['', Validators.required],
      expiryYear: ['', Validators.required],
      securityCode: [''],
      amount: ['', Validators.required]
    });
  }

  loadData() {
    if (this.data && this.data.id) {
      if (this.isLoading) {
        return;
      }
      this.isLoading = true;
      this.isForEdit = true;
      let cardId = this.data.id;
      this.paymentServ.getCard(cardId).subscribe((data: any) => {
        this.isLoading = false;
        this.setFormData(data);
      })
    }
  }

  setFormData(data?: any) {
    this.creditCardForm.controls['holderName'].setValue(data.holderName);
    this.creditCardForm.controls['number'].setValue(data.number);

    const splitExpiryVal = data.expiryDate.split('/');
    if (splitExpiryVal.length > 1) {
      let index = this.monthList.indexOf(splitExpiryVal[0]) + 1;
      this.creditCardForm.controls['expiryMonth'].setValue(index);
    }
    this.creditCardForm.controls['expiryYear'].setValue(splitExpiryVal[1]);

    this.creditCardForm.controls['securityCode'].setValue(data.securityCode);
    this.creditCardForm.controls['amount'].setValue(data.amount);

  }

  formatMonth(evt?: any) {

  }

  cancel(evt?: any) {
    this.dialogRef.close();
  }

  returnParam() {
    const fData = this.creditCardForm.value;
    let card: CreditCard = {
      number: fData.number,
      holderName: fData.holderName,
      expiryDate: this.monthList[(fData.expiryMonth - 1)] + '/' + fData.expiryYear,
      securityCode: fData.securityCode,
      amount: fData.amount
    }
    return card;
  }

  validteExpiryDate(): boolean {
    const fData = this.creditCardForm.value;
    var date = new Date();
    var month = date.getMonth();
    var year = date.getFullYear();
    if (year > fData.expiryYear || (year === fData.expiryYear && month >= (fData.expiryMonth - 1))) {
      this.isExpiryDateInValid = true;
      return false;
    }
    this.isExpiryDateInValid = false;
    return true;
  }

  submitData() {
    let card = this.returnParam();
    this.store.dispatch(addCardRequest({ card }));
  }

  updateData() {
    let card = this.returnParam();
    card.id = this.data.id;
    this.store.dispatch(replaceCardRequest({ card }));
  }

  submit(evt?: any) {
    if (this.isSubmiting) {
      return;
    }
    if (this.validteExpiryDate() && this.creditCardForm.valid) {
      this.isSubmiting = true;
      if (this.isForEdit) {
        this.updateData();
      } else {
        this.submitData();
      }
    }
  }

}
