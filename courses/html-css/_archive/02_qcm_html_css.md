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

## Questions inspirées des exemples TOSA

```tosa-quiz
{
  "level": "Multi-réponses",
  "mode": "multiple",
  "question": "En HTML, quels extraits contiennent un moyen valide de modifier le style ?",
  "options": [
    "<head><link rel=\"stylesheet\" type=\"text/css\" href=\"externalDesign.css\"></head>",
    "<head><style>body { background-color: linen; } h1 { color: maroon; }</style></head>",
    "<a href=\"...\" style=\"color: green;\">A link</a>",
    "<head><style rel=\"stylesheet\" type=\"text/css\" href=\"externalDesign.css\"></head>",
    "<a href=\"...\" css=\"color: green;\">A link</a>"
  ],
  "answers": [0, 1, 2],
  "explanation": "On peut utiliser une feuille externe avec <link>, un bloc <style> ou l'attribut style. <style> ne remplace pas <link> pour href, et css n'est pas un attribut HTML standard."
}
```

```tosa-quiz
{
  "level": "Structure",
  "mode": "multiple",
  "question": "Quelles affirmations sur la structure générale d'une page HTML sont vraies ?",
  "options": [
    "Un document ne doit pas comporter plus d'un élément <main> visible.",
    "L'élément <main> représente une section autonome et générique du document.",
    "L'élément <section> représente une section autonome et générique du document.",
    "L'élément <header> peut contenir un logo, un formulaire de recherche ou des éléments d'en-tête."
  ],
  "answers": [0, 2, 3],
  "explanation": "<main> représente le contenu principal unique de la page, pas une section générique. Pour une section thématique, on utilise plutôt <section>."
}
```

```tosa-quiz
{
  "level": "CSS",
  "mode": "single",
  "question": "Quel code CSS crée une bordure verte continue de 5px autour d'une div ?",
  "options": [
    "div { border: solid 5px green; }",
    "div { frame: green 5px; }",
    "div { edge: 5pixels green; }",
    "div { color: green; border: bold 5; }"
  ],
  "answers": [0],
  "explanation": "La propriété correcte est border, avec une largeur, un style et une couleur."
}
```

```tosa-quiz
{
  "level": "CSS",
  "mode": "single",
  "question": "Quelle propriété CSS permet de modifier l'origine du cadre pour les transformations d'un élément ?",
  "options": [
    "frame-origin",
    "origin-position",
    "origin-transform",
    "transform-origin"
  ],
  "answers": [3],
  "explanation": "transform-origin définit le point autour duquel une transformation comme rotate() est appliquée."
}
```

```tosa-quiz
{
  "level": "CSS",
  "mode": "single",
  "question": "Quelle propriété CSS permet de spécifier la courbe de vitesse d'une transition ?",
  "options": [
    "transition-delay",
    "transition-duration",
    "transition-timing-function",
    "transition-property"
  ],
  "answers": [2],
  "explanation": "transition-timing-function définit l'accélération de l'effet : ease, linear, ease-in, cubic-bezier(), etc."
}
```

```tosa-quiz
{
  "level": "CSS",
  "mode": "single",
  "question": "Comment appliquer plusieurs transitions sur plusieurs propriétés d'une même div ?",
  "options": [
    "En séparant les transitions par des virgules dans la propriété transition.",
    "En répétant plusieurs fois la propriété transition-duration uniquement.",
    "En utilisant transform-origin.",
    "En écrivant une propriété transition-list."
  ],
  "answers": [0],
  "explanation": "Exemple : transition: width 300ms ease, height 300ms ease;."
}
```

```tosa-quiz
{
  "level": "HTML",
  "mode": "multiple",
  "question": "Quels éléments HTML ont un affichage en ligne par défaut ?",
  "options": [
    "<div>",
    "<p>",
    "<ul>",
    "<select>",
    "<span>",
    "<a>"
  ],
  "answers": [3, 4, 5],
  "explanation": "<span>, <a> et <select> sont affichés en ligne ou inline-block selon le navigateur. <div>, <p> et <ul> sont des éléments de type bloc par défaut."
}
```
