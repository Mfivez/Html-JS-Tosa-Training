# Exercice 07 - Comprendre le box model avec des cartes

> À faire dans le PDF : après la page/slide 93, quand `width`, `height`, `display`, `margin`, `padding`, `border`, `box-sizing` et les ombres ont été vus.

## Objectif

Utiliser le box model pour créer des cartes propres et espacées.

## Énoncé

Ajoute à ta page une section qui présente trois éléments sous forme de cartes. Les cartes peuvent représenter des services, des activités, des produits, des étapes, des conseils ou des informations liées à ton sujet.

Chaque carte doit former un bloc clair avec du contenu à l'intérieur et de l'espace autour. Le but est de bien distinguer `margin`, `padding`, bordure, arrondi et ombre.

## Contraintes

- La page doit contenir une section dédiée aux cartes.
- La section doit contenir trois cartes.
- Chaque carte doit contenir un titre.
- Chaque carte doit contenir un court texte.
- Chaque carte doit contenir un lien ou un bouton.
- Le CSS doit utiliser `box-sizing: border-box`.
- Les cartes doivent avoir un fond, un padding et une marge.
- Les cartes doivent avoir une bordure ou une ombre.
- Les coins des cartes doivent être arrondis.
- Les cartes doivent être visuellement séparées.

## Résultat attendu

Les trois cartes doivent former une zone claire et agréable à lire. Le contenu ne doit pas coller aux bords des cartes.

## Idée de rendu

<div class="render-example render-card-row">
  <article>
    <h3>Carte 1</h3>
    <p>Description courte.</p>
    <span class="render-fake-button">Action</span>
  </article>
  <article>
    <h3>Carte 2</h3>
    <p>Description courte.</p>
    <span class="render-fake-button">Action</span>
  </article>
  <article>
    <h3>Carte 3</h3>
    <p>Description courte.</p>
    <span class="render-fake-button">Action</span>
  </article>
</div>

## Checklist

- La section de cartes existe.
- Il y a trois cartes.
- Chaque carte a un titre.
- Chaque carte a un texte court.
- Chaque carte a un lien ou un bouton.
- Le padding est visible.
- Les marges séparent les cartes.
- Les bordures, ombres ou arrondis sont visibles.
- Le box model est maîtrisé.

## Bonus

Place les cartes sur une même ligne en grand écran, puis garde-les lisibles quand l'écran devient plus petit.
