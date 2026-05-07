# Exo 07 - Comprendre les marges, paddings, bordures et cartes

## Moment strategique

A faire apres les slides sur `width`, `height`, `display`, `margin`, `padding`, `border`, `border-radius`, `box-sizing` et les ombres.

## Objectif

Creer des cartes visuelles propres pour presenter plusieurs elements.

## Ce que tu vas apprendre

- Differencier `margin` et `padding`.
- Ajouter une bordure.
- Arrondir les coins.
- Ajouter une ombre.
- Utiliser `box-sizing: border-box`.

## Consigne

Ajoute une section contenant trois cartes.

Chaque carte doit contenir :

- un titre ;
- un court paragraphe ;
- un lien ou un bouton.

## Etapes detaillees

### Etape 1 - Ajouter une section de cartes dans le HTML

```html
<section class="cartes">
    <article class="carte">
        <h3>Carte 1</h3>
        <p>Une courte description.</p>
        <a href="#">En savoir plus</a>
    </article>

    <article class="carte">
        <h3>Carte 2</h3>
        <p>Une courte description.</p>
        <a href="#">En savoir plus</a>
    </article>

    <article class="carte">
        <h3>Carte 3</h3>
        <p>Une courte description.</p>
        <a href="#">En savoir plus</a>
    </article>
</section>
```

### Etape 2 - Ajouter `box-sizing`

Au debut de ton CSS :

```css
* {
    box-sizing: border-box;
}
```

Cela aide a calculer plus facilement la taille des elements.

### Etape 3 - Styliser la zone des cartes

```css
.cartes {
    margin: 24px auto;
    max-width: 900px;
}
```

### Etape 4 - Styliser chaque carte

```css
.carte {
    background-color: white;
    border: 1px solid #dddddd;
    border-radius: 12px;
    padding: 16px;
    margin-bottom: 16px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}
```

### Etape 5 - Comprendre margin et padding

- `padding` = espace a l'interieur de l'element.
- `margin` = espace a l'exterieur de l'element.

Dans une carte :

- le `padding` eloigne le texte du bord de la carte ;
- le `margin-bottom` eloigne une carte de la suivante.

## Resultat attendu

Tu dois obtenir trois cartes separees, lisibles et plus elegantes que du texte brut.

## Checklist avant de rendre

- [ ] J'ai une section `.cartes`.
- [ ] J'ai trois `.carte`.
- [ ] Chaque carte contient un titre, un paragraphe et un lien.
- [ ] Les cartes ont un padding.
- [ ] Les cartes ont une marge entre elles.
- [ ] Les cartes ont une bordure ou une ombre.
- [ ] Les coins sont arrondis.

## Bonus

Utilise `display: inline-block` ou `display: flex` si le formateur l'autorise, pour placer les cartes sur une meme ligne en grand ecran.
