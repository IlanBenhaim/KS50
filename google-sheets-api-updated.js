/**
 * Script Google Apps Script pour exposer les données de la cagnotte
 * 
 * Ce script doit être déployé en tant qu'application web dans Google Apps Script
 * avec accès "Tous, même anonyme" pour permettre au formulaire d'y accéder.
 */

// ID de la feuille Google Sheets (à remplacer par votre ID réel)
const SPREADSHEET_ID = 'VOTRE_ID_SPREADSHEET';
const SHEET_NAME = 'Contributions';

// Colonnes dans la feuille (adapter selon votre structure)
const COL_TIMESTAMP = 0;
const COL_PRENOM = 1;
const COL_NOM = 2;
const COL_EMAIL = 3;
const COL_TELEPHONE = 4;
const COL_MONTANT = 5;
const COL_DEVISE = 6;
const COL_MONTANT_EUR = 7;
const COL_MONTANT_MAD = 8;

// Objectifs de la cagnotte
const OBJECTIVE_EUR = 7000;
const OBJECTIVE_MAD = 70000;

/**
 * Point d'entrée principal pour les requêtes HTTP GET
 */
function doGet() {
  try {
    // Récupérer les données de la feuille
    const stats = getContributionStats();
    
    // Retourner les statistiques au format JSON
    return ContentService.createTextOutput(JSON.stringify(stats))
      .setMimeType(ContentService.MimeType.JSON)
      .setHeader('Access-Control-Allow-Origin', '*');
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      error: true,
      message: error.toString()
    }))
    .setMimeType(ContentService.MimeType.JSON)
    .setHeader('Access-Control-Allow-Origin', '*');
  }
}

/**
 * Point d'entrée pour les requêtes HTTP POST (pour ajouter une contribution)
 */
function doPost(e) {
  try {
    // Vérifier si des données ont été envoyées
    if (!e || !e.postData || !e.postData.contents) {
      throw new Error('Aucune donnée reçue');
    }
    
    // Analyser les données JSON
    const data = JSON.parse(e.postData.contents);
    
    // Valider les données requises
    if (!data.prenom || !data.nom || !data.email || !data.montant || !data.devise) {
      throw new Error('Données incomplètes');
    }
    
    // Ajouter la contribution à la feuille
    addContribution(data);
    
    // Récupérer les statistiques mises à jour
    const stats = getContributionStats();
    
    // Retourner les statistiques au format JSON
    return ContentService.createTextOutput(JSON.stringify({
      success: true,
      message: 'Contribution ajoutée avec succès',
      stats: stats
    }))
    .setMimeType(ContentService.MimeType.JSON)
    .setHeader('Access-Control-Allow-Origin', '*');
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      error: true,
      message: error.toString()
    }))
    .setMimeType(ContentService.MimeType.JSON)
    .setHeader('Access-Control-Allow-Origin', '*');
  }
}

/**
 * Ajoute une nouvelle contribution à la feuille
 */
function addContribution(data) {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = ss.getSheetByName(SHEET_NAME);
  
  // Calculer les montants en EUR et MAD
  const montant = parseFloat(data.montant) || 0;
  let montantEUR = 0;
  let montantMAD = 0;
  
  // Taux de change actuel (à remplacer par une API de taux de change si nécessaire)
  const tauxChange = 10; // 1 EUR = 10 MAD
  
  if (data.devise === 'euro') {
    montantEUR = montant;
    montantMAD = Math.round(montant * tauxChange);
  } else {
    montantMAD = montant;
    montantEUR = Math.round((montant / tauxChange) * 100) / 100;
  }
  
  // Ajouter la ligne à la feuille
  sheet.appendRow([
    new Date(), // Timestamp
    data.prenom,
    data.nom,
    data.email,
    data.telephoneComplet || data.telephone,
    montant,
    data.devise,
    montantEUR,
    montantMAD
  ]);
}

/**
 * Récupère les statistiques des contributions
 */
function getContributionStats() {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = ss.getSheetByName(SHEET_NAME);
  
  // Récupérer toutes les données
  const dataRange = sheet.getDataRange();
  const values = dataRange.getValues();
  
  // Ignorer la ligne d'en-tête
  const dataRows = values.slice(1);
  
  // Calculer les totaux
  let totalEUR = 0;
  let totalMAD = 0;
  
  dataRows.forEach(row => {
    // Utiliser les colonnes de montants convertis si disponibles
    if (row[COL_MONTANT_EUR] !== undefined && !isNaN(row[COL_MONTANT_EUR])) {
      totalEUR += parseFloat(row[COL_MONTANT_EUR]);
    }
    
    if (row[COL_MONTANT_MAD] !== undefined && !isNaN(row[COL_MONTANT_MAD])) {
      totalMAD += parseFloat(row[COL_MONTANT_MAD]);
    }
  });
  
  // Calculer le pourcentage d'objectif atteint
  const percentComplete = Math.min(Math.round((totalEUR / OBJECTIVE_EUR) * 100), 100);
  
  // Retourner les statistiques
  return {
    totalEUR: Math.round(totalEUR * 100) / 100, // Arrondi à 2 décimales
    totalMAD: Math.round(totalMAD),
    contributorCount: dataRows.length,
    percentComplete: percentComplete,
    lastUpdate: new Date().toISOString()
  };
}

/**
 * Fonction pour tester le script
 */
function testGetStats() {
  const stats = getContributionStats();
  Logger.log(stats);
}

