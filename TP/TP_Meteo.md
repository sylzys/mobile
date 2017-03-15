Météo jQuery mobile
=========================

Objectif
-----

Créer une application Météo Cordova permettant de géolocaliser l'utilisateur, ajouter des villes en favoris, afficher le temps actuel et des prévisions sur 3 jours.

Maquette
------------

![alt text](http://jingleweb.fr/meteo-M2.png "Appli Meteo")Hello World Cordova


Etapes
---------

### Etape 1 : Lancement de l'appli

Au lancement de l'appli, vérifier si l'utilisateur a déjà des vilels en favoris.

Si c'est le cas, afficher la 1ere ville. Si ce n'est pas le cas, afficher une popup lui demandant s'il souhaite se localiser (écran 1). 

S'il accepte, retrouver sa ville et afficher le temps actuel (écran 2). L'utilisateur doit pouvoir ajouter la ville localisée à ses favoris.

S'il refuse, afficher un message type (ex: Pas de favoris. Cliquer sur + pour ajouter une ville)


### Etape 2 : Ajout d'une ville localisée

Si l'utilisateur décide de sauvegarder sa ville une fois localisé, afficher un message de succès (ou d'erreur le cas échéant)

### Etape 3 : Recherche d'une ville

Si l'utilisateur clique sur le "+" en bas d'appli, il a la possibilité de taper les 1res lettres d'une ville (de France) grâce à un champ autocomplete (écran 3). Le clic sur le bouton "Ajouter" met sa ville dans la liste des favoris.

Lui afficher un message de succès (ou d'erreur le cas échéant)

### Etape 4 : Affichage des villes

Sur la page de chaque ville devra figurer (écran 4): 

- le nom de la ville (une icône "-" permettra de la supprimer, avec popup de confirmation et message de succès/erreur)
- le temps actuel (icônes météo, température en centigrades, lever/coucher du soleil)
- les prévisions à 3 jours (icônes météo, température en centigrades, lever/coucher du soleil)
- un "+" pour rechercher une ville

Le slide vers la droite / la gauche passe à la ville suivante / précédente. Les slides doivent se faire en boucle (c'est-à-dire, retour à la 1re ville après la dernière)