# Mini-examen mixte

Réponds sans ouvrir la correction au début. L'objectif est de travailler le rythme : QCM, multi-réponses, association, puis correction de code.

```tosa-quiz
{
  "level": "Examen",
  "mode": "multiple",
  "question": "Quelles affirmations sont vraies sur les classes et les identifiants ?",
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

```tosa-match
{
  "level": "Examen",
  "prompt": "Associe le problème à la correction la plus probable.",
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

```tosa-code
{
  "level": "Examen",
  "title": "Corrige ce composant carte.",
  "instructions": "La carte doit contenir une image accessible, un titre, un lien valide et un style CSS ciblant la classe.",
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

