/**
 * Copyright (c) 2020 PayGate (Pty) Ltd
 *
 * Author: App Inlet (Pty) Ltd
 *
 * Released under the GNU General Public License Version 3
 *
 */

import { LayoutModule } from './layout.module';

describe('LayoutModule', () => {
    let layoutModule: LayoutModule;

    beforeEach(() => {
        layoutModule = new LayoutModule();
    });

    it('should create an instance', () => {
        expect(layoutModule).toBeTruthy();
    });
});
