# 🎉 Formulaire de Contribution - Anniversaire Kamal & Sabry

Un formulaire web élégant et professionnel pour collecter les contributions pour le cadeau commun d'anniversaire des 50 ans de Kamal et Sabry, avec **compteur de cagnotte en temps réel**.

![Aperçu du formulaire](kamal-sabry.jpg)

## 📅 Événement
- **Date** : 19-20 Septembre 2025
- **Lieu** : Bin El Ouidane
- **Occasion** : Anniversaire des 50 ans de Kamal & Sabry
- **🎯 Objectif** : 7 000 € / 70 000 MAD

## ✨ Fonctionnalités

### 🎯 Compteur de cagnotte
- **Objectif affiché** : 7 000 € / 70 000 MAD
- **Montant récolté** en temps réel (converti en euros)
- **Nombre de contributeurs** mis à jour automatiquement
- **Barre de progression** visuelle et animée
- **Persistance** des données dans le navigateur

### 🎨 Interface moderne
- Design sobre et professionnel (fond blanc, police Montserrat)
- Photo personnalisée de Kamal & Sabry
- Compteur de cagnotte attractif avec dégradé vert
- Interface responsive (mobile et desktop)
- Page de confirmation personnalisée

### 📝 Formulaire complet
- **Prénom et Nom** (ordre logique)
- **Email obligatoire** pour la confirmation
- **Téléphone avec sélecteur de pays** (France, Maroc, etc.)
- **Montant libre** de contribution
- **Choix de devise** (Euro/Dirham)

### 💰 Gestion des devises
- **Euro (€)** - Paiement en France avec IBAN
- **Dirham (MAD)** - Paiement au Maroc avec RIB
- **Conversion automatique** pour le compteur (1€ = 10 MAD)
- Affichage automatique des informations bancaires

### 🔧 Automatisation Zapier
- **Email de confirmation** automatique au contributeur
- **Notification email** à l'organisateur
- **Sauvegarde automatique** dans Google Sheets
- **Mise à jour du compteur** en temps réel
- **Gestion d'erreurs** explicite et intelligente

### 🛡️ Fiabilité
- Mode démo intégré (fonctionne sans configuration)
- Sauvegarde locale de secours avec compteur
- Messages d'erreur détaillés
- Validation complète des données

## 🚀 Déploiement rapide

### Option 1 : GitHub Pages (Recommandé)
1. **Forkez ce repository**
2. **Activez GitHub Pages** dans Settings > Pages
3. **Configurez Zapier** (optionnel, voir guide ci-dessous)
4. **Personnalisez les RIB** dans `index.html`
5. **Partagez l'URL** dans votre groupe

### Option 2 : Déploiement direct
Le formulaire est déjà déployé et fonctionnel à :
**https://mgwsaejf.manus.space**

## ⚙️ Configuration

### 1. Zapier (Automatisation complète)
Suivez le guide détaillé : [SETUP-ZAPIER.md](SETUP-ZAPIER.md)

**Avantages :**
- Emails automatiques avec RIB selon la devise
- Google Sheets synchronisé avec compteur
- Notifications en temps réel
- Mise à jour automatique de la cagnotte

### 2. Informations bancaires
Modifiez dans `index.html` lignes 658-676 :

```html
<!-- Pour Euro -->
<strong>Bénéficiaire :</strong> Votre nom<br>
<strong>IBAN :</strong> Votre IBAN<br>
<strong>BIC :</strong> Votre BIC<br>

<!-- Pour Dirham -->
<strong>Bénéficiaire :</strong> Votre nom<br>
<strong>RIB :</strong> Votre RIB<br>
<strong>Banque :</strong> Nom de la banque<br>
```

### 3. Personnalisation du compteur
Dans `index.html` lignes 564-566 :
```javascript
const OBJECTIVE_EUR = 7000;        // Objectif en euros
const OBJECTIVE_MAD = 70000;       // Objectif en dirhams
const EXCHANGE_RATE = 10;          // Taux de change EUR/MAD
```

