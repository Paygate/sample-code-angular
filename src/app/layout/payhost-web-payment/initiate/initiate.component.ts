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
import { countries } from '../../../../assets/countries';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import * as CryptoJS from 'crypto-js';
import * as moment from 'moment';
import { Router } from '@angular/router';
import { locale } from '../../../../assets/locale';
import { environment } from '../../../../environments/environment';
@Component({
  selector: 'app-initiate',
  templateUrl: './initiate.component.html',
  styleUrls: ['./initiate.component.scss'],
  animations: [routerTransition()]
})
export class InitiateComponent implements OnInit {
  public paymethodAndUserDiv = true;
  public customerDetailDiv = true;
  public riskDiv = true;
  public shippingDiv = true;
  public addressDiv = true;
  public redirectFieldsDiv = true;
  public airlineFieldsDiv = true;
  public requestDiv = true;
  public responseDiv = true;
  public redirectDiv = true;
  localeData: any;
  webInitiateForm: FormGroup;
  submitted = false;
  webResponse = [];
  CountriesData: any;

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) { }

  ngOnInit() {
    this.CountriesData = countries;
    this.webInitiateForm = this.fb.group({
      PayGateId: ['10011072130', Validators.required],
      Reference: [this.generateReference(), Validators.required],
      Title: [''],
      Password: ['test', Validators.required],
      Locale: ['zu', Validators.required],
      EncryptionKey: ['secret'],
      FirstName: ['Test', Validators.required],
      MiddleName: [''],
      LastName: ['Test', Validators.required],
      Telephone: [''],
      Method: [''],
      Detail: [''],
      Mobile: [''],
      Fax: [''],
      Email: ['support@paygate.co.za', Validators.required],
      DateOfBirth: [''],
      SocialSecurityNumber: [''],
      DeliveryDate: [''],
      DeliveryMethod: [''],
      InstallationRequired: [''],
      TransactionDate: [moment().utc().format(), Validators.required],
      Customer: [''],
      Shipping: [''],
      Billing: [''],
      Zip: [''],
      City: [''],
      State: [''],
      Country: ['ZAF', Validators.required],
      AddressLine1: [''],
      AddressLine2: [''],
      AddressLine3: [''],

      NotifyUrl: ['http://localhost:4000/result', Validators.required],
      ReturnUrl: ['http://localhost:4000/result', Validators.required],
      Target: [''],
      TicketNumber: [''],
      PNR: ['xyz', Validators.required],
      TravellerType: ['A'],
      DepartureAirport: ['LHR', Validators.required],
      DepartureCountry: ['GBR', Validators.required],
      DepartureCity: ['LON', Validators.required],
      DepartureDateTime: [moment().format('YYYY-MM-DD HH:mm:ss'), Validators.required],
      ArrivalAirport: ['CPT', Validators.required],
      ArrivalCountry: ['ZAF', Validators.required],
      ArrivalCity: ['CPT', Validators.required],
      ArrivalDateTime: [moment().format('YYYY-MM-DD HH:mm:ss'), Validators.required],
      MarketingCarrierCode: [''],
      MarketingCarrierName: [''],
      IssuingCarrierCode: [''],
      IssuingCarrierName: [''],
      FlightNumber: [''],
      UserKey: [''],
      MerchantOrderId: [this.generateReference(), Validators.required],
      Currency: ['ZAR', Validators.required],
      Amount: ['3295', Validators.required],
      Discount: [''],
      AccountNumber: [''],
      SessionId: [''],
      IpAddress: [''],
      UserValue: ['']


    });
    this.localeData = locale;
  }

  onSubmit() {
    this.submitted = true;
    if (this.webInitiateForm.invalid) {
      alert('Please fill all required fields.');
      console.log(this.webInitiateForm, 'invalid form'); // return if form is invalid
      return;
    }

    console.log(this.webInitiateForm.value);

    this.http.post( environment.soapApiURL + '/payhost-web', this.webInitiateForm.value).subscribe(data => {
      if (data) {
        console.log('response', data);
        localStorage.setItem('PAY_REQUEST_ID_WEB', data['PAY_REQUEST_ID']);
        localStorage.setItem('PAY_GATE_ID_WEB', data['PAYGATE_ID']);
        localStorage.setItem('REFERENCE_WEB', data['REFERENCE']);
        localStorage.setItem('CHECKSUM_WEB', data['CHECKSUM']);
        localStorage.setItem('REDIRECT_URL_WEB', data['RedirectUrl']);

        this.router.navigate(['/webpayment/request']);  // After initiating request navigate to request page
      }

    });
  }

  generateReference() {
    return 'pgtest_' + moment().format('YYYYMMDDHHmmss'); // formatting date and time according to requirement
  }

}
