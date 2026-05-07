# Exo 11 - Rendre la page lisible sur mobile

## Moment strategique

A faire apres les slides sur le responsive design, `@media` et la balise meta viewport.

## Objectif

Adapter ta page quand la largeur de l'ecran devient petite.

## Ce que tu vas apprendre

- Ajouter la balise `meta viewport`.
- Tester une page en reduisant la largeur du navigateur.
- Utiliser une media query.
- Modifier la taille, les marges ou la disposition en petit ecran.

## Consigne

Modifie ta page pour qu'elle reste lisible sur smartphone.

Tu dois :

1. Ajouter la balise `meta viewport`.
2. Creer une media query pour les ecrans de moins de 700px.
3. Modifier au moins trois styles dans cette media query.
4. Tester en reduisant la largeur du navigateur.

## Etapes detaillees

### Etape 1 - Ajouter le viewport

Dans le `head` de ton fichier HTML :

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

Sans cette ligne, les navigateurs mobiles peuvent afficher la page comme si elle etait plus large que l'ecran.

### Etape 2 - Creer une media query

A la fin de `style.css` :

```css
@media screen and (max-width: 700px) {

}
```

Les regles placees dedans s'appliquent seulement quand l'ecran est plus petit ou egal a 700px.

### Etape 3 - Reduire les espacements

```css
@media screen and (max-width: 700px) {
    body {
        font-size: 15px;
    }

    header {
        padding: 16px;
    }

    .carte {
        margin-bottom: 12px;
    }
}
```

### Etape 4 - Adapter le menu

```css
@media screen and (max-width: 700px) {
    nav ul {
        padding-left: 0;
    }

    nav li {
        display: block;
        margin-bottom: 8px;
    }
}
```

### Etape 5 - Eviter les debordements d'images

```css
img {
    max-width: 100%;
    height: auto;
}
```

Cette regle peut etre placee hors media query. Elle est utile tout le temps.

## Resultat attendu

Quand tu reduis la largeur de la fenetre, la page doit rester lisible sans devoir scroller horizontalement.

## Checklist avant de rendre

- [ ] La balise `meta viewport` est dans le `head`.
- [ ] J'ai une media query `max-width`.
- [ ] Au moins trois styles changent en petit ecran.
- [ ] Les images ne debordent pas.
- [ ] Le menu reste utilisable.
- [ ] Le formulaire reste lisible.
- [ ] Le tableau est encore consultable ou adaptee.

## Bonus

Pour le tableau, ajoute :

```css
.tableau-responsive {
    overflow-x: auto;
}
```

Puis entoure ton tableau dans le HTML :

```html
<div class="tableau-responsive">
    <table>
        <!-- tableau -->
    </table>
</div>
```
