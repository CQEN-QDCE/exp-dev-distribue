import { LitElement, PropertyValueMap, html } from 'lit';
import { environment } from '../environment';
import { customElement, property } from 'lit/decorators.js';

interface Notification {
    guid: string;
    user: string;
    title: string;
    type: "success" | "error" | "warning" | "info";
    description?: string;
}

export const createUUID = () => {
    // http://www.ietf.org/rfc/rfc4122.txt
    const s: any[] = [];
    const hexDigits = '0123456789abcdef';
    for (let i = 0; i < 36; i++) { s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1); }
    s[14] = '4';
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);
    s[8] = s[13] = s[18] = s[23] = '-';
    return s.join('');
}

export const APP_NOTIFICATIONS_TAG = 'app-notifications';

@customElement(APP_NOTIFICATIONS_TAG)
export class AppNotifications extends LitElement {

    private _userId?: string;
    private _firstUpdated: boolean = false;
    private ws?: WebSocket;

    @property({ type: String }) title = 'Notifications';
    @property({ type: String }) urlServiceNotifications = "";
    @property({ type: Array })
    get notifications(): Notification[] {
        return JSON.parse(window.localStorage.getItem('coquille-notifications') || "[]");
    }
    set notifications(value: Notification[]) {
        window.localStorage.setItem('coquille-notifications', JSON.stringify(value));
    }
    @property({ type: String })
    get userId(): string {
        return this._userId || "anonymous";
    }
    set userId(value: string) {
        this._userId = value;
        if(this._firstUpdated) {
            this.setWebSocket();
        }
    }

    parseMessageData(data: any): Notification {
        const guid = data.guid || createUUID();
        const user = data.user;
        const title = data.service;
        const description = data.message;
        const type = data.type || "info";
        return <Notification>{ user, guid, title, description, type };
    }

    addMessageToNotifications(data: any) {
        const notification = this.parseMessageData(data);
        this.notifications = [notification, ...this.notifications];
    }

    constructor() {
        super();

        window.addEventListener('push', (event: any) => {
            this.addMessageToNotifications(event.detail);
            this.requestUpdate();
        });
    }

    setWebSocket() {
        if (this.ws) { this.ws.close(); }

        this.ws = new WebSocket(environment.urlServiceNotification + "?userId=" + this.userId);

        this.ws.onmessage = (event) => {
            const notification = JSON.parse(event.data);
            console.info("Notifications : réception d'un message...", notification);
            try {
                this.addMessageToNotifications(JSON.parse(notification.data.data));
            }
            catch (e) {
                this.notifications = [<Notification>{title: notification.data.data, type: "info"}, ...this.notifications];
            }

            this.requestUpdate();
        }
    }

    protected firstUpdated(_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
        window.addEventListener('load', () => {
            // Important, sinon une erreur "connection to *** was interrupted while the page was loading." surviendra.
            this.setWebSocket();
            this._firstUpdated = true;
        });
    }

    notificationCssClass (type: string) {
        switch (type) {
            case "success":
                return "positive";
            case "error":
                return "negative";
            case "warning":
                return "warning";
            default:
                return "";
        }
    }

    clearNotifications() {
        this.notifications = [];
        this.requestUpdate();
    }

    clearNofification(notification: Notification) {
        if (!!notification.guid) {
            this.notifications = this.notifications.filter(n => n.guid !== notification.guid);
            this.requestUpdate();
        }
    }

    render() {
        return html`
            <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/fomantic-ui@2.9.3/dist/semantic.min.css">

            <div class="ui list">
                <div class="title">${this.title}</div>
                <div class="ui button" @click="${this.clearNotifications}">Vider les notifications</div>
                ${this.notifications.map(notification => html`
                <div class="item">
                    <div class="ui ${this.notificationCssClass(notification.type) } message">
                        <div class="header">${notification.title}</div>
                        <div class="description">${notification.description}</div>
                        <div class="close icon" @click="${() => this.clearNofification(notification)}">X</div>
                    </div>
                </div>
                `)}
            </div>
        `;
    }
}

