# Mini-examen mixte

Chaque visite pioche **1 quiz, 1 code et 1 association** parmi 25 questions au total (9 séries de quiz, 8 de code, 8 de match). La rotation tourne automatiquement.

```tosa-quiz
{
  "level": "Examen",
  "mode": "multiple",
  "question": "Quelles affirmations sont vraies sur les classes et les identifiants en HTML/CSS ?",
  "options": [
    "Une classe peut être réutilisée sur plusieurs éléments.",
    "Un id doit rester unique dans une page.",
    "Le sélecteur .menu cible id=\"menu\".",
    "Le sélecteur #menu cible id=\"menu\"."
  ],
  "answers": [0, 1, 3],
  "explanation": ".menu cible class=\"menu\". #menu cible id=\"menu\"."
}
```

```tosa-quiz
{
  "level": "Examen",
  "mode": "single",
  "question": "Dans quel cas utilise-t-on plutôt <button> qu'un lien <a> ?",
  "options": [
    "Pour aller vers une autre page",
    "Pour déclencher une action dans l'interface",
    "Pour afficher une image",
    "Pour créer un titre"
  ],
  "answers": [1],
  "explanation": "Un lien navigue vers une ressource. Un bouton déclenche une action."
}
```

```tosa-quiz
{
  "level": "Examen",
  "mode": "single",
  "question": "Quelle pseudo-classe CSS cible un lien au survol de la souris ?",
  "options": [":focus", ":active", ":hover", ":visited"],
  "answers": [2],
  "explanation": ":hover s'applique lorsqu'un pointeur survole l'élément."
}
```

```tosa-quiz
{
  "level": "Examen",
  "mode": "single",
  "question": "Que vaut '5' === 5 en JavaScript ?",
  "options": ["true", "false", "undefined", "Une erreur"],
  "answers": [1],
  "explanation": "=== compare la valeur et le type. Une chaîne et un nombre ne sont pas strictement égaux."
}
```

```tosa-quiz
{
  "level": "Examen",
  "mode": "single",
  "question": "Quelle propriété CSS inclut padding et bordure dans la largeur déclarée ?",
  "options": [
    "box-sizing: border-box;",
    "box-sizing: content-box;",
    "width: auto;",
    "overflow: hidden;"
  ],
  "answers": [0],
  "explanation": "border-box inclut padding et bordure dans width et height. La marge reste extérieure."
}
```

```tosa-quiz
{
  "level": "Examen",
  "mode": "single",
  "question": "Quelle déclaration CSS crée trois colonnes de même largeur dans une grille ?",
  "options": [
    "grid-template-columns: repeat(3, 1fr);",
    "grid-columns: 3 equal;",
    "display-columns: 3;",
    "grid-template-rows: repeat(3, 1fr);"
  ],
  "answers": [0],
  "explanation": "repeat(3, 1fr) crée trois pistes de grille de largeur égale."
}
```

```tosa-quiz
{
  "level": "Examen",
  "mode": "single",
  "question": "Quelle méthode JavaScript ajoute un élément à la fin d'un tableau ?",
  "options": ["push()", "pop()", "shift()", "slice()"],
  "answers": [0],
  "explanation": "push() ajoute à la fin. pop() retire le dernier élément."
}
```

```tosa-quiz
{
  "level": "Examen",
  "mode": "multiple",
  "question": "Quelles balises HTML sont sémantiques pour structurer les grandes zones d'une page ?",
  "options": ["<header>", "<main>", "<div>", "<footer>"],
  "answers": [0, 1, 3],
  "explanation": "<div> est neutre. Les autres indiquent un rôle de structure."
}
```

```tosa-quiz
{
  "level": "Examen",
  "mode": "single",
  "question": "Quel attribut permet d'améliorer l'accessibilité d'un bouton représenté seulement par une icône ?",
  "options": ["aria-label", "href", "src", "data-icon"],
  "answers": [0],
  "explanation": "aria-label fournit un nom accessible aux technologies d'assistance."
}
```

