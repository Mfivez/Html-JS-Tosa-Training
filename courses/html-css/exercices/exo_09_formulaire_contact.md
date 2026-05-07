# Exo 09 - Creer un formulaire de contact

## Moment strategique

A faire apres les slides sur les formulaires, `form`, `input`, `textarea`, `label`, les types de champs et les attributs utiles.

## Objectif

Creer un formulaire simple, clair et utilisable.

## Ce que tu vas apprendre

- Creer un formulaire avec `form`.
- Ajouter des champs avec `input`.
- Associer un `label` a un champ.
- Utiliser les types `text`, `email`, `tel`, `date`, `textarea`.
- Utiliser `required` et `placeholder`.
- Ajouter un bouton d'envoi.

## Consigne

Ajoute une page ou une section "Contact" avec un formulaire.

Le formulaire doit contenir :

1. Nom complet.
2. Adresse email.
3. Telephone.
4. Sujet de la demande.
5. Date souhaitee de contact.
6. Message.
7. Case a cocher d'acceptation.
8. Bouton d'envoi.

## Etapes detaillees

### Etape 1 - Creer la section

```html
<section id="contact">
    <h2>Contact</h2>
</section>
```

### Etape 2 - Ajouter le formulaire

```html
<form action="#" method="post">

</form>
```

Pour l'exercice, `action="#"` suffit. Dans un vrai site, l'action indique ou envoyer les donnees.

### Etape 3 - Ajouter un champ texte avec label

```html
<label for="nom">Nom complet</label>
<input type="text" id="nom" name="nom" placeholder="Ex : Alex Dupont" required>
```

Important :

- le `for` du label doit correspondre a l'`id` du champ ;
- `name` donne un nom a la donnee envoyee ;
- `required` rend le champ obligatoire.

### Etape 4 - Ajouter l'email

```html
<label for="email">Email</label>
<input type="email" id="email" name="email" placeholder="exemple@mail.com" required>
```

Le type `email` permet au navigateur de verifier si la valeur ressemble a une adresse email.

### Etape 5 - Ajouter le telephone

```html
<label for="telephone">Telephone</label>
<input type="tel" id="telephone" name="telephone" placeholder="Ex : 0499 00 00 00">
```

### Etape 6 - Ajouter une liste de sujets

```html
<label for="sujet">Sujet</label>
<select id="sujet" name="sujet" required>
    <option value="">Choisir un sujet</option>
    <option value="information">Demande d'information</option>
    <option value="reservation">Reservation</option>
    <option value="autre">Autre</option>
</select>
```

### Etape 7 - Ajouter une date

```html
<label for="date-contact">Date souhaitee</label>
<input type="date" id="date-contact" name="date-contact">
```

### Etape 8 - Ajouter un message

```html
<label for="message">Message</label>
<textarea id="message" name="message" rows="5" placeholder="Votre message..." required></textarea>
```

### Etape 9 - Ajouter une case a cocher

```html
<label>
    <input type="checkbox" name="accord" required>
    J'accepte d'etre recontacte.
</label>
```

### Etape 10 - Ajouter les boutons

```html
<button type="submit">Envoyer</button>
<button type="reset">Reinitialiser</button>
```

## CSS minimal conseille

```css
form {
    max-width: 600px;
    margin: 24px auto;
}

label {
    display: block;
    margin-top: 12px;
    font-weight: bold;
}

input,
select,
textarea {
    width: 100%;
    padding: 10px;
    margin-top: 4px;
}
```

## Resultat attendu

Le formulaire doit etre lisible, utilisable et contenir des labels clairs.

## Checklist avant de rendre

- [ ] Le formulaire utilise `method="post"`.
- [ ] Chaque champ important a un `label`.
- [ ] Chaque `label for` correspond a un `id`.
- [ ] Les champs importants ont un `name`.
- [ ] Certains champs sont obligatoires avec `required`.
- [ ] Le champ email utilise `type="email"`.
- [ ] Le bouton d'envoi utilise `type="submit"`.

## Bonus

Utilise `:valid` et `:invalid` en CSS pour modifier la bordure des champs valides ou invalides.
