# Trouver et corriger des erreurs HTML

## Structure minimale

```tosa-code
{
  "level": "HTML",
  "title": "Corrige la structure de cette page.",
  "instructions": "Le document doit être valide, en français, avec un titre dans l'onglet et un titre visible dans la page.",
  "codeLines": [
    "<html>",
    "<head>",
    "  <title>Prépa TOSA",
    "</head>",
    "<h1>HTML CSS</h1>",
    "<p>Je m'entraîne au test.</p>",
    "</html>"
  ],
  "checks": [
    { "label": "Le doctype est présent.", "contains": "<!doctype html>" },
    { "label": "La balise html indique la langue française.", "contains": "<html lang=\"fr\">" },
    { "label": "Le contenu visible est dans <body>.", "contains": ["<body>", "</body>"] },
    { "label": "La balise title est fermée.", "contains": "</title>" }
  ],
  "solutionLines": [
    "<!doctype html>",
    "<html lang=\"fr\">",
    "<head>",
    "  <meta charset=\"utf-8\">",
    "  <title>Prépa TOSA</title>",
    "</head>",
    "<body>",
    "  <h1>HTML CSS</h1>",
    "  <p>Je m'entraîne au test.</p>",
    "</body>",
    "</html>"
  ],
  "explanation": "Le TOSA demande souvent d'identifier les éléments manquants d'une structure HTML minimale."
}
```

## Image accessible

```tosa-code
{
  "level": "HTML",
  "title": "Corrige l'image et sa légende.",
  "instructions": "L'image montre le logo de l'école. Elle doit être accessible et la légende doit être reliée à l'image.",
  "codeLines": [
    "<figure>",
    "  <img href=\"images/logo.png\">",
    "  <caption>Logo de l'école</caption>",
    "</figure>"
  ],
  "checks": [
    { "label": "L'image utilise l'attribut src.", "contains": "src=\"images/logo.png\"", "absent": "href=\"images/logo.png\"" },
    { "label": "L'image possède un texte alternatif.", "contains": "alt=" },
    { "label": "La légende utilise <figcaption>.", "contains": ["<figcaption>", "</figcaption>"], "absent": "<caption>" }
  ],
  "solutionLines": [
    "<figure>",
    "  <img src=\"images/logo.png\" alt=\"Logo de l'école\">",
    "  <figcaption>Logo de l'école</figcaption>",
    "</figure>"
  ]
}
```

## Formulaire

```tosa-code
{
  "level": "Formulaires",
  "title": "Rends ce champ correctement étiqueté.",
  "instructions": "Le champ e-mail doit être obligatoire, compréhensible et relié à son label.",
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

## Liste de navigation

```tosa-code
{
  "level": "HTML",
  "title": "Corrige la syntaxe de cette navigation.",
  "instructions": "Chaque élément de liste doit être correctement fermé dans le menu.",
  "codeLines": [
    "<ul class=\"navbar\">",
    "  <li><a href=\"index.html\">Accueil</a>",
    "  <li><a href=\"history.html\">Histoire</a>",
    "  <li><a href=\"fav.html\">Favoris</a>",
    "</ul>"
  ],
  "checks": [
    { "label": "Le lien Accueil est dans un <li> fermé.", "contains": "<li><a href=\"index.html\">Accueil</a></li>" },
    { "label": "Le lien Histoire est dans un <li> fermé.", "contains": "<li><a href=\"history.html\">Histoire</a></li>" },
    { "label": "Le lien Favoris est dans un <li> fermé.", "contains": "<li><a href=\"fav.html\">Favoris</a></li>" }
  ],
  "solutionLines": [
    "<ul class=\"navbar\">",
    "  <li><a href=\"index.html\">Accueil</a></li>",
    "  <li><a href=\"history.html\">Histoire</a></li>",
    "  <li><a href=\"fav.html\">Favoris</a></li>",
    "</ul>"
  ],
  "explanation": "Les navigateurs réparent souvent le HTML, mais le TOSA teste la capacité à repérer une structure incorrecte."
}
```
