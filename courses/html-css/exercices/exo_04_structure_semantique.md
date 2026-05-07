# Exo 04 - Structurer une page avec les balises semantiques

## Moment strategique

A faire apres les slides sur `header`, `footer`, `nav`, `section`, `article` et `aside`.

## Objectif

Transformer une page simple en page bien structuree.

## Ce que tu vas apprendre

- Utiliser les balises semantiques.
- Distinguer une zone de navigation, un contenu principal et un pied de page.
- Donner plus de sens au code HTML.

## Consigne

Reorganise ta page avec une structure plus professionnelle.

Ta page doit contenir :

```text
header
nav
main
section
article
aside
footer
```

## Rappel simple

- `header` : haut de page ou haut d'une section.
- `nav` : zone de navigation.
- `main` : contenu principal unique de la page.
- `section` : grande partie thematique.
- `article` : contenu autonome, comme une actualite ou une carte d'information.
- `aside` : information complementaire.
- `footer` : pied de page.

## Etapes detaillees

### Etape 1 - Creer le haut de page

Place ton titre principal dans un `header`.

```html
<header>
    <h1>Ma page personnelle</h1>
    <p>Une courte phrase de presentation.</p>
</header>
```

### Etape 2 - Placer le menu dans `nav`

```html
<nav>
    <ul>
        <li><a href="#presentation">Presentation</a></li>
        <li><a href="#details">Details</a></li>
    </ul>
</nav>
```

### Etape 3 - Ajouter `main`

Le contenu principal va dans `main`.

```html
<main>
    <!-- sections principales ici -->
</main>
```

### Etape 4 - Creer deux sections

```html
<section id="presentation">
    <h2>Presentation</h2>
    <p>Texte de presentation...</p>
</section>

<section id="details">
    <h2>Details</h2>
    <p>Texte de detail...</p>
</section>
```

### Etape 5 - Ajouter un article

```html
<article>
    <h3>Une information importante</h3>
    <p>Cette information pourrait etre lue de maniere independante.</p>
</article>
```

### Etape 6 - Ajouter une information complementaire

```html
<aside>
    <h2>Le savais-tu ?</h2>
    <p>Ajoute ici une information secondaire.</p>
</aside>
```

### Etape 7 - Ajouter le footer

```html
<footer>
    <p>&copy; 2026 - Mon premier site HTML & CSS</p>
</footer>
```

## Resultat attendu

Ton code doit etre plus facile a lire. Meme sans CSS, on doit comprendre les grandes zones de la page.

## Checklist avant de rendre

- [ ] J'ai un `header`.
- [ ] J'ai un `nav`.
- [ ] J'ai un seul `main`.
- [ ] J'ai au moins deux `section`.
- [ ] J'ai au moins un `article`.
- [ ] J'ai un `aside`.
- [ ] J'ai un `footer`.
- [ ] Mon indentation aide a comprendre les blocs.

## Bonus

Ajoute un deuxieme `article` dans une section "Actualites" ou "Astuces".
