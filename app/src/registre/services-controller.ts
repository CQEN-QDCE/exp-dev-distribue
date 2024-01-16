/**
 * Controlleur des données des services publiés au registre
 */

import {ReactiveController, ReactiveControllerHost} from 'lit';
import {StatusRenderer, Task} from '@lit/task';
import * as Registre from './registre-api';
import {servicesInternes} from './services-internes'

export class ServicesController implements ReactiveController {
    host: ReactiveControllerHost;

    private task!: Task<[], Registre.Services>;

    constructor(host: ReactiveControllerHost) {
        this.host = host;
        this.host.addController(this);
  
        this.task = new Task(this.host, {
            task: async ([], {signal}) => {
                const response = await fetch(`${Registre.servicesEndpoint}`, {signal});

                if (!response.ok) { throw new Error(response.statusText); }

                const data = await response.json();

                const servicesExterne = data as Registre.Services;

                //Ajout de la liste des services internes
                return [...servicesInternes, ...servicesExterne];
            },
            args: () => [],
            //autoRun: false,
            onComplete: (value: Registre.Services) => {
                // Émettre un événement pour que les composants puissent s'initialiser
                const event = new CustomEvent(Registre.WINDOW_EVENT_REGISTRE_SERVICES_ASYNC_COMPLETE, {
                    detail: {
                        services: value
                    }
                });

                window.dispatchEvent(event);
                
                console.log("Service Task complete", value);
            }
        });
    }

    hostConnected() {
        this.host.requestUpdate();

        console.log("Service controller connected to host");
    }

    render(renderFunctions: StatusRenderer<Registre.Services>) {
        console.log("Rendering services task", this.task.status, this.task);
        
        return this.task.render(renderFunctions);
    }

    get data() { return this.task.value; }
}
