# Changelog

Toutes les modifications notables de ce projet seront documentées dans ce fichier.

## [3.0.0] - 2025-08-19

### ✨ Ajouté - Compteur de cagnotte
- **🎯 Compteur de cagnotte en temps réel** avec objectif 7 000 € / 70 000 MAD
- **📊 Montant récolté** affiché en euros avec conversion automatique
- **👥 Nombre de contributeurs** mis à jour automatiquement
- **📈 Barre de progression** visuelle et animée vers l'objectif
- **💾 Persistance des données** dans localStorage du navigateur
- **🔄 Mise à jour automatique** après chaque contribution

### 🎨 Interface - Design du compteur
- Compteur attractif avec dégradé vert
- Statistiques en temps réel dans des boîtes élégantes
- Barre de progression animée avec transitions fluides
- Design responsive pour mobile et desktop
- Intégration harmonieuse avec le design existant

### 🔧 Technique - Gestion des données
- **Conversion automatique** Dirham → Euro (1€ = 10 MAD)
- **Stockage local** avec structure optimisée
- **Calculs en temps réel** du total et pourcentage
- **Synchronisation** entre formulaire et compteur
- **Gestion d'erreurs** améliorée avec sauvegarde

### 📧 Zapier - Templates mis à jour
- **Emails HTML** professionnels avec design cohérent
- **RIB selon la devise** dans les emails de confirmation
- **Google Sheets** avec colonne conversion EUR automatique
- **Formules automatiques** pour totaux et statistiques
- **Notifications** enrichies avec montants et objectifs

## [2.0.0] - 2025-08-19

### ✨ Ajouté
- **Page de confirmation personnalisée** avec détails de la contribution
- **Gestion d'erreurs explicite** avec messages détaillés
- **Mode démo intégré** fonctionnant sans configuration Zapier
- **Sélecteur de pays** pour le téléphone avec drapeaux et préfixes
- **Photo personnalisée** de Kamal & Sabry dans l'en-tête
- **Sauvegarde locale automatique** des données en cas d'erreur

### 🔄 Modifié
- **Ordre des champs** : Prénom puis Nom (plus logique)
- **Email et téléphone** maintenant obligatoires
- **Design sobre** : fond blanc, police Montserrat professionnelle
- **Lieu corrigé** : "Bin El Ouidane" (orthographe exacte)
- **Messages d'erreur** plus explicites et utiles

### 🎨 Interface
- Design épuré et professionnel
- Photo circulaire avec ombre portée
- Animations fluides et micro-interactions
- Responsive design amélioré pour mobile

### 🔧 Technique
- Intégration Zapier complète pour automatisation
- Validation JavaScript renforcée
- Gestion des erreurs réseau intelligente
- Structure de données optimisée

## [1.0.0] - 2025-08-19

### ✨ Version initiale
- Formulaire de contribution basique
- Gestion des devises Euro/Dirham
- Affichage automatique des RIB
- Interface colorée avec dégradés
- Intégration Google Apps Script

### 📝 Fonctionnalités de base
- Champs nom, prénom, email, montant
- Sélection de devise avec RIB correspondant
- Validation côté client
- Design moderne avec animations

---

## Types de modifications

- ✨ **Ajouté** : Nouvelles fonctionnalités
- 🔄 **Modifié** : Changements dans les fonctionnalités existantes
- 🐛 **Corrigé** : Corrections de bugs
- 🗑️ **Supprimé** : Fonctionnalités supprimées
- 🔒 **Sécurité** : Corrections de vulnérabilités
- 🎨 **Interface** : Changements d'interface utilisateur
- 🔧 **Technique** : Changements techniques internes
- 📧 **Zapier** : Améliorations de l'automatisation
- 🎯 **Compteur** : Fonctionnalités de cagnotte

