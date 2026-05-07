# Exercice 09 - Créer un formulaire de contact

> À faire dans le PDF : après la page/slide 131, quand les formulaires ont été vus.

## Objectif

Créer un formulaire complet, lisible et utilisable.

## Énoncé

Ajoute une section ou une page de contact à ton site. Le formulaire doit permettre à un visiteur d'envoyer une demande claire avec ses coordonnées, un sujet, une date éventuelle et un message.

L'exercice porte surtout sur la qualité de structure : chaque champ doit être compréhensible, correctement nommé et associé à un label.

## Contraintes

- Le formulaire doit utiliser une balise `form`.
- La méthode d'envoi doit être définie.
- Le formulaire doit contenir un champ pour le nom complet.
- Le formulaire doit contenir un champ email.
- Le formulaire doit contenir un champ téléphone.
- Le formulaire doit contenir un choix de sujet.
- Le formulaire doit contenir une date souhaitée de contact.
- Le formulaire doit contenir une zone de message.
- Le formulaire doit contenir une case à cocher d'acceptation.
- Le formulaire doit contenir un bouton d'envoi.
- Les champs importants doivent avoir un `name`.
- Les champs importants doivent avoir un `label`.
- Les labels doivent être correctement liés aux champs.
- Au moins deux champs doivent être obligatoires.
- Le formulaire doit être mis en forme avec le CSS.

## Résultat attendu

Le formulaire doit être facile à remplir, même sans explication orale. Les labels doivent être clairs et les champs doivent être alignés proprement.

## Idée de rendu

<div class="render-example render-form-preview">
  <h2>Contact</h2>
  <label>Nom complet</label>
  <div class="render-input">Alex Dupont</div>
  <label>Email</label>
  <div class="render-input">alex@example.com</div>
  <label>Message</label>
  <div class="render-textarea">Votre message...</div>
  <span class="render-fake-button">Envoyer</span>
</div>

## Checklist

- La balise `form` est utilisée.
- La méthode du formulaire est définie.
- Tous les champs demandés sont présents.
- Les labels sont présents.
- Les labels sont liés aux bons champs.
- Les champs importants ont un `name`.
- Au moins deux champs sont obligatoires.
- Le champ email utilise le type adapté.
- Le bouton d'envoi est présent.
- Le formulaire est lisible.

## Bonus

Ajoute des styles différents pour les champs valides et invalides.
