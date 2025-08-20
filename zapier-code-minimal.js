/**
 * Code JavaScript minimaliste pour Zapier - Conversion de devises
 * 
 * Ce code récupère uniquement les champs nécessaires (montant, devise, taux de change)
 * et calcule les montants en euros et en dirhams.
 */

// Récupération des champs nécessaires
const montant = parseFloat(inputData.montant) || 0;  // inputData.montant = champ "montant" du webhook
const devise = inputData.devise || 'euro';           // inputData.devise = champ "devise" du webhook
const tauxChange = inputData.tauxChange || 10.85;    // inputData.tauxChange = champ "tauxChange" d'une étape précédente

// Calcul des montants en EUR et MAD selon la devise
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

// Retourner uniquement les champs calculés et nécessaires
output = {
  montantEUR: montantEUR,
  montantMAD: montantMAD
};

// Note: Tous les autres champs de inputData sont automatiquement transmis
// aux étapes suivantes par Zapier, pas besoin de les inclure dans output

