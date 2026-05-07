# Exo 01 - Creer une vraie page HTML minimale

## Moment strategique

A faire apres les slides sur les balises, le doctype, `html`, `head`, `body`, l'encodage et les commentaires.

## Objectif

Transformer ton fichier `index.html` en vraie page HTML structuree.

## Ce que tu vas apprendre

- Ecrire la structure minimale d'une page HTML.
- Comprendre le role de `head` et `body`.
- Ajouter un titre de page visible dans l'onglet du navigateur.
- Ajouter un commentaire HTML.

## Consigne

Dans ton fichier `index.html`, cree une page HTML complete sur le theme de ton choix.

Exemples de theme :

- mon profil ;
- mon hobby ;
- mon restaurant fictif ;
- une association ;
- un club de sport ;
- une page de presentation d'un animal.

## Etapes detaillees

### Etape 1 - Ajouter la structure minimale

Remplace tout le contenu du fichier par :

```html
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Ma premiere page</title>
</head>
<body>

</body>
</html>
```

### Etape 2 - Modifier le titre de l'onglet

Change le contenu de la balise `title`.

Exemple :

```html
<title>La page de Sarah</title>
```

Ce texte ne s'affiche pas dans la page. Il s'affiche dans l'onglet du navigateur.

### Etape 3 - Ajouter un titre visible dans la page

Dans le `body`, ajoute :

```html
<h1>Bienvenue sur ma page</h1>
```

### Etape 4 - Ajouter un paragraphe

Sous le titre, ajoute un paragraphe :

```html
<p>Cette page est mon premier exercice HTML.</p>
```

### Etape 5 - Ajouter un commentaire

Ajoute un commentaire dans le code :

```html
<!-- Ici commence le contenu principal de ma page -->
```

Un commentaire sert a laisser une note dans le code. Il ne s'affiche pas dans la page.

## Resultat attendu

Dans le navigateur, tu dois voir :

- un grand titre ;
- un paragraphe ;
- le bon titre dans l'onglet.

## Checklist avant de rendre

- [ ] Le fichier commence par `<!DOCTYPE html>`.
- [ ] La balise `<html>` contient `lang="fr"`.
- [ ] Le `head` contient `<meta charset="UTF-8">`.
- [ ] Le `title` est personnalise.
- [ ] Le `body` contient un `h1` et un `p`.
- [ ] Le code est indente.

## Bonus

Ajoute un deuxieme paragraphe qui explique pourquoi tu suis ce cours.