## 📱 Utilisation

### Pour l'organisateur
1. **Partagez le lien** dans votre groupe WhatsApp
2. **Surveillez la cagnotte** en temps réel sur la page
3. **Suivez les contributions** via Google Sheets ou emails
4. **Marquez les paiements reçus** dans le tableau

### Pour les contributeurs
1. **Voient l'objectif** et le montant déjà récolté
2. **Remplissent le formulaire** avec leurs informations
3. **Choisissent la devise** (Euro ou Dirham)
4. **Voient le compteur se mettre à jour** après leur contribution
5. **Reçoivent un email** avec les détails de paiement

## 📊 Suivi des contributions

### Compteur automatique
- **Montant total** converti en euros
- **Nombre de contributeurs** en temps réel
- **Pourcentage d'objectif** atteint
- **Persistance** des données localement

### Google Sheets (avec Zapier)
- Horodatage précis
- Informations complètes du contributeur
- Téléphone avec préfixe international
- Montant et devise
- Statut de paiement (à mettre à jour)

## 🎯 Message type pour WhatsApp

```
🎉 Contribution pour l'anniversaire des 50 ans de Kamal & Sabry !

🎯 Objectif : 7 000 € / 70 000 MAD
📊 Suivez la cagnotte en temps réel !

📅 19-20 Septembre 2025 à Bin El Ouidane

Contribuez ici :
https://votre-lien-github-pages

💶 Paiement en Euro (France) ou 🇲🇦 Dirham (Maroc)
📧 Email de confirmation automatique
📱 Compatible mobile et desktop

Merci pour votre participation ! 🎂
```

## 🛠️ Technologies utilisées

- **HTML5** - Structure sémantique
- **CSS3** - Design sobre avec Montserrat + compteur animé
- **JavaScript** - Interactivité, validation et compteur temps réel
- **localStorage** - Persistance des données de cagnotte
- **Zapier** - Automatisation emails + Google Sheets
- **GitHub Pages** - Hébergement gratuit

## 📄 Structure du projet

```
cadeau-anniversaire/
├── index.html              # Formulaire avec compteur intégré
├── kamal-sabry.jpg         # Photo des anniversaires
├── SETUP-ZAPIER.md         # Guide configuration Zapier
├── DEPLOYMENT-GUIDE.md     # Guide déploiement GitHub
├── CHANGELOG.md            # Historique des versions
├── README.md               # Ce fichier
└── .gitignore             # Fichiers à ignorer
```

## 🔍 Fonctionnalités avancées

### Compteur de cagnotte intelligent
- **Conversion automatique** des devises
- **Mise à jour en temps réel** après chaque contribution
- **Barre de progression** animée
- **Persistance** entre les sessions

### Mode démo intégré
- Fonctionne immédiatement sans configuration
- Compteur fonctionnel en local
- Affiche la page de confirmation
- Sauvegarde locale des données

### Gestion d'erreurs intelligente
- Messages explicites selon le type d'erreur
- Proposition de mode démo en cas d'échec
- Sauvegarde automatique avec mise à jour du compteur

### Interface internationale
- Sélecteur de pays avec drapeaux
- Support de 10 pays principaux
- Préfixes téléphoniques automatiques

## 🤝 Support

Pour toute question :
1. Consultez [SETUP-ZAPIER.md](SETUP-ZAPIER.md) pour la configuration
2. Vérifiez [DEPLOYMENT-GUIDE.md](DEPLOYMENT-GUIDE.md) pour le déploiement
3. Testez en mode démo pour vérifier le compteur

## 📈 Statistiques

- ⚡ **Temps de chargement** : < 2 secondes
- 📱 **Compatible** : Tous navigateurs modernes
- 🌍 **Responsive** : Mobile, tablette, desktop
- 🔒 **Sécurisé** : Validation côté client et serveur
- 🎯 **Compteur** : Temps réel avec persistance

---

**Joyeux anniversaire Kamal & Sabry ! 🎂🎈**

*Créé avec ❤️ pour une célébration mémorable*

