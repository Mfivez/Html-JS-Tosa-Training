# Banque de questions HTML / CSS / JS - 5 niveaux

Cette banque sert à progresser du repérage simple vers des questions plus proches d'un test technique. Les questions mélangent HTML, CSS et JavaScript.

## Niveau 1 - Découverte

```tosa-quiz
{
  "level": "Niveau 1",
  "mode": "single",
  "question": "Quelle déclaration doit apparaître au début d'un document HTML5 ?",
  "options": [
    "<!doctype html>",
    "<html5>",
    "<doctype css>",
    "<?html version=\"5\">"
  ],
  "answers": [0],
  "explanation": "<!doctype html> indique au navigateur d'utiliser le mode standard HTML5."
}
```

```tosa-quiz
{
  "level": "Niveau 1",
  "mode": "single",
  "question": "Dans quelle balise place-t-on le contenu visible de la page ?",
  "options": [
    "<head>",
    "<body>",
    "<meta>",
    "<title>"
  ],
  "answers": [1],
  "explanation": "Le contenu affiché dans la fenêtre du navigateur se trouve dans <body>."
}
```

```tosa-quiz
{
  "level": "Niveau 1",
  "mode": "single",
  "question": "Quel attribut indique l'adresse cible d'un lien <a> ?",
  "options": [
    "src",
    "href",
    "alt",
    "target"
  ],
  "answers": [1],
  "explanation": "href contient l'URL ou l'ancre vers laquelle le lien pointe."
}
```

```tosa-quiz
{
  "level": "Niveau 1",
  "mode": "single",
  "question": "Quelle propriété CSS modifie la couleur du texte ?",
  "options": [
    "background-color",
    "font-style",
    "color",
    "text-size"
  ],
  "answers": [2],
  "explanation": "color définit la couleur du texte. background-color définit la couleur de fond."
}
```

```tosa-quiz
{
  "level": "Niveau 1",
  "mode": "single",
  "question": "Quel sélecteur CSS cible les éléments qui ont class=\"alert\" ?",
  "options": [
    ".alert",
    "#alert",
    "alert",
    "*alert"
  ],
  "answers": [0],
  "explanation": "Le point cible une classe. Le dièse cible un identifiant."
}
```

```tosa-quiz
{
  "level": "Niveau 1",
  "mode": "single",
  "question": "Quelle instruction JavaScript affiche un message dans la console ?",
  "options": [
    "print.console(\"Bonjour\")",
    "console.log(\"Bonjour\")",
    "log.console(\"Bonjour\")",
    "document.log(\"Bonjour\")"
  ],
  "answers": [1],
  "explanation": "console.log() sert à afficher une valeur dans la console du navigateur."
}
```

```tosa-quiz
{
  "level": "Niveau 1",
  "mode": "single",
  "question": "Quelle déclaration JavaScript crée une variable qui peut être réassignée ?",
  "options": [
    "const age = 20;",
    "let age = 20;",
    "fixed age = 20;",
    "value age = 20;"
  ],
  "answers": [1],
  "explanation": "let permet de réassigner la variable. const interdit la réassignation de la variable elle-même."
}
```

```tosa-quiz
{
  "level": "Niveau 1",
  "mode": "single",
  "question": "Quel est l'indice du premier élément d'un tableau JavaScript ?",
  "options": [
    "0",
    "1",
    "-1",
    "first"
  ],
  "answers": [0],
  "explanation": "Les tableaux JavaScript commencent à l'indice 0."
}
```

```tosa-quiz
{
  "level": "Niveau 1",
  "mode": "multiple",
  "question": "Quelles balises HTML servent à créer des titres ?",
  "options": [
    "<h1>",
    "<h2>",
    "<title>",
    "<p>"
  ],
  "answers": [0, 1],
  "explanation": "<h1> à <h6> créent des titres visibles dans la page. <title> définit le titre de l'onglet."
}
```

```tosa-quiz
{
  "level": "Niveau 1",
  "mode": "single",
  "question": "Quelle valeur CSS rend un texte en gras ?",
  "options": [
    "font-weight: bold;",
    "font-style: bold;",
    "text-decoration: bold;",
    "font-bold: true;"
  ],
  "answers": [0],
  "explanation": "font-weight contrôle l'épaisseur du texte."
}
```

## Niveau 2 - Bases solides

```tosa-quiz
{
  "level": "Niveau 2",
  "mode": "single",
  "question": "Comment relier correctement un <label> à un champ <input id=\"email\"> ?",
  "options": [
    "<label name=\"email\">Email</label>",
    "<label for=\"email\">Email</label>",
    "<label target=\"email\">Email</label>",
    "<label input=\"email\">Email</label>"
  ],
  "answers": [1],
  "explanation": "L'attribut for du label doit correspondre à l'id du champ."
}
```

```tosa-quiz
{
  "level": "Niveau 2",
  "mode": "single",
  "question": "Quelle propriété CSS ajoute de l'espace à l'intérieur d'un élément ?",
  "options": [
    "margin",
    "padding",
    "border-spacing",
    "gap"
  ],
  "answers": [1],
  "explanation": "padding ajoute de l'espace entre le contenu et la bordure. margin ajoute de l'espace à l'extérieur."
}
```

```tosa-quiz
{
  "level": "Niveau 2",
  "mode": "single",
  "question": "Quelle pseudo-classe CSS cible un lien au survol de la souris ?",
  "options": [
    ":focus",
    ":active",
    ":hover",
    ":visited"
  ],
  "answers": [2],
  "explanation": ":hover s'applique lorsqu'un pointeur survole l'élément."
}
```

