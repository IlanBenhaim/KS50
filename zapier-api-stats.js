/**
 * Code JavaScript pour Zapier - Récupération des statistiques de l'API Google Sheets
 * 
 * Ce code récupère les statistiques de la cagnotte (montant total en EUR/MAD, nombre de contributeurs)
 * depuis l'API Google Sheets pour les inclure dans un email aux administrateurs.
 */

// URL de l'API Google Sheets (remplacez par votre URL)
const API_URL = 'https://script.google.com/macros/s/AKfycbwSiezxBcc3_8KvAp8Osj2eyfVcYJWvkl0qYwsjyiJnbRzbSRaLOX4RGP_nX4oAsxJxPQ/exec';

// Fonction pour récupérer les données de l'API
async function fetchCagnotteStats() {
  try {
    // Appel à l'API Google Sheets
    const response = await fetch(API_URL);
    
    // Vérifier si la réponse est OK
    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`);
    }
    
    // Convertir la réponse en JSON
    const data = await response.json();
    
    // Retourner les données
    return {
      totalEUR: data.totalEUR || 0,
      totalMAD: data.totalMAD || 0,
      contributorCount: data.contributorCount || 0,
      percentComplete: data.percentComplete || 0,
      lastUpdate: data.lastUpdate || new Date().toISOString()
    };
  } catch (error) {
    // En cas d'erreur, retourner des valeurs par défaut
    console.error('Erreur lors de la récupération des statistiques:', error);
    return {
      totalEUR: 0,
      totalMAD: 0,
      contributorCount: 0,
      percentComplete: 0,
      lastUpdate: new Date().toISOString(),
      error: error.toString()
    };
  }
}

// Récupérer les statistiques
const stats = await fetchCagnotteStats();

// Formater les données pour l'email
const formattedDate = new Date(stats.lastUpdate).toLocaleString('fr-FR', {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit'
});

// Créer un résumé HTML pour l'email
const statsHTML = `
<div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
  <h2 style="color: #27ae60; text-align: center;">📊 Statistiques de la Cagnotte</h2>
  
  <div style="display: flex; justify-content: space-between; margin: 20px 0;">
    <div style="text-align: center; flex: 1; padding: 15px; background-color: white; border-radius: 8px; margin-right: 10px;">
      <h3 style="margin: 0; color: #2c3e50;">💶 Total en Euros</h3>
      <p style="font-size: 24px; font-weight: bold; margin: 10px 0;">${stats.totalEUR} €</p>
    </div>
    
    <div style="text-align: center; flex: 1; padding: 15px; background-color: white; border-radius: 8px; margin-left: 10px;">
      <h3 style="margin: 0; color: #2c3e50;">🇲🇦 Total en Dirhams</h3>
      <p style="font-size: 24px; font-weight: bold; margin: 10px 0;">${stats.totalMAD} MAD</p>
    </div>
  </div>
  
  <div style="display: flex; justify-content: space-between; margin: 20px 0;">
    <div style="text-align: center; flex: 1; padding: 15px; background-color: white; border-radius: 8px; margin-right: 10px;">
      <h3 style="margin: 0; color: #2c3e50;">👥 Contributeurs</h3>
      <p style="font-size: 24px; font-weight: bold; margin: 10px 0;">${stats.contributorCount}</p>
    </div>
    
    <div style="text-align: center; flex: 1; padding: 15px; background-color: white; border-radius: 8px; margin-left: 10px;">
      <h3 style="margin: 0; color: #2c3e50;">🎯 Objectif</h3>
      <p style="font-size: 24px; font-weight: bold; margin: 10px 0;">${stats.percentComplete}%</p>
    </div>
  </div>
  
  <div style="background-color: #e9f7ef; padding: 10px; border-radius: 4px; text-align: center; margin-top: 15px;">
    <p style="margin: 0; color: #27ae60;">Dernière mise à jour : ${formattedDate}</p>
  </div>
</div>
`;

// Créer un résumé texte pour l'email (version alternative sans HTML)
const statsText = `
📊 STATISTIQUES DE LA CAGNOTTE

💶 Total en Euros : ${stats.totalEUR} €
🇲🇦 Total en Dirhams : ${stats.totalMAD} MAD
👥 Contributeurs : ${stats.contributorCount}
🎯 Objectif : ${stats.percentComplete}%

Dernière mise à jour : ${formattedDate}
`;

// Retourner les résultats pour les étapes suivantes du Zap
output = {
  ...inputData, // Garder toutes les données d'origine
  statsHTML: statsHTML,
  statsText: statsText,
  totalEUR: stats.totalEUR,
  totalMAD: stats.totalMAD,
  contributorCount: stats.contributorCount,
  percentComplete: stats.percentComplete,
  lastUpdate: formattedDate
};

