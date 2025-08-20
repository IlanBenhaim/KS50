# Guide pour récupérer les statistiques de l'API dans Zapier

Ce guide explique comment récupérer les statistiques de la cagnotte depuis l'API Google Sheets et les inclure dans un email aux administrateurs.

## Vue d'ensemble

L'API Google Sheets que nous avons configurée expose les statistiques suivantes :
- Montant total en euros
- Montant total en dirhams
- Nombre de contributeurs
- Pourcentage d'objectif atteint
- Date de dernière mise à jour

Ce code JavaScript pour Zapier récupère ces statistiques et les formate pour les inclure dans un email.

## Configuration dans Zapier

### Étape 1 : Créer un nouveau Zap pour l'email administrateur

1. Connectez-vous à votre compte Zapier
2. Créez un nouveau Zap
3. Choisissez un déclencheur approprié :
   - **Option A** : Schedule (pour envoyer un rapport périodique)
   - **Option B** : Webhook (pour envoyer un rapport après chaque contribution)
   - **Option C** : Google Sheets (pour envoyer un rapport quand certaines conditions sont remplies)

### Étape 2 : Ajouter une étape Code by Zapier

1. Ajoutez une étape "Code by Zapier"
2. Sélectionnez "Run JavaScript"
3. Copiez-collez le code du fichier `zapier-api-stats.js`
4. Modifiez la constante `API_URL` avec l'URL de votre API Google Sheets :
   ```javascript
   const API_URL = 'https://script.google.com/macros/s/AKfycbwSiezxBcc3_8KvAp8Osj2eyfVcYJWvkl0qYwsjyiJnbRzbSRaLOX4RGP_nX4oAsxJxPQ/exec';
   ```
5. Cliquez sur "Continue" pour tester le code

### Étape 3 : Ajouter une étape Email by Zapier

1. Ajoutez une étape "Email by Zapier"
2. Configurez les champs suivants :
   - **To** : Email des administrateurs
   - **Subject** : "📊 Rapport de la cagnotte - Anniversaire Kamal & Sabry"
   - **Body** : Utilisez le champ `statsHTML` pour une version formatée ou `statsText` pour une version texte

Exemple de corps d'email HTML :
```html
<h1>Rapport de la cagnotte - Anniversaire Kamal & Sabry</h1>

{{statsHTML}}

<p>Vous pouvez consulter les détails complets dans <a href="LIEN_VERS_GOOGLE_SHEETS">Google Sheets</a>.</p>
```

### Étape 4 : Tester et activer le Zap

1. Testez chaque étape pour vous assurer que tout fonctionne correctement
2. Activez le Zap

## Champs disponibles pour l'email

Le code génère les champs suivants que vous pouvez utiliser dans votre email :

| Champ | Description | Exemple |
|-------|-------------|---------|
| `statsHTML` | Bloc HTML complet avec toutes les statistiques | (HTML formaté) |
| `statsText` | Version texte des statistiques | (Texte formaté) |
| `totalEUR` | Montant total en euros | 1250 |
| `totalMAD` | Montant total en dirhams | 13562 |
| `contributorCount` | Nombre de contributeurs | 15 |
| `percentComplete` | Pourcentage d'objectif atteint | 17.85 |
| `lastUpdate` | Date de dernière mise à jour | 19/08/2025 14:30 |

## Options avancées

### Rapport périodique automatique

Pour envoyer un rapport périodique aux administrateurs :

1. Utilisez le déclencheur "Schedule by Zapier"
2. Configurez la fréquence souhaitée (quotidien, hebdomadaire, etc.)
3. Suivez les étapes 2-4 ci-dessus

### Rapport après chaque contribution

Pour envoyer un rapport après chaque nouvelle contribution :

1. Utilisez le même déclencheur Webhook que pour le formulaire principal
2. Ajoutez une condition "Filter by Zapier" pour éviter d'envoyer trop d'emails
3. Suivez les étapes 2-4 ci-dessus

### Rapport conditionnel

Pour envoyer un rapport uniquement lorsque certaines conditions sont remplies :

1. Utilisez le déclencheur "Google Sheets" pour surveiller votre feuille de calcul
2. Configurez une condition (par exemple, quand le total dépasse un certain montant)
3. Suivez les étapes 2-4 ci-dessus

## Personnalisation du format HTML

Vous pouvez personnaliser le format HTML des statistiques en modifiant la variable `statsHTML` dans le code. Le format actuel est conçu pour être responsive et compatible avec la plupart des clients email.

## Résolution des problèmes

### Problème : Les statistiques ne sont pas à jour

- Vérifiez que l'URL de l'API est correcte
- Assurez-vous que l'API Google Sheets est déployée et accessible
- Vérifiez les logs dans Zapier pour voir les erreurs éventuelles

### Problème : L'email n'est pas formaté correctement

- Certains clients email peuvent ne pas prendre en charge tout le HTML
- Utilisez la version texte (`statsText`) comme alternative
- Simplifiez le HTML si nécessaire

---

Ce guide vous permet d'intégrer facilement les statistiques de la cagnotte dans vos emails administrateurs, vous donnant ainsi une vue d'ensemble de la progression de la collecte.

