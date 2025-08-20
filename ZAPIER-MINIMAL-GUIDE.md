# Guide pour le code JavaScript minimaliste dans Zapier

Ce guide explique comment utiliser le code JavaScript minimaliste pour calculer les montants en euros et en dirhams dans Zapier.

## Structure du Zap

Votre Zap devrait avoir cette structure :

1. **Trigger** : Webhooks by Zapier (Catch Hook)
2. **Action 1** : Code by Zapier (Run JavaScript) - Récupération du taux de change
3. **Action 2** : Code by Zapier (Run JavaScript) - Calcul des montants (ce code)
4. **Action 3** : Google Sheets (Create Spreadsheet Row)
5. **Actions suivantes** : Emails, etc.

## Comment utiliser ce code

### Étape 1 : Récupérer le taux de change

Dans une première étape "Code by Zapier", récupérez le taux de change avec votre code existant.

### Étape 2 : Calculer les montants

1. Ajoutez une nouvelle étape "Code by Zapier"
2. Sélectionnez "Run JavaScript"
3. Copiez-collez le code du fichier `zapier-code-minimal.js`
4. Cliquez sur "Continue" pour tester

### Étape 3 : Utiliser les montants calculés

Dans les étapes suivantes, vous pouvez utiliser :
- `montantEUR` : Montant en euros
- `montantMAD` : Montant en dirhams

## Champs utilisés par le code

Le code utilise uniquement ces champs :
- `inputData.montant` : Montant saisi dans le formulaire
- `inputData.devise` : Devise choisie dans le formulaire (euro ou dirham)
- `inputData.tauxChange` : Taux de change calculé dans l'étape précédente

## Exemple concret

### Étape 1 : Code pour récupérer le taux de change

```javascript
// Votre code existant pour récupérer le taux de change
const tauxChange = 10.85; // Remplacez par votre code réel

// Retourner le taux de change
output = {
  tauxChange: tauxChange
};
```

### Étape 2 : Code pour calculer les montants (ce code)

```javascript
// Récupération des champs nécessaires
const montant = parseFloat(inputData.montant) || 0;
const devise = inputData.devise || 'euro';
const tauxChange = inputData.tauxChange || 10.85;

// Calcul des montants en EUR et MAD selon la devise
let montantEUR = 0;
let montantMAD = 0;

if (devise === 'euro') {
  montantEUR = montant;
  montantMAD = Math.round(montant * tauxChange);
} else {
  montantMAD = montant;
  montantEUR = Math.round((montant / tauxChange) * 100) / 100;
}

// Retourner uniquement les champs calculés
output = {
  montantEUR: montantEUR,
  montantMAD: montantMAD
};
```

### Étape 3 : Google Sheets

Mappez les colonnes comme suit :
- Montant EUR : `{{montantEUR}}`
- Montant MAD : `{{montantMAD}}`
- Taux Change : `{{tauxChange}}`

## Remarques importantes

1. **Transmission automatique** : Zapier transmet automatiquement tous les champs d'une étape à l'autre, donc tous les champs du webhook seront disponibles dans les étapes suivantes, même s'ils ne sont pas explicitement inclus dans `output`.

2. **Valeurs par défaut** : Le code inclut des valeurs par défaut pour éviter les erreurs :
   - Si `montant` n'est pas un nombre valide, il sera défini à 0
   - Si `devise` n'est pas définie, elle sera définie à 'euro'
   - Si `tauxChange` n'est pas défini, il sera défini à 10.85

3. **Arrondi** : Les montants sont arrondis comme suit :
   - Montant en MAD : arrondi à l'entier le plus proche
   - Montant en EUR : arrondi à 2 décimales

---

Ce code minimaliste se concentre uniquement sur le calcul des montants en euros et en dirhams, en utilisant le taux de change que vous avez déjà calculé dans une étape précédente.

