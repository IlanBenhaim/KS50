# Guide d'intégration du code JavaScript dans Zapier

Ce guide explique comment intégrer le code JavaScript de conversion de devises dans votre Zap, en utilisant votre code de taux de change existant.

## Structure du Zap

Votre Zap devrait avoir cette structure :

1. **Trigger** : Webhooks by Zapier (Catch Hook)
2. **Action 1** : Code by Zapier (Run JavaScript) - Conversion de devises
3. **Action 2** : Google Sheets (Create Spreadsheet Row) - Stockage des données
4. **Action 3** : Path by Zapier - Branchement conditionnel selon la devise
   - **Chemin A (Euro)** : Email by Zapier - Email avec RIB français
   - **Chemin B (Dirham)** : Email by Zapier - Email avec RIB marocain
5. **Action 4** : Email by Zapier - Notification à l'organisateur

## Étape 1 : Configurer l'étape Code by Zapier

1. Dans votre Zap, après le trigger Webhook, ajoutez une étape "Code by Zapier"
2. Sélectionnez "Run JavaScript"
3. Copiez-collez le code du fichier `zapier-code-optimise.js`
4. Remplacez la section "CALCUL DU TAUX" par votre code de taux de change existant

## Étape 2 : Intégrer votre code de taux de change existant

Localisez cette section dans le code :

```javascript
// ====================================================================
// 2. CALCUL DU TAUX : Insérez votre code de taux de change ici
// ====================================================================
// REMPLACEZ CETTE SECTION PAR VOTRE CODE DE TAUX DE CHANGE EXISTANT

// Exemple de code pour récupérer le taux (à remplacer par votre code)
let tauxChange = 10.85; // Valeur par défaut

// Si vous avez une fonction qui récupère le taux, utilisez-la ici
// tauxChange = await votreFonctionTauxDeChange();
```

Remplacez cette section par votre code de taux de change existant. Assurez-vous que votre code définit une variable `tauxChange` qui sera utilisée pour les calculs de conversion.

## Étape 3 : Configurer Google Sheets

Dans l'étape Google Sheets, mappez les colonnes comme suit :

| Colonne Google Sheets | Champ Zapier |
|-----------------------|--------------|
| Timestamp | `{{timestamp}}` |
| Prénom | `{{prenom}}` |
| Nom | `{{nom}}` |
| Email | `{{email}}` |
| Téléphone | `{{telephoneComplet}}` |
| Montant | `{{montant}}` |
| Devise | `{{devise}}` |
| Montant EUR | `{{montantEUR}}` |
| Montant MAD | `{{montantMAD}}` |
| Taux Change | `{{tauxChange}}` |
| Statut | "En attente" (valeur fixe) |

## Étape 4 : Configurer les emails conditionnels

Dans les étapes d'email, vous pouvez utiliser les champs calculés :

### Email pour les contributions en euros

```html
<p>Votre contribution de <strong>{{montant}} {{devise}}</strong> a été enregistrée.</p>
<p>Équivalent en dirhams : <strong>{{montantMAD}} MAD</strong></p>
<p>Taux de change utilisé : 1 EUR = {{tauxChange}} MAD</p>
```

### Email pour les contributions en dirhams

```html
<p>Votre contribution de <strong>{{montant}} {{devise}}</strong> a été enregistrée.</p>
<p>Équivalent en euros : <strong>{{montantEUR}} EUR</strong></p>
<p>Taux de change utilisé : 1 EUR = {{tauxChange}} MAD</p>
```

## Exemple de code pour le taux de change

Si vous n'avez pas encore de code pour le taux de change, voici un exemple que vous pouvez utiliser :

```javascript
// Fonction pour obtenir le taux de change EUR/MAD du jour
async function fetchExchangeRate() {
  try {
    // Utiliser l'API ExchangeRate pour obtenir le taux du jour
    const response = await fetch('https://api.exchangerate-api.com/v4/latest/EUR');
    const data = await response.json();
    
    // Récupérer le taux EUR/MAD (1 EUR = X MAD)
    const rate = data.rates.MAD;
    
    // Arrondir à 2 décimales
    return Math.round(rate * 100) / 100;
  } catch (error) {
    // En cas d'erreur, utiliser un taux par défaut
    console.error('Erreur lors de la récupération du taux de change:', error);
    return 10.85; // Taux par défaut
  }
}

// Récupérer le taux de change du jour
const tauxChange = await fetchExchangeRate();
```

## Tester votre Zap

1. Cliquez sur "Test & Continue" pour tester l'étape Code
2. Vérifiez que les champs `montantEUR`, `montantMAD` et `tauxChange` sont correctement calculés
3. Continuez à tester les étapes suivantes du Zap
4. Une fois que tout fonctionne, activez votre Zap

## Résolution des problèmes

### Problème : Le code ne s'exécute pas correctement

- Vérifiez que vous avez correctement intégré votre code de taux de change
- Assurez-vous que votre code définit bien une variable `tauxChange`
- Testez votre code séparément pour vous assurer qu'il fonctionne

### Problème : Les montants ne sont pas calculés correctement

- Vérifiez que le montant est bien converti en nombre avec `parseFloat(inputData.montant)`
- Assurez-vous que la devise est correctement détectée avec `inputData.devise`
- Vérifiez que le taux de change est un nombre valide

### Problème : Les champs ne sont pas disponibles dans les étapes suivantes

- Assurez-vous que tous les champs sont bien définis dans l'objet `output`
- Vérifiez que vous utilisez les bons noms de champs dans les étapes suivantes

---

Cette solution vous permet d'intégrer facilement votre code de taux de change existant tout en bénéficiant d'une structure claire et bien organisée pour la conversion des montants.