```tosa-quiz
{
  "level": "Niveau 2",
  "mode": "single",
  "question": "Quelle media query applique des styles sous 700px de largeur ?",
  "options": [
    "@media max-width 700px { }",
    "@media (max-width: 700px) { }",
    "@mobile width < 700px { }",
    "@screen max 700px { }"
  ],
  "answers": [1],
  "explanation": "La condition d'une media query s'écrit entre parenthèses."
}
```

```tosa-quiz
{
  "level": "Niveau 2",
  "mode": "single",
  "question": "Quelle méthode JavaScript ajoute un élément à la fin d'un tableau ?",
  "options": [
    "push()",
    "pop()",
    "shift()",
    "slice()"
  ],
  "answers": [0],
  "explanation": "push() ajoute à la fin. pop() retire le dernier élément."
}
```

```tosa-quiz
{
  "level": "Niveau 2",
  "mode": "single",
  "question": "Quelle méthode sélectionne le premier élément correspondant à un sélecteur CSS ?",
  "options": [
    "document.querySelector()",
    "document.selectAll()",
    "document.findFirst()",
    "document.getStyle()"
  ],
  "answers": [0],
  "explanation": "querySelector() retourne le premier élément correspondant au sélecteur fourni."
}
```

```tosa-quiz
{
  "level": "Niveau 2",
  "mode": "single",
  "question": "Quelle syntaxe écoute un clic sur un bouton stocké dans la variable button ?",
  "options": [
    "button.on(\"click\", run)",
    "button.addEventListener(\"click\", run)",
    "button.clickEvent(run)",
    "button.listen(\"click\", run)"
  ],
  "answers": [1],
  "explanation": "addEventListener() associe une fonction à un événement."
}
```

```tosa-quiz
{
  "level": "Niveau 2",
  "mode": "multiple",
  "question": "Quelles balises sont utiles pour structurer sémantiquement une page ?",
  "options": [
    "<header>",
    "<nav>",
    "<main>",
    "<font>"
  ],
  "answers": [0, 1, 2],
  "explanation": "<font> est une ancienne balise de présentation à éviter."
}
```

```tosa-quiz
{
  "level": "Niveau 2",
  "mode": "single",
  "question": "Que vaut \"5\" === 5 en JavaScript ?",
  "options": [
    "true",
    "false",
    "undefined",
    "Une erreur"
  ],
  "answers": [1],
  "explanation": "=== compare la valeur et le type. Une chaîne et un nombre ne sont pas strictement égaux."
}
```

```tosa-quiz
{
  "level": "Niveau 2",
  "mode": "single",
  "question": "Quelle propriété DOM modifie le texte d'un élément sans interpréter de HTML ?",
  "options": [
    "innerHTML",
    "textContent",
    "outerHTML",
    "styleText"
  ],
  "answers": [1],
  "explanation": "textContent remplace le texte brut. innerHTML interprète une chaîne comme du HTML."
}
```

## Niveau 3 - Intermédiaire

```tosa-quiz
{
  "level": "Niveau 3",
  "mode": "single",
  "question": "Quel sélecteur est généralement le plus spécifique ?",
  "options": [
    "p",
    ".intro",
    "#intro",
    "*"
  ],
  "answers": [2],
  "explanation": "Un identifiant a une spécificité supérieure à une classe et à un sélecteur de balise."
}
```

```tosa-quiz
{
  "level": "Niveau 3",
  "mode": "single",
  "question": "Quelle déclaration CSS crée trois colonnes de même largeur dans une grille ?",
  "options": [
    "grid-template-columns: repeat(3, 1fr);",
    "grid-columns: 3 equal;",
    "display-columns: 3;",
    "grid-template-rows: repeat(3, 1fr);"
  ],
  "answers": [0],
  "explanation": "repeat(3, 1fr) crée trois pistes de grille égales."
}
```

```tosa-quiz
{
  "level": "Niveau 3",
  "mode": "single",
  "question": "Un élément en position absolute se positionne par rapport à quoi ?",
  "options": [
    "Toujours par rapport à la fenêtre",
    "Au premier ancêtre positionné, sinon au bloc initial",
    "Toujours par rapport à son parent direct",
    "Toujours par rapport à <body>"
  ],
  "answers": [1],
  "explanation": "Un ancêtre avec position autre que static devient le repère de positionnement."
}
```

```tosa-quiz
{
  "level": "Niveau 3",
  "mode": "single",
  "question": "Quelle syntaxe utilise une variable CSS nommée --accent ?",
  "options": [
    "color: css(--accent);",
    "color: var(--accent);",
    "color: $accent;",
    "color: variable(accent);"
  ],
  "answers": [1],
  "explanation": "Les propriétés personnalisées CSS se lisent avec var()."
}
```

```tosa-quiz
{
  "level": "Niveau 3",
  "mode": "single",
  "question": "Quelle méthode crée un nouveau tableau en transformant chaque élément d'un tableau existant ?",
  "options": [
    "forEach()",
    "map()",
    "filter()",
    "find()"
  ],
  "answers": [1],
  "explanation": "map() retourne un nouveau tableau de même longueur avec les valeurs transformées."
}
```

```tosa-quiz
{
  "level": "Niveau 3",
  "mode": "single",
  "question": "Quelle méthode conserve seulement les éléments qui respectent une condition ?",
  "options": [
    "filter()",
    "map()",
    "join()",
    "reduceRight()"
  ],
  "answers": [0],
  "explanation": "filter() retourne un nouveau tableau contenant uniquement les éléments validés par le prédicat."
}
```

