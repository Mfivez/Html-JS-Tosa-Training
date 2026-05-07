# Exercice 11 - Rendre la page lisible sur mobile

> À faire dans le PDF : après la page/slide 151, quand le responsive design a été vu.

## Objectif

Adapter ta page pour qu'elle reste utilisable sur petit écran.

## Énoncé

Teste ta page en réduisant la largeur du navigateur. Repère ce qui devient difficile à lire ou à utiliser : menu, cartes, images, formulaire, tableau, marges ou taille du texte.

Ajoute ensuite les règles nécessaires pour améliorer l'affichage mobile. Le but n'est pas de créer une deuxième page, mais d'adapter la même page selon la largeur de l'écran.

## Contraintes

- La page doit contenir la balise viewport.
- Le CSS doit contenir au moins une media query.
- La media query doit cibler les petits écrans.
- Au moins trois propriétés doivent changer dans la media query.
- Les images ne doivent pas déborder de l'écran.
- Le menu doit rester utilisable.
- Les cartes ou blocs doivent rester lisibles.
- Le formulaire doit rester confortable à remplir.
- Le tableau doit rester consultable.
- La page ne doit pas créer de scroll horizontal inutile.

## Résultat attendu

Quand la fenêtre devient étroite, la page reste lisible et utilisable. Le visiteur ne doit pas avoir besoin de zoomer ou de scroller horizontalement pour lire le contenu principal.

## Idée de rendu

<div class="render-example render-responsive-preview">
  <div class="render-desktop">
    <span>Desktop</span>
    <div></div><div></div><div></div>
  </div>
  <div class="render-mobile">
    <span>Mobile</span>
    <div></div><div></div><div></div>
  </div>
</div>

## Checklist

- Le viewport est présent.
- Une media query est présente.
- Au moins trois styles changent en petit écran.
- Les images sont fluides.
- Le menu reste utilisable.
- Les cartes restent lisibles.
- Le formulaire reste lisible.
- Le tableau reste consultable.
- Il n'y a pas de débordement horizontal gênant.

## Bonus

Ajoute une solution spécifique pour rendre le tableau plus confortable sur mobile.
