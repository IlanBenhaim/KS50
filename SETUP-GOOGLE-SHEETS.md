# Configuration Google Sheets

## Étapes pour configurer l'intégration Google Sheets

### 1. Créer une nouvelle Google Sheets
1. Allez sur [Google Sheets](https://sheets.google.com)
2. Créez une nouvelle feuille de calcul
3. Nommez-la "Contributions Anniversaire Kamal & Sabri"
4. Copiez l'ID de la feuille depuis l'URL (la partie entre `/d/` et `/edit`)

### 2. Configurer Google Apps Script
1. Dans votre Google Sheets, allez dans **Extensions > Apps Script**
2. Supprimez le code par défaut
3. Copiez-collez le contenu du fichier `google-apps-script.js`
4. Remplacez `VOTRE_ID_GOOGLE_SHEETS_ICI` par l'ID de votre feuille
5. Sauvegardez le projet (Ctrl+S)

### 3. Déployer le script
1. Cliquez sur **Déployer > Nouveau déploiement**
2. Choisissez le type : **Application web**
3. Description : "API pour formulaire contributions"
4. Exécuter en tant que : **Moi**
5. Qui a accès : **Tout le monde**
6. Cliquez sur **Déployer**
7. **Copiez l'URL du déploiement** (elle ressemble à : `https://script.google.com/macros/s/...`)

### 4. Configurer le formulaire
1. Ouvrez le fichier `index.html`
2. Trouvez la ligne : `const GOOGLE_SCRIPT_URL = 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE';`
3. Remplacez `YOUR_GOOGLE_APPS_SCRIPT_URL_HERE` par l'URL copiée à l'étape 3

### 5. Mettre à jour les informations bancaires
Dans le fichier `index.html`, remplacez les informations RIB par les vraies :

**Pour la France (Euro) :**
```html
<strong>Bénéficiaire :</strong> [Nom réel]<br>
<strong>IBAN :</strong> [IBAN réel]<br>
<strong>BIC :</strong> [BIC réel]<br>
<strong>Banque :</strong> [Nom de la banque]<br>
```

**Pour le Maroc (Dirham) :**
```html
<strong>Bénéficiaire :</strong> [Nom réel]<br>
<strong>RIB :</strong> [RIB réel]<br>
<strong>Banque :</strong> [Nom de la banque]<br>
<strong>Agence :</strong> [Nom de l'agence]<br>
```

## Structure de la feuille Google Sheets

Le script créera automatiquement les colonnes suivantes :
- **Timestamp** : Date et heure de la contribution
- **Nom** : Nom du contributeur
- **Prénom** : Prénom du contributeur
- **Email** : Email (optionnel)
- **Montant** : Montant de la contribution
- **Devise** : Euro ou Dirham
- **Statut** : En attente/Reçu (à modifier manuellement)

## Fonctionnalités avancées

### Résumé automatique
Le script inclut une fonction `createSummary()` que vous pouvez exécuter pour obtenir un résumé des contributions.

### Formatage automatique
- Les contributions en Euro sont surlignées en bleu clair
- Les contributions en Dirham sont surlignées en rouge clair
- Les en-têtes sont formatés en bleu avec texte blanc

## Sécurité et permissions

⚠️ **Important** : Le script est configuré pour être accessible à "Tout le monde" pour permettre l'envoi depuis le formulaire web. Ceci est nécessaire pour le fonctionnement, mais assurez-vous que seules les personnes autorisées ont accès au lien du formulaire.

## Test de fonctionnement

1. Ouvrez le formulaire dans un navigateur
2. Remplissez tous les champs
3. Soumettez le formulaire
4. Vérifiez que les données apparaissent dans votre Google Sheets

Si vous rencontrez des problèmes, vérifiez :
- L'URL du script dans `index.html`
- Les permissions du script Google Apps Script
- La console du navigateur pour les erreurs JavaScript

