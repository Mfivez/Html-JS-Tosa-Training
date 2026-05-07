# Prépa TOSA Web - HTML / CSS / JS

Application statique pour entraîner des apprenants au TOSA Web HTML / CSS / JavaScript sur GitHub Pages.

## Ce qu’il fait

- Affiche un parcours d'entraînement depuis `courses/`.
- Propose des QCM simples et multi-réponses.
- Propose un examen blanc TOSA Web de 35 questions, piochées aléatoirement dans la banque.
- Propose une banque de questions en 5 niveaux de difficulté, avec historique local des essais.
- Propose des zones de code modifiables pour trouver et corriger des erreurs.
- Teste les exercices code avec un runner sandbox quand un test exécutable est défini.
- Propose des exercices d'association : balise, attribut, propriété, rôle.
- Reste 100 % statique : aucun backend, aucune base de données, compatible GitHub Pages public.
- Génère `manifest.json` via `scripts/build-manifest.mjs`.
- Publie le site via GitHub Actions.

## Ajouter une activité TOSA

Dans un fichier `.md`, ajoute un bloc JSON dans une clôture dédiée.

### QCM

````md
```tosa-quiz
{
  "mode": "multiple",
  "question": "Quelles déclarations CSS sont valides ?",
  "options": ["color: red;", "margin: 20;", "font-size: 1rem;"],
  "answers": [0, 2],
  "explanation": "Une longueur comme margin nécessite une unité, sauf 0."
}
```
````

### Code à corriger

Le format recommandé est d'ajouter `tests`. Quand ils existent, ils sont prioritaires sur les `checks` textuels. Les `checks` restent un fallback simple.

````md
```tosa-code
{
  "title": "Corrige la boucle.",
  "instructions": "Chaque élément doit être affiché une seule fois.",
  "codeLines": [
    "const items = ['html', 'css', 'js'];",
    "for (let i = 0; i <= items.length; i++) {",
    "  console.log(item[i]);",
    "}"
  ],
  "tests": [
    {
      "type": "console",
      "label": "Le code affiche html, css puis js.",
      "expectedLogs": ["html", "css", "js"]
    }
  ],
  "checks": [
    { "label": "La boucle ne dépasse pas la longueur.", "contains": "i < items.length" }
  ],
  "solutionLines": [
    "const items = ['html', 'css', 'js'];",
    "items.forEach((item) => console.log(item));"
  ]
}
```
````

Types de tests disponibles :

- `console` : compare les logs attendus.
- `dom` : injecte un HTML de test, exécute le JS, simule des actions puis vérifie le DOM.
- `html` : analyse la structure HTML proposée.
- `css` : injecte le CSS et vérifie le rendu calculé.
- `page` : sépare une réponse HTML+CSS ou HTML+JS en deux blocs, puis vérifie le résultat intégré.

### Association

````md
```tosa-match
{
  "prompt": "Associe chaque balise à son rôle.",
  "choices": ["Lien", "Image"],
  "items": [
    { "label": "<a>", "answer": "Lien" },
    { "label": "<img>", "answer": "Image" }
  ]
}
```
````

## Structure

```txt
.
├── index.html
├── app.js
├── style.css
├── manifest.json                 # généré automatiquement
├── courses/
│   └── html-css/
│       ├── course.json
│       ├── exercices/
│       │   ├── exo_00_installation.md
│       │   └── ...
│       └── _archive/
├── scripts/
│   ├── build-manifest.mjs
│   └── validate-roadmap.mjs
└── .github/
    └── workflows/
        └── pages.yml
```

## Lancer en local

Depuis le dossier du projet :

```bash
node scripts/build-manifest.mjs
python3 -m http.server 8080
```

Puis ouvre :

```txt
http://localhost:8080
```

Sur Windows, tu peux aussi utiliser :

```bash
py -m http.server 8080
```

Évite d’ouvrir directement `index.html` en `file://`, car le navigateur bloque souvent les `fetch()` locaux.

## Publier sur GitHub Pages

1. Crée un repo GitHub.
2. Envoie ces fichiers dans le repo.
3. Va dans `Settings > Pages`.
4. Dans `Source`, choisis `GitHub Actions`.
5. Push sur la branche `main`.

À chaque push, le workflow :

1. régénère `manifest.json` ;
2. copie le site dans `_site` ;
3. déploie sur GitHub Pages.

## Ajouter un parcours à la main

Crée un dossier dans `courses/` :

```txt
courses/mon-cours/
  course.json
  exercices/
    01-diagnostic.md
    02-qcm.md
```

Exemple de `course.json` :

```json
{
  "title": "Mon parcours",
  "description": "Description courte du parcours",
  "order": 3
}
```

Exemple de chapitre :

```md
# Introduction

Contenu du chapitre.
```

Ensuite :

```bash
node scripts/build-manifest.mjs
```

Puis commit et push.

## Convention de nommage conseillée

Utilise des préfixes numériques pour l’ordre :

```txt
01-intro.md
02-installation.md
03-exercice.md
04-correction.md
```

Le titre affiché dans la navigation vient du premier `# Titre` dans le Markdown.

## Images et fichiers joints

Tu peux ajouter des images dans le dossier du cours :

```txt
courses/js-debutant/
  01-intro.md
  images/schema.png
```

Puis dans le Markdown :

```md
![Schéma](images/schema.png)
```

Le lecteur corrige automatiquement les chemins relatifs par rapport au chapitre.
