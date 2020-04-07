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
import { HttpClient } from '@angular/common/http';
import * as CryptoJS from 'crypto-js';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-query',
  templateUrl: './query.component.html',
  styleUrls: ['./query.component.scss'],
  animations: [routerTransition()]
})
export class QueryComponent implements OnInit {

  payweb3QueryForm: FormGroup;
  submitted = false;
  responseData = [];

  constructor(private fb: FormBuilder, private http: HttpClient) { }

  ngOnInit() {
    this.payweb3QueryForm = this.fb.group({
      PAYGATE_ID: ['10011072130', Validators.required],
      PAY_REQUEST_ID: ['23B785AE-C96C-32AF-4879-D2C9363DB6E8', Validators.required],
      REFERENCE: ['pgtest_123456789', Validators.required],
      ENCRYPTION_KEY: ['secret', Validators.required]
    });
  }

  onSubmit() {
    this.submitted = true;

    if (this.payweb3QueryForm.invalid) {
      console.log(this.payweb3QueryForm, 'invalid form'); // return if form is invalid
      return;
    }

    let payweb3FormString = '';
    let encrypt_key;
    const formdata = {};
    const payweb3Data = Object.entries(this.payweb3QueryForm.value); // separating key and value from string
    payweb3Data.forEach(([key, value]) => {
      if (key !== 'ENCRYPTION_KEY') {
        if (value !== '') {
          payweb3FormString += value;
          formdata[key] = value; // concatenation of form data except empty value and encryption key
        }
      } else {
        encrypt_key = value;
      }
    });

    const checksum = CryptoJS.MD5(payweb3FormString + encrypt_key); // calculating checksum using MD5

    formdata['CHECKSUM'] = checksum.toString(); // cocatenating checksum to formdata array
    console.log('formdata', formdata);

    this.http.post(environment.apiURL + '/payweb3/query.trans', formdata).subscribe(data => {
      console.log(data);
      if (data) {
        const res = (data as string).split('&'); // separating the & charachter from response string
        res.forEach(element => {
          const d = element.split('=');
          this.responseData.push({ key: d[0], value: d[1] }); // separating the key value pair and store it in array
        });
      }
    });

  }
}
