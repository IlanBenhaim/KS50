# Déploiement sur GitHub Pages

Ce guide vous explique comment déployer le formulaire de contribution sur GitHub Pages pour un hébergement gratuit et fiable.

## Étape 1 : Créer un repository GitHub

1. Connectez-vous à votre compte GitHub (ou créez-en un sur [github.com](https://github.com))
2. Cliquez sur le bouton "+" en haut à droite, puis "New repository"
3. Nommez votre repository (par exemple `anniversaire-kamal-sabry`)
4. Choisissez "Public" comme visibilité
5. Cochez "Add a README file"
6. Cliquez sur "Create repository"

## Étape 2 : Uploader les fichiers

### Option A : Via l'interface web (plus simple)

1. Dans votre repository, cliquez sur "Add file" puis "Upload files"
2. Décompressez l'archive `cadeau-anniversaire-github-final.zip` sur votre ordinateur
3. Glissez-déposez tous les fichiers du dossier décompressé
4. Ajoutez un message de commit comme "Initial upload"
5. Cliquez sur "Commit changes"

### Option B : Via Git (pour utilisateurs avancés)

```bash
git clone https://github.com/VOTRE-USERNAME/anniversaire-kamal-sabry.git
cd anniversaire-kamal-sabry
# Décompressez l'archive et copiez les fichiers ici
git add .
git commit -m "Initial upload"
git push origin main
```

## Étape 3 : Activer GitHub Pages

1. Dans votre repository, allez dans "Settings"
2. Dans le menu latéral, cliquez sur "Pages"
3. Dans la section "Source", sélectionnez "Deploy from a branch"
4. Dans le menu déroulant "Branch", sélectionnez "main", puis "/ (root)"
5. Cliquez sur "Save"
6. Attendez quelques minutes que GitHub déploie votre site

## Étape 4 : Vérifier le déploiement

1. Retournez dans la section "Pages" des paramètres
2. Vous verrez un message "Your site is published at https://VOTRE-USERNAME.github.io/anniversaire-kamal-sabry/"
3. Cliquez sur ce lien pour vérifier que votre site est bien déployé

## Étape 5 : Tester le formulaire

1. Remplissez le formulaire avec des données de test
2. Soumettez le formulaire
3. Vérifiez que les données sont bien envoyées à Zapier
4. Vérifiez que la page de confirmation s'affiche correctement

## Résolution des problèmes CORS

Si vous rencontrez des problèmes CORS (Cross-Origin Resource Sharing) avec Zapier, voici quelques solutions :

### Solution 1 : Utiliser mode: 'no-cors'

Cette solution est déjà implémentée dans le code. Le formulaire utilise `mode: 'no-cors'` pour contourner les restrictions CORS.

### Solution 2 : Utiliser un proxy CORS

Si la solution 1 ne fonctionne pas, vous pouvez utiliser un service de proxy CORS comme [cors-anywhere](https://cors-anywhere.herokuapp.com/). Modifiez le code comme suit :

```javascript
const ZAPIER_WEBHOOK_URL = 'https://hooks.zapier.com/hooks/catch/11483490/ut97dng/';
const CORS_PROXY = 'https://cors-anywhere.herokuapp.com/';

// Dans la fonction de soumission :
const response = await fetch(CORS_PROXY + ZAPIER_WEBHOOK_URL, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
});
```

### Solution 3 : Utiliser un service de formulaire intermédiaire

Si les solutions précédentes ne fonctionnent pas, vous pouvez utiliser un service comme [Formspree](https://formspree.io/) ou [Netlify Forms](https://www.netlify.com/products/forms/) comme intermédiaire.

## Avantages de GitHub Pages

- **Gratuit** : Hébergement gratuit sans limite de temps
- **Fiable** : Haute disponibilité et performances
- **Sécurisé** : HTTPS automatique
- **Simple** : Mise à jour facile via l'interface GitHub
- **Versionné** : Historique complet des modifications

## Mise à jour du site

Pour mettre à jour votre site après des modifications :

1. Allez dans votre repository sur GitHub
2. Naviguez jusqu'au fichier que vous souhaitez modifier
3. Cliquez sur l'icône de crayon pour éditer
4. Effectuez vos modifications
5. Ajoutez un message de commit décrivant vos changements
6. Cliquez sur "Commit changes"

GitHub Pages redéploiera automatiquement votre site avec les modifications.

---

Si vous avez des questions ou rencontrez des problèmes, n'hésitez pas à me contacter.

