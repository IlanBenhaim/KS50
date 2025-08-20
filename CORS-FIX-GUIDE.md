# Guide de résolution des problèmes CORS pour l'API Google Sheets

Ce guide explique comment résoudre les problèmes CORS (Cross-Origin Resource Sharing) qui peuvent survenir lors de l'utilisation de l'API Google Sheets avec votre formulaire de contribution.

## Comprendre le problème CORS

CORS est un mécanisme de sécurité qui empêche les sites web de faire des requêtes à des domaines différents de celui qui a servi la page. Lorsque votre formulaire (hébergé sur un domaine) tente d'accéder à l'API Google Sheets (sur un autre domaine), le navigateur bloque la requête à moins que le serveur de l'API n'autorise explicitement ces requêtes cross-origin.

## Solution : Mise à jour du script Google Apps Script

1. **Ouvrez votre projet Google Apps Script**
   - Accédez à votre feuille Google Sheets
   - Cliquez sur **Extensions** > **Apps Script**

2. **Remplacez tout le code existant par le nouveau script**
   - Copiez-collez le contenu du fichier `google-sheets-api-cors-fix.js` fourni
   - N'oubliez pas de remplacer `VOTRE_ID_SPREADSHEET` par l'ID réel de votre feuille

3. **Enregistrez le script**
   - Cliquez sur l'icône de disquette ou appuyez sur Ctrl+S (Cmd+S sur Mac)

4. **Créez un nouveau déploiement**
   - Cliquez sur **Déployer** > **Nouveau déploiement**
   - Sélectionnez **Application web** comme type
   - Description : "API Cagnotte CORS Fix"
   - Exécuter en tant que : **Moi**
   - Qui a accès : **Tous, même anonyme**
   - Cliquez sur **Déployer**

5. **Copiez la nouvelle URL de l'application web**
   - Une fois le déploiement terminé, copiez l'URL qui s'affiche

6. **Mettez à jour l'URL dans le formulaire**
   - Ouvrez le fichier `index.html`
   - Recherchez la ligne `const COUNTER_API_URL = '...'`
   - Remplacez l'URL existante par la nouvelle URL

## Vérification de la configuration CORS

Pour vérifier que votre API autorise correctement les requêtes CORS :

1. Ouvrez la console développeur de votre navigateur (F12)
2. Accédez à l'onglet "Réseau" (ou "Network")
3. Rechargez la page du formulaire
4. Recherchez la requête vers votre API Google Sheets
5. Vérifiez les en-têtes de réponse, qui devraient inclure :
   ```
   Access-Control-Allow-Origin: *
   Access-Control-Allow-Methods: GET, POST, OPTIONS
   Access-Control-Allow-Headers: Content-Type
   ```

## Problèmes courants et solutions

### 1. Erreur "No 'Access-Control-Allow-Origin' header"

**Problème :** Le script Google Apps Script ne renvoie pas les en-têtes CORS appropriés.

**Solution :** Assurez-vous que le script contient bien les lignes suivantes dans chaque fonction (doGet, doPost, doOptions) :
```javascript
output.setHeader('Access-Control-Allow-Origin', '*');
```

### 2. Erreur "Preflight response is not successful"

**Problème :** Le navigateur envoie une requête OPTIONS avant la requête principale, et cette requête OPTIONS échoue.

**Solution :** Assurez-vous que la fonction `doOptions` est correctement implémentée dans le script.

### 3. Erreur "Unexpected token in JSON"

**Problème :** La réponse de l'API n'est pas un JSON valide.

**Solution :** Vérifiez que toutes les réponses utilisent `ContentService.createTextOutput().setMimeType(ContentService.MimeType.JSON)`.

## Test de l'API

Pour tester directement votre API :

1. Ouvrez un nouvel onglet dans votre navigateur
2. Collez l'URL de votre API Google Apps Script
3. Vous devriez voir une réponse JSON avec les statistiques de la cagnotte

Si vous voyez une erreur ou une page blanche, vérifiez les journaux d'exécution dans Google Apps Script (menu **Exécution** > **Journaux d'exécution**).

---

Si vous rencontrez toujours des problèmes après avoir suivi ces étapes, n'hésitez pas à me contacter pour une assistance supplémentaire.

