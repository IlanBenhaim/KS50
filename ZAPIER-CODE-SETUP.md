# Configuration du Code JavaScript dans Zapier

Ce guide explique comment intégrer le code JavaScript de conversion de devises dans votre Zap pour calculer automatiquement les montants en EUR et MAD.

## Pourquoi utiliser du code JavaScript dans Zapier ?

Lorsque Zapier ajoute des lignes dans Google Sheets, il les ajoute en dessous des formules existantes. Cela signifie que les formules de conversion que vous pourriez mettre dans Google Sheets ne s'appliqueront pas aux nouvelles lignes.

La solution est d'effectuer la conversion directement dans Zapier avant d'envoyer les données à Google Sheets.

## Étape 1 : Modifier votre Zap existant

1. Connectez-vous à votre compte Zapier
2. Ouvrez le Zap que vous avez créé précédemment
3. Cliquez sur "Edit" pour le modifier

## Étape 2 : Ajouter une étape Code by Zapier

1. Après l'étape Webhook (trigger), cliquez sur le "+" pour ajouter une nouvelle étape
2. Recherchez et sélectionnez "Code by Zapier"
3. Choisissez "Run JavaScript"

## Étape 3 : Configurer le code JavaScript

1. Dans la section "Input Data", assurez-vous que toutes les données du webhook sont disponibles
2. Dans la section "Code", copiez-collez le code suivant :

```javascript
// Fonction asynchrone pour obtenir le taux de change EUR/MAD du jour
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

// Récupérer les données du webhook
const devise = inputData.devise;
const montant = parseFloat(inputData.montant) || 0;

// Récupérer le taux de change du jour
const tauxChange = await fetchExchangeRate();

// Calculer les montants dans les deux devises
let montantEUR = 0;
let montantMAD = 0;

if (devise === 'euro') {
  // Si le montant est en euros, le garder tel quel et calculer l'équivalent en dirhams
  montantEUR = montant;
  montantMAD = Math.round(montant * tauxChange);
} else {
  // Si le montant est en dirhams, calculer l'équivalent en euros
  montantMAD = montant;
  montantEUR = Math.round((montant / tauxChange) * 100) / 100; // Arrondi à 2 décimales
}

// Retourner les résultats pour les étapes suivantes du Zap
output = {
  ...inputData, // Garder toutes les données d'origine
  montantEUR: montantEUR,
  montantMAD: montantMAD,
  tauxChange: tauxChange
};
```

3. Cliquez sur "Continue" pour tester le code

## Étape 4 : Mettre à jour l'action Google Sheets

1. Dans l'étape Google Sheets, mettez à jour les mappages de colonnes :
   - **Montant EUR** → `montantEUR` (du Code step)
   - **Montant MAD** → `montantMAD` (du Code step)
   - **Taux Change** → `tauxChange` (du Code step)

2. Assurez-vous que les autres champs sont toujours correctement mappés :
   - **Timestamp** → `timestamp`
   - **Prénom** → `prenom`
   - **Nom** → `nom`
   - **Email** → `email`
   - **Téléphone** → `telephoneComplet`
   - **Montant** → `montant` (montant original)
   - **Devise** → `devise`
   - **Statut** → "En attente" (valeur fixe)

## Étape 5 : Mettre à jour les emails

1. Dans les étapes d'email, vous pouvez maintenant inclure les montants convertis :
   - Pour l'email Euro : `{{montantMAD}} MAD (équivalent)`
   - Pour l'email Dirham : `{{montantEUR}} EUR (équivalent)`

2. Vous pouvez également inclure le taux de change utilisé :
   - `Taux de change utilisé : 1 EUR = {{tauxChange}} MAD`

## Étape 6 : Tester le Zap complet

1. Testez le Zap complet en soumettant un formulaire de test
2. Vérifiez que les données sont correctement converties dans Google Sheets
3. Vérifiez que les emails incluent les montants convertis

## Structure finale du Zap

Votre Zap devrait maintenant avoir cette structure :

1. **Trigger** : Webhooks by Zapier (Catch Hook)
2. **Action 1** : Code by Zapier (Run JavaScript) - Conversion de devises
3. **Action 2** : Google Sheets (Create Spreadsheet Row) - Stockage des données
4. **Action 3** : Path by Zapier - Branchement conditionnel selon la devise
   - **Chemin A (Euro)** : Email by Zapier - Email avec RIB français
   - **Chemin B (Dirham)** : Email by Zapier - Email avec RIB marocain
5. **Action 4** : Email by Zapier - Notification à l'organisateur

## Avantages de cette approche

- **Taux de change dynamique** : Utilise le taux EUR/MAD du jour
- **Calculs précis** : Conversion effectuée avant l'insertion dans Google Sheets
- **Pas besoin de formules** : Les données sont déjà calculées
- **Données cohérentes** : Les mêmes valeurs sont utilisées partout (emails, sheets, API)
- **Historique des taux** : Le taux utilisé pour chaque conversion est enregistré

## Limites et alternatives

- **Limite d'API** : L'API ExchangeRate a une limite de requêtes gratuites
- **Alternative 1** : Utiliser un taux fixe en remplaçant `fetchExchangeRate()` par une valeur constante
- **Alternative 2** : Utiliser une autre API de taux de change avec une clé API

---

Cette solution garantit que vos données de conversion sont toujours correctes, même si Zapier ajoute des lignes en dessous des formules dans Google Sheets.

