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
  cardQueryForm: FormGroup;
  submitted = false;
  responseData = '';

  constructor(private fb: FormBuilder, private http: HttpClient) { }

  ngOnInit() {
    this.cardQueryForm = this.fb.group({
      PAYGATE_ID: ['10011072130', Validators.required],
      PASSWORD: ['test', Validators.required],
      checkedRef: ['payrequestid', Validators.required],
      reference: [''],
      payRequestId: [''],
      transId: ['']
    });
  }

  onSubmit() {
    this.submitted = true;

    if (this.cardQueryForm.invalid) {
      alert('inavalid form');
      console.log(this.cardQueryForm, 'invalid form'); // return if form is invalid
      return;
    }

    this.http.post(environment.soapApiURL + '/payhost-query', this.cardQueryForm.value).subscribe(data => {
      console.log(data);

      if (data) {
        this.responseData = (data as string);
      }
    });

  }

}
