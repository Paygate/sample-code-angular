/**
 * Copyright (c) 2020 PayGate (Pty) Ltd
 *
 * Author: App Inlet (Pty) Ltd
 *
 * Released under the GNU General Public License Version 3
 *
 */

import { AppModule } from './app.module';

describe('AppModule', () => {
    let appModule: AppModule;

    beforeEach(() => {
        appModule = new AppModule();
    });

    it('should create an instance', () => {
        expect(appModule).toBeTruthy();
    });
});
