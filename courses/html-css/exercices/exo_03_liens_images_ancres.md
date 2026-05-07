# Exo 03 - Ajouter des liens, des images et des ancres

## Moment strategique

A faire apres les slides sur les liens, les ancres, les images et les figures.

## Objectif

Rendre ta page plus interactive avec des liens et plus visuelle avec une image.

## Ce que tu vas apprendre

- Creer un lien avec `a` et `href`.
- Creer un lien vers une partie de la meme page avec une ancre.
- Ajouter une image avec `img`.
- Utiliser l'attribut `alt`.
- Utiliser `figure` et `figcaption`.

## Consigne

Ajoute a ta page :

1. Un menu simple en haut de page.
2. Au moins deux ancres vers des sections de ta page.
3. Un lien vers un site externe.
4. Une image avec un texte alternatif.
5. Une legende sous l'image.

## Preparation

Dans ton dossier `images`, ajoute une image de ton choix.

Renomme-la sans espace ni accent.

Bon exemple :

```text
crepes.jpg
logo_club.png
chat.jpg
```

Mauvais exemple :

```text
photo de mon chat été 2024.jpg
```

## Etapes detaillees

### Etape 1 - Ajouter des identifiants aux sections

Sur deux titres `h2`, ajoute un attribut `id`.

```html
<h2 id="ingredients">Ingredients</h2>
<h2 id="etapes">Etapes</h2>
```

Un `id` sert ici de point d'arrivee pour un lien.

### Etape 2 - Creer un menu d'ancres

Au-dessus du contenu, ajoute :

```html
<nav>
    <ul>
        <li><a href="#ingredients">Voir les ingredients</a></li>
        <li><a href="#etapes">Voir les etapes</a></li>
    </ul>
</nav>
```

Le symbole `#` signifie : "va vers l'element qui porte cet id".

### Etape 3 - Ajouter un lien externe

Ajoute un lien vers un site utile.

```html
<a href="https://developer.mozilla.org/fr/" target="_blank" rel="noopener noreferrer">
    Voir la documentation MDN
</a>
```

Quand un lien externe s'ouvre dans un nouvel onglet avec `target="_blank"`, on ajoute aussi `rel="noopener noreferrer"`.

### Etape 4 - Ajouter une image

```html
<img src="images/crepes.jpg" alt="Une assiette de crepes">
```

L'attribut `alt` decrit l'image. Il est utile si l'image ne se charge pas et pour l'accessibilite.

### Etape 5 - Ajouter une figure

Si ton image illustre ton contenu, place-la dans une figure :

```html
<figure>
    <img src="images/crepes.jpg" alt="Une assiette de crepes">
    <figcaption>Une assiette de crepes maison.</figcaption>
</figure>
```

## Resultat attendu

La page contient un menu cliquable, un lien externe et une image correctement affichee.

## Checklist avant de rendre

- [ ] Les liens du menu vont vers les bonnes sections.
- [ ] Le lien externe fonctionne.
- [ ] Le lien externe s'ouvre dans un nouvel onglet.
- [ ] L'image s'affiche.
- [ ] L'image possede un attribut `alt` utile.
- [ ] Le nom du fichier image ne contient pas d'espace ni d'accent.

## Bonus

Ajoute un lien "Retour en haut" en bas de la page.
