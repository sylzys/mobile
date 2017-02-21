TodoList jQuery mobile
=========================

Objectif
-----

Créer une todo list dynamique avec jquery mobile.

Requirements
------------

- Un serveur web 
- Un navigateur récent


Etapes
---------

### Etape 1 : Installation

Créer une page index.html et inclure jQuery et jQuery mobile.
[Doc](http://demos.jquerymobile.com/1.4.5/pages/)

### Etape 2 : Première page

Créer une première page avec en header(data-role) le title "Checklist" et en contenu "Hello world".
Cette page aura comme id `list`

### Etape 3 : Deuxième page et lien

Dans le même fichier html, ajouter une deuxième page avec en header "Checklist 1" et en content "todo".
Cette page aura pour id `view`
Ajouter, sur la 1re page, un lien vers la nouvelle page. ([Template multi page](http://demos.jquerymobile.com/1.4.5/pages/#Multi-pagetemplatestructure))

### Etape 4 : Séparation des fichiers

Créer un nouveau fichier view.html et y copier-coller le code de la nouvelle page.
Changer le lien de la page 1 pour pointer vers le nouveau fichier. 

### Etape 5 : Bouton retour

Dans la 2e page, ajouter un bouton retour dans le header pour revenir sur la page précédente.
[Doc](http://demos.jquerymobile.com/1.4.5/toolbar/#Addingbackbuttontoheader)

### Etape 6 : Transition

Ajouter une transition de type "slide" lors de la naviagation entre la page `list` et la page `view`
[Doc](http://demos.jquerymobile.com/1.3.2/widgets/transitions/)

### Etape 7 : Liste

Dans la 1re page, supprimer le contenu et y ajouter une liste de liens (en dur) vers la page `view`.

Exemple:
- Checklist 1
- Checklist 2
- Checklist 3

[Doc](http://demos.jquerymobile.com/1.4.5/transitions/listview/)

### Etape 8 : Filtre de recherce

Ajouter un filtre de recherche.
[Doc](http://demos.jquerymobile.com/1.4.5/transitions/filterable/)

### Etape 9 : 

Dans la page `view`, ajouter une liste de checkboxes, avec des labels.
Par exemple:

- Tâche 1
- Tâche 2
- Tâche 3

[Doc](http://demos.jquerymobile.com/1.4.5/transitions/checkboxradio-checkbox/#Verticalgroup)

### Etape 10 : Formulaire d'édition

- Créer un nouveau fichier form.html.
- Ajouter un premier champ texte (placeholder: "Nom de la checklist").
- Ajouter un controlgroup avec plusieurs champs textes (qui recevront les différentes tâches de la checklist).
- Ajouter un bouton "Ajouter une tâche" en dessous de la liste
- Ajouter un title dans le header: "Edit Checklist 1"
- Ajouter un bouton "Sauvegarder" dans le footer avec une icône de type "check"

[Icons](http://demos.jquerymobile.com/1.4.5/transitions/icons/)

### Etape 11 : Lien vers le formulaire

- Dans la page `list`, ajouter un bouton "Ajouter une checklist" en footer, pointant vers la page `form`
- Dans la listview, ajouter, pour chaque ligne, des Split button avec comme une icône "gear" pointant vers la page `form`
(On pourra alors respectivement ajouter et éditer une checklist)
[Doc](http://demos.jquerymobile.com/1.4.5/listview/#Splitbuttons)

### Etape 12 : Script

- Ajouter un fichier script.js dans la page `list`
- Ajouter le code d'initialisation créant un bind sur l'évènement "mobileinit".

### Etape 13 : Objet de test

Créer un objet avec des données de tests pour définir la structure.
Par exemple:

    var checklists = {
	  1: { //id of checklist
	    name: 'checklist1',
		tasks : [
		  {name: 'Task1', done: true},
		  {name: 'Task2', done: false},
		  {name: 'Task3', done: false},
		]
	  },
	  2: {
	    name:'checklist2',
		tasks : [
		  {name: 'Task1', done: true},
		  {name: 'Task2', done: false},
		  {name: 'Task3', done: true},
		]
      }
	}

### Etape 14 : Page de liste dynamique

- Ajouter un bind sur l'évènement "pagebeforeshow" de la page `list`
- Parcourir l'objet checklist et créer dynamiquement la listview
- Ajouter l'id de la checklist en paramètre de l'url du lien vers la page view (ex: view.html?id=5)
- Ajouter également l'id pour les liens vers la page de formulaire

Tips:
- Utiliser la méthode jquery "html()" pour vider la liste
- Utiliser la méthode jquery "append()" pour ajouter des éléments à la listview
- Ne pas oublier de rafraichir de listview une fois que les éléments sont dynamiquement créés (.listview("refresh"))
- Utiliser la méthode `on` pour gérer les évènements. [Doc](http://api.jquerymobile.com/category/events/)

### Etape 15: Page `view` dynamique

- Ajouter un bind sur l'évènement "pagebeforeshow" de la page `view`
- Récupérer le paramètre de l'url pour récupérer la bonne checklist
- Parcourir la liste de tâches de la checklist et créer dynamiquement les checkboxes.
- Pour chaque checkbox, ajouter un bind sur l'évènement "change" et changer la valeur du "done" dans l'objet checklist
  

Helper pour récupérer le paramètre de l'url:

    var getUrlParameter = function(paramName) {
	  var urlParams = window.location.href.split('?')[1];
	  if (urlParams) {
	    var params = urlParams.split('&');

        for (var i = 0; i <  params.length; i++) {
	      var param = params[i].split('=');
		  if (param[0] == paramName)
	        return param[1];
		}
	  }
	}


### Etape 16 : Page form dynamique

- Ajouter un bind sur l'évènement "pagebeforeshow" de la page form
- Récupérer l'id dans l'url
- Tester si l'id est présent pour savoir si c'est un ajout ou une édition
- Si c'est une édition
  - Remplir le champ `name` avec le nom de la checklist
  - Parcourir la liste des tâches et ajouter des input text pour chaque tâche, renseigner automatiquement le nom de la tâche
- Ajouter un bind sur l'évènement `click` du bouton d'ajout de tâche qui ajoutera un input de tâche
- Ajouter un bind sur l'évènement `click` du bouton de sauvegarde qui ajoutera une entrée dans l'objet checklist en cas d'ajout et qui modifira la checklist en cas d'édition

### Etape 17 : Le stockage

- Ajouter un bind sur l'évènement pageinit
- Remplir l'object checklists avec les données du localstorage avec la clé "checklists"
- Lors de chaque action sur l'object `checklists`, sauvegarder les changements dans le localstorage avec la clé `checklist`

[Doc](https://developer.mozilla.org/en-US/docs/Web/API/Storage/LocalStorage)
