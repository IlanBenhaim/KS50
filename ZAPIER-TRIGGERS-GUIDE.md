# Guide pour configurer les déclencheurs Zapier

Ce guide explique comment configurer deux types de Zaps pour les rapports de statistiques :
1. Un Zap qui se déclenche à chaque nouvelle entrée dans Google Sheets
2. Un Zap qui envoie un rapport quotidien chaque matin

## Zap 1 : Rapport à chaque nouvelle entrée dans Google Sheets

### Étape 1 : Créer un nouveau Zap

1. Connectez-vous à votre compte Zapier
2. Cliquez sur "Create Zap"

### Étape 2 : Configurer le déclencheur Google Sheets

1. Dans la section "Trigger", recherchez et sélectionnez "Google Sheets"
2. Sélectionnez "New Spreadsheet Row" comme événement déclencheur
3. Cliquez sur "Continue"

### Étape 3 : Connecter votre compte Google

1. Sélectionnez votre compte Google ou connectez-en un nouveau
2. Cliquez sur "Continue"

### Étape 4 : Configurer le déclencheur

1. Sélectionnez le Google Drive où se trouve votre feuille de calcul
2. Sélectionnez votre feuille de calcul "Contributions Anniversaire Kamal & Sabry"
3. Sélectionnez la feuille (worksheet) contenant les données (généralement "Feuille 1")
4. Cliquez sur "Continue"
5. Testez le déclencheur pour vous assurer qu'il fonctionne correctement

### Étape 5 : Ajouter l'étape Code by Zapier

1. Cliquez sur "+" pour ajouter une étape
2. Recherchez et sélectionnez "Code by Zapier"
3. Sélectionnez "Run JavaScript"
4. Copiez-collez le code du fichier `zapier-api-stats.js`
5. Assurez-vous que l'URL de l'API est correcte :
   ```javascript
   const API_URL = 'https://script.google.com/macros/s/AKfycbwSiezxBcc3_8KvAp8Osj2eyfVcYJWvkl0qYwsjyiJnbRzbSRaLOX4RGP_nX4oAsxJxPQ/exec';
   ```
6. Cliquez sur "Continue" et testez l'étape

### Étape 6 : Ajouter l'étape Email by Zapier

1. Cliquez sur "+" pour ajouter une étape
2. Recherchez et sélectionnez "Email by Zapier"
3. Configurez les champs suivants :
   - **To** : Email des administrateurs (vous pouvez séparer plusieurs emails par des virgules)
   - **Subject** : "📊 Nouvelle contribution - Rapport de la cagnotte"
   - **Body (HTML)** :
   ```html
   <h1>Nouvelle contribution reçue !</h1>
   
   <p>Une nouvelle contribution a été enregistrée dans Google Sheets :</p>
   <ul>
     <li><strong>Prénom :</strong> {{prenom}}</li>
     <li><strong>Nom :</strong> {{nom}}</li>
     <li><strong>Montant :</strong> {{montant}} {{devise}}</li>
     <li><strong>Email :</strong> {{email}}</li>
   </ul>
   
   <h2>État actuel de la cagnotte :</h2>
   
   {{statsHTML}}
   
   <p>Vous pouvez consulter les détails complets dans <a href="LIEN_VERS_GOOGLE_SHEETS">Google Sheets</a>.</p>
   ```
4. Remplacez `LIEN_VERS_GOOGLE_SHEETS` par le lien vers votre feuille de calcul
5. Cliquez sur "Continue" et testez l'étape

### Étape 7 : Activer le Zap

1. Vérifiez que toutes les étapes fonctionnent correctement
2. Donnez un nom à votre Zap, par exemple "Rapport après nouvelle contribution"
3. Activez le Zap en cliquant sur le bouton d'activation

## Zap 2 : Rapport quotidien chaque matin

### Étape 1 : Créer un nouveau Zap

1. Connectez-vous à votre compte Zapier
2. Cliquez sur "Create Zap"

### Étape 2 : Configurer le déclencheur Schedule

