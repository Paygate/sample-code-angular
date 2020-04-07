/**
 * Copyright (c) 2020 PayGate (Pty) Ltd
 *
 * Author: App Inlet (Pty) Ltd
 *
 * Released under the GNU General Public License Version 3
 *
 */

import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss'],
  animations: [routerTransition()]
})
export class ResultComponent implements OnInit {
  ChecksumChecked = true;
  PAY_REQUEST_ID = '';
  TRANSACTION_STATUS = '';
  CHECKSUM = '';
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.PAY_REQUEST_ID = this.route.snapshot.queryParamMap.get('PAY_REQUEST_ID');
    this.TRANSACTION_STATUS = this.route.snapshot.queryParamMap.get('TRANSACTION_STATUS');
    this.CHECKSUM = this.route.snapshot.queryParamMap.get('CHECKSUM');
  }

}
