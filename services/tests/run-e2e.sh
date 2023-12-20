#!/bin/bash

# Étiquettes disponibles pour le commutateur -t : @visuel or @perfo or @affaire or @a11y
# Pour exécuter les tests dans le cloud, attribuer au commutateur -d, l'une des valeurs ci-après : oui/O ou Yes/y
while getopts t:d: option
do
   case ${option} in
      t) tags=${OPTARG};;
      d) distant_run=${OPTARG};;
   esac
done
current_tags=$tags
if [ -z "$current_tags" ]; then
  # Exécuter tous les tests si aucune valeur n'est défini pour le commutateur -t
  current_tags=@visuel or @perfo or @affaire or @a11y
fi

echo $current_tags
echo $distant_run

if [ -z "$distant_run" ]; then
  echo "`date` - Les tests s'exécutent en local."
  npm test --cucumberOpts.tags=$current_tags
    
  else
  echo "`date` - Les tests s'exécutent sur la plateforme de tests."
  npm run onLambdatest --cucumberOpts.tags=$current_tags
fi

# Génération du rapport html
npm run report 