# Exo 12 - Recap final : creer un mini-site vitrine

## Moment strategique

A faire a la fin du cours, apres le responsive design.

## Objectif

Reutiliser toutes les notions du cours dans un mini-site complet.

## Scenario

Tu dois creer une page vitrine pour un projet fictif ou reel.

Choisis un sujet simple :

- un cafe ;
- un restaurant ;
- une association ;
- un club de sport ;
- un portfolio personnel ;
- un evenement ;
- une petite entreprise ;
- un refuge animalier ;
- un atelier creatif.

## Fichiers attendus

```text
mini-site-recap/
  index.html
  style.css
  images/
    image_1.jpg
    image_2.jpg
```

Les noms exacts des images peuvent changer, mais ils ne doivent pas contenir d'espaces ni d'accents.

## Contraintes obligatoires

### HTML

Ta page doit contenir :

- `<!DOCTYPE html>` ;
- `html lang="fr"` ;
- `meta charset="UTF-8"` ;
- `meta viewport` ;
- un `title` personnalise ;
- un `header` ;
- un `nav` ;
- un `main` ;
- au moins trois `section` ;
- au moins deux `article` ;
- un `aside` ;
- un `footer`.

### Contenu

Ta page doit contenir :

- un titre principal `h1` ;
- plusieurs titres `h2` ;
- au moins 4 paragraphes ;
- une liste a puces ;
- une liste ordonnee ;
- au moins deux liens internes avec ancres ;
- au moins un lien externe ;
- au moins deux images avec `alt` ;
- au moins une figure avec `figcaption`.

### CSS

Ton CSS doit contenir :

- un style general pour `body` ;
- une police definie ;
- des couleurs ;
- des marges et paddings ;
- au moins une classe reutilisable ;
- au moins un id stylise ;
- des bordures ou ombres ;
- des coins arrondis ;
- un effet `:hover` ;
- un effet `:focus` ;
- une media query.

### Formulaire

Ta page doit contenir un formulaire de contact avec :

- nom ;
- email ;
- sujet ;
- message ;
- bouton envoyer ;
- labels lies aux champs ;
- au moins deux champs `required`.

### Tableau

Ta page doit contenir un tableau avec :

- `caption` ;
- `thead` ;
- `tbody` ;
- au moins 3 lignes de donnees ;
- `th` pour les en-tetes ;
- bordures stylisees en CSS.

### Responsive

Ta page doit rester lisible quand la largeur du navigateur est reduite.

Au minimum :

- les images ne debordent pas ;
- le menu reste utilisable ;
- le formulaire reste lisible ;
- une media query modifie au moins trois proprietes.

## Etapes conseillees

### Etape 1 - Choisir le sujet

Ecris en haut d'une feuille :

```text
Sujet :
Public vise :
Objectif de la page :
```

Exemple :

```text
Sujet : un cafe fictif
Public vise : personnes du quartier
Objectif : presenter le lieu et permettre de demander une reservation
```

### Etape 2 - Preparer la structure HTML

Commence par la structure generale sans CSS.

```html
<header></header>
<nav></nav>
<main></main>
<footer></footer>
```

Ne cherche pas encore a faire joli.

### Etape 3 - Ajouter les sections

Exemple :

```text
Accueil
Services ou activites
Horaires ou tarifs
Contact
```

### Etape 4 - Ajouter le contenu

Ajoute d'abord les textes, listes, images et liens.

Regle importante :

> D'abord le contenu HTML, ensuite l'apparence CSS.

### Etape 5 - Ajouter le CSS general

Commence par :

- `body` ;
- `header` ;
- `nav` ;
- `main` ;
- `footer` ;
- titres ;
- liens.

### Etape 6 - Ajouter les cartes

Transforme tes articles en cartes avec :

- fond ;
- padding ;
- margin ;
- border-radius ;
- box-shadow.

### Etape 7 - Ajouter le formulaire

Cree le formulaire et teste qu'il est lisible.

### Etape 8 - Ajouter le tableau

Ajoute un tableau d'horaires, de prix ou de planning.

### Etape 9 - Ajouter le responsive

Ajoute la media query a la fin du CSS.

Teste en reduisant la fenetre.

### Etape 10 - Relire et nettoyer

Avant de rendre :

- supprime le code inutile ;
- verifie les indentations ;
- verifie les noms de fichiers ;
- teste tous les liens ;
- recharge la page ;
- ouvre la page dans au moins deux tailles de fenetre.

## Checklist finale

- [ ] Ma page s'ouvre dans un navigateur.
- [ ] Le HTML et le CSS sont separes.
- [ ] Le fichier CSS est lie dans le `head`.
- [ ] Les accents s'affichent correctement.
- [ ] Les images s'affichent.
- [ ] Les images ont un `alt`.
- [ ] Le menu fonctionne.
- [ ] Les ancres fonctionnent.
- [ ] Le formulaire est lisible.
- [ ] Le tableau est lisible.
- [ ] La page est lisible sur petit ecran.
- [ ] Je suis capable d'expliquer mon code.

## Presentation orale courte

Prepare une presentation de 2 minutes :

1. Le sujet de ton site.
2. Les parties principales de ta page.
3. Une difficulte rencontree.
4. Une chose que tu as apprise.
5. Une amelioration que tu ferais avec plus de temps.

## Bonus

Ajoute une deuxieme page HTML, par exemple `contact.html` ou `galerie.html`, et cree un lien entre les pages.
