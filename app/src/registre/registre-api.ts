import { Organisme } from "./organisme.interface";
import { Service } from "./service.interface";

import { environment } from "../environment"

export type Organismes = Array<Organisme>
export type Services = Array<Service>

export type Registre = {
    organismes: Organismes,
    services: Services
}

export const organismesEndpoint = environment.organismesEndpoint;
export const servicesEndpoint = environment.servicesEndpoint;
  