/**
 * Code JavaScript pour Zapier - Conversion de devises
 * 
 * Structure du code :
 * 1. ENTRÉES : Champs provenant du webhook
 * 2. CALCUL DU TAUX : Zone pour insérer votre code de taux de change existant
 * 3. CALCUL DES MONTANTS : Conversion des montants selon la devise
 * 4. SORTIES : Tous les champs disponibles pour les étapes suivantes
 */

// ====================================================================
// 1. ENTRÉES : Champs provenant du webhook
// ====================================================================
// Ces variables contiennent les données envoyées par le formulaire

const prenom = inputData.prenom || '';
const nom = inputData.nom || '';
const email = inputData.email || '';
const phonePrefix = inputData.phonePrefix || '';
const telephone = inputData.telephone || '';
const telephoneComplet = inputData.telephoneComplet || '';
const montant = parseFloat(inputData.montant) || 0;
const devise = inputData.devise || 'euro';
const timestamp = inputData.timestamp || new Date().toLocaleString('fr-FR');

// ====================================================================
// 2. CALCUL DU TAUX : Insérez votre code de taux de change ici
// ====================================================================
// REMPLACEZ CETTE SECTION PAR VOTRE CODE DE TAUX DE CHANGE EXISTANT

// Exemple de code pour récupérer le taux (à remplacer par votre code)
let tauxChange = 10.85; // Valeur par défaut

// Si vous avez une fonction qui récupère le taux, utilisez-la ici
// tauxChange = await votreFonctionTauxDeChange();

// ====================================================================
// 3. CALCUL DES MONTANTS : Conversion selon la devise
// ====================================================================
// Cette section calcule les montants dans les deux devises

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

// ====================================================================
// 4. SORTIES : Tous les champs disponibles pour les étapes suivantes
// ====================================================================
// Cette section définit les données qui seront disponibles pour les étapes suivantes du Zap

output = {
  // Champs originaux du webhook
  prenom: prenom,
  nom: nom,
  email: email,
  phonePrefix: phonePrefix,
  telephone: telephone,
  telephoneComplet: telephoneComplet,
  montant: montant,
  devise: devise,
  timestamp: timestamp,
  
  // Champs calculés
  tauxChange: tauxChange,
  montantEUR: montantEUR,
  montantMAD: montantMAD
};

/**
 * UTILISATION DANS LES ÉTAPES SUIVANTES :
 * 
 * Dans Google Sheets, mappez les colonnes comme suit :
 * - Timestamp : {{timestamp}}
 * - Prénom : {{prenom}}
 * - Nom : {{nom}}
 * - Email : {{email}}
 * - Téléphone : {{telephoneComplet}}
 * - Montant : {{montant}}
 * - Devise : {{devise}}
 * - Montant EUR : {{montantEUR}}
 * - Montant MAD : {{montantMAD}}
 * - Taux Change : {{tauxChange}}
 * - Statut : "En attente" (valeur fixe)
 */

