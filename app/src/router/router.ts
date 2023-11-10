// docs for router https://github.com/thepassle/app-tools/blob/master/router/README.md

if (!(globalThis as any).URLPattern) {
  await import("urlpattern-polyfill");
}

import { Router } from '@thepassle/app-tools/router.js';

// @ts-ignore
import { title } from '@thepassle/app-tools/router/plugins/title.js';

import { Service } from "../registre/service.interface";
import * as Registre from '../registre/registre-api.js';

import { defaultRoutes } from './default.routes';
import { WINDOW_EVENT_ROUTE_RENDERED } from '../constants.js';


const baseURL: string = (import.meta as any).env.BASE_URL;

interface currentRouter {
  currentService: Service| null;
  current: any;
}

export const router:currentRouter = {
    currentService: null,
    // Configuration par défaut, sera mise à jour par updateRouter()
    current: new Router({
        routes: defaultRoutes
      })
}

export const getRoutes = () => {
    return router.current.routes;
}

export const updateRouter = (services: Registre.Services, renderCallback: (service: Service) => HTMLElement) => {
  const routes = [...defaultRoutes, ...services.map((service: Service) => {
      return {
        path: (service?.chemin || '').length === 0 ? '/' : resolveRouterPath(service?.chemin) + '/*',
        render:  () => {
          const tagName = (service?.customElementName || '');
          router.currentService = {...service};
          window.dispatchEvent(new CustomEvent(WINDOW_EVENT_ROUTE_RENDERED));

          if ((service?.url || '').length === 0) {
              return document.createElement(tagName);
          }
          else {
              return renderCallback(service);
          }
        },
        title: service.nom,
      };
    })];

  router.current = new Router({
    routes: routes
  });

  console.log('Router updated', router.current );  

  return router.current;
}

export function resolveRouterPath(unresolvedPath?: string) {
    var resolvedPath = baseURL;
    
    if (unresolvedPath) {
        resolvedPath = resolvedPath + unresolvedPath;
    }

    return resolvedPath;
}
