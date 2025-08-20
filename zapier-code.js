/**
 * Code JavaScript pour Zapier - Conversion de devises
 * 
 * Ce code est à utiliser dans une étape "Code by Zapier" dans votre Zap,
 * juste après le trigger Webhook et avant l'action Google Sheets.
 * 
 * Il récupère le taux de change EUR/MAD du jour et calcule automatiquement
 * les montants dans les deux devises, quelle que soit la devise d'origine.
 */

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

