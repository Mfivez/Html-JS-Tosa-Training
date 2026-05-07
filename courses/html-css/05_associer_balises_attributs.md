# Associer balises, attributs et propriétés

## Balises HTML

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

## Attributs fréquents

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

## Propriétés CSS

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

