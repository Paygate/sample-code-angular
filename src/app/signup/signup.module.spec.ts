/**
 * Copyright (c) 2020 PayGate (Pty) Ltd
 *
 * Author: App Inlet (Pty) Ltd
 *
 * Released under the GNU General Public License Version 3
 *
 */

import { SignupModule } from './signup.module';

describe('SignupModule', () => {
  let signupModule: SignupModule;

  beforeEach(() => {
    signupModule = new SignupModule();
  });

  it('should create an instance', () => {
    expect(signupModule).toBeTruthy();
  });
});
