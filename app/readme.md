# Prototype d'application coquille

L'application "coquille" est une application hybride web/mobile qui sert dynamiquement des services publiés sous forme de *web component* standard. Elle inclue la simulation de l'API d'un registre des services ainsi qu'un processus d'authentification OIDC.

## Installation locale

Dans le répertoire courant (/app)
```
pnmp install
pnmp start
```
Le prototype sera accessible à l'url http://localhost:5173/ par défaut.

## Fonctionalités

### Simulation d'un registre de services

Les fichiers json `./public/registre/organismes.json` et `./public/registre/services.json` font office de registre des services. Pour ajouter des services servis par l'application coquille ceux-ci doivent être inscrit dans les données du registre.

Un organisme doit d'abord exister dans le fichier `./public/registre/organismes.json`:

```json
{
    "guid": "9cfcc39d-dac2-424d-9df6-8a15f6a2a81a", #Unique
    "nomCourt": "MEA", (non utilisé)
    "nomLong": "Ministère exemple A", (non utilisé)
    "description": "Le Ministère Exemple A du Québec...", (non utilisé)
    "clientId": "org-mea-0", #Unique
    "urlLogo": "/assets/piv/logo-ministere-couleur.svg" #Accessible publiquement (non utilisé)
}
```

Puis un service doit être inscrit dans `./public/registre/services.json`:

```json
{
    "orgId": "9cfcc39d-dac2-424d-9df6-8a15f6a2a81a", #Unique
    "nom": "Service citoyen du MEA", #Affiché dans menu coquille
    "customElementName": "mea-service-exemple",#Unique
    "description": "Service citoyen du Ministère exemple A", #Non utilisé
    "chemin": "/pes-mea", #Unique
    "version": "1.0.0", #Non utilisé
    "signature": "", #Non utilisé
    "url": "http://localhost:4200/webcomponent.js", #Url d'un web componenent standard accessible publiquement
    "status": "actif",
    "public": false,
    "healthcheck": "http://localhost:4200/healthcheck", #Non utilisé
    "endpointsRelationAffaire": "http://localhost:4200/api/verifier-acces-citoyen", #Non utilisé
    "endpointDemandeEnCours": "http://localhost:4200/api/liste-dossier" #Non utilisé
}
```
Ces deux fichiers peuvent être rendus disponibles de manière publique et leurs urls renseignés dans le fichier `./src/environment.ts`:

```typescript
    ...
    organismesEndpoint: '/assets/registre/organismes.json',
    servicesEndpoint: '/assets/registre/services.json',
    ...
```
### API évenementiel

La coquille surveille des événements personalisés pour fournir des fonctionalités aux web components qu'elle rend disponibles. Les spécifications Typescript de ces évenements sont décris dans le fichier de définiton `./src/definitions/customEvents.d.ts`. Ce fichier peut être inclus dans n'importe quel projet Typescript pour assurer une pleine compatibilité des événements émis pour interagir avec la coquille. 

### Authentification OIDC

TODO

### Version mobile

TODO