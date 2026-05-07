# Prépa TOSA HTML / CSS

Application statique pour entraîner des apprenants au TOSA HTML / CSS sur GitHub Pages.

## Ce qu’il fait

- Affiche un parcours d'entraînement depuis `courses/`.
- Propose des QCM simples et multi-réponses.
- Propose des zones de code modifiables pour trouver et corriger des erreurs.
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

````md
```tosa-code
{
  "title": "Corrige l'image.",
  "instructions": "L'image doit être accessible.",
  "codeLines": ["<img href=\"photo.jpg\">"],
  "checks": [
    { "label": "L'image utilise src.", "contains": "src=\"photo.jpg\"" },
    { "label": "L'image possède alt.", "contains": "alt=" }
  ],
  "solutionLines": ["<img src=\"photo.jpg\" alt=\"Description utile\">"]
}
```
````

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
│       ├── 01_mode_examen_tosa.md
│       ├── 02_qcm_html_css.md
│       └── ...
├── scripts/
│   └── build-manifest.mjs
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
