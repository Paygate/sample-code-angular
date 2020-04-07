/**
 * Copyright (c) 2020 PayGate (Pty) Ltd
 *
 * Author: App Inlet (Pty) Ltd
 *
 * Released under the GNU General Public License Version 3
 *
 */

import { AccessDeniedModule } from './access-denied.module';

describe('AccessDeniedModule', () => {
  let accessDeniedModule: AccessDeniedModule;

  beforeEach(() => {
    accessDeniedModule = new AccessDeniedModule();
  });

  it('should create an instance', () => {
    expect(accessDeniedModule).toBeTruthy();
  });
});
