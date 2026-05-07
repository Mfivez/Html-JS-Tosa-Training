# QCM HTML / CSS

## Questions HTML

```tosa-quiz
{
  "level": "Fondamentaux",
  "mode": "single",
  "question": "Quelle ligne déclare correctement une feuille de style externe ?",
  "options": [
    "<style src=\"style.css\">",
    "<css href=\"style.css\">",
    "<link rel=\"stylesheet\" href=\"style.css\">",
    "<script rel=\"stylesheet\" href=\"style.css\"></script>"
  ],
  "answers": [2],
  "explanation": "La balise <link> dans le <head> sert à relier une feuille CSS externe."
}
```

```tosa-quiz
{
  "level": "Multi-réponses",
  "mode": "multiple",
  "question": "Quelles balises sont sémantiques pour organiser les grandes zones d'une page ?",
  "options": [
    "<header>",
    "<main>",
    "<div>",
    "<footer>"
  ],
  "answers": [0, 1, 3],
  "explanation": "<div> est neutre. Les autres indiquent un rôle de structure."
}
```

```tosa-quiz
{
  "level": "Formulaires",
  "mode": "single",
  "question": "Quel attribut relie un <label> à un champ de formulaire ?",
  "options": [
    "name",
    "for",
    "target",
    "placeholder"
  ],
  "answers": [1],
  "explanation": "La valeur de for doit correspondre à l'id du champ."
}
```

## Questions CSS

```tosa-quiz
{
  "level": "Sélecteurs",
  "mode": "single",
  "question": "Quel sélecteur cible uniquement l'élément qui possède id=\"intro\" ?",
  "options": [
    ".intro",
    "#intro",
    "intro",
    "*intro"
  ],
  "answers": [1],
  "explanation": "# cible un identifiant, . cible une classe."
}
```

```tosa-quiz
{
  "level": "Multi-réponses",
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

```tosa-quiz
{
  "level": "Responsive",
  "mode": "single",
  "question": "Quelle ligne est indispensable pour adapter correctement la largeur sur mobile ?",
  "options": [
    "<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">",
    "<meta charset=\"utf-8\">",
    "<link rel=\"mobile\" href=\"style.css\">",
    "<html responsive=\"true\">"
  ],
  "answers": [0],
  "explanation": "La balise viewport évite que le navigateur mobile simule une grande largeur de page."
}
```