```tosa-code
{
  "level": "Examen",
  "title": "Corrige ce composant carte.",
  "instructions": "La carte doit avoir une image accessible, un lien valide et un CSS ciblant la classe .card.",
  "codeLines": [
    "<article class=\"card\">",
    "  <img href=\"produit.jpg\">",
    "  <h2>Produit</h2>",
    "  <a src=\"produit.html\">Voir</a>",
    "</article>",
    "",
    "#card {",
    "  padding: 16;",
    "  background-color: #fff;",
    "}"
  ],
  "checks": [
    { "label": "L'image utilise src.", "contains": "src=\"produit.jpg\"", "absent": "img href" },
    { "label": "L'image possède alt.", "contains": "alt=" },
    { "label": "Le lien utilise href.", "contains": "href=\"produit.html\"", "absent": "a src" },
    { "label": "Le CSS cible la classe .card.", "contains": ".card", "absent": "#card" },
    { "label": "Le padding possède une unité.", "contains": "padding: 16px;" }
  ],
  "solutionLines": [
    "<article class=\"card\">",
    "  <img src=\"produit.jpg\" alt=\"Photo du produit\">",
    "  <h2>Produit</h2>",
    "  <a href=\"produit.html\">Voir</a>",
    "</article>",
    "",
    ".card {",
    "  padding: 16px;",
    "  background-color: #fff;",
    "}"
  ]
}
```

```tosa-code
{
  "level": "Examen",
  "title": "Corrige la structure HTML.",
  "instructions": "Le document doit être valide HTML5, en français, avec le contenu dans <body>.",
  "codeLines": [
    "<html>",
    "<head>",
    "  <title>Ma page",
    "</head>",
    "<h1>Bienvenue</h1>",
    "<p>Contenu principal.</p>",
    "</html>"
  ],
  "checks": [
    { "label": "Le doctype est présent.", "contains": "<!doctype html>" },
    { "label": "L'attribut lang est présent.", "contains": "<html lang=" },
    { "label": "Le contenu est dans <body>.", "contains": ["<body>", "</body>"] },
    { "label": "La balise title est fermée.", "contains": "</title>" }
  ],
  "solutionLines": [
    "<!doctype html>",
    "<html lang=\"fr\">",
    "<head>",
    "  <meta charset=\"utf-8\">",
    "  <title>Ma page</title>",
    "</head>",
    "<body>",
    "  <h1>Bienvenue</h1>",
    "  <p>Contenu principal.</p>",
    "</body>",
    "</html>"
  ]
}
```

```tosa-code
{
  "level": "Examen",
  "title": "Corrige les sélecteurs CSS.",
  "instructions": "Le titre a id=\"titre\" et les panneaux ont class=\"panel\".",
  "codeLines": [
    "titre {",
    "  font-size: 2rem;",
    "  color: navy;",
    "}",
    "",
    "#panel {",
    "  background: #f5f5f5;",
    "  padding: 1rem;",
    "}"
  ],
  "checks": [
    { "label": "#titre cible correctement l'identifiant.", "contains": "#titre" },
    { "label": ".panel cible correctement la classe.", "contains": ".panel" },
    { "label": "Le faux sélecteur #panel n'est plus là.", "absent": "#panel {" }
  ],
  "solutionLines": [
    "#titre {",
    "  font-size: 2rem;",
    "  color: navy;",
    "}",
    "",
    ".panel {",
    "  background: #f5f5f5;",
    "  padding: 1rem;",
    "}"
  ]
}
```

