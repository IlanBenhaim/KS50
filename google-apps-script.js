/**
 * Script Google Apps Script pour recevoir les données du formulaire
 * et les enregistrer dans Google Sheets
 */

// ID de votre Google Sheets (à remplacer)
const SPREADSHEET_ID = 'VOTRE_ID_GOOGLE_SHEETS_ICI';

function doPost(e) {
  try {
    // Récupérer les données JSON du formulaire
    const data = JSON.parse(e.postData.contents);
    
    // Ouvrir la feuille de calcul
    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sheet = spreadsheet.getActiveSheet();
    
    // Si c'est la première ligne, ajouter les en-têtes
    if (sheet.getLastRow() === 0) {
      sheet.getRange(1, 1, 1, 7).setValues([
        ['Timestamp', 'Nom', 'Prénom', 'Email', 'Montant', 'Devise', 'Statut']
      ]);
      
      // Formater les en-têtes
      const headerRange = sheet.getRange(1, 1, 1, 7);
      headerRange.setFontWeight('bold');
      headerRange.setBackground('#4285f4');
      headerRange.setFontColor('white');
    }
    
    // Ajouter les données
    const newRow = sheet.getLastRow() + 1;
    sheet.getRange(newRow, 1, 1, 7).setValues([[
      data.timestamp,
      data.nom,
      data.prenom,
      data.email,
      data.montant,
      data.devise,
      'En attente'
    ]]);
    
    // Formater la ligne selon la devise
    const rowRange = sheet.getRange(newRow, 1, 1, 7);
    if (data.devise === 'euro') {
      rowRange.setBackground('#e8f0fe');
    } else {
      rowRange.setBackground('#fce8e6');
    }
    
    // Ajuster la largeur des colonnes
    sheet.autoResizeColumns(1, 7);
    
    // Retourner une réponse de succès
    return ContentService
      .createTextOutput(JSON.stringify({success: true}))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    console.error('Erreur:', error);
    
    // Retourner une réponse d'erreur
    return ContentService
      .createTextOutput(JSON.stringify({success: false, error: error.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  // Pour les requêtes GET (optionnel)
  return ContentService
    .createTextOutput(JSON.stringify({message: 'Service actif'}))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * Fonction utilitaire pour créer un résumé des contributions
 */
function createSummary() {
  const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = spreadsheet.getActiveSheet();
  
  if (sheet.getLastRow() <= 1) {
    return 'Aucune contribution enregistrée';
  }
  
  const data = sheet.getRange(2, 1, sheet.getLastRow() - 1, 7).getValues();
  
  let totalEuro = 0;
  let totalDirham = 0;
  let countEuro = 0;
  let countDirham = 0;
  
  data.forEach(row => {
    const montant = parseFloat(row[4]);
    const devise = row[5];
    
    if (devise === 'euro') {
      totalEuro += montant;
      countEuro++;
    } else {
      totalDirham += montant;
      countDirham++;
    }
  });
  
  return `Résumé des contributions:
- ${countEuro} contributions en Euro: ${totalEuro.toFixed(2)} €
- ${countDirham} contributions en Dirham: ${totalDirham.toFixed(2)} MAD
- Total participants: ${data.length}`;
}

