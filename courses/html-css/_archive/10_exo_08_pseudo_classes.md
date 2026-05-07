# Exercice 08 - Ajouter des effets avec les pseudo-classes

> À faire dans le PDF : après la page/slide 101, quand les pseudo-classes ont été vues.

## Objectif

Rendre certains éléments interactifs et mieux gérer les états visuels.

## Énoncé

Ajoute des effets CSS sur ton menu, tes liens, tes boutons ou tes cartes. L'utilisateur doit voir une différence quand il survole un élément, quand un élément reçoit le focus ou quand certains éléments d'une liste sont ciblés selon leur position.

Les effets doivent rester utiles et lisibles. Ils ne doivent pas déplacer brutalement la mise en page.

## Contraintes

- Au moins un effet `:hover` doit être utilisé.
- Au moins un effet `:focus` doit être utilisé.
- Au moins un élément doit être ciblé avec `:first-child` ou `:last-child`.
- Au moins une liste ou série d'éléments doit utiliser `:nth-child`.
- Les liens doivent rester reconnaissables.
- Le focus clavier doit être visible.
- Les effets ne doivent pas rendre le texte illisible.

## Résultat attendu

La page réagit aux interactions de base. Le menu ou les cartes donnent un retour visuel clair sans casser la lisibilité.

## Idée de rendu

<div class="render-example render-states">
  <nav>
    <span>Accueil</span>
    <span class="is-hovered">Survol</span>
    <span class="is-focused">Focus</span>
  </nav>
  <ul>
    <li>Élément 1</li>
    <li>Élément 2</li>
    <li>Élément 3</li>
    <li>Élément 4</li>
  </ul>
</div>

## Checklist

- `:hover` est utilisé.
- `:focus` est utilisé.
- `:first-child` ou `:last-child` est utilisé.
- `:nth-child` est utilisé.
- Le focus clavier est visible.
- Les effets sont cohérents avec le style de la page.
- Aucun effet ne crée de décalage gênant.

## Bonus

Ajoute un effet `:active` sur un bouton ou un lien.
