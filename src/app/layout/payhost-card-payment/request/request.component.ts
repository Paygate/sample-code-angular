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
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as CryptoJS from 'crypto-js';
import { Router } from '@angular/router';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.scss'],
  animations: [routerTransition()]
})
export class RequestComponent implements OnInit {
  cardRequestForm: FormGroup;
  submitted = false;
  webpaymentData: any;
  webData = [];
  PAY_REQUEST_ID = '';
  CHECKSUM = '';
  redirect_url = '';
  PAY_GATE_ID = '';

  constructor(private fb: FormBuilder, private router: Router) {
    this.PAY_REQUEST_ID = localStorage.getItem('PAY_REQUEST_ID_CARD'); // getting values from localstorage
    this.PAY_GATE_ID = localStorage.getItem('PAY_GATE_ID_CARD');
    this.redirect_url = localStorage.getItem('REDIRECT_URL_CARD');
    this.CHECKSUM = localStorage.getItem('CHECKSUM_CARD');
   }

  ngOnInit() {
    this.PAY_REQUEST_ID = localStorage.getItem('PAY_REQUEST_ID_CARD'); // getting values from localstorage
    this.PAY_GATE_ID = localStorage.getItem('PAY_GATE_ID_CARD');
    this.redirect_url = localStorage.getItem('REDIRECT_URL_CARD');
    this.CHECKSUM = localStorage.getItem('CHECKSUM_CARD');
    if (!this.PAY_REQUEST_ID || !this.PAY_GATE_ID || !this.redirect_url) {
      this.router.navigate(['/cardpayment/initiate']); // return to initiate if values are not in localstorage
      return false;
    }

    this.cardRequestForm = this.fb.group({
      PAY_REQUEST_ID: [this.PAY_REQUEST_ID, Validators.required],
      PAYGATE_ID: [this.PAY_GATE_ID, Validators.required],
      CHECKSUM: [this.CHECKSUM, Validators.required]
    });
  }
  onSubmit(e) {
    this.submitted = true;

    if (this.cardRequestForm.invalid) {
      console.log(this.cardRequestForm, 'invalid form');
      alert('Data is missing!!'); // return if data in form is invalid
      return;
    }

    e.target.submit();
    localStorage.removeItem('PAY_REQUEST_ID_CARD'); // removing data after completeing request from localstorage
    localStorage.removeItem('PAY_GATE_ID_CARD');
    localStorage.removeItem('REDIRECT_URL_CARD');
    localStorage.removeItem('CHECKSUM_CARD');

  }

}
