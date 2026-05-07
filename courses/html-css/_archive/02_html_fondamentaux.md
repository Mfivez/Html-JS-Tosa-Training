# HTML – Fondamentaux

Exercices mélangés : QCM, code à corriger et associations. Enchaîne les trois types pour couvrir le spectre du TOSA.

```tosa-quiz
{
  "level": "HTML",
  "mode": "single",
  "question": "Dans quelle balise place-t-on le contenu visible de la page ?",
  "options": ["<head>", "<body>", "<meta>", "<title>"],
  "answers": [1],
  "explanation": "Le contenu affiché dans la fenêtre du navigateur se trouve dans <body>."
}
```

```tosa-code
{
  "level": "HTML",
  "title": "Corrige la structure de cette page.",
  "instructions": "Le document doit être valide en HTML5, en français, avec un titre dans l'onglet et le contenu dans <body>.",
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

```tosa-match
{
  "level": "HTML",
  "prompt": "Associe chaque balise à son rôle.",
  "choices": [
    "Lien hypertexte",
    "Image intégrée",
    "Contenu principal unique",
    "Cellule d'en-tête de tableau",
    "Ligne de tableau"
  ],
  "items": [
    { "label": "<a>", "answer": "Lien hypertexte" },
    { "label": "<img>", "answer": "Image intégrée" },
    { "label": "<main>", "answer": "Contenu principal unique" },
    { "label": "<th>", "answer": "Cellule d'en-tête de tableau" },
    { "label": "<tr>", "answer": "Ligne de tableau" }
  ]
}
```

```tosa-quiz
{
  "level": "Formulaires",
  "mode": "single",
  "question": "Quel attribut relie un <label> à un champ de formulaire ?",
  "options": ["name", "for", "target", "placeholder"],
  "answers": [1],
  "explanation": "La valeur de for doit correspondre à l'id du champ."
}
```

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

```tosa-match
{
  "level": "HTML",
  "prompt": "Associe chaque attribut à son usage.",
  "choices": [
    "Adresse cible d'un lien",
    "Texte alternatif d'une image",
    "Identifiant unique dans la page",
    "Nom envoyé avec un champ de formulaire",
    "Ouvre la ressource dans un nouvel onglet"
  ],
  "items": [
    { "label": "href", "answer": "Adresse cible d'un lien" },
    { "label": "alt", "answer": "Texte alternatif d'une image" },
    { "label": "id", "answer": "Identifiant unique dans la page" },
    { "label": "name", "answer": "Nom envoyé avec un champ de formulaire" },
    { "label": "target=\"_blank\"", "answer": "Ouvre la ressource dans un nouvel onglet" }
  ]
}
```

```tosa-quiz
{
  "level": "HTML",
  "mode": "multiple",
  "question": "Quelles balises HTML sont sémantiques pour structurer les grandes zones d'une page ?",
  "options": ["<header>", "<main>", "<div>", "<footer>"],
  "answers": [0, 1, 3],
  "explanation": "<div> est neutre. Les autres indiquent un rôle de structure."
}
```
