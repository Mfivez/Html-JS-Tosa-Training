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

## Attributs de formulaire

```tosa-match
{
  "level": "Formulaires",
  "prompt": "Associe chaque attribut de formulaire à sa définition.",
  "choices": [
    "Définit la méthode HTTP utilisée pour envoyer les données du formulaire.",
    "Spécifie comment les données du formulaire doivent être encodées.",
    "Spécifie qu'un input ne doit pas être validé lorsqu'il est soumis.",
    "Spécifie que toutes les données du formulaire ne doivent pas être validées lors de la soumission."
  ],
  "items": [
    { "label": "formmethod", "answer": "Définit la méthode HTTP utilisée pour envoyer les données du formulaire." },
    { "label": "formenctype", "answer": "Spécifie comment les données du formulaire doivent être encodées." },
    { "label": "formnovalidate", "answer": "Spécifie qu'un input ne doit pas être validé lorsqu'il est soumis." },
    { "label": "novalidate", "answer": "Spécifie que toutes les données du formulaire ne doivent pas être validées lors de la soumission." }
  ],
  "explanation": "Les attributs qui commencent par form peuvent souvent être placés sur un bouton de soumission pour surcharger le comportement du formulaire."
}
```

## Couleurs CSS

```tosa-match
{
  "level": "CSS",
  "prompt": "Associe chaque notation CSS à la couleur correspondante.",
  "choices": [
    "Rouge",
    "Bleu",
    "Vert",
    "Blanc",
    "Noir",
    "Transparent"
  ],
  "items": [
    { "label": "rgb(255, 0, 0)", "answer": "Rouge" },
    { "label": "blue", "answer": "Bleu" },
    { "label": "rgb(0, 0, 0)", "answer": "Noir" },
    { "label": "rgba(255, 255, 255, 0)", "answer": "Transparent" }
  ],
  "explanation": "Le dernier paramètre de rgba est l'opacité : 0 signifie totalement transparent."
}
```

## Structure de page

```tosa-match
{
  "level": "HTML",
  "prompt": "Place mentalement chaque élément standard dans sa zone habituelle d'une page.",
  "choices": [
    "Zone d'en-tête ou navigation",
    "Contenu principal",
    "Section de contenu",
    "Contenu complémentaire",
    "Pied de page"
  ],
  "items": [
    { "label": "header ou nav", "answer": "Zone d'en-tête ou navigation" },
    { "label": "main", "answer": "Contenu principal" },
    { "label": "section", "answer": "Section de contenu" },
    { "label": "aside", "answer": "Contenu complémentaire" },
    { "label": "footer", "answer": "Pied de page" }
  ]
}
```
