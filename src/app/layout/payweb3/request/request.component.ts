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

  payweb3Request: FormGroup;
  submitted = false;

  paywebData = [];
  PAY_REQUEST_ID = '';
  CHECKSUM = '';
  encrypt_key = '';

  constructor(private fb: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.PAY_REQUEST_ID = localStorage.getItem('PAY_REQUEST_ID'); // getting values from localstorage
    this.encrypt_key = localStorage.getItem('ENCRYPTION_KEY');
    this.paywebData = localStorage.getItem('payweb3_initiate') ? JSON.parse(localStorage.getItem('payweb3_initiate')) : [];
    if (!this.PAY_REQUEST_ID || this.paywebData === [] || !this.encrypt_key) {
      this.router.navigate(['/payweb3/initiate']); // return to initiate if values are not in localstorage
      return false;
    }
    const checksum = CryptoJS.MD5(this.paywebData['PAYGATE_ID'] + this.PAY_REQUEST_ID + this.paywebData['REFERENCE'] + this.encrypt_key);
    this.CHECKSUM = checksum.toString(); // calculating checksum using MD5 to secure the data
    this.payweb3Request = this.fb.group({
      PAY_REQUEST_ID: [this.PAY_REQUEST_ID, Validators.required],
      CHECKSUM: [this.CHECKSUM, Validators.required]
    });
  }

  onSubmit(e) {
    this.submitted = true;

    if (this.payweb3Request.invalid) {
      console.log(this.payweb3Request, 'invalid form'); // return if data in form is invalid
      alert('Data is missing!!');
      return;
    }

    e.target.submit();
    localStorage.removeItem('PAY_REQUEST_ID'); // removing data after completeing request from localstorage
    localStorage.removeItem('ENCRYPTION_KEY');
    localStorage.removeItem('payweb3_initiate');
  }
}