1. Dans la section "Trigger", recherchez et sélectionnez "Schedule by Zapier"
2. Sélectionnez "Every Day" comme événement déclencheur
3. Cliquez sur "Continue"

### Étape 3 : Configurer l'horaire

1. Définissez l'heure à laquelle vous souhaitez recevoir le rapport quotidien (par exemple, 08:00)
2. Sélectionnez votre fuseau horaire
3. Cliquez sur "Continue"
4. Testez le déclencheur

### Étape 4 : Ajouter l'étape Code by Zapier

1. Cliquez sur "+" pour ajouter une étape
2. Recherchez et sélectionnez "Code by Zapier"
3. Sélectionnez "Run JavaScript"
4. Copiez-collez le code du fichier `zapier-api-stats.js`
5. Assurez-vous que l'URL de l'API est correcte :
   ```javascript
   const API_URL = 'https://script.google.com/macros/s/AKfycbwSiezxBcc3_8KvAp8Osj2eyfVcYJWvkl0qYwsjyiJnbRzbSRaLOX4RGP_nX4oAsxJxPQ/exec';
   ```
6. Cliquez sur "Continue" et testez l'étape

### Étape 5 : Ajouter l'étape Email by Zapier

1. Cliquez sur "+" pour ajouter une étape
2. Recherchez et sélectionnez "Email by Zapier"
3. Configurez les champs suivants :
   - **To** : Email des administrateurs (vous pouvez séparer plusieurs emails par des virgules)
   - **Subject** : "📊 Rapport quotidien de la cagnotte - {{formatDate}} now 'DD/MM/YYYY' 'fr'}}"
   - **Body (HTML)** :
   ```html
   <h1>Rapport quotidien de la cagnotte</h1>
   
   <p>Voici l'état actuel de la cagnotte pour l'anniversaire de Kamal & Sabry :</p>
   
   {{statsHTML}}
   
   <h2>Dernières contributions :</h2>
   
   <p>Pour voir les dernières contributions, consultez <a href="LIEN_VERS_GOOGLE_SHEETS">Google Sheets</a>.</p>
   
   <p style="color: #666; font-size: 0.9em;">Ce rapport est généré automatiquement chaque matin.</p>
   ```
4. Remplacez `LIEN_VERS_GOOGLE_SHEETS` par le lien vers votre feuille de calcul
5. Cliquez sur "Continue" et testez l'étape

### Étape 6 : Activer le Zap

1. Vérifiez que toutes les étapes fonctionnent correctement
2. Donnez un nom à votre Zap, par exemple "Rapport quotidien de la cagnotte"
3. Activez le Zap en cliquant sur le bouton d'activation

## Conseils supplémentaires

### Éviter les emails en double

Si vous recevez une contribution tard le soir, vous pourriez recevoir deux emails similaires (un pour la nouvelle contribution et un pour le rapport quotidien du lendemain matin). Pour éviter cela, vous pouvez :

1. Ajouter une étape "Filter by Zapier" dans le Zap quotidien
2. Configurer un filtre qui vérifie si une nouvelle contribution a été reçue dans les dernières 24 heures
3. Si aucune nouvelle contribution n'a été reçue, vous pouvez modifier le sujet de l'email pour indiquer "Aucune nouvelle contribution"

### Personnaliser les rapports

Vous pouvez personnaliser les rapports en fonction de vos besoins :

1. **Rapport après nouvelle contribution** : Mettez en évidence la nouvelle contribution et son impact sur le total
2. **Rapport quotidien** : Incluez des statistiques supplémentaires comme la moyenne des contributions, le nombre de contributions par devise, etc.

### Ajouter des pièces jointes

Vous pouvez également ajouter des pièces jointes aux emails :

1. Utilisez "Google Sheets by Zapier" pour exporter une partie de votre feuille de calcul en CSV ou PDF
2. Ajoutez cette étape avant l'étape Email
3. Incluez le fichier exporté comme pièce jointe dans l'email

---

Ces deux Zaps vous permettront de recevoir des rapports à la fois en temps réel (après chaque nouvelle contribution) et de manière régulière (chaque matin), vous donnant ainsi une vue complète de l'évolution de la cagnotte.