```tosa-code
{
  "level": "Examen",
  "title": "Corrige cet écouteur d'événement.",
  "instructions": "Au clic sur #submit, afficher \"Envoyé !\" dans #status.",
  "codeLines": [
    "const btn = document.querySelector(\"#submit\");",
    "const status = document.querySelector(\"#status\");",
    "",
    "btn.on(\"click\", () => {",
    "  status.value = \"Envoyé !\";",
    "});"
  ],
  "checks": [
    { "label": "addEventListener est utilisé.", "contains": "addEventListener" },
    { "label": "btn.on n'est plus utilisé.", "absent": "btn.on(" },
    { "label": "textContent ou innerHTML met à jour le statut.", "regex": "status\\.(textContent|innerHTML)" }
  ],
  "solutionLines": [
    "const btn = document.querySelector(\"#submit\");",
    "const status = document.querySelector(\"#status\");",
    "",
    "btn.addEventListener(\"click\", () => {",
    "  status.textContent = \"Envoyé !\";",
    "});"
  ],
  "explanation": "Les éléments <p> ou <span> n'ont pas de propriété value. On utilise textContent."
}
```

```tosa-code
{
  "level": "Examen",
  "title": "Corrige cette media query responsive.",
  "instructions": "Sous 768px, la grille doit passer sur une seule colonne.",
  "codeLines": [
    ".grid {",
    "  display: grid;",
    "  grid-template-columns: repeat(3, 1fr);",
    "}",
    "",
    "@media max-width: 768px {",
    "  .grid {",
    "    grid-template-column: 1fr;",
    "  }",
    "}"
  ],
  "checks": [
    { "label": "La media query utilise des parenthèses.", "contains": "@media (max-width: 768px)" },
    { "label": "grid-template-columns est au pluriel.", "contains": "grid-template-columns: 1fr;" },
    { "label": "La syntaxe incorrecte n'est plus présente.", "absent": "grid-template-column:" }
  ],
  "solutionLines": [
    ".grid {",
    "  display: grid;",
    "  grid-template-columns: repeat(3, 1fr);",
    "}",
    "",
    "@media (max-width: 768px) {",
    "  .grid {",
    "    grid-template-columns: 1fr;",
    "  }",
    "}"
  ]
}
```

```tosa-code
{
  "level": "Examen",
  "title": "Corrige ce champ de formulaire.",
  "instructions": "Le champ e-mail doit être obligatoire, relié à son label et avoir le bon type.",
  "codeLines": [
    "<form>",
    "  <label>Email</label>",
    "  <input name=\"email\" placeholder=\"Votre e-mail\">",
    "  <button>Envoyer</button>",
    "</form>"
  ],
  "checks": [
    { "label": "Le label cible l'id email.", "regex": "<label\\s+for=\"email\">" },
    { "label": "Le champ possède id=\"email\".", "contains": "id=\"email\"" },
    { "label": "Le type du champ est email.", "contains": "type=\"email\"" },
    { "label": "Le champ est obligatoire.", "contains": "required" }
  ],
  "solutionLines": [
    "<form>",
    "  <label for=\"email\">Email</label>",
    "  <input id=\"email\" name=\"email\" type=\"email\" placeholder=\"Votre e-mail\" required>",
    "  <button type=\"submit\">Envoyer</button>",
    "</form>"
  ]
}
```

```tosa-code
{
  "level": "Examen",
  "title": "Corrige ce compteur de clics.",
  "instructions": "À chaque clic, count doit s'incrémenter de 1 et le display doit afficher la nouvelle valeur.",
  "codeLines": [
    "let count = 0;",
    "const btn = document.querySelector(\"#btn\");",
    "const display = document.querySelector(\"#count\");",
    "",
    "btn.addEventListener(\"click\", () => {",
    "  count = count + 0;",
    "  display.textContent = Count;",
    "});"
  ],
  "checks": [
    { "label": "count est incrémenté de 1.", "regex": "count\\+\\+|count\\s*=\\s*count\\s*\\+\\s*1" },
    { "label": "Count avec majuscule n'est plus utilisé.", "absent": "= Count;" },
    { "label": "display.textContent reçoit count.", "contains": "display.textContent = count" }
  ],
  "solutionLines": [
    "let count = 0;",
    "const btn = document.querySelector(\"#btn\");",
    "const display = document.querySelector(\"#count\");",
    "",
    "btn.addEventListener(\"click\", () => {",
    "  count++;",
    "  display.textContent = count;",
    "});"
  ],
  "explanation": "JavaScript est sensible à la casse : Count et count sont deux variables différentes."
}
```

