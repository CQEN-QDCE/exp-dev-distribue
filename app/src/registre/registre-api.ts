import { Organisme } from "./organisme.interface";
import { Service } from "./service.interface";

export type Organismes = Array<Organisme>
export type Services = Array<Service>

export type Registre = {
    organismes: Organismes,
    services: Services
}

export const organismesEndpoint = '/assets/registre/organismes.json';
export const servicesEndpoint = '/assets/registre/services.json';
  