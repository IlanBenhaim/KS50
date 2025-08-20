# Configuration Zapier - Automatisation Email et Google Sheets

## Vue d'ensemble
Zapier va automatiser :
1. **Réception des données** du formulaire via webhook
2. **Conversion de devise** avec taux de change du jour
3. **Envoi d'email** de confirmation au contributeur avec RIB selon la devise
4. **Ajout automatique** dans Google Sheets avec compteur
5. **Notification email** à l'organisateur

## Étape 1 : Créer le Zap

### 1.1 Trigger - Webhooks by Zapier
1. Allez sur [zapier.com](https://zapier.com) et créez un compte
2. Cliquez sur **"Create Zap"**
3. Choisissez **"Webhooks by Zapier"** comme trigger
4. Sélectionnez **"Catch Hook"**
5. Utilisez l'URL du webhook déjà configurée : `https://hooks.zapier.com/hooks/catch/11483490/ut97dng/`
6. Testez avec des données d'exemple

### 1.2 Action 1 - Code by Zapier (Taux de change dynamique)
1. Ajoutez une action **"Code by Zapier"**
2. Sélectionnez **"Run JavaScript"**
3. Ajoutez le code suivant pour obtenir le taux de change du jour :

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

// Récupérer les données du webhook
const devise = inputData.devise;
const montant = parseFloat(inputData.montant) || 0;

// Calculer les montants dans les deux devises
let montantEUR = 0;
let montantMAD = 0;
let tauxChange = await fetchExchangeRate();

if (devise === 'euro') {
  montantEUR = montant;
  montantMAD = Math.round(montant * tauxChange);
} else {
  montantMAD = montant;
  montantEUR = Math.round((montant / tauxChange) * 100) / 100;
}

// Retourner les résultats
output = {
  montantEUR: montantEUR,
  montantMAD: montantMAD,
  tauxChange: tauxChange
};
```

### 1.3 Action 2 - Google Sheets
1. Ajoutez une action **"Google Sheets"**
2. Choisissez **"Create Spreadsheet Row"**
3. Connectez votre compte Google
4. Créez un nouveau spreadsheet "Contributions Anniversaire Kamal & Sabry"
5. Ajoutez les colonnes suivantes dans la première ligne :
   ```
   Timestamp | Prénom | Nom | Email | Téléphone | Montant | Devise | Montant EUR | Montant MAD | Taux Change | Statut
   ```
6. Mappez les champs :
   - **Timestamp** → `timestamp`
   - **Prénom** → `prenom`
   - **Nom** → `nom`
   - **Email** → `email`
   - **Téléphone** → `telephoneComplet`
   - **Montant** → `montant`
   - **Devise** → `devise`
   - **Montant EUR** → `montantEUR` (du Code step)
   - **Montant MAD** → `montantMAD` (du Code step)
   - **Taux Change** → `tauxChange` (du Code step)
   - **Statut** → "En attente" (valeur fixe)

### 1.4 Action 3 - Path by Zapier (Email conditionnel)
1. Ajoutez une action **"Path by Zapier"** (branchement conditionnel)
2. Configurez deux chemins :
   - **Chemin A** : Condition `devise` est exactement égal à `euro`
   - **Chemin B** : Condition `devise` est exactement égal à `dirham`

3. Dans le **Chemin A (Euro)** :
   - Ajoutez une action **"Email by Zapier"**
   - Configurez :
     - **To** → `email` (du webhook)
     - **From Name** → "Anniversaire Kamal & Sabry"
     - **From Email** → votre email
     - **Subject** → "Confirmation de votre contribution - Kamal & Sabry"
     - **Body** → Template Euro (voir ci-dessous)

4. Dans le **Chemin B (Dirham)** :
   - Ajoutez une action **"Email by Zapier"**
   - Configurez :
     - **To** → `email` (du webhook)
     - **From Name** → "Anniversaire Kamal & Sabry"
     - **From Email** → votre email
     - **Subject** → "Confirmation de votre contribution - Kamal & Sabry"
     - **Body** → Template Dirham (voir ci-dessous)

### 1.5 Action 4 - Email de notification
1. Après les deux chemins, ajoutez une action **"Email by Zapier"**
2. Configurez :
   - **To** → votre email d'organisateur
   - **Subject** → "💰 Nouvelle contribution reçue - Cagnotte"
   - **Body** → Voir template ci-dessous

## Étape 2 : Templates d'emails

### Email de confirmation au contributeur - EURO
```html
<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: 'Arial', sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #27ae60, #2ecc71); color: white; padding: 30px; text-align: center; border-radius: 8px; }
        .content { background: #f8f9fa; padding: 25px; border-radius: 8px; margin: 20px 0; }
        .rib-info { background: white; padding: 20px; border-radius: 4px; font-family: monospace; line-height: 1.8; border-left: 4px solid #27ae60; }
        .footer { text-align: center; color: #666; font-size: 0.9rem; margin-top: 30px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🎉 Merci pour votre contribution !</h1>
            <p>Anniversaire des 50 ans de Kamal & Sabry</p>
        </div>
        
        <div class="content">
            <p>Bonjour <strong>{{prenom}} {{nom}}</strong>,</p>
            
            <p>Votre contribution de <strong>{{montant}} {{devise}}</strong> a été enregistrée avec succès !</p>
            
            <h3>📋 Récapitulatif de votre contribution :</h3>
            <ul>
                <li><strong>Nom :</strong> {{prenom}} {{nom}}</li>
                <li><strong>Email :</strong> {{email}}</li>
                <li><strong>Téléphone :</strong> {{telephoneComplet}}</li>
                <li><strong>Montant :</strong> {{montant}} {{devise}}</li>
                <li><strong>Date :</strong> {{timestamp}}</li>
            </ul>
        </div>

        <div class="content">
            <h3>💳 Informations de paiement :</h3>
            <div class="rib-info">
                <strong>💶 Paiement en France</strong><br><br>
                <strong>Bénéficiaire :</strong> M. ILAN BEN HAIM<br>
                <strong>IBAN :</strong> FR76 3000 3031 1100 0500 2894 445<br>
                <strong>BIC :</strong> SOGEFRPP<br>
                <strong>Banque :</strong> Société Générale<br>
                <strong>Domiciliation :</strong> PARIS IDFN PRIV BK G (03038)<br>
                <strong>Motif :</strong> Cadeau Kamal & Sabry - {{prenom}} {{nom}}
            </div>
        </div>

        <div class="content">
            <h3>📅 Détails de l'événement :</h3>
            <p><strong>Date :</strong> 19-20 Septembre 2025</p>
            <p><strong>Lieu :</strong> Bin El Ouidane</p>
            <p><strong>Objectif cagnotte :</strong> 7 000 € / 70 000 MAD</p>
        </div>

        <div class="footer">
            <p>Nous vous tiendrons informé de l'organisation.</p>
            <p><strong>À très bientôt pour cette belle célébration ! 🎂</strong></p>
            <p><em>L'équipe d'organisation</em></p>
        </div>
    </div>
</body>
</html>
```

### Email de confirmation au contributeur - DIRHAM
```html
<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: 'Arial', sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #27ae60, #2ecc71); color: white; padding: 30px; text-align: center; border-radius: 8px; }
        .content { background: #f8f9fa; padding: 25px; border-radius: 8px; margin: 20px 0; }
        .rib-info { background: white; padding: 20px; border-radius: 4px; font-family: monospace; line-height: 1.8; border-left: 4px solid #27ae60; }
        .footer { text-align: center; color: #666; font-size: 0.9rem; margin-top: 30px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🎉 Merci pour votre contribution !</h1>
            <p>Anniversaire des 50 ans de Kamal & Sabry</p>
        </div>
        
        <div class="content">
            <p>Bonjour <strong>{{prenom}} {{nom}}</strong>,</p>
            
            <p>Votre contribution de <strong>{{montant}} {{devise}}</strong> a été enregistrée avec succès !</p>
            
            <h3>📋 Récapitulatif de votre contribution :</h3>
            <ul>
                <li><strong>Nom :</strong> {{prenom}} {{nom}}</li>
                <li><strong>Email :</strong> {{email}}</li>
                <li><strong>Téléphone :</strong> {{telephoneComplet}}</li>
                <li><strong>Montant :</strong> {{montant}} {{devise}}</li>
                <li><strong>Date :</strong> {{timestamp}}</li>
            </ul>
        </div>

        <div class="content">
            <h3>💳 Informations de paiement :</h3>
            <div class="rib-info">
                <strong>🇲🇦 Paiement au Maroc</strong><br><br>
                <strong>Bénéficiaire :</strong> BENHAIM ILAN ICHOA<br>
                <strong>RIB :</strong> 007 780 0002438000489014 81<br>
                <strong>IBAN :</strong> MA64 007 780 0002438000489014 81<br>
                <strong>BIC :</strong> BCMAMAMC<br>
                <strong>Banque :</strong> AttijariWafa bank<br>
                <strong>Agence :</strong> Casa Av. du Phare (0243)<br>
                <strong>Motif :</strong> Cadeau Kamal & Sabry - {{prenom}} {{nom}}
            </div>
        </div>

        <div class="content">
            <h3>📅 Détails de l'événement :</h3>
            <p><strong>Date :</strong> 19-20 Septembre 2025</p>
            <p><strong>Lieu :</strong> Bin El Ouidane</p>
            <p><strong>Objectif cagnotte :</strong> 7 000 € / 70 000 MAD</p>
        </div>

        <div class="footer">
            <p>Nous vous tiendrons informé de l'organisation.</p>
            <p><strong>À très bientôt pour cette belle célébration ! 🎂</strong></p>
            <p><em>L'équipe d'organisation</em></p>
        </div>
    </div>
</body>
</html>
```

### Email de notification à l'organisateur
```html
<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: 'Arial', sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #2c3e50; color: white; padding: 20px; text-align: center; border-radius: 8px; }
        .content { background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 15px 0; }
        .highlight { background: #27ae60; color: white; padding: 15px; border-radius: 4px; text-align: center; margin: 15px 0; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h2>💰 Nouvelle contribution reçue !</h2>
        </div>
        
        <div class="highlight">
            <h3>{{montant}} {{devise}} - {{prenom}} {{nom}}</h3>
            <p>(Équivalent: {{montantEUR}} € / {{montantMAD}} MAD)</p>
            <p>Taux du jour: 1 € = {{tauxChange}} MAD</p>
        </div>

        <div class="content">
            <h3>📋 Détails du contributeur :</h3>
            <ul>
                <li><strong>Nom complet :</strong> {{prenom}} {{nom}}</li>
                <li><strong>Email :</strong> {{email}}</li>
                <li><strong>Téléphone :</strong> {{telephoneComplet}}</li>
                <li><strong>Montant :</strong> {{montant}} {{devise}}</li>
                <li><strong>Date :</strong> {{timestamp}}</li>
            </ul>
        </div>

        <div class="content">
            <h3>📊 Actions à faire :</h3>
            <ul>
                <li>✅ Vérifier la réception du paiement</li>
                <li>📝 Mettre à jour le statut dans Google Sheets</li>
                <li>📧 Envoyer un remerciement si nécessaire</li>
            </ul>
        </div>

        <div class="content">
            <p><strong>💡 Conseil :</strong> Consultez Google Sheets pour voir le total de la cagnotte mis à jour automatiquement.</p>
            <p><strong>🎯 Objectif :</strong> 7 000 € / 70 000 MAD</p>
        </div>
    </div>
</body>
</html>
```

## Étape 3 : Configuration Google Sheets avancée

### Structure de la feuille de calcul
Créez un Google Sheets avec les colonnes suivantes :

| Timestamp | Prénom | Nom | Email | Téléphone | Montant | Devise | Montant EUR | Montant MAD | Taux Change | Statut |
|-----------|--------|-----|-------|-----------|---------|---------|-------------|-------------|------------|--------|
| 19/08/2025 14:30 | Jean | Dupont | jean@email.com | +33123456789 | 50 | euro | 50 | 542.5 | 10.85 | En attente |
| 19/08/2025 15:45 | Ahmed | Benali | ahmed@email.com | +212654321987 | 500 | dirham | 46.08 | 500 | 10.85 | Payé |

### Formules pour les totaux
Ajoutez ces formules dans des cellules en haut ou en bas de votre feuille :

**Cellule pour Total EUR :**
```
=SUM(H2:H1000)
```

**Cellule pour Total MAD :**
```
=SUM(I2:I1000)
```

**Cellule pour Nombre de contributeurs :**
```
=COUNTA(A2:A1000)
```

**Cellule pour Pourcentage objectif :**
```
=H_total/7000*100
```

**Cellule pour Taux de change moyen :**
```
=AVERAGE(J2:J1000)
```

## Étape 4 : Tableau de bord (optionnel)

Pour créer un tableau de bord visuel dans Google Sheets :

1. Créez un nouvel onglet nommé "Dashboard"
2. Ajoutez des cellules avec les formules suivantes :
   - **Total collecté (EUR)** : `=SUM('Feuille 1'!H2:H1000)`
   - **Total collecté (MAD)** : `=SUM('Feuille 1'!I2:I1000)`
   - **Nombre de contributeurs** : `=COUNTA('Feuille 1'!A2:A1000)`
   - **% Objectif atteint** : `=SUM('Feuille 1'!H2:H1000)/7000*100`
   - **Taux de change moyen** : `=AVERAGE('Feuille 1'!J2:J1000)`

3. Ajoutez un graphique en barres pour visualiser la progression vers l'objectif
4. Ajoutez un graphique circulaire pour visualiser la répartition EUR/MAD

## Avantages de cette solution améliorée

✅ **Taux de change dynamique** : Utilise le taux EUR/MAD du jour
✅ **Double comptabilité** : Montants stockés dans les deux devises
✅ **Conversion précise** : Arrondi à 2 décimales pour les euros
✅ **Email conditionnel** : Un seul Zap avec deux chemins selon la devise
✅ **Tableau de bord** : Visualisation claire de la progression
✅ **Historique des taux** : Conserve le taux utilisé pour chaque contribution
✅ **Emails personnalisés** : Design professionnel et informatif

## Tarification Zapier

- **Plan gratuit** : 100 tâches/mois (suffisant pour l'événement)
- **Plan payant** : Si plus de 100 contributions attendues

---

Cette solution offre une gestion complète et professionnelle de la cagnotte avec taux de change dynamique et double comptabilité en euros et dirhams.

