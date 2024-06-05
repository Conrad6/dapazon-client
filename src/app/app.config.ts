import { ApplicationConfig, importProvidersFrom, isDevMode, provideZoneChangeDetection } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter, withViewTransitions } from '@angular/router';
import { NgxsModule } from '@ngxs/store';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';

import { routes } from './app.routes';
import { DappazonState } from './state/dapp.state';
import { DappService } from './services/dapp.service';

export const appConfig: ApplicationConfig = {
  providers: [
    DappService,
    provideAnimations(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withViewTransitions()),
    importProvidersFrom([
      NgxsModule.forRoot([DappazonState]),
      NgxsStoragePluginModule.forRoot(),
      NgxsReduxDevtoolsPluginModule.forRoot({
        disabled: !isDevMode()
      })
    ])
  ]
};