```tosa-code
{
  "level": "Examen",
  "title": "Corrige la navigation.",
  "instructions": "Chaque élément de liste doit être correctement fermé dans la balise <nav>.",
  "codeLines": [
    "<nav>",
    "  <ul>",
    "    <li><a href=\"index.html\">Accueil</a>",
    "    <li><a href=\"about.html\">À propos</a>",
    "    <li><a href=\"contact.html\">Contact</a>",
    "  </ul>",
    "</nav>"
  ],
  "checks": [
    { "label": "Accueil est dans un <li> fermé.", "contains": "<li><a href=\"index.html\">Accueil</a></li>" },
    { "label": "À propos est dans un <li> fermé.", "contains": "<li><a href=\"about.html\">À propos</a></li>" },
    { "label": "Contact est dans un <li> fermé.", "contains": "<li><a href=\"contact.html\">Contact</a></li>" }
  ],
  "solutionLines": [
    "<nav>",
    "  <ul>",
    "    <li><a href=\"index.html\">Accueil</a></li>",
    "    <li><a href=\"about.html\">À propos</a></li>",
    "    <li><a href=\"contact.html\">Contact</a></li>",
    "  </ul>",
    "</nav>"
  ],
  "explanation": "Les navigateurs tolèrent les <li> non fermés, mais le TOSA teste la rigueur de la syntaxe."
}
```

```tosa-match
{
  "level": "Examen",
  "prompt": "Associe le problème CSS/HTML à la correction la plus probable.",
  "choices": [
    "Ajouter alt à l'image",
    "Ajouter l'unité px ou rem",
    "Remplacer # par .",
    "Ajouter rel=\"stylesheet\""
  ],
  "items": [
    { "label": "<link href=\"style.css\">", "answer": "Ajouter rel=\"stylesheet\"" },
    { "label": ".card { width: 300; }", "answer": "Ajouter l'unité px ou rem" },
    { "label": "HTML : class=\"alert\" / CSS : #alert", "answer": "Remplacer # par ." },
    { "label": "<img src=\"photo.jpg\">", "answer": "Ajouter alt à l'image" }
  ]
}
```

```tosa-match
{
  "level": "Examen",
  "prompt": "Associe chaque méthode JavaScript à son effet.",
  "choices": [
    "Ajoute un élément à la fin du tableau",
    "Transforme chaque élément et retourne un nouveau tableau",
    "Filtre les éléments selon une condition",
    "Sélectionne le premier élément DOM correspondant",
    "Écoute un événement sur un élément"
  ],
  "items": [
    { "label": "push()", "answer": "Ajoute un élément à la fin du tableau" },
    { "label": "map()", "answer": "Transforme chaque élément et retourne un nouveau tableau" },
    { "label": "filter()", "answer": "Filtre les éléments selon une condition" },
    { "label": "querySelector()", "answer": "Sélectionne le premier élément DOM correspondant" },
    { "label": "addEventListener()", "answer": "Écoute un événement sur un élément" }
  ]
}
```

```tosa-match
{
  "level": "Examen",
  "prompt": "Associe chaque balise HTML à sa zone habituelle dans une page.",
  "choices": [
    "Zone d'en-tête ou navigation",
    "Contenu principal",
    "Section thématique",
    "Contenu complémentaire",
    "Pied de page"
  ],
  "items": [
    { "label": "header / nav", "answer": "Zone d'en-tête ou navigation" },
    { "label": "main", "answer": "Contenu principal" },
    { "label": "section", "answer": "Section thématique" },
    { "label": "aside", "answer": "Contenu complémentaire" },
    { "label": "footer", "answer": "Pied de page" }
  ]
}
```

