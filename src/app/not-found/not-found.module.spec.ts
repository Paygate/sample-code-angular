/**
 * Copyright (c) 2020 PayGate (Pty) Ltd
 *
 * Author: App Inlet (Pty) Ltd
 *
 * Released under the GNU General Public License Version 3
 *
 */

import { NotFoundModule } from './not-found.module';

describe('NotFoundModule', () => {
  let notFoundModule: NotFoundModule;

  beforeEach(() => {
    notFoundModule = new NotFoundModule();
  });

  it('should create an instance', () => {
    expect(notFoundModule).toBeTruthy();
  });
});
