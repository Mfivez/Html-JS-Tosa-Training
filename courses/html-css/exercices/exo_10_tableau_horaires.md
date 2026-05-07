# Exo 10 - Creer et styliser un tableau d'horaires

## Moment strategique

A faire apres les slides sur les tableaux HTML et les proprietes CSS de tableaux.

## Objectif

Creer un tableau lisible pour presenter des horaires, prix ou donnees simples.

## Ce que tu vas apprendre

- Creer un tableau avec `table`, `tr`, `td`.
- Utiliser `th` pour les en-tetes.
- Ajouter un titre avec `caption`.
- Structurer avec `thead`, `tbody`, `tfoot`.
- Styliser les bordures avec `border-collapse`.

## Consigne

Cree un tableau d'horaires pour un cours du soir fictif.

Le tableau doit contenir :

- un titre ;
- une ligne d'en-tete ;
- au moins 4 lignes de contenu ;
- une ligne de pied de tableau ;
- une bordure propre ;
- une couleur differente pour l'en-tete.

## Exemple de donnees

| Jour | Heure | Sujet | Travail autonome |
|---|---|---|---|
| Mardi | 18h00 - 21h00 | HTML de base | Relire les balises |
| Jeudi | 18h00 - 21h00 | Texte et listes | Finir l'exercice 02 |
| Mardi | 18h00 - 21h00 | CSS | Styliser la page |
| Jeudi | 18h00 - 21h00 | Formulaires | Creer un formulaire |

## Etapes detaillees

### Etape 1 - Creer la base du tableau

```html
<table>
    <caption>Planning du cours HTML & CSS</caption>
    <tr>
        <th>Jour</th>
        <th>Heure</th>
        <th>Sujet</th>
        <th>Travail autonome</th>
    </tr>
    <tr>
        <td>Mardi</td>
        <td>18h00 - 21h00</td>
        <td>HTML de base</td>
        <td>Relire les balises</td>
    </tr>
</table>
```

### Etape 2 - Structurer avec `thead` et `tbody`

```html
<table>
    <caption>Planning du cours HTML & CSS</caption>
    <thead>
        <tr>
            <th>Jour</th>
            <th>Heure</th>
            <th>Sujet</th>
            <th>Travail autonome</th>
        </tr>
    </thead>
    <tbody>
        <!-- lignes ici -->
    </tbody>
</table>
```

### Etape 3 - Ajouter un pied de tableau

```html
<tfoot>
    <tr>
        <td colspan="4">Planning indicatif - peut evoluer selon le rythme du groupe.</td>
    </tr>
</tfoot>
```

`colspan="4"` signifie que la cellule prend la largeur de 4 colonnes.

### Etape 4 - Styliser le tableau

```css
table {
    width: 100%;
    border-collapse: collapse;
    margin: 24px 0;
}

caption {
    font-weight: bold;
    margin-bottom: 8px;
}

th,
td {
    border: 1px solid #cccccc;
    padding: 10px;
    text-align: left;
}

th {
    background-color: #264653;
    color: white;
}
```

## Resultat attendu

Le tableau doit etre lisible et clairement structure.

## Checklist avant de rendre

- [ ] Le tableau a une balise `caption`.
- [ ] Les en-tetes utilisent `th`.
- [ ] Le tableau contient `thead`.
- [ ] Le tableau contient `tbody`.
- [ ] Le tableau contient `tfoot`.
- [ ] J'ai utilise `border-collapse: collapse`.
- [ ] J'ai utilise `colspan` au moins une fois.

## Bonus

Utilise `:nth-child(even)` pour colorer une ligne sur deux dans le `tbody`.
