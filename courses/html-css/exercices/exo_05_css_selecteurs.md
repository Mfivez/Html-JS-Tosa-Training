# Exo 05 - Relier CSS et utiliser les premiers selecteurs

## Moment strategique

A faire apres les slides sur le CSS, la balise `link`, les selecteurs, `class` et `id`.

## Objectif

Ajouter un fichier CSS separe et appliquer tes premiers styles.

## Ce que tu vas apprendre

- Relier `style.css` a `index.html`.
- Utiliser un selecteur de balise.
- Utiliser une classe.
- Utiliser un id.
- Comprendre quand choisir `class` ou `id`.

## Consigne

Mets en forme ta page avec un fichier `style.css`.

Tu dois utiliser au minimum :

1. Un selecteur de balise, par exemple `body` ou `h1`.
2. Une classe, par exemple `.important` ou `.carte`.
3. Un id, par exemple `#presentation`.
4. Un selecteur groupe avec une virgule.

## Etapes detaillees

### Etape 1 - Relier le fichier CSS

Dans le `head` de `index.html`, ajoute :

```html
<link rel="stylesheet" href="style.css">
```

Attention : cette ligne doit etre dans `head`, pas dans `body`.

### Etape 2 - Tester que le CSS fonctionne

Dans `style.css`, ecris :

```css
body {
    font-family: Arial, sans-serif;
}
```

Recharge la page. Si la police change, le CSS est bien lie.

### Etape 3 - Styliser les titres

```css
h1 {
    text-align: center;
}
```

### Etape 4 - Creer une classe reutilisable

Dans le HTML, ajoute une classe sur deux elements :

```html
<p class="important">Ce paragraphe est important.</p>
<p class="important">Celui-ci aussi.</p>
```

Dans le CSS :

```css
.important {
    font-weight: bold;
}
```

Une classe peut servir plusieurs fois.

### Etape 5 - Styliser un id

Dans le HTML :

```html
<section id="presentation">
```

Dans le CSS :

```css
#presentation {
    background-color: #f2f2f2;
}
```

Un id doit rester unique dans une page.

### Etape 6 - Grouper des selecteurs

```css
h1, h2, h3 {
    color: #333333;
}
```

Cela evite de repeter trois fois la meme regle.

## Resultat attendu

La page doit avoir une police differente, des titres stylises et au moins un bloc mis en evidence.

## Checklist avant de rendre

- [ ] Le fichier CSS est bien lie dans le `head`.
- [ ] Le CSS est dans `style.css`, pas directement dans les balises HTML.
- [ ] J'ai utilise au moins un selecteur de balise.
- [ ] J'ai utilise au moins une classe.
- [ ] J'ai utilise au moins un id.
- [ ] J'ai utilise un groupe de selecteurs avec une virgule.

## Bonus

Ajoute une classe `.bouton` sur un lien pour lui donner l'apparence d'un bouton.
