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

Pour produire la version mobile de l'application coquille, la couche d’accès multi-plateformes **capacitor** (d'[Ionic](https://capacitorjs.com/)) est utilisé comme outil d'empaquetage.

Dans le cas de cette application, il faut exécuter le script [pack_app.sh](scripts/mobile/pack_app.sh) pour générer la version packagée de l'application qui pourra être téléchargée par exemple à Google Play.

:warning: S'assurer que le répertoire dist existe (après exécution de la commande ``build``)
```pnpm build```

Le script mentionné a besoin de deux paramètres suivants:
- 1er: le nom de l'application
- 2ème: Un id pour le paquet de l'application, qui devrait être unique

Un exemple de commande:
```bash
./scripts/mobile/pack_app.sh services-gouv com.edd.app
```

Le script installe les plugins nécessaires et produit le composant a être téléchargé au fournisseur mobile (Google Play).

Le composant packagé (app-release.aab), doit se trouver dans le répertoire android/app/build/outputs/bundle/release/

- Information additionnelle: C'est recommandé de générer une pair de clès pour encrypter et signer le composant qui sera téléchargé et publié pour installation en version mobile.

    * Génération d'une pair de clés avec l'outil keytool:

    ```bash
    keytool -genkey -v -keystore android-upload-key.jks -keyalg RSA -keysize 2048 -validity 10000 -alias android-upload-key
    ``` 

    * Signature du composant (de l'application packagée) à être téléchargé:
    ```bash
    jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore ~/path/to/your/keystore/android-upload-key.jks -signedjar app-signed-release.aab app-release.aab android-upload-key    
    ```