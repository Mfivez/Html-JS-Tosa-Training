# Mode examen TOSA HTML / CSS

Cette préparation n'est pas un cours théorique. Chaque écran sert à s'entraîner à répondre vite, lire du code, repérer une erreur et choisir la correction la plus juste.

## Diagnostic rapide

```tosa-quiz
{
  "level": "Fondamentaux",
  "mode": "single",
  "question": "Dans une page HTML, quelle balise contient le contenu visible par l'utilisateur ?",
  "options": [
    "<head>",
    "<body>",
    "<meta>",
    "<title>"
  ],
  "answers": [1],
  "explanation": "Le contenu affiché dans la fenêtre du navigateur se place dans <body>. <head> contient surtout des métadonnées."
}
```

```tosa-quiz
{
  "level": "Multi-réponses",
  "mode": "multiple",
  "question": "Quels éléments améliorent l'accessibilité d'une image informative ?",
  "options": [
    "Un attribut alt précis",
    "Un nom de fichier très long",
    "Une légende avec <figcaption> si utile",
    "Une image mise en background CSS pour tout contenu important"
  ],
  "answers": [0, 2],
  "explanation": "Une image informative doit pouvoir être comprise sans voir l'image. Le background CSS convient surtout aux images décoratives."
}
```

```tosa-match
{
  "level": "Repérage",
  "prompt": "Associe chaque fichier à son rôle principal.",
  "choices": [
    "Structure et contenu",
    "Présentation visuelle",
    "Comportement interactif"
  ],
  "items": [
    { "label": "index.html", "answer": "Structure et contenu" },
    { "label": "style.css", "answer": "Présentation visuelle" },
    { "label": "app.js", "answer": "Comportement interactif" }
  ],
  "explanation": "Le TOSA teste souvent la capacité à identifier vite le rôle d'un fichier ou d'une balise."
}
```

## Méthode pendant le test

1. Lis d'abord la consigne, puis seulement le code.
2. En QCM multi-réponses, vérifie chaque proposition séparément.
3. Pour les erreurs de code, cherche les fautes fréquentes : balises non fermées, attributs mal placés, sélecteurs incorrects, unités manquantes.
4. Ne réponds pas seulement avec la mémoire : vérifie la logique du navigateur.

