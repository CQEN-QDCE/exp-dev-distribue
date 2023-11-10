import {ReactiveController, ReactiveControllerHost} from 'lit';
import {StatusRenderer, Task} from '@lit/task';
import * as Registre from './registre-api.js';

export class OrganismesController implements ReactiveController {
    host: ReactiveControllerHost;

    private _data!: Registre.Organismes;

    private task!: Task<[], Registre.Organismes>;

    constructor(host: ReactiveControllerHost) {
        this.host = host;
        this.host.addController(this);
  
        this.task = new Task(this.host, {
            task: async ([], {signal}) => {
                const response = await fetch(`${Registre.organismesEndpoint}`, {signal});

                if (!response.ok) { throw new Error(response.statusText); }

                const data = await response.json();

                this._data = data;

                return data as Registre.Organismes;
            },
            args: () => []
        });
    }

    hostConnected() {
        this.host.requestUpdate();
    }

    render(renderFunctions: StatusRenderer<Registre.Organismes>) {
        return this.task.render(renderFunctions);
    }

    get data() { return this._data; }
}