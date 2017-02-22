Hello World Cordova
==============

Creation d'un projet
--------------------

Créer un nouveau projet appellé `Hello_World`. Utiliser la commande cordova create <directory> <namespace> <message>. Les 2 derniers paramètres sont optionnels:

    cordova create Hello_World com.example.helloworld "Hello Word"
	
Ou simplement

	cordova create Hello_World

Ajouter la plateforme Android

    cordova platform add android


Rappel: les sources sont à placer dans le dossier `www`

Pour lancer l'émulateur avec la ligne de commande:

    cordova emutale android

Pour lancer l'application sur un device connecté en usb, utiliser la comande:

    cordova run android

Pour pouvoir tester l'application sans la compiler, il faut utiliser l'émulateur ripple:

    cd platforms/android/assets/www
	ripple emulate

Cette commande va créer un serveur (par défault sur le port 8000), accessible le navigateur. Il faut se placer dans le répertoire www d'une platforme pour que le fichier cordova.js soit inclus.

On peut aussi utiliser l'option --path si on veut rester à la racine du projet:

    ripple emulate --path platforms/android/assets/www

Les sources du projet étant dans `www, il faut exécuter une commande pour copier les fichiers de /www à platforms/android/assets/www. On utilise la commande cordova prepare:

    cordova prepare android

Utilisations des fonctionnalités natives
----------------------------------------

Depuis la version 3.0 de cordova, les fonctionnalités natives ne sont intégrées dans le projet sous forme de plugin.

Pour installer un plugin dans un projet cordova:

    cordova plugin add <name-space-plugin>

Par exemple, pour la caméra:

    cordova plugin add org.apache.cordova.camera

Vous pouvez trouver les fonctionnalités cordova ici: [https://cordova.apache.org/docs/en/latest](https://cordova.apache.org/docs/en/latest) dans la section Plugin APIs

Une liste de plugins plus complète, créée par la communauté, est disponible ici: [hhttps://cordova.apache.org/plugins/](https://cordova.apache.org/plugins/)

On peut également faire une recherche en ligne de commande:

    cordova plugin search bar code
    

### TP1

Créer un première page qui sera le menu de l'application. Il faudra retrouver les boutons suivant:

- Accelerometer
- Camera
- Compass
- Contacts
- Device informations
- Geolocation
- Notification

Créer les pages pour chaque bouton (framework ou html).

### Accelerometre

Cette page doit afficher les informations de l'accéléromètre du téléphone toutes les 100ms.
[Doc](https://cordova.apache.org/docs/en/latest/reference/cordova-plugin-device-motion/index.html)

### Camera

Cette page doit permettre de prendre une photo et de l'afficher sur la page.

[Doc](https://cordova.apache.org/docs/en/latest/reference/cordova-plugin-camera/index.html)

Bonus: Prendre plusieurs photos pour faire une mini galerie.

### Compass

Cette page doit afficher les information de la boussole toutes les 100ms.

[Doc](https://cordova.apache.org/docs/en/latest/reference/cordova-plugin-device-orientation/index.html)

Bonus: Faire une flèche qui pointe vers le nord (tip: css3 transform)

### Contact

Cette page doit lister tous les noms des contactes du téléphone. Au clic sur un contact, on affiche toutes les informations de ce contact.

[Doc](https://cordova.apache.org/docs/en/latest/reference/cordova-plugin-contacts/index.html)

Bonus: Faire un champ de recherche pour filtrer les contacts (autocomplete).

### Device

Créer une page qui affiche toutes les informations du téléphone

[Doc](https://cordova.apache.org/docs/en/latest/reference/cordova-plugin-device/index.html)

### Geolocation

Créer une page qui affiche les données sur la localisation du téléphone:

- Latitude
- Longitude
- Altitude
- Précision
- Précision de l'altitude
- L'angle par rapport au nord
- La vitesse

Bonus: Afficher la position sur une google map

[Doc](https://cordova.apache.org/docs/en/latest/reference/cordova-plugin-geolocation/index.html)

### Notification

Créer une page avec 5 boutons pour:

- Afficher une boite de dialogue
- Afficher une boite de dialogue de confirmation et afficher le résultat
- Afficher une boite de dialogue avec un input et afficher le résultat
- Faire biiiip
- Faire vibrer

