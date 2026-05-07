# Exo 06 - Typographie, couleurs et arriere-plans

## Moment strategique

A faire apres les slides sur les proprietes du texte, les couleurs, les arriere-plans et la transparence.

## Objectif

Ameliorer la lisibilite et l'identite visuelle de ta page.

## Ce que tu vas apprendre

- Changer la taille du texte.
- Changer la couleur du texte.
- Ajouter une couleur de fond.
- Utiliser une image de fond si souhaite.
- Utiliser `rgba()` pour une couleur transparente.

## Consigne

Cree une petite charte graphique pour ta page.

Tu dois definir :

1. Une police generale.
2. Une couleur principale.
3. Une couleur de fond generale.
4. Un style different pour les titres.
5. Un bloc avec une couleur de fond legerement differente.
6. Un effet de transparence avec `rgba()`.

## Etapes detaillees

### Etape 1 - Definir le style general

Dans `style.css` :

```css
body {
    font-family: Arial, sans-serif;
    font-size: 16px;
    background-color: #f7f7f7;
    color: #222222;
}
```

### Etape 2 - Styliser le header

```css
header {
    background-color: #264653;
    color: white;
    text-align: center;
    padding: 24px;
}
```

### Etape 3 - Styliser les titres

```css
h1 {
    font-size: 2rem;
}

h2 {
    color: #264653;
}
```

`rem` est une unite relative souvent pratique pour les tailles de texte.

### Etape 4 - Ajouter un bloc avec fond

Dans le HTML :

```html
<section class="bloc-info">
    <h2>Information</h2>
    <p>Voici une information importante.</p>
</section>
```

Dans le CSS :

```css
.bloc-info {
    background-color: white;
    padding: 16px;
}
```

### Etape 5 - Utiliser une couleur transparente

```css
.bloc-info {
    background-color: rgba(255, 255, 255, 0.8);
}
```

La derniere valeur, `0.8`, represente l'opacite.

- `1` = completement opaque.
- `0` = completement transparent.

## Resultat attendu

Ta page doit etre plus agreable a lire. Les titres, les blocs et le fond doivent etre visuellement differents.

## Checklist avant de rendre

- [ ] La police generale est definie.
- [ ] La couleur du texte est definie.
- [ ] Le fond de la page est defini.
- [ ] Le `header` a un style visible.
- [ ] Les titres sont differents du texte normal.
- [ ] J'ai utilise `rgba()` au moins une fois.

## Bonus

Ajoute une image de fond sur le `header` avec `background-image`.
