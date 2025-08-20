# Configuration Zapier - Automatisation Email et Google Sheets

## Vue d'ensemble
Zapier va automatiser :
1. **Réception des données** du formulaire via webhook
2. **Envoi d'email** de confirmation au contributeur avec RIB selon la devise
3. **Ajout automatique** dans Google Sheets avec compteur
4. **Notification email** à l'organisateur
5. **Mise à jour** du compteur de cagnotte (optionnel)

## Étape 1 : Créer le Zap

### 1.1 Trigger - Webhooks by Zapier
1. Allez sur [zapier.com](https://zapier.com) et créez un compte
2. Cliquez sur **"Create Zap"**
3. Choisissez **"Webhooks by Zapier"** comme trigger
4. Sélectionnez **"Catch Hook"**
5. Copiez l'URL du webhook fournie
6. Testez avec des données d'exemple

### 1.2 Action 1 - Google Sheets
1. Ajoutez une action **"Google Sheets"**
2. Choisissez **"Create Spreadsheet Row"**
3. Connectez votre compte Google
4. Créez un nouveau spreadsheet "Contributions Anniversaire Kamal & Sabry"
5. Ajoutez les colonnes suivantes dans la première ligne :
   ```
   Timestamp | Prénom | Nom | Email | Téléphone | Montant | Devise | Statut | Montant EUR
   ```
6. Mappez les champs :
   - **Timestamp** → `timestamp`
   - **Prénom** → `prenom`
   - **Nom** → `nom`
   - **Email** → `email`
   - **Téléphone** → `telephoneComplet`
   - **Montant** → `montant`
   - **Devise** → `devise`
   - **Statut** → "En attente" (valeur fixe)
   - **Montant EUR** → Formule : `IF(devise="euro", montant, montant/10)`

### 1.3 Action 2 - Email conditionnel au contributeur
Zapier permet d'envoyer un email conditionnel selon la devise choisie. Voici comment procéder :

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

### 1.4 Action 3 - Email de notification
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
                <li><strong>Nom :</strong> {{nom}} {{prenom}}</li>
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
                <li><strong>Nom :</strong> {{nom}} {{prenom}}</li>
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

## Étape 3 : Configuration du formulaire

1. Dans le fichier `index.html`, remplacez ligne 563 :
```javascript
const ZAPIER_WEBHOOK_URL = 'YOUR_ZAPIER_WEBHOOK_URL_HERE';
```
Par l'URL webhook obtenue à l'étape 1.1

## Étape 4 : Configuration Google Sheets avancée

### Formules automatiques recommandées
Ajoutez ces formules dans votre Google Sheets :

**Colonne J (Total EUR) :**
```
=IF(G2="euro", F2, F2/10)
```

**Cellule de total (ex: J1) :**
```
=SUM(J2:J1000)
```

**Cellule compteur contributeurs (ex: K1) :**
```
=COUNTA(A2:A1000)
```

**Pourcentage objectif (ex: L1) :**
```
=J1/7000*100
```

## Étape 5 : Test complet

1. **Activez le Zap**
2. **Testez le formulaire** avec de vraies données
3. **Vérifiez :**
   - ✅ Données dans Google Sheets avec conversion EUR
   - ✅ Email de confirmation reçu avec bon RIB selon la devise
   - ✅ Email de notification reçu
   - ✅ Compteur local mis à jour sur le site

## Étape 6 : Synchronisation compteur (Optionnel)

Pour synchroniser le compteur du site avec Google Sheets :

### Option A : Zapier vers Webhook retour
1. Ajoutez une action **"Webhooks by Zapier"**
2. **Method :** POST
3. **URL :** Votre site + `/update-counter`
4. **Data :** `{"total": {{total_eur}}, "count": {{count}}}`

### Option B : Google Sheets API
Utilisez l'API Google Sheets pour lire les totaux en temps réel (plus complexe).

### Option C : Mode local uniquement
Le compteur fonctionne déjà parfaitement en mode local avec localStorage.

## Avantages de cette solution

✅ **Email conditionnel** : Un seul Zap avec deux chemins selon la devise
✅ **RIB corrects** : Informations bancaires exactes selon le pays
✅ **Automatisation complète** : Plus besoin d'intervention manuelle
✅ **Emails personnalisés** : Design professionnel et informatif
✅ **Suivi centralisé** : Google Sheets avec formules automatiques
✅ **Notifications** : Vous êtes alerté de chaque contribution
✅ **Compteur temps réel** : Les contributeurs voient l'évolution
✅ **Conversion automatique** : Tout converti en euros pour le suivi
✅ **Fiabilité** : Zapier gère les erreurs et les tentatives

## Structure Google Sheets finale

| Timestamp | Prénom | Nom | Email | Téléphone | Montant | Devise | Statut | Montant EUR |
|-----------|--------|-----|-------|-----------|---------|---------|---------|-------------|
| 19/08/2025 14:30 | Jean | Dupont | jean@email.com | +33123456789 | 50 | euro | En attente | 50 |
| 19/08/2025 15:45 | Ahmed | Benali | ahmed@email.com | +212654321987 | 500 | dirham | Payé | 50 |

**Formules en bas :**
- **Total EUR :** =SUM(I:I)
- **Contributeurs :** =COUNTA(A:A)-1
- **% Objectif :** =I_total/7000*100

## Tarification Zapier

- **Plan gratuit** : 100 tâches/mois (suffisant pour l'événement)
- **Plan payant** : Si plus de 100 contributions attendues

---

Cette solution offre une gestion complète et professionnelle de la cagnotte avec compteur en temps réel et automatisation totale des emails selon la devise choisie.

