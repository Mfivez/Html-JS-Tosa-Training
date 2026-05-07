# JavaScript – Bases

Alterne QCM, code à corriger et associations pour couvrir variables, DOM et événements.

```tosa-quiz
{
  "level": "JavaScript",
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

```tosa-code
{
  "level": "JavaScript",
  "title": "Corrige cette fonction de salutation.",
  "instructions": "La fonction doit retourner la chaîne \"Bonjour, [prénom] !\" avec le point d'exclamation.",
  "codeLines": [
    "function saluer(prenom) {",
    "  return \"Bonjour, \" + prenom;",
    "}",
    "",
    "console.log(saluer(\"Alice\"));"
  ],
  "checks": [
    { "label": "La valeur de retour contient \" !\".", "contains": "\" !\"" },
    { "label": "Le paramètre prenom est utilisé.", "contains": "prenom" }
  ],
  "solutionLines": [
    "function saluer(prenom) {",
    "  return \"Bonjour, \" + prenom + \" !\";",
    "}",
    "",
    "console.log(saluer(\"Alice\"));"
  ],
  "explanation": "La concaténation s'effectue avec + entre les chaînes de caractères."
}
```

```tosa-match
{
  "level": "JavaScript",
  "prompt": "Associe chaque méthode de tableau à son effet.",
  "choices": [
    "Ajoute un élément à la fin",
    "Retire le dernier élément",
    "Transforme chaque élément",
    "Filtre selon une condition",
    "Trouve le premier élément correspondant"
  ],
  "items": [
    { "label": "push()", "answer": "Ajoute un élément à la fin" },
    { "label": "pop()", "answer": "Retire le dernier élément" },
    { "label": "map()", "answer": "Transforme chaque élément" },
    { "label": "filter()", "answer": "Filtre selon une condition" },
    { "label": "find()", "answer": "Trouve le premier élément correspondant" }
  ]
}
```

```tosa-quiz
{
  "level": "JavaScript",
  "mode": "single",
  "question": "Quelle méthode sélectionne le premier élément correspondant à un sélecteur CSS dans le DOM ?",
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

```tosa-code
{
  "level": "JavaScript",
  "title": "Corrige cet écouteur d'événement.",
  "instructions": "Au clic sur le bouton, le paragraphe doit afficher le texte \"Cliqué !\".",
  "codeLines": [
    "const btn = document.querySelector(\"#btn\");",
    "const msg = document.querySelector(\"#msg\");",
    "",
    "btn.on(\"click\", function() {",
    "  msg.innerHTML = \"Cliqué !\";",
    "});"
  ],
  "checks": [
    { "label": "addEventListener est utilisé.", "contains": "addEventListener" },
    { "label": "btn.on n'est plus utilisé.", "absent": "btn.on(" },
    { "label": "Le message est mis à jour via textContent ou innerHTML.", "regex": "msg\\.(textContent|innerHTML)" }
  ],
  "solutionLines": [
    "const btn = document.querySelector(\"#btn\");",
    "const msg = document.querySelector(\"#msg\");",
    "",
    "btn.addEventListener(\"click\", function() {",
    "  msg.textContent = \"Cliqué !\";",
    "});"
  ],
  "explanation": "addEventListener(\"click\", ...) est la méthode standard pour écouter un événement."
}
```

```tosa-match
{
  "level": "JavaScript",
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

```tosa-quiz
{
  "level": "JavaScript",
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
