# Exercice 03 - Ajouter des liens, des images et des ancres

> À faire dans le PDF : après la page/slide 37, quand les liens, ancres, images et figures ont été vus.

## Objectif

Ajouter de la navigation interne, un lien externe et du contenu visuel à ta page.

## Énoncé

Améliore ta page pour qu'elle ne soit plus seulement un texte linéaire. Le visiteur doit pouvoir accéder rapidement à certaines parties grâce à un menu interne, ouvrir une ressource externe utile et voir au moins une image liée au sujet.

Choisis une image pertinente, range-la dans le dossier `images` et intègre-la proprement dans la page avec une description accessible.

## Contraintes

- La page doit contenir un menu de navigation interne.
- Au moins deux liens du menu doivent envoyer vers des sections de la même page.
- Les sections ciblées doivent avoir des identifiants uniques.
- La page doit contenir au moins un lien vers un site externe.
- Le lien externe doit être configuré correctement s'il s'ouvre dans un nouvel onglet.
- Au moins une image doit être affichée.
- L'image doit avoir un texte alternatif utile.
- Au moins une image doit être accompagnée d'une légende.
- Le nom du fichier image ne doit contenir ni espace ni accent.

## Résultat attendu

Le menu interne fonctionne, le lien externe s'ouvre correctement et l'image s'affiche avec une légende claire.

## Idée de rendu

<div class="render-example render-browser">
  <div class="render-browser-bar">
    <span></span><span></span><span></span>
    <strong>Page avec navigation</strong>
  </div>
  <div class="render-link-page">
    <nav>
      <span>Présentation</span>
      <span>Galerie</span>
      <span>Ressource</span>
    </nav>
    <div class="render-image-placeholder">Image</div>
    <p>Une légende courte explique ce que montre l'image.</p>
  </div>
</div>

## Checklist

- Les ancres internes fonctionnent.
- Les identifiants sont uniques.
- Le lien externe fonctionne.
- L'image s'affiche.
- L'attribut `alt` décrit vraiment l'image.
- La légende apporte une information utile.
- Les noms de fichiers sont propres.

## Bonus

Ajoute un lien permettant de revenir en haut de la page.
