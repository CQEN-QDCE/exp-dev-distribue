#!/bin/bash

# Démarre un serveur static pour exposer le dossier 'dist'
# Usage : ./serve_dist.sh 4200


pnpm install --global http-server

pnpm bundle

http-server dist -p "${1}" --cors