```tosa-quiz
{
  "level": "Niveau 3",
  "mode": "single",
  "question": "À quoi sert event.preventDefault() dans un gestionnaire d'événement ?",
  "options": [
    "À arrêter JavaScript",
    "À empêcher le comportement par défaut du navigateur",
    "À supprimer l'élément cliqué",
    "À créer un nouvel événement"
  ],
  "answers": [1],
  "explanation": "On l'utilise par exemple pour empêcher l'envoi automatique d'un formulaire."
}
```

```tosa-quiz
{
  "level": "Niveau 3",
  "mode": "single",
  "question": "Quel attribut améliore l'accessibilité d'un bouton représenté seulement par une icône ?",
  "options": [
    "aria-label",
    "href",
    "src",
    "data-css"
  ],
  "answers": [0],
  "explanation": "aria-label fournit un nom accessible aux technologies d'assistance."
}
```

```tosa-quiz
{
  "level": "Niveau 3",
  "mode": "single",
  "question": "Que retourne une fonction async en JavaScript ?",
  "options": [
    "Toujours une Promise",
    "Toujours une chaîne",
    "Toujours undefined",
    "Toujours un événement"
  ],
  "answers": [0],
  "explanation": "Une fonction async enveloppe sa valeur de retour dans une Promise."
}
```

```tosa-quiz
{
  "level": "Niveau 3",
  "mode": "multiple",
  "question": "Quelles affirmations sur les images sont correctes ?",
  "options": [
    "Une image informative doit avoir un alt utile.",
    "Une image décorative peut avoir alt=\"\".",
    "L'attribut href définit la source d'une image.",
    "L'attribut src définit la source d'une image."
  ],
  "answers": [0, 1, 3],
  "explanation": "href sert aux liens. Pour une image, la source est indiquée avec src."
}
```

## Niveau 4 - Avancé

```tosa-quiz
{
  "level": "Niveau 4",
  "mode": "single",
  "question": "Que change box-sizing: border-box sur un élément ?",
  "options": [
    "La largeur inclut le contenu, le padding et la bordure.",
    "La marge est incluse dans la largeur.",
    "La bordure disparaît.",
    "Le contenu devient automatiquement responsive."
  ],
  "answers": [0],
  "explanation": "border-box inclut padding et bordure dans width et height. La marge reste extérieure."
}
```

```tosa-quiz
{
  "level": "Niveau 4",
  "mode": "single",
  "question": "Quelle déclaration rend une image recadrée pour remplir son conteneur sans déformation ?",
  "options": [
    "object-fit: cover;",
    "image-fit: stretch;",
    "background-size: inline;",
    "resize: crop;"
  ],
  "answers": [0],
  "explanation": "object-fit: cover conserve les proportions et remplit le cadre, quitte à recadrer."
}
```

```tosa-quiz
{
  "level": "Niveau 4",
  "mode": "single",
  "question": "Dans CSS Grid, à quoi sert minmax(240px, 1fr) ?",
  "options": [
    "À définir une piste avec un minimum et un maximum flexibles.",
    "À limiter uniquement la taille de police.",
    "À créer une animation entre deux tailles.",
    "À remplacer toutes les media queries."
  ],
  "answers": [0],
  "explanation": "minmax() donne une taille minimale et une taille maximale à une piste de grille."
}
```

```tosa-quiz
{
  "level": "Niveau 4",
  "mode": "single",
  "question": "Quel mécanisme JavaScript permet à une fonction interne d'accéder aux variables de sa fonction externe après son exécution ?",
  "options": [
    "Une closure",
    "Une media query",
    "Un prototype CSS",
    "Un attribut data"
  ],
  "answers": [0],
  "explanation": "Une closure conserve l'accès à l'environnement lexical dans lequel la fonction a été créée."
}
```

```tosa-quiz
{
  "level": "Niveau 4",
  "mode": "single",
  "question": "Quelle affirmation est vraie sur les fonctions fléchées JavaScript ?",
  "options": [
    "Elles créent toujours leur propre this.",
    "Elles héritent du this lexical.",
    "Elles ne peuvent jamais retourner de valeur.",
    "Elles remplacent les classes."
  ],
  "answers": [1],
  "explanation": "Une fonction fléchée ne possède pas son propre this ; elle utilise celui de son contexte lexical."
}
```

```tosa-quiz
{
  "level": "Niveau 4",
  "mode": "single",
  "question": "Quelle syntaxe récupère la propriété name de user dans une variable name ?",
  "options": [
    "const { name } = user;",
    "const name <= user;",
    "const user.name = name;",
    "const [name] = user;"
  ],
  "answers": [0],
  "explanation": "C'est une destructuration d'objet."
}
```

```tosa-quiz
{
  "level": "Niveau 4",
  "mode": "single",
  "question": "Quelle syntaxe évite une erreur si user.profile est null ou undefined ?",
  "options": [
    "user.profile.name",
    "user?profile?name",
    "user.profile?.name",
    "user.profile:name"
  ],
  "answers": [2],
  "explanation": "L'opérateur ?. interrompt l'accès si la valeur précédente est null ou undefined."
}
```

```tosa-quiz
{
  "level": "Niveau 4",
  "mode": "single",
  "question": "Quelle étape est généralement nécessaire pour lire le corps JSON d'une réponse fetch ?",
  "options": [
    "response.json()",
    "response.css()",
    "fetch.readJson(response)",
    "JSON.fetch(response)"
  ],
  "answers": [0],
  "explanation": "response.json() retourne une Promise qui résout le JSON parsé."
}
```

