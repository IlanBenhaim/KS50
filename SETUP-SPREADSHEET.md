# Guide de configuration du Google Spreadsheet

Ce guide explique comment configurer votre Google Spreadsheet pour qu'il fonctionne correctement avec le formulaire de contribution.

## 1. Structure du Spreadsheet

Assurez-vous que votre feuille de calcul contient une feuille nommée "Contributions" avec les en-têtes suivants dans la première ligne :

| A | B | C | D | E | F | G | H | I |
|---|---|---|---|---|---|---|---|---|
| Timestamp | Prénom | Nom | Email | Téléphone | Montant | Devise | Montant EUR | Montant MAD |

## 2. Configuration des en-têtes

1. Ouvrez votre Google Spreadsheet
2. Renommez la première feuille en "Contributions" (clic droit sur l'onglet > Renommer)
3. Dans la première ligne, ajoutez les en-têtes suivants :
   - A1: Timestamp
   - B1: Prénom
   - C1: Nom
   - D1: Email
   - E1: Téléphone
   - F1: Montant
   - G1: Devise
   - H1: Montant EUR
   - I1: Montant MAD

## 3. Formatage des colonnes

Pour une meilleure lisibilité, vous pouvez formater les colonnes :

1. **Colonnes de montant (F, H, I)**
   - Sélectionnez les colonnes F, H et I
   - Cliquez sur Format > Nombre > Monétaire
   - Choisissez le format approprié (€ pour EUR, aucun symbole pour MAD)

2. **Colonne Timestamp (A)**
   - Sélectionnez la colonne A
   - Cliquez sur Format > Nombre > Date et heure
   - Choisissez le format de date et heure que vous préférez

## 4. Permissions de partage

Pour que le script Google Apps Script puisse accéder à votre feuille de calcul :

1. Cliquez sur le bouton "Partager" en haut à droite
2. Assurez-vous que le compte Google que vous utilisez pour déployer le script a accès en édition
3. Vous n'avez pas besoin de partager la feuille avec d'autres personnes pour que le formulaire fonctionne

## 5. Tableau de bord (optionnel)

Vous pouvez créer une feuille supplémentaire pour afficher un tableau de bord :

1. Créez une nouvelle feuille nommée "Dashboard"
2. Ajoutez des formules pour calculer les totaux :
   ```
   =SOMME(Contributions!H2:H)  // Total EUR
   =SOMME(Contributions!I2:I)  // Total MAD
   =COUNTA(Contributions!A2:A)  // Nombre de contributeurs
   ```

3. Ajoutez des graphiques pour visualiser les contributions

## 6. Vérification

Pour vérifier que tout est correctement configuré :

1. Assurez-vous que le script Google Apps Script est déployé
2. Ouvrez l'URL de l'application web dans un navigateur
3. Vous devriez voir un résultat JSON avec les statistiques actuelles
4. Si vous voyez une erreur, vérifiez que :
   - La feuille est bien nommée "Contributions"
   - Les en-têtes sont correctement placés
   - Les permissions sont correctement configurées

## 7. Maintenance

- Vous pouvez modifier manuellement les données dans le spreadsheet si nécessaire
- Évitez de supprimer ou de renommer les colonnes utilisées par le script
- Si vous ajoutez des colonnes supplémentaires, cela n'affectera pas le fonctionnement du script

---

Pour toute question ou assistance supplémentaire, n'hésitez pas à me contacter.

