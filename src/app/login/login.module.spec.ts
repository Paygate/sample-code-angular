/**
 * Copyright (c) 2020 PayGate (Pty) Ltd
 *
 * Author: App Inlet (Pty) Ltd
 *
 * Released under the GNU General Public License Version 3
 *
 */

import { LoginModule } from './login.module';

describe('LoginModule', () => {
    let loginModule: LoginModule;

    beforeEach(() => {
        loginModule = new LoginModule();
    });

    it('should create an instance', () => {
        expect(loginModule).toBeTruthy();
    });
});