```tosa-quiz
{
  "level": "Niveau 4",
  "mode": "multiple",
  "question": "Quelles pratiques améliorent l'accessibilité clavier d'une interface ?",
  "options": [
    "Conserver un état de focus visible.",
    "Utiliser un vrai <button> pour une action cliquable.",
    "Supprimer outline sur tous les éléments sans remplacement.",
    "Prévoir un ordre de tabulation logique."
  ],
  "answers": [0, 1, 3],
  "explanation": "Le focus visible et les contrôles natifs aident les utilisateurs au clavier."
}
```

```tosa-quiz
{
  "level": "Niveau 4",
  "mode": "single",
  "question": "Que stocke localStorage dans le navigateur ?",
  "options": [
    "Uniquement des chaînes de caractères",
    "Uniquement des objets JavaScript natifs",
    "Uniquement des fichiers CSS",
    "Uniquement des nombres"
  ],
  "answers": [0],
  "explanation": "localStorage stocke des chaînes. Pour un objet, on utilise souvent JSON.stringify() et JSON.parse()."
}
```

## Niveau 5 - Expert

```tosa-quiz
{
  "level": "Niveau 5",
  "mode": "single",
  "question": "Dans quel ordre s'affichent ces messages : console.log(\"A\"); setTimeout(() => console.log(\"B\"), 0); Promise.resolve().then(() => console.log(\"C\")); console.log(\"D\");",
  "options": [
    "A, B, C, D",
    "A, D, C, B",
    "A, C, D, B",
    "D, A, C, B"
  ],
  "answers": [1],
  "explanation": "Le code synchrone s'exécute d'abord, puis les microtâches Promise, puis la macrotâche setTimeout."
}
```

```tosa-quiz
{
  "level": "Niveau 5",
  "mode": "single",
  "question": "Que vaut [] == false en JavaScript ?",
  "options": [
    "true",
    "false",
    "undefined",
    "Une erreur"
  ],
  "answers": [0],
  "explanation": "Avec ==, JavaScript effectue des conversions implicites. C'est une raison de préférer ===."
}
```

```tosa-quiz
{
  "level": "Niveau 5",
  "mode": "single",
  "question": "Quelle est la spécificité de :where(.card #title) ?",
  "options": [
    "La même que #title",
    "La même que .card",
    "Zéro",
    "La même qu'un style inline"
  ],
  "answers": [2],
  "explanation": ":where() a toujours une spécificité nulle, même si son contenu contient des sélecteurs spécifiques."
}
```

```tosa-quiz
{
  "level": "Niveau 5",
  "mode": "multiple",
  "question": "Quelles propriétés peuvent créer un nouveau contexte d'empilement en CSS ?",
  "options": [
    "position: relative avec z-index différent de auto",
    "opacity: 0.5",
    "transform: rotate(10deg)",
    "color: red"
  ],
  "answers": [0, 1, 2],
  "explanation": "z-index positionné, opacity inférieure à 1 et transform créent notamment des contextes d'empilement."
}
```

## Série 2 - Questions supplémentaires

## Niveau 1 - Découverte, série 2

```tosa-quiz
{
  "level": "Niveau 1",
  "mode": "single",
  "question": "Quel attribut de <html> indique la langue principale de la page ?",
  "options": [
    "lang",
    "language",
    "charset",
    "locale"
  ],
  "answers": [0],
  "explanation": "Exemple : <html lang=\"fr\"> indique que la page est en français."
}
```

```tosa-quiz
{
  "level": "Niveau 1",
  "mode": "single",
  "question": "Quelle balise définit l'encodage des caractères en UTF-8 ?",
  "options": [
    "<meta charset=\"utf-8\">",
    "<html charset=\"utf-8\">",
    "<encoding utf=\"8\">",
    "<title charset=\"utf-8\">"
  ],
  "answers": [0],
  "explanation": "La balise meta charset se place dans <head>."
}
```

```tosa-quiz
{
  "level": "Niveau 1",
  "mode": "single",
  "question": "Quel attribut décrit le contenu d'une image pour l'accessibilité ?",
  "options": [
    "title",
    "alt",
    "caption",
    "description"
  ],
  "answers": [1],
  "explanation": "alt fournit un texte alternatif lorsque l'image ne peut pas être vue."
}
```

```tosa-quiz
{
  "level": "Niveau 1",
  "mode": "single",
  "question": "Quel commentaire est valide en CSS ?",
  "options": [
    "// commentaire",
    "<!-- commentaire -->",
    "/* commentaire */",
    "# commentaire"
  ],
  "answers": [2],
  "explanation": "Les commentaires CSS s'écrivent entre /* et */."
}
```

```tosa-quiz
{
  "level": "Niveau 1",
  "mode": "single",
  "question": "Quelle propriété CSS centre le texte horizontalement ?",
  "options": [
    "text-align: center;",
    "font-align: center;",
    "align-text: middle;",
    "center: text;"
  ],
  "answers": [0],
  "explanation": "text-align contrôle l'alignement du contenu textuel inline dans son conteneur."
}
```

```tosa-quiz
{
  "level": "Niveau 1",
  "mode": "single",
  "question": "Quelle valeur JavaScript représente vrai ?",
  "options": [
    "yes",
    "true",
    "ok",
    "1true"
  ],
  "answers": [1],
  "explanation": "true est le booléen JavaScript qui représente vrai."
}
```

```tosa-quiz
{
  "level": "Niveau 1",
  "mode": "single",
  "question": "Quelle syntaxe appelle correctement une fonction nommée calculer ?",
  "options": [
    "calculer;",
    "calculer()",
    "call calculer",
    "function calculer"
  ],
  "answers": [1],
  "explanation": "Les parenthèses appellent la fonction."
}
```

