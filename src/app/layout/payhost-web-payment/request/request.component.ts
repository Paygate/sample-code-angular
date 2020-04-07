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

  webRequestForm: FormGroup;
  submitted = false;
  webpaymentData: any;
  webData = [];
  PAY_REQUEST_ID = '';
  CHECKSUM = '';
  redirect_url = '';
  PAY_GATE_ID = '';
  REFERENCE = '';

  constructor(private fb: FormBuilder, private router: Router) {
    this.PAY_REQUEST_ID = localStorage.getItem('PAY_REQUEST_ID_WEB'); // getting values from localstorage
    this.PAY_GATE_ID = localStorage.getItem('PAY_GATE_ID_WEB');
    this.REFERENCE = localStorage.getItem('REFERENCE_WEB');
    this.redirect_url = localStorage.getItem('REDIRECT_URL_WEB');
    this.CHECKSUM = localStorage.getItem('CHECKSUM_WEB');
   }

  ngOnInit() {

    if (!this.PAY_REQUEST_ID || !this.PAY_GATE_ID || !this.REFERENCE || !this.redirect_url) {
      this.router.navigate(['/webpayment/initiate']); // return to initiate if values are not in localstorage
      return false;
    }

    this.webRequestForm = this.fb.group({
      PAY_REQUEST_ID: [this.PAY_REQUEST_ID, Validators.required],
      PAYGATE_ID: [this.PAY_GATE_ID, Validators.required],
      REFERENCE: [this.REFERENCE, Validators.required],
      CHECKSUM: [this.CHECKSUM, Validators.required]
    });
  }

  onSubmit(e) {
    this.submitted = true;

    if (this.webRequestForm.invalid) {
      console.log(this.webRequestForm, 'invalid form');
      alert('Data is missing!!'); // return if data in form is invalid
      return;
    }

    e.target.submit();
    localStorage.removeItem('PAY_REQUEST_ID_WEB'); // removing data after completeing request from localstorage
    localStorage.removeItem('PAY_GATE_ID_WEB');
    localStorage.removeItem('REFERENCE_WEB');
    localStorage.removeItem('CHECKSUM_WEB');
    localStorage.removeItem('REDIRECT_URL_WEB');

  }
}
