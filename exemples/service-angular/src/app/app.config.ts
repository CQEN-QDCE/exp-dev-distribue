import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import {APP_BASE_HREF} from '@angular/common';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    { provide: APP_BASE_HREF, useValue: '/pes-mea' }, //Doit le même url de base que celui assigné par le registre
    provideRouter(routes)]
};