```tosa-quiz
{
  "level": "Niveau 1",
  "mode": "single",
  "question": "Quelle propriété donne le nombre d'éléments d'un tableau JavaScript ?",
  "options": [
    "size",
    "count",
    "length",
    "total"
  ],
  "answers": [2],
  "explanation": "array.length donne la longueur du tableau."
}
```

```tosa-quiz
{
  "level": "Niveau 1",
  "mode": "single",
  "question": "Quelle balise HTML crée une liste non ordonnée ?",
  "options": [
    "<ol>",
    "<ul>",
    "<li>",
    "<list>"
  ],
  "answers": [1],
  "explanation": "<ul> crée une liste à puces. Les éléments de liste sont des <li>."
}
```

```tosa-quiz
{
  "level": "Niveau 1",
  "mode": "single",
  "question": "Quelle valeur CSS rend un élément invisible sans le retirer du flux de mise en page ?",
  "options": [
    "display: none;",
    "visibility: hidden;",
    "opacity: none;",
    "hidden: true;"
  ],
  "answers": [1],
  "explanation": "visibility: hidden masque l'élément mais conserve son espace."
}
```

## Niveau 2 - Bases solides, série 2

```tosa-quiz
{
  "level": "Niveau 2",
  "mode": "single",
  "question": "Quelle méthode HTTP est généralement utilisée pour envoyer les données d'un formulaire sans les afficher dans l'URL ?",
  "options": [
    "GET",
    "POST",
    "LINK",
    "SEND"
  ],
  "answers": [1],
  "explanation": "POST envoie les données dans le corps de la requête plutôt que dans l'URL."
}
```

```tosa-quiz
{
  "level": "Niveau 2",
  "mode": "single",
  "question": "Quel type d'input est le plus adapté pour saisir une adresse e-mail ?",
  "options": [
    "type=\"text\"",
    "type=\"email\"",
    "type=\"mailbox\"",
    "type=\"address\""
  ],
  "answers": [1],
  "explanation": "type=\"email\" apporte une validation et un clavier adapté sur mobile."
}
```

```tosa-quiz
{
  "level": "Niveau 2",
  "mode": "single",
  "question": "Quelle balise décrit le titre ou la légende d'un tableau HTML ?",
  "options": [
    "<caption>",
    "<legend>",
    "<summary>",
    "<figcaption>"
  ],
  "answers": [0],
  "explanation": "<caption> est la légende d'un tableau."
}
```

```tosa-quiz
{
  "level": "Niveau 2",
  "mode": "single",
  "question": "Dans Flexbox, quelle propriété répartit les éléments sur l'axe principal ?",
  "options": [
    "align-items",
    "justify-content",
    "place-self",
    "text-align"
  ],
  "answers": [1],
  "explanation": "justify-content agit sur l'axe principal du conteneur flex."
}
```

```tosa-quiz
{
  "level": "Niveau 2",
  "mode": "single",
  "question": "Quelle unité CSS est relative à la taille de police de l'élément racine ?",
  "options": [
    "px",
    "em",
    "rem",
    "%"
  ],
  "answers": [2],
  "explanation": "rem est relative à la taille de police de l'élément racine, souvent <html>."
}
```

```tosa-quiz
{
  "level": "Niveau 2",
  "mode": "single",
  "question": "Que retourne typeof \"Bonjour\" en JavaScript ?",
  "options": [
    "\"text\"",
    "\"string\"",
    "\"char\"",
    "\"object\""
  ],
  "answers": [1],
  "explanation": "Les chaînes de caractères ont le type string."
}
```

```tosa-quiz
{
  "level": "Niveau 2",
  "mode": "single",
  "question": "Quelle méthode convertit une chaîne JSON en objet JavaScript ?",
  "options": [
    "JSON.parse()",
    "JSON.stringify()",
    "JSON.object()",
    "JSON.toHTML()"
  ],
  "answers": [0],
  "explanation": "JSON.parse() lit une chaîne JSON. JSON.stringify() fait l'inverse."
}
```

```tosa-quiz
{
  "level": "Niveau 2",
  "mode": "single",
  "question": "Quelle API DOM ajoute une classe CSS à un élément element ?",
  "options": [
    "element.classList.add(\"active\")",
    "element.className.add(\"active\")",
    "element.style.addClass(\"active\")",
    "element.cssClass(\"active\")"
  ],
  "answers": [0],
  "explanation": "classList.add() ajoute une classe sans écraser les autres classes."
}
```

```tosa-quiz
{
  "level": "Niveau 2",
  "mode": "single",
  "question": "Quelle condition vérifie qu'une variable age est supérieure ou égale à 18 ?",
  "options": [
    "age => 18",
    "age >= 18",
    "age =< 18",
    "age == >= 18"
  ],
  "answers": [1],
  "explanation": "L'opérateur supérieur ou égal s'écrit >=."
}
```

```tosa-quiz
{
  "level": "Niveau 2",
  "mode": "multiple",
  "question": "Quelles valeurs CSS peuvent être utilisées avec display ?",
  "options": [
    "block",
    "flex",
    "grid",
    "bold"
  ],
  "answers": [0, 1, 2],
  "explanation": "bold est une valeur de font-weight, pas de display."
}
```

## Niveau 3 - Intermédiaire, série 2

```tosa-quiz
{
  "level": "Niveau 3",
  "mode": "single",
  "question": "Quelle affirmation est vraie sur les styles inline ?",
  "options": [
    "Ils ont généralement une forte priorité dans la cascade.",
    "Ils sont toujours moins prioritaires qu'une classe.",
    "Ils ne fonctionnent que sur <a>.",
    "Ils sont obligatoires pour le responsive."
  ],
  "answers": [0],
  "explanation": "Un style inline a une priorité élevée, même si son usage doit rester limité."
}
```

