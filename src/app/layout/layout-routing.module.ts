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
import { LayoutComponent } from './layout.component';

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'prefix' },
            { path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) },
            { path: 'payweb3', loadChildren: () => import('./payweb3/payweb3.module').then(m => m.Payweb3Module) },
            { path: 'cardpayment', loadChildren: () => import('./payhost-card-payment/payhost-card-payment.module').then(m => m.PayhostCardPaymentModule) },
            { path: 'webpayment', loadChildren: () => import('./payhost-web-payment/payhost-web-payment.module').then(m => m.PayhostWebPaymentModule) },
            { path: 'result', loadChildren: () => import('./result/result.module').then(m => m.ResultModule) },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule {}
