/**
 * Copyright (c) 2020 PayGate (Pty) Ltd
 *
 * Author: App Inlet (Pty) Ltd
 *
 * Released under the GNU General Public License Version 3
 *
 */

import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../../router.animations';
import * as moment from 'moment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { countries } from '../../../../assets/countries';
import { environment } from '../../../../environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-initiate',
  templateUrl: './initiate.component.html',
  styleUrls: ['./initiate.component.scss'],
  animations: [routerTransition()]
})
export class InitiateComponent implements OnInit {
  public submitted = false;
  public payGateAccountDetails = true;
  public customerDetails = true;
  public redirectUrlDetails = true;
  public orderDetails = true;
  public threeDSecureDetails = true;
  public riskDetails = true;
  cardPaymentForm: FormGroup;
  CountriesData: any;
  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) { }

  ngOnInit() {
    this.CountriesData = countries;
    this.cardPaymentForm = this.fb.group({
      PayGateId: ['10011072130', Validators.required],
      Password: ['test', Validators.required],
      Title: ['Mr'],
      FirstName: ['Test', Validators.required],
      LastName: ['Test', Validators.required],
      Telephone: ['0861234567'],
      Mobile: ['0735552233'],
      Email: ['support@paygate.co.za', Validators.required],
      CardNumber: ['4000000000000002', Validators.required],
      CardExpiryDate: ['012024', Validators.required],
      CardIssueDate: ['012012', Validators.required],
      CVV: ['221', Validators.required],
      BudgetPeriod: ['0', Validators.required],
      NotifyUrl: ['http://localhost:4000/result', Validators.required],
      ReturnUrl: ['http://localhost:4000/result', Validators.required],
      MerchantOrderId: [this.generateReference(), Validators.required],
      Currency: ['ZAR', Validators.required],
      Amount: ['3295', Validators.required],
    });
  }
  generateReference() {
    return 'pgtest_' + moment().format('YYYYMMDDHHmmss'); // formatting date and time as per requirement
  }

  onSubmit() {
    this.submitted = true;
    if (this.cardPaymentForm.invalid) {
      alert('Please fill all required fields.');
      console.log(this.cardPaymentForm, 'invalid form'); // return if form is invalid
      return;
    }
    console.log(this.cardPaymentForm.value);
    this.http.post(environment.soapApiURL + '/payhost-card', this.cardPaymentForm.value).subscribe(data => {
      console.log('response', data);
      if (data) {
        localStorage.setItem('PAY_REQUEST_ID_CARD', data['PAY_REQUEST_ID']);
        localStorage.setItem('PAY_GATE_ID_CARD', data['PAYGATE_ID']);
        localStorage.setItem('CHECKSUM_CARD', data['CHECKSUM']);
        localStorage.setItem('REDIRECT_URL_CARD', data['RedirectUrl']);
        this.router.navigate(['/cardpayment/request']);  // After initiating request navigate to request page
        }
      });
    }
}
