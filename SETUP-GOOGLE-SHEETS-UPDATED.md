# Guide de configuration Google Sheets pour le formulaire de contribution

Ce guide explique comment configurer Google Sheets et Google Apps Script pour centraliser les données du formulaire de contribution pour l'anniversaire de Kamal & Sabry.

## 1. Création de la feuille Google Sheets

1. Connectez-vous à votre compte Google et accédez à [Google Sheets](https://sheets.google.com)
2. Créez une nouvelle feuille de calcul
3. Renommez la feuille en "Contributions"
4. Configurez les en-têtes suivants dans la première ligne :

| A | B | C | D | E | F | G | H | I |
|---|---|---|---|---|---|---|---|---|
| Timestamp | Prénom | Nom | Email | Téléphone | Montant | Devise | Montant EUR | Montant MAD |

## 2. Configuration de Google Apps Script

1. Dans votre feuille Google Sheets, cliquez sur **Extensions** > **Apps Script**
2. Supprimez tout le code existant dans l'éditeur
3. Copiez-collez le code du fichier `google-sheets-api-updated.js` fourni
4. Remplacez `VOTRE_ID_SPREADSHEET` par l'ID de votre feuille Google Sheets
   - L'ID se trouve dans l'URL de votre feuille : `https://docs.google.com/spreadsheets/d/`**`ID_DE_VOTRE_FEUILLE`**`/edit`
5. Remplacez `SHEET_NAME` par le nom de votre feuille (par défaut "Contributions")
6. Vérifiez que les indices de colonnes correspondent à votre structure (COL_TIMESTAMP = 0, COL_PRENOM = 1, etc.)
7. Cliquez sur **Enregistrer** (icône de disquette)

## 3. Déploiement du script en tant qu'application web

1. Cliquez sur **Déployer** > **Nouveau déploiement**
2. Pour "Type", sélectionnez **Application web**
3. Configurez les paramètres suivants :
   - Description : "API Cagnotte Kamal & Sabry"
   - Exécuter en tant que : **Moi** (votre compte Google)
   - Qui a accès : **Tous, même anonyme**
4. Cliquez sur **Déployer**
5. Autorisez les permissions demandées
6. Copiez l'URL de l'application web qui s'affiche

## 4. Mise à jour du formulaire avec l'URL de l'API

1. Ouvrez le fichier `index.html` dans un éditeur de texte
2. Recherchez la ligne contenant `const COUNTER_API_URL = '...'`
3. Remplacez l'URL existante par celle que vous avez copiée à l'étape précédente
4. Enregistrez le fichier

## 5. Test de l'API

Pour vérifier que votre API fonctionne correctement :

1. Ouvrez l'URL de votre application web dans un navigateur
2. Vous devriez voir un résultat JSON similaire à :
```json
{
  "totalEUR": 0,
  "totalMAD": 0,
  "contributorCount": 0,
  "percentComplete": 0,
  "lastUpdate": "2025-08-20T12:34:56.789Z"
}
```

## 6. Fonctionnalités de l'API

L'API Google Apps Script offre deux fonctionnalités principales :

1. **GET** : Récupère les statistiques actuelles (utilisé par le compteur)
   - Nombre total de contributeurs
   - Montant total en EUR
   - Montant total en MAD
   - Pourcentage de l'objectif atteint

2. **POST** : Ajoute une nouvelle contribution (alternative à Zapier)
   - Envoyer les données du formulaire directement à Google Sheets
   - Format JSON attendu : `{ prenom, nom, email, montant, devise, ... }`
   - Retourne les statistiques mises à jour

## 7. Sécurité et limitations

- L'API est accessible publiquement (nécessaire pour le formulaire)
- Google Apps Script a des limites de quotas :
  - Maximum 20 000 requêtes par jour
  - Maximum 30 secondes d'exécution par requête
- Pour plus de sécurité, vous pouvez ajouter une validation supplémentaire dans le script

## 8. Maintenance

- Vérifiez régulièrement votre feuille Google Sheets pour vous assurer que les données sont correctement enregistrées
- Si vous modifiez la structure de la feuille, mettez à jour les indices de colonnes dans le script
- En cas de problème, consultez les journaux d'exécution dans Google Apps Script (menu **Exécution** > **Journaux d'exécution**)

---

Pour toute question ou assistance supplémentaire, n'hésitez pas à me contacter.

