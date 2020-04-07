/**
 * Copyright (c) 2020 PayGate (Pty) Ltd
 *
 * Author: App Inlet (Pty) Ltd
 *
 * Released under the GNU General Public License Version 3
 *
 */

import { PageHeaderModule } from './page-header.module';

describe('PageHeaderModule', () => {
  let pageHeaderModule: PageHeaderModule;

  beforeEach(() => {
    pageHeaderModule = new PageHeaderModule();
  });

  it('should create an instance', () => {
    expect(pageHeaderModule).toBeTruthy();
  });
});
