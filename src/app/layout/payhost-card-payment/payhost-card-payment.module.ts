/**
 * Copyright (c) 2020 PayGate (Pty) Ltd
 *
 * Author: App Inlet (Pty) Ltd
 *
 * Released under the GNU General Public License Version 3
 *
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { PayhostCardPaymentRoutingModule } from './payhost-card-payment-routing.module';
import { InitiateComponent } from './initiate/initiate.component';
import { QueryComponent } from './query/query.component';
import { RequestComponent } from './request/request.component';

@NgModule({
  declarations: [InitiateComponent, QueryComponent, RequestComponent],
  imports: [
    CommonModule,
    PayhostCardPaymentRoutingModule,
    NgbModule,
    ReactiveFormsModule
  ]
})
export class PayhostCardPaymentModule { }
