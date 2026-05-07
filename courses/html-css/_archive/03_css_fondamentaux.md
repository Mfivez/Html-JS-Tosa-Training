# CSS – Fondamentaux

Alterne QCM, code à corriger et associations pour couvrir sélecteurs, box model et responsive.

```tosa-quiz
{
  "level": "CSS",
  "mode": "single",
  "question": "Quel sélecteur CSS cible les éléments qui ont class=\"alert\" ?",
  "options": [".alert", "#alert", "alert", "*alert"],
  "answers": [0],
  "explanation": "Le point cible une classe. Le dièse cible un identifiant."
}
```

```tosa-code
{
  "level": "CSS",
  "title": "Corrige les sélecteurs.",
  "instructions": "Le titre possède id=\"titre\" et les cartes possèdent class=\"card\".",
  "codeLines": [
    "titre {",
    "  color: #0f766e;",
    "}",
    "",
    "#card {",
    "  padding: 16px;",
    "  border: 1px solid #d9e1ea;",
    "}"
  ],
  "checks": [
    { "label": "L'identifiant titre est ciblé avec #titre.", "contains": "#titre" },
    { "label": "La classe card est ciblée avec .card.", "contains": ".card" },
    { "label": "Le faux sélecteur #card n'est plus utilisé.", "absent": "#card {" }
  ],
  "solutionLines": [
    "#titre {",
    "  color: #0f766e;",
    "}",
    "",
    ".card {",
    "  padding: 16px;",
    "  border: 1px solid #d9e1ea;",
    "}"
  ]
}
```

```tosa-match
{
  "level": "CSS",
  "prompt": "Associe chaque propriété CSS à son effet.",
  "choices": [
    "Couleur du texte",
    "Couleur de fond",
    "Espace intérieur",
    "Espace extérieur",
    "Mode de disposition flexible"
  ],
  "items": [
    { "label": "color", "answer": "Couleur du texte" },
    { "label": "background-color", "answer": "Couleur de fond" },
    { "label": "padding", "answer": "Espace intérieur" },
    { "label": "margin", "answer": "Espace extérieur" },
    { "label": "display: flex", "answer": "Mode de disposition flexible" }
  ]
}
```

```tosa-quiz
{
  "level": "CSS",
  "mode": "single",
  "question": "Quelle propriété CSS ajoute de l'espace à l'intérieur d'un élément ?",
  "options": ["margin", "padding", "border-spacing", "gap"],
  "answers": [1],
  "explanation": "padding ajoute de l'espace entre le contenu et la bordure. margin ajoute de l'espace à l'extérieur."
}
```

```tosa-code
{
  "level": "Responsive",
  "title": "Corrige la media query.",
  "instructions": "Sous 700px, les cartes doivent passer sur une seule colonne.",
  "codeLines": [
    ".grid {",
    "  display: grid;",
    "  grid-template-columns: repeat(3, 1fr);",
    "}",
    "",
    "@media max-width: 700px {",
    "  .grid {",
    "    grid-template-column: 1fr;",
    "  }",
    "}"
  ],
  "checks": [
    { "label": "La media query utilise des parenthèses.", "contains": "@media (max-width: 700px)" },
    { "label": "La propriété grid-template-columns est au pluriel.", "contains": "grid-template-columns: 1fr;" },
    { "label": "La propriété incorrecte n'est plus présente.", "absent": "grid-template-column:" }
  ],
  "solutionLines": [
    ".grid {",
    "  display: grid;",
    "  grid-template-columns: repeat(3, 1fr);",
    "}",
    "",
    "@media (max-width: 700px) {",
    "  .grid {",
    "    grid-template-columns: 1fr;",
    "  }",
    "}"
  ]
}
```

```tosa-match
{
  "level": "CSS",
  "prompt": "Associe chaque notation CSS à la couleur correspondante.",
  "choices": ["Rouge", "Bleu", "Noir", "Transparent", "Blanc"],
  "items": [
    { "label": "rgb(255, 0, 0)", "answer": "Rouge" },
    { "label": "blue", "answer": "Bleu" },
    { "label": "rgb(0, 0, 0)", "answer": "Noir" },
    { "label": "rgba(255, 255, 255, 0)", "answer": "Transparent" }
  ],
  "explanation": "Le dernier paramètre de rgba est l'opacité : 0 signifie totalement transparent."
}
```

```tosa-quiz
{
  "level": "CSS",
  "mode": "multiple",
  "question": "Quelles déclarations CSS sont valides ?",
  "options": [
    "color: #ffffff;",
    "font-size: 18px;",
    "margin: 20;",
    "background-color: rgb(10, 20, 30);"
  ],
  "answers": [0, 1, 3],
  "explanation": "Une longueur comme margin nécessite généralement une unité, sauf pour la valeur 0."
}
```
