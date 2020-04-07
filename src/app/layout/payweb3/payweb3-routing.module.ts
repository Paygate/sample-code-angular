/**
 * Copyright (c) 2020 PayGate (Pty) Ltd
 *
 * Author: App Inlet (Pty) Ltd
 *
 * Released under the GNU General Public License Version 3
 *
 */

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InitiateComponent } from './initiate/initiate.component';
import { QueryComponent } from './query/query.component';
import { RequestComponent } from './request/request.component';

const routes: Routes = [
  {
    path: '',
    component: InitiateComponent
  },
  {
    path: 'initiate',
    component: InitiateComponent
  },
  {
    path: 'query',
    component: QueryComponent
  },
  {
    path: 'request',
    component: RequestComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Payweb3RoutingModule { }