```tosa-quiz
{
  "level": "Niveau 3",
  "mode": "single",
  "question": "Quelle propriété CSS est héritée par défaut par les éléments enfants ?",
  "options": [
    "color",
    "margin",
    "border",
    "width"
  ],
  "answers": [0],
  "explanation": "La couleur du texte est héritée. Les marges, bordures et largeurs ne le sont généralement pas."
}
```

```tosa-quiz
{
  "level": "Niveau 3",
  "mode": "single",
  "question": "Pour que z-index fonctionne sur un élément, quelle condition est souvent nécessaire ?",
  "options": [
    "L'élément doit être positionné ou participer à certains contextes de layout.",
    "L'élément doit être un paragraphe.",
    "L'élément doit avoir display: none.",
    "L'élément doit avoir un id."
  ],
  "answers": [0],
  "explanation": "z-index agit notamment sur les éléments positionnés et dans certains contextes comme flex/grid."
}
```

```tosa-quiz
{
  "level": "Niveau 3",
  "mode": "single",
  "question": "Quelle syntaxe fournit une valeur de secours à une variable CSS ?",
  "options": [
    "color: var(--accent, blue);",
    "color: fallback(--accent blue);",
    "color: --accent || blue;",
    "color: variable(--accent, blue);"
  ],
  "answers": [0],
  "explanation": "Le deuxième argument de var() sert de valeur de secours."
}
```

```tosa-quiz
{
  "level": "Niveau 3",
  "mode": "single",
  "question": "Quelle syntaxe copie les éléments d'un tableau numbers dans un nouveau tableau ?",
  "options": [
    "const copy = [...numbers];",
    "const copy = [numbers];",
    "const copy = numbers.copy;",
    "const copy = ...[numbers];"
  ],
  "answers": [0],
  "explanation": "L'opérateur spread ... étale les éléments du tableau."
}
```

```tosa-quiz
{
  "level": "Niveau 3",
  "mode": "single",
  "question": "À quoi servent les paramètres rest dans function sum(...numbers) ?",
  "options": [
    "À regrouper plusieurs arguments dans un tableau.",
    "À ignorer tous les arguments.",
    "À transformer une fonction en CSS.",
    "À rendre la fonction asynchrone."
  ],
  "answers": [0],
  "explanation": "...numbers regroupe les arguments restants dans un tableau."
}
```

```tosa-quiz
{
  "level": "Niveau 3",
  "mode": "single",
  "question": "Quelle méthode JavaScript est adaptée pour calculer une somme à partir d'un tableau ?",
  "options": [
    "reduce()",
    "includes()",
    "split()",
    "querySelector()"
  ],
  "answers": [0],
  "explanation": "reduce() permet d'accumuler une valeur à partir des éléments d'un tableau."
}
```

```tosa-quiz
{
  "level": "Niveau 3",
  "mode": "single",
  "question": "Quelle propriété permet de lire un attribut data-user-id sur un élément ?",
  "options": [
    "element.dataset.userId",
    "element.data.user-id",
    "element.attr.userId",
    "element.user.dataset.id"
  ],
  "answers": [0],
  "explanation": "Les attributs data-* sont exposés via dataset en camelCase."
}
```

```tosa-quiz
{
  "level": "Niveau 3",
  "mode": "single",
  "question": "Quel intérêt principal a la délégation d'événement ?",
  "options": [
    "Écouter un parent pour gérer des événements venant de ses enfants.",
    "Supprimer tous les événements du DOM.",
    "Rendre les événements synchrones.",
    "Désactiver la propagation."
  ],
  "answers": [0],
  "explanation": "La délégation exploite la propagation des événements, utile pour des listes dynamiques."
}
```

```tosa-quiz
{
  "level": "Niveau 3",
  "mode": "multiple",
  "question": "Quelles affirmations sur fetch() sont correctes ?",
  "options": [
    "fetch() retourne une Promise.",
    "response.json() retourne aussi une Promise.",
    "fetch() bloque toujours le navigateur jusqu'à la réponse.",
    "fetch() peut échouer en cas de problème réseau."
  ],
  "answers": [0, 1, 3],
  "explanation": "fetch() est asynchrone et ne bloque pas l'exécution principale comme un appel synchrone."
}
```

## Niveau 4 - Avancé, série 2

```tosa-quiz
{
  "level": "Niveau 4",
  "mode": "single",
  "question": "Quelle media query respecte les utilisateurs qui demandent moins d'animations ?",
  "options": [
    "@media (prefers-reduced-motion: reduce)",
    "@media (animation: none)",
    "@media (motion-safe: false)",
    "@media (user-animation: low)"
  ],
  "answers": [0],
  "explanation": "prefers-reduced-motion permet d'adapter ou de désactiver les animations."
}
```

```tosa-quiz
{
  "level": "Niveau 4",
  "mode": "single",
  "question": "Quelle balise fournit une zone de navigation principale dans une page ?",
  "options": [
    "<navigation>",
    "<nav>",
    "<menu-main>",
    "<links>"
  ],
  "answers": [1],
  "explanation": "<nav> représente une section de navigation."
}
```

```tosa-quiz
{
  "level": "Niveau 4",
  "mode": "single",
  "question": "À quoi sert aria-live ?",
  "options": [
    "À annoncer des mises à jour dynamiques aux technologies d'assistance.",
    "À rendre un élément cliquable.",
    "À charger une vidéo en direct.",
    "À rendre une image responsive."
  ],
  "answers": [0],
  "explanation": "aria-live signale qu'une zone peut être annoncée lorsqu'elle change."
}
```

