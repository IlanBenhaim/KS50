# 🚀 Guide de Déploiement GitHub Pages

## Étapes pour publier le formulaire sur GitHub

### 1. Créer un repository GitHub
1. Allez sur [GitHub.com](https://github.com) et connectez-vous
2. Cliquez sur **"New repository"** (bouton vert)
3. Nommez votre repository : `cadeau-anniversaire-kamal-sabri`
4. Cochez **"Public"** (nécessaire pour GitHub Pages gratuit)
5. Ne cochez PAS "Initialize with README" (on a déjà nos fichiers)
6. Cliquez sur **"Create repository"**

### 2. Pousser le code vers GitHub
Copiez et exécutez ces commandes dans votre terminal :

```bash
# Aller dans le dossier du projet
cd /path/to/cadeau-anniversaire

# Ajouter l'origine GitHub (remplacez VOTRE-USERNAME)
git remote add origin https://github.com/VOTRE-USERNAME/cadeau-anniversaire-kamal-sabri.git

# Pousser le code
git branch -M main
git push -u origin main
```

### 3. Activer GitHub Pages
1. Dans votre repository GitHub, allez dans **Settings** (onglet en haut)
2. Descendez jusqu'à la section **"Pages"** dans le menu de gauche
3. Dans **"Source"**, sélectionnez **"Deploy from a branch"**
4. Choisissez **"main"** comme branche
5. Laissez **"/ (root)"** comme dossier
6. Cliquez sur **"Save"**

### 4. Obtenir l'URL de votre site
Après quelques minutes, votre site sera disponible à :
```
https://VOTRE-USERNAME.github.io/cadeau-anniversaire-kamal-sabri
```

GitHub vous donnera l'URL exacte dans la section Pages des paramètres.

### 5. Configurer Google Sheets
⚠️ **IMPORTANT** : Avant de partager le lien, suivez le guide [SETUP-GOOGLE-SHEETS.md](SETUP-GOOGLE-SHEETS.md) pour :
- Créer votre Google Sheets
- Configurer Google Apps Script
- Mettre à jour l'URL dans `index.html`

### 6. Mettre à jour les informations bancaires
Modifiez le fichier `index.html` pour remplacer :
- `[Nom du bénéficiaire]` par le vrai nom
- `FR76 XXXX XXXX XXXX XXXX XXXX XXX` par le vrai IBAN
- `XXX-XXXXXX-XXXXXXXXXX-XX` par le vrai RIB marocain
- Etc.

### 7. Pousser les modifications
Après chaque modification :
```bash
git add .
git commit -m "Mise à jour des informations bancaires"
git push
```

Le site se mettra à jour automatiquement en quelques minutes.

## 📱 Partage du formulaire

Une fois configuré, partagez simplement l'URL dans votre groupe WhatsApp :

```
🎉 Formulaire de contribution pour l'anniversaire de Kamal & Sabri !

📅 19-20 Septembre 2025 à Binel, Wyden

Merci de remplir vos informations ici :
https://votre-username.github.io/cadeau-anniversaire-kamal-sabri

💶 Paiement possible en Euro (France) ou Dirham (Maroc)
📊 Toutes les contributions sont suivies automatiquement
```

## 🔧 Dépannage

### Le site ne s'affiche pas
- Attendez 5-10 minutes après l'activation de GitHub Pages
- Vérifiez que le repository est public
- Assurez-vous que le fichier `index.html` est à la racine

### Les données ne se sauvegardent pas
- Vérifiez la configuration Google Sheets
- Regardez la console du navigateur (F12) pour les erreurs
- Assurez-vous que l'URL Google Apps Script est correcte

### Modifications non visibles
- Videz le cache du navigateur (Ctrl+F5)
- Attendez quelques minutes pour la propagation
- Vérifiez que les modifications ont été poussées avec `git push`

## 🎯 Conseils

1. **Testez d'abord** : Utilisez l'URL locale pour tester avant de partager
2. **Sauvegardez** : Gardez une copie des vraies informations bancaires
3. **Surveillez** : Vérifiez régulièrement le Google Sheets pour les nouvelles contributions
4. **Communiquez** : Informez le groupe quand vous mettez à jour le formulaire

---

**Bonne collecte pour l'anniversaire ! 🎂**

