# Maîtrise & Approfondissement

Questions avancées sur HTML, CSS et JS. Même format 3 quiz + 2 code + 2 match.

```tosa-quiz
{
  "level": "Avancé",
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

```tosa-code
{
  "level": "Avancé",
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

```tosa-match
{
  "level": "Avancé",
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

```tosa-quiz
{
  "level": "Avancé",
  "mode": "single",
  "question": "Quel mécanisme JavaScript permet à une fonction interne d'accéder aux variables de sa fonction externe après son exécution ?",
  "options": ["Une closure", "Une media query", "Un prototype CSS", "Un attribut data"],
  "answers": [0],
  "explanation": "Une closure conserve l'accès à l'environnement lexical dans lequel la fonction a été créée."
}
```

```tosa-code
{
  "level": "Avancé",
  "title": "Corrige ce compteur de clics.",
  "instructions": "À chaque clic, count doit s'incrémenter de 1 et le display doit être mis à jour avec la valeur.",
  "codeLines": [
    "let count = 0;",
    "const btn = document.querySelector(\"#increment\");",
    "const display = document.querySelector(\"#count\");",
    "",
    "btn.addEventListener(\"click\", () => {",
    "  count = count + 0;",
    "  display.textContent = Count;",
    "});"
  ],
  "checks": [
    { "label": "count est incrémenté de 1.", "regex": "count\\+\\+|count\\s*=\\s*count\\s*\\+\\s*1" },
    { "label": "La variable Count avec majuscule n'est plus utilisée.", "absent": "= Count;" },
    { "label": "display.textContent est mis à jour.", "contains": "display.textContent = count" }
  ],
  "solutionLines": [
    "let count = 0;",
    "const btn = document.querySelector(\"#increment\");",
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

```tosa-match
{
  "level": "Avancé",
  "prompt": "Associe chaque concept avancé à sa définition.",
  "choices": [
    "Conserve l'accès à son contexte lexical",
    "Hérite du this lexical, pas son propre this",
    "Inclut padding et bordure dans la largeur",
    "Spécificité toujours nulle",
    "Crée un nouveau contexte d'empilement"
  ],
  "items": [
    { "label": "Closure", "answer": "Conserve l'accès à son contexte lexical" },
    { "label": "Fonction fléchée", "answer": "Hérite du this lexical, pas son propre this" },
    { "label": "box-sizing: border-box", "answer": "Inclut padding et bordure dans la largeur" },
    { "label": ":where()", "answer": "Spécificité toujours nulle" },
    { "label": "opacity: 0.5", "answer": "Crée un nouveau contexte d'empilement" }
  ]
}
```

```tosa-quiz
{
  "level": "Avancé",
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