```tosa-quiz
{
  "level": "Niveau 4",
  "mode": "single",
  "question": "Quelle technique limite l'exécution d'une fonction tant que l'utilisateur continue de taper ?",
  "options": [
    "Debounce",
    "Parse",
    "Bubble",
    "Hoist"
  ],
  "answers": [0],
  "explanation": "Le debounce attend une pause avant d'exécuter la fonction."
}
```

```tosa-quiz
{
  "level": "Niveau 4",
  "mode": "single",
  "question": "Quelle technique exécute une fonction au maximum une fois par intervalle de temps ?",
  "options": [
    "Throttle",
    "Closure",
    "Spread",
    "Capture"
  ],
  "answers": [0],
  "explanation": "Le throttle limite la fréquence d'exécution."
}
```

```tosa-quiz
{
  "level": "Niveau 4",
  "mode": "single",
  "question": "Quelle méthode attend plusieurs promesses et échoue si l'une d'elles rejette ?",
  "options": [
    "Promise.all()",
    "Promise.one()",
    "Promise.each()",
    "Promise.waitEvery()"
  ],
  "answers": [0],
  "explanation": "Promise.all() résout quand toutes les promesses réussissent, ou rejette dès qu'une échoue."
}
```

```tosa-quiz
{
  "level": "Niveau 4",
  "mode": "single",
  "question": "Comment gérer proprement une erreur dans une fonction async ?",
  "options": [
    "Avec try...catch autour du await.",
    "Avec if async error.",
    "Avec CSS error.",
    "Avec await.catch obligatoire sur chaque ligne uniquement."
  ],
  "answers": [0],
  "explanation": "try...catch permet de capturer les rejets de promesses utilisés avec await."
}
```

```tosa-quiz
{
  "level": "Niveau 4",
  "mode": "single",
  "question": "Dans un module JavaScript, quelle affirmation est vraie ?",
  "options": [
    "Le mode strict est activé automatiquement.",
    "Toutes les variables deviennent globales.",
    "import et export sont interdits.",
    "Le fichier doit être placé dans <body> uniquement."
  ],
  "answers": [0],
  "explanation": "Les modules JavaScript s'exécutent en mode strict par défaut."
}
```

```tosa-quiz
{
  "level": "Niveau 4",
  "mode": "multiple",
  "question": "Quelles valeurs sont falsy en JavaScript ?",
  "options": [
    "0",
    "\"\"",
    "null",
    "[]"
  ],
  "answers": [0, 1, 2],
  "explanation": "Un tableau vide [] est truthy, même s'il ne contient aucun élément."
}
```

```tosa-quiz
{
  "level": "Niveau 4",
  "mode": "single",
  "question": "Quelle méthode supprime un écouteur ajouté avec addEventListener ?",
  "options": [
    "removeEventListener()",
    "deleteEvent()",
    "offEventListener()",
    "clearListener()"
  ],
  "answers": [0],
  "explanation": "Il faut passer à removeEventListener la même référence de fonction que celle ajoutée."
}
```

## Niveau 5 - Expert, série 2

```tosa-quiz
{
  "level": "Niveau 5",
  "mode": "single",
  "question": "Que se passe-t-il si on accède à une variable let avant sa déclaration dans le même bloc ?",
  "options": [
    "Elle vaut undefined.",
    "Elle déclenche une ReferenceError à cause de la temporal dead zone.",
    "Elle est automatiquement créée en global.",
    "Elle vaut null."
  ],
  "answers": [1],
  "explanation": "let et const sont hoistées, mais restent inaccessibles avant leur initialisation."
}
```

```tosa-quiz
{
  "level": "Niveau 5",
  "mode": "single",
  "question": "Quelle affirmation sur Object.is(NaN, NaN) est vraie ?",
  "options": [
    "Cela retourne true.",
    "Cela retourne false.",
    "Cela déclenche une erreur.",
    "Cela retourne undefined."
  ],
  "answers": [0],
  "explanation": "Object.is() considère NaN égal à lui-même, contrairement à NaN === NaN."
}
```

```tosa-quiz
{
  "level": "Niveau 5",
  "mode": "single",
  "question": "À quoi sert AbortController avec fetch ?",
  "options": [
    "À annuler une requête en cours.",
    "À transformer la réponse en CSS.",
    "À remplacer JSON.parse().",
    "À rendre fetch synchrone."
  ],
  "answers": [0],
  "explanation": "AbortController fournit un signal permettant d'interrompre une requête."
}
```

```tosa-quiz
{
  "level": "Niveau 5",
  "mode": "single",
  "question": "Quelle affirmation est vraie sur les @layer CSS ?",
  "options": [
    "Elles permettent d'organiser la cascade en couches.",
    "Elles remplacent HTML.",
    "Elles rendent toutes les règles !important.",
    "Elles fonctionnent uniquement avec JavaScript."
  ],
  "answers": [0],
  "explanation": "@layer donne un contrôle supplémentaire sur l'ordre de priorité des groupes de styles."
}
```

```tosa-quiz
{
  "level": "Niveau 5",
  "mode": "single",
  "question": "Quelle règle active les container queries sur un conteneur ?",
  "options": [
    "container-type: inline-size;",
    "query-container: true;",
    "media-container: block;",
    "responsive-parent: yes;"
  ],
  "answers": [0],
  "explanation": "container-type permet à un élément de devenir un conteneur interrogeable."
}
```

