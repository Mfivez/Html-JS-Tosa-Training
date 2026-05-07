# Exercice 10 - Créer et styliser un tableau d'horaires

> À faire dans le PDF : après la page/slide 144, quand les tableaux HTML ont été vus.

## Objectif

Présenter des données sous forme de tableau structuré et lisible.

## Énoncé

Ajoute à ta page un tableau qui présente des horaires, un planning, des tarifs, un programme ou toute autre donnée adaptée à ton sujet.

Le tableau doit être compréhensible sans phrase d'explication longue. Il doit avoir un titre, des en-têtes, un corps de tableau et une ligne de conclusion ou de note.

## Contraintes

- Le tableau doit utiliser la balise `table`.
- Le tableau doit avoir un titre avec `caption`.
- Les colonnes doivent avoir des en-têtes.
- Le tableau doit contenir au moins quatre lignes de données.
- Le tableau doit être structuré avec `thead`.
- Le tableau doit être structuré avec `tbody`.
- Le tableau doit contenir un `tfoot`.
- Une cellule doit utiliser `colspan`.
- Le CSS doit rendre les bordures lisibles.
- Les en-têtes doivent être visuellement différents.
- Le tableau doit rester aligné et facile à lire.

## Résultat attendu

Le tableau doit permettre de comparer rapidement les informations. On doit comprendre les colonnes, les lignes et la note finale.

## Idée de rendu

<div class="render-example render-table-preview">
  <table>
    <caption>Planning indicatif</caption>
    <thead>
      <tr>
        <th>Jour</th>
        <th>Heure</th>
        <th>Sujet</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Mardi</td>
        <td>18h</td>
        <td>HTML</td>
      </tr>
      <tr>
        <td>Jeudi</td>
        <td>18h</td>
        <td>CSS</td>
      </tr>
    </tbody>
  </table>
</div>

## Checklist

- Le tableau a un `caption`.
- Les en-têtes utilisent `th`.
- Le tableau contient `thead`.
- Le tableau contient `tbody`.
- Le tableau contient `tfoot`.
- Il y a au moins quatre lignes de données.
- `colspan` est utilisé.
- Les bordures sont stylisées.
- Les en-têtes ressortent.

## Bonus

Ajoute une couleur alternée sur une ligne sur deux.
