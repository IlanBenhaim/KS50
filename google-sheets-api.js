/**
 * Google Apps Script pour exposer les données de la cagnotte
 * 
 * Ce script doit être déployé en tant qu'application web dans Google Apps Script
 * lié à votre Google Sheets contenant les contributions.
 * 
 * Instructions de déploiement :
 * 1. Ouvrez votre Google Sheets contenant les contributions
 * 2. Allez dans Extensions > Apps Script
 * 3. Copiez-collez ce code
 * 4. Cliquez sur Déployer > Nouvelle déploiement
 * 5. Sélectionnez "Application web"
 * 6. Définissez les paramètres :
 *    - Description : "API Cagnotte Anniversaire"
 *    - Exécuter en tant que : "Moi"
 *    - Qui a accès : "Tout le monde"
 * 7. Cliquez sur "Déployer"
 * 8. Copiez l'URL générée
 * 9. Mettez à jour la variable COUNTER_API_URL dans index.html
 */

// Configuration
const SHEET_NAME = "Feuille 1"; // Nom de votre feuille de calcul
const EURO_COLUMN = "H"; // Colonne des montants en euros
const MAD_COLUMN = "I";  // Colonne des montants en dirhams

/**
 * Fonction principale qui sera appelée par les requêtes GET
 */
function doGet(e) {
  // Activer CORS pour permettre l'accès depuis n'importe quel domaine
  var output = ContentService.createTextOutput();
  output.setMimeType(ContentService.MimeType.JSON);
  
  try {
    // Récupérer les données
    const data = getCagnotteData();
    
    // Retourner les données au format JSON
    output.setContent(JSON.stringify(data));
    return output;
  } catch (error) {
    // En cas d'erreur, retourner un message d'erreur
    output.setContent(JSON.stringify({
      error: true,
      message: error.toString()
    }));
    return output;
  }
}

/**
 * Récupère les données de la cagnotte depuis la feuille de calcul
 */
function getCagnotteData() {
  // Ouvrir la feuille de calcul active
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(SHEET_NAME);
  
  if (!sheet) {
    throw new Error(`Feuille "${SHEET_NAME}" introuvable`);
  }
  
  // Récupérer toutes les données
  const dataRange = sheet.getDataRange();
  const values = dataRange.getValues();
  
  // Ignorer la première ligne (en-têtes)
  const contributionsData = values.slice(1);
  
  // Calculer les totaux
  let totalEUR = 0;
  let totalMAD = 0;
  let contributorCount = 0;
  
  contributionsData.forEach(row => {
    // Vérifier si la ligne contient des données valides
    if (row[0]) { // Si la première colonne (timestamp) n'est pas vide
      contributorCount++;
      
      // Ajouter les montants (colonnes H et I, indices 7 et 8)
      const eurAmount = parseFloat(row[7]) || 0;
      const madAmount = parseFloat(row[8]) || 0;
      
      totalEUR += eurAmount;
      totalMAD += madAmount;
    }
  });
  
  // Calculer le pourcentage d'objectif atteint (basé sur EUR)
  const objectiveEUR = 7000;
  const percentComplete = Math.min((totalEUR / objectiveEUR) * 100, 100);
  
  // Retourner les données formatées
  return {
    totalEUR: Math.round(totalEUR * 100) / 100, // Arrondi à 2 décimales
    totalMAD: Math.round(totalMAD),
    contributorCount: contributorCount,
    percentComplete: Math.round(percentComplete),
    lastUpdate: new Date().toISOString()
  };
}