```tosa-match
{
  "level": "Examen",
  "prompt": "Associe chaque propriété CSS à son effet.",
  "choices": [
    "Couleur du texte",
    "Espace intérieur",
    "Espace extérieur",
    "Taille du texte",
    "Épaisseur du texte"
  ],
  "items": [
    { "label": "color", "answer": "Couleur du texte" },
    { "label": "padding", "answer": "Espace intérieur" },
    { "label": "margin", "answer": "Espace extérieur" },
    { "label": "font-size", "answer": "Taille du texte" },
    { "label": "font-weight", "answer": "Épaisseur du texte" }
  ]
}
```

```tosa-match
{
  "level": "Examen",
  "prompt": "Associe chaque syntaxe JavaScript à ce qu'elle fait.",
  "choices": [
    "Déclare une variable réassignable",
    "Déclare une constante",
    "Chaînage optionnel (null-safe)",
    "Attend la résolution d'une Promise",
    "Ajoute un écouteur d'événement"
  ],
  "items": [
    { "label": "let x = 5;", "answer": "Déclare une variable réassignable" },
    { "label": "const x = 5;", "answer": "Déclare une constante" },
    { "label": "obj?.prop", "answer": "Chaînage optionnel (null-safe)" },
    { "label": "await fetch(...)", "answer": "Attend la résolution d'une Promise" },
    { "label": "btn.addEventListener(\"click\", fn)", "answer": "Ajoute un écouteur d'événement" }
  ]
}
```

```tosa-match
{
  "level": "Examen",
  "prompt": "Associe chaque attribut HTML à son usage.",
  "choices": [
    "Adresse cible d'un lien",
    "Texte alternatif d'une image",
    "Identifiant unique dans la page",
    "Nom envoyé avec le formulaire",
    "Ouvre dans un nouvel onglet"
  ],
  "items": [
    { "label": "href", "answer": "Adresse cible d'un lien" },
    { "label": "alt", "answer": "Texte alternatif d'une image" },
    { "label": "id", "answer": "Identifiant unique dans la page" },
    { "label": "name", "answer": "Nom envoyé avec le formulaire" },
    { "label": "target=\"_blank\"", "answer": "Ouvre dans un nouvel onglet" }
  ]
}
```

```tosa-match
{
  "level": "Examen",
  "prompt": "Associe chaque concept avancé à sa définition.",
  "choices": [
    "Conserve l'accès à son contexte lexical",
    "Hérite du this lexical",
    "Inclut padding et bordure dans la largeur",
    "Spécificité toujours nulle",
    "Crée un nouveau contexte d'empilement"
  ],
  "items": [
    { "label": "Closure", "answer": "Conserve l'accès à son contexte lexical" },
    { "label": "Fonction fléchée", "answer": "Hérite du this lexical" },
    { "label": "box-sizing: border-box", "answer": "Inclut padding et bordure dans la largeur" },
    { "label": ":where()", "answer": "Spécificité toujours nulle" },
    { "label": "opacity: 0.5", "answer": "Crée un nouveau contexte d'empilement" }
  ]
}
```

```tosa-match
{
  "level": "Examen",
  "prompt": "Associe chaque attribut de formulaire à sa définition.",
  "choices": [
    "Définit la méthode HTTP d'envoi",
    "Spécifie l'encodage des données",
    "Désactive la validation d'un input",
    "Désactive la validation du formulaire entier"
  ],
  "items": [
    { "label": "formmethod", "answer": "Définit la méthode HTTP d'envoi" },
    { "label": "formenctype", "answer": "Spécifie l'encodage des données" },
    { "label": "formnovalidate", "answer": "Désactive la validation d'un input" },
    { "label": "novalidate", "answer": "Désactive la validation du formulaire entier" }
  ],
  "explanation": "Les attributs form* sur un bouton de soumission peuvent surcharger le comportement du formulaire parent."
}
```
