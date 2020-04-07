/**
 * Copyright (c) 2020 PayGate (Pty) Ltd
 *
 * Author: App Inlet (Pty) Ltd
 *
 * Released under the GNU General Public License Version 3
 *
 */

import { ServerErrorModule } from './server-error.module';

describe('ServerErrorModule', () => {
  let serverErrorModule: ServerErrorModule;

  beforeEach(() => {
    serverErrorModule = new ServerErrorModule();
  });

  it('should create an instance', () => {
    expect(serverErrorModule).toBeTruthy();
  });
});
