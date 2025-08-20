# Configuration du Compteur Centralisé

Ce guide explique comment configurer un compteur centralisé pour afficher en temps réel le montant total collecté et le nombre de contributeurs sur le formulaire.

## Problématique

Le stockage local (localStorage) utilisé par défaut présente plusieurs limitations :
- Les données sont stockées uniquement sur le navigateur de l'utilisateur
- Chaque visiteur voit uniquement ses propres contributions
- Impossible d'avoir une vue d'ensemble centralisée
- Pas de synchronisation entre les différents utilisateurs

## Solution : API Google Sheets

Nous allons utiliser Google Apps Script pour créer une API qui expose les données de votre Google Sheets en temps réel.

### Avantages
- Centralisation des données
- Mise à jour en temps réel
- Sécurité (contrôle d'accès)
- Gratuit et facile à mettre en place
- Compatible avec Zapier

## Étape 1 : Préparer Google Sheets

1. Assurez-vous que votre Google Sheets est correctement configuré avec Zapier
2. Vérifiez que les colonnes suivantes existent :
   - Colonne H : Montants en euros
   - Colonne I : Montants en dirhams

## Étape 2 : Créer le script Google Apps Script

1. Ouvrez votre Google Sheets
2. Allez dans **Extensions > Apps Script**
3. Supprimez tout le code existant
4. Copiez-collez le code du fichier `google-sheets-api.js` fourni
5. Vérifiez les constantes en haut du script :
   ```javascript
   const SHEET_NAME = "Feuille 1"; // Nom de votre feuille de calcul
   const EURO_COLUMN = "H"; // Colonne des montants en euros
   const MAD_COLUMN = "I";  // Colonne des montants en dirhams
   ```
6. Modifiez ces valeurs si nécessaire pour correspondre à votre Google Sheets
7. Cliquez sur **Enregistrer** (icône disquette)

## Étape 3 : Déployer l'API

1. Dans l'éditeur Apps Script, cliquez sur **Déployer > Nouveau déploiement**
2. Sélectionnez **Type de déploiement : Application web**
3. Configurez les paramètres :
   - **Description** : "API Cagnotte Anniversaire"
   - **Exécuter en tant que** : "Moi" (votre compte Google)
   - **Qui a accès** : "Tout le monde"
4. Cliquez sur **Déployer**
5. Autorisez les permissions demandées
6. **Copiez l'URL de l'application web** qui est générée

## Étape 4 : Configurer le formulaire

1. Ouvrez le fichier `index.html`
2. Localisez les lignes suivantes (vers la ligne 550) :
   ```javascript
   // URL de l'API pour le compteur centralisé (à remplacer par votre URL de déploiement Google Apps Script)
   const COUNTER_API_URL = 'VOTRE_URL_GOOGLE_APPS_SCRIPT_ICI';
   const USE_CENTRALIZED_COUNTER = false; // Mettre à true une fois l'API configurée
   ```
3. Remplacez `'VOTRE_URL_GOOGLE_APPS_SCRIPT_ICI'` par l'URL copiée à l'étape précédente
4. Changez `USE_CENTRALIZED_COUNTER` à `true`
5. Enregistrez le fichier et redéployez

## Étape 5 : Tester le compteur centralisé

1. Ouvrez le formulaire dans votre navigateur
2. Vérifiez que le compteur affiche les données de Google Sheets
3. Soumettez un test et vérifiez que le compteur se met à jour
4. Ouvrez le formulaire dans un autre navigateur pour confirmer que les données sont partagées

## Résolution des problèmes CORS

Si vous rencontrez des erreurs CORS, suivez ces étapes :

1. Dans Google Apps Script, ajoutez cette ligne au début de la fonction `doGet` :
   ```javascript
   var output = ContentService.createTextOutput();
   output.setMimeType(ContentService.MimeType.JSON);
   output.addHeader('Access-Control-Allow-Origin', '*');
   ```

2. Redéployez l'application web (créez un nouveau déploiement)

3. Mettez à jour l'URL dans votre fichier `index.html`

## Mode Fallback

Le formulaire est conçu pour utiliser le stockage local comme fallback si l'API n'est pas accessible. Cela garantit que le formulaire reste fonctionnel même en cas de problème avec l'API.

## Mise à jour automatique

Le compteur se met à jour automatiquement dans ces situations :
1. Au chargement de la page
2. Après chaque contribution
3. Toutes les 5 minutes (si la page reste ouverte)

## Sécurité

- L'API est en lecture seule (GET uniquement)
- Les données sont écrites uniquement via Zapier (sécurisé)
- L'accès à Google Sheets est contrôlé par votre compte Google
- Aucune donnée personnelle n'est exposée via l'API

## Personnalisation avancée

Pour personnaliser davantage le compteur, vous pouvez :

1. Modifier la fréquence de rafraîchissement :
   ```javascript
   // Rafraîchir toutes les 5 minutes (300000 ms)
   setInterval(loadCagnotteData, 300000);
   ```

2. Ajouter des animations lors des mises à jour :
   ```javascript
   function updateCagnotteDisplay(totalEur, count) {
       // Ajouter une classe pour l'animation
       document.getElementById('totalAmount').classList.add('updated');
       // Mettre à jour les valeurs
       document.getElementById('totalAmount').textContent = `${Math.round(totalEur)} €`;
       // Retirer la classe après l'animation
       setTimeout(() => {
           document.getElementById('totalAmount').classList.remove('updated');
       }, 1000);
   }
   ```

3. Ajouter des statistiques supplémentaires :
   ```javascript
   function getCagnotteData() {
       // Ajouter des statistiques supplémentaires
       return {
           totalEUR: totalEUR,
           totalMAD: totalMAD,
           contributorCount: contributorCount,
           averageContribution: totalEUR / contributorCount,
           // ...
       };
   }
   ```

---

Cette solution vous permet d'avoir un compteur centralisé qui reflète l'état réel de la cagnotte pour tous les visiteurs du formulaire.

