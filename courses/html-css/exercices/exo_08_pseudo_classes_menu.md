# Exo 08 - Ajouter des effets avec les pseudo-classes

## Moment strategique

A faire apres les slides sur `:hover`, `:focus`, `:active`, `:visited`, `:first-child`, `:last-child` et `:nth-child`.

## Objectif

Rendre le menu et certains elements plus interactifs.

## Ce que tu vas apprendre

- Modifier un lien au survol avec `:hover`.
- Modifier un element quand il recoit le focus avec `:focus`.
- Cibler un element selon sa position avec `:first-child` ou `:nth-child`.

## Consigne

Ajoute des effets CSS sur la navigation et sur une liste.

Tu dois utiliser au minimum :

1. `:hover`
2. `:focus`
3. `:first-child` ou `:last-child`
4. `:nth-child`

## Etapes detaillees

### Etape 1 - Styliser les liens du menu

```css
nav a {
    color: #264653;
    text-decoration: none;
    font-weight: bold;
}
```

### Etape 2 - Ajouter un effet au survol

```css
nav a:hover {
    text-decoration: underline;
}
```

`:hover` s'applique quand la souris passe sur l'element.

### Etape 3 - Ajouter un effet au focus

```css
nav a:focus {
    outline: 2px solid #264653;
}
```

`:focus` est important pour les personnes qui naviguent au clavier.

### Etape 4 - Cibler le premier element d'une liste

```css
nav li:first-child {
    font-weight: bold;
}
```

### Etape 5 - Cibler les elements pairs

Sur une liste de ton choix :

```css
li:nth-child(even) {
    background-color: #eeeeee;
}
```

`even` signifie pair. `odd` signifie impair.

## Resultat attendu

Le menu doit reagir quand on passe la souris dessus. Une liste doit avoir un style alterne.

## Checklist avant de rendre

- [ ] J'ai utilise `:hover`.
- [ ] J'ai utilise `:focus`.
- [ ] J'ai utilise `:first-child` ou `:last-child`.
- [ ] J'ai utilise `:nth-child`.
- [ ] Les effets restent lisibles.

## Bonus

Ajoute un effet `:active` sur un bouton ou un lien.