```tosa-quiz
{
  "level": "Niveau 5",
  "mode": "single",
  "question": "Pourquoi event.stopPropagation() doit-il être utilisé avec prudence ?",
  "options": [
    "Il empêche l'événement de remonter vers les ancêtres, ce qui peut casser d'autres gestionnaires.",
    "Il supprime l'élément du DOM.",
    "Il bloque tous les événements du site définitivement.",
    "Il force le rechargement de la page."
  ],
  "answers": [0],
  "explanation": "stopPropagation() interrompt la phase de propagation, ce qui peut gêner la délégation d'événements."
}
```

```tosa-quiz
{
  "level": "Niveau 5",
  "mode": "single",
  "question": "Quelle affirmation décrit le mieux le Shadow DOM ?",
  "options": [
    "Un DOM encapsulé attaché à un composant.",
    "Une copie automatique de toute la page.",
    "Une façon de cacher JavaScript au navigateur.",
    "Une alternative à HTTP."
  ],
  "answers": [0],
  "explanation": "Le Shadow DOM encapsule une structure et des styles dans certains composants web."
}
```

```tosa-quiz
{
  "level": "Niveau 5",
  "mode": "single",
  "question": "Quelle pratique réduit le risque XSS lors de l'insertion de texte utilisateur ?",
  "options": [
    "Utiliser textContent quand on insère du texte brut.",
    "Toujours utiliser innerHTML.",
    "Mettre le texte dans un commentaire CSS.",
    "Changer la couleur du texte."
  ],
  "answers": [0],
  "explanation": "textContent n'interprète pas la chaîne comme du HTML."
}
```

```tosa-quiz
{
  "level": "Niveau 5",
  "mode": "multiple",
  "question": "Quelles affirmations sur les prototypes JavaScript sont correctes ?",
  "options": [
    "Les objets peuvent déléguer la recherche de propriétés à leur prototype.",
    "Les méthodes partagées peuvent être placées sur un prototype.",
    "Un prototype est une feuille CSS.",
    "La chaîne de prototypes peut être parcourue lors d'un accès à une propriété."
  ],
  "answers": [0, 1, 3],
  "explanation": "Le prototype est au cœur du modèle d'héritage de JavaScript."
}
```

```tosa-quiz
{
  "level": "Niveau 5",
  "mode": "single",
  "question": "Dans une Content Security Policy, quel est l'objectif principal de script-src ?",
  "options": [
    "Limiter les sources autorisées pour les scripts.",
    "Définir la taille des fichiers JS.",
    "Choisir la version de JavaScript.",
    "Créer automatiquement des modules."
  ],
  "answers": [0],
  "explanation": "script-src indique quelles sources de scripts le navigateur peut charger ou exécuter."
}
```

```tosa-quiz
{
  "level": "Niveau 5",
  "mode": "single",
  "question": "À quoi sert clamp(1rem, 2vw, 2rem) en CSS ?",
  "options": [
    "À choisir une valeur fluide bornée entre un minimum et un maximum.",
    "À bloquer tous les styles responsives.",
    "À convertir automatiquement des pixels en rem.",
    "À limiter uniquement les couleurs."
  ],
  "answers": [0],
  "explanation": "clamp(min, idéal, max) limite une valeur fluide entre deux bornes."
}
```

```tosa-quiz
{
  "level": "Niveau 5",
  "mode": "single",
  "question": "Pourquoi innerHTML avec du contenu utilisateur peut-il être dangereux ?",
  "options": [
    "Il peut exécuter ou injecter du HTML malveillant si le contenu n'est pas nettoyé.",
    "Il supprime toujours le CSS externe.",
    "Il bloque toutes les promesses.",
    "Il transforme tous les nombres en chaînes."
  ],
  "answers": [0],
  "explanation": "Insérer du contenu utilisateur non nettoyé avec innerHTML peut créer une faille XSS."
}
```

```tosa-quiz
{
  "level": "Niveau 5",
  "mode": "single",
  "question": "Quelle affirmation est vraie sur <script type=\"module\"> ?",
  "options": [
    "Il est différé par défaut.",
    "Il s'exécute toujours avant le parsing HTML.",
    "Il rend JavaScript synchrone uniquement.",
    "Il désactive import et export."
  ],
  "answers": [0],
  "explanation": "Les scripts modules sont différés par défaut et s'exécutent en mode strict."
}
```

```tosa-quiz
{
  "level": "Niveau 5",
  "mode": "single",
  "question": "Quelle boucle est la plus adaptée pour parcourir directement les valeurs d'un tableau ?",
  "options": [
    "for...in",
    "for...of",
    "for...key",
    "for...style"
  ],
  "answers": [1],
  "explanation": "for...of parcourt les valeurs itérables. for...in parcourt les clés énumérables."
}
```

```tosa-quiz
{
  "level": "Niveau 5",
  "mode": "single",
  "question": "Que vaut { a: 1 } === { a: 1 } en JavaScript ?",
  "options": [
    "true",
    "false",
    "undefined",
    "Une erreur"
  ],
  "answers": [1],
  "explanation": "Deux objets littéraux distincts ont deux références différentes, même si leur contenu se ressemble."
}
```

```tosa-quiz
{
  "level": "Niveau 5",
  "mode": "multiple",
  "question": "Quelles affirmations sur ARIA sont correctes ?",
  "options": [
    "ARIA peut compléter la sémantique quand le HTML natif ne suffit pas.",
    "ARIA remplace toujours l'utilisation de vraies balises HTML sémantiques.",
    "Un élément role=\"button\" doit aussi être utilisable au clavier.",
    "Un aria-label peut donner un nom accessible à un bouton icône."
  ],
  "answers": [0, 2, 3],
  "explanation": "On privilégie le HTML natif. ARIA complète, mais ne corrige pas automatiquement les comportements clavier."
}
```
