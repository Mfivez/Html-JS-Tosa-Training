# Exercice 04 - Structurer une page avec les balises sémantiques

> À faire dans le PDF : après la page/slide 47, quand les grandes balises de structure ont été vues.

## Objectif

Donner une structure professionnelle à une page HTML.

## Énoncé

Reprends ta page et réorganise-la avec les balises sémantiques adaptées. Le but est que la structure du document soit compréhensible même avant d'ajouter du CSS.

Ta page doit avoir un haut de page, une navigation, une zone principale, plusieurs parties de contenu, au moins un bloc autonome, une information complémentaire et un pied de page.

## Contraintes

- La page doit contenir un `header`.
- La page doit contenir un `nav`.
- La page doit contenir un seul `main`.
- La page doit contenir au moins deux `section`.
- La page doit contenir au moins un `article`.
- La page doit contenir un `aside`.
- La page doit contenir un `footer`.
- Les titres doivent aider à comprendre chaque zone.
- La navigation doit correspondre aux sections de la page.
- L'indentation doit rendre les blocs faciles à identifier.

## Résultat attendu

En lisant le code, on doit comprendre rapidement quelles sont les grandes zones de la page et à quoi elles servent.

## Idée de rendu

<div class="render-example render-wireframe">
  <header>Header</header>
  <nav>Navigation</nav>
  <main>
    <section>Section principale</section>
    <article>Article</article>
    <aside>Aside</aside>
  </main>
  <footer>Footer</footer>
</div>

## Checklist

- Le haut de page est dans un `header`.
- La navigation est dans un `nav`.
- Le contenu principal est dans un unique `main`.
- Les grandes parties sont dans des `section`.
- Au moins un contenu autonome est dans un `article`.
- L'information complémentaire est dans un `aside`.
- Le pied de page est dans un `footer`.
- Le code est bien indenté.

## Bonus

Ajoute une section "Actualités", "Astuces" ou "À retenir" avec deux articles.
