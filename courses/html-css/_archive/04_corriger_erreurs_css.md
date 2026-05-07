# Trouver et corriger des erreurs CSS

## Sélecteurs

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

## Box model

```tosa-code
{
  "level": "CSS",
  "title": "Corrige les unités et le modèle de boîte.",
  "instructions": "La carte doit garder une largeur de 320px bordure incluse.",
  "codeLines": [
    ".card {",
    "  width: 320;",
    "  padding: 24px;",
    "  border: 1px solid #ddd;",
    "}"
  ],
  "checks": [
    { "label": "La largeur possède l'unité px.", "contains": "width: 320px;" },
    { "label": "box-sizing inclut padding et bordure dans la largeur.", "contains": "box-sizing: border-box;" }
  ],
  "solutionLines": [
    ".card {",
    "  width: 320px;",
    "  box-sizing: border-box;",
    "  padding: 24px;",
    "  border: 1px solid #ddd;",
    "}"
  ]
}
```

## Responsive

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
