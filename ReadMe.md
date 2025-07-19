# 🚀 Portfolio Jimmy Ramsamynaick

<div align="center">

[![Portfolio](https://img.shields.io/badge/Portfolio-Live-brightgreen)](https://jimmyramsamynaick.github.io/portfolio)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

</div>

> Portfolio personnel de Jimmy Ramsamynaick - Développeur & Technicien Système Réseau Sécurité

## 👨‍💻 À propos

Ancien élève d'Epitech, actuellement chez Expernet Campus en TSRS (Technicien Système Réseau Sécurité). Passionné d'informatique avec une expertise en développement et en infrastructure.

## ✨ Fonctionnalités

### 🎨 Design & Interface
- **Design moderne** avec dégradés et effets visuels
- **Interface responsive** pour tous les appareils (mobile, tablette, desktop)
- **Mode sombre/clair** avec sauvegarde des préférences
- **Animations fluides** et effets de parallaxe
- **Navigation fixe** avec effet de transparence

### 📱 Sections
- **Hero** : Présentation avec animation de particules
- **À propos** : Formation, expérience et passion
- **Compétences** : 3 catégories avec barres de progression animées
    - Développement (C, Web, Git)
    - Administration Système (Linux, Réseaux, Sécurité)
    - DevOps & Automatisation (Docker, Bash, CI/CD)
- **Projets** : Portfolio de mes réalisations avec statuts et technologies
- **Contact** : Formulaire fonctionnel + liens sociaux

### 🔧 Fonctionnalités Techniques
- **Formulaire de contact** intégré avec Formspree
- **Validation côté client** des formulaires
- **Système de notifications** pour le feedback utilisateur
- **Animations on scroll** avec Intersection Observer
- **Effets de ripple** sur les boutons
- **Performance optimisée** avec debouncing
- **Easter egg** (Code Konami) 🎮

## 🛠️ Technologies Utilisées

### Frontend
- **HTML5** : Structure sémantique
- **CSS3** :
    - Variables CSS pour les thèmes
    - Flexbox & Grid Layout
    - Animations et transitions
    - Media queries responsive
- **JavaScript (Vanilla)** :
    - DOM manipulation
    - Fetch API pour les formulaires
    - Intersection Observer
    - Local Storage pour les préférences

### Services Externes
- **Formspree** : Gestion des formulaires de contact
- **Font Awesome** : Icônes
- **Google Fonts** : Police Segoe UI

## 📁 Structure du Projet

```
portfolio/
├── index.html          # Page principale
├── css/                # Dossier des styles
│   └── style.css      # Styles CSS
├── js/                 # Dossier JavaScript
│   └── script.js      # JavaScript
├── README.md          # Documentation
└── LICENSE            # Licence MIT
```

## 🚀 Installation & Utilisation

### Prérequis
- Un navigateur web moderne
- Un serveur web local (optionnel pour le développement)

### Installation
1. **Clonez le repository**
   ```bash
   git clone https://github.com/JimmyRamsamynaick/portfolio.git
   cd portfolio
   ```

2. **Ouvrez le fichier**
   ```bash
   # Méthode 1 : Ouvrir directement
   open index.html
   
   # Méthode 2 : Serveur local (Python)
   python -m http.server 8000
   
   # Méthode 3 : Serveur local (Node.js)
   npx serve .
   ```

3. **Accédez au portfolio**
    - Directement : `file:///.../index.html`
    - Serveur local : `http://localhost:8000`

## ⚙️ Configuration

### Formulaire de Contact
Pour personnaliser le formulaire Formspree :

1. Créez un compte sur [Formspree](https://formspree.io)
2. Créez un nouveau formulaire
3. Remplacez l'endpoint dans `index.html` :
   ```html
   <form action="https://formspree.io/f/VOTRE_ID" method="POST">
   ```

### Informations Personnelles
Modifiez les informations dans `index.html` :
- Email : `jimmyramsamynaick@gmail.com`
- Discord : `https://discord.gg/UTrYfA3n58`
- GitHub : `https://github.com/JimmyRamsamynaick`
- LinkedIn : Ajoutez votre profil

### Couleurs et Thème
Personnalisez les couleurs dans `css/style.css` :
```css
:root {
    --primary-color: #2563eb;        /* Bleu principal */
    --primary-dark: #1d4ed8;         /* Bleu foncé */
    --accent-color: #f59e0b;         /* Orange accent */
    /* ... autres variables */
}
```

## 🎮 Easter Eggs

- **Code Konami** : ↑↑↓↓←→←→BA pour un effet arc-en-ciel
- **Console** : Messages pour les développeurs curieux
- **Bouton de thème** : Animation au survol

## 📱 Responsive Design

Le portfolio est entièrement responsive :
- **Desktop** : Layout en grille avec sidebar
- **Tablette** : Layout adapté avec navigation horizontale
- **Mobile** : Menu hamburger et layout vertical

### Breakpoints
- `1024px` : Tablette
- `768px` : Mobile large
- `480px` : Mobile petit

## 🔧 Développement

### Scripts Utiles
```bash
# Formatage du code
prettier --write "*.{html,css,js}"

# Validation HTML
html-validate index.html

# Serveur de développement avec rechargement automatique
live-server
```

### Performance
- **Images** : Optimisées et lazy loading
- **CSS** : Minification recommandée pour la production
- **JavaScript** : Debouncing des événements de scroll
- **Fonts** : Préchargement des polices importantes

## 🚀 Déploiement

### GitHub Pages
1. Push votre code sur GitHub
2. Allez dans Settings > Pages
3. Sélectionnez la branche `main`
4. Votre site sera disponible à `https://USERNAME.github.io/portfolio`

### Netlify
1. Connectez votre repository GitHub
2. Build settings :
    - Build command : (aucune)
    - Publish directory : `/`
3. Deploy automatique à chaque push

### Vercel
1. Importez votre repository GitHub
2. Configuration automatique détectée
3. Deploy en un clic

## 🛡️ Sécurité

- **Validation côté client** des formulaires
- **Protection CSRF** via Formspree
- **Pas de données sensibles** dans le code source
- **HTTPS** recommandé en production

## 🤝 Contribution

1. **Fork** le projet
2. **Créez** une branche pour votre fonctionnalité
   ```bash
   git checkout -b feature/nouvelle-fonctionnalite
   ```
3. **Committez** vos changements
   ```bash
   git commit -m "Ajout d'une nouvelle fonctionnalité"
   ```
4. **Push** vers la branche
   ```bash
   git push origin feature/nouvelle-fonctionnalite
   ```
5. **Ouvrez** une Pull Request

## 📝 Changelog

### Version 1.0.0 (2025-07-19)
- ✅ Design initial avec mode sombre
- ✅ Sections complètes (Hero, About, Skills, Projects, Contact)
- ✅ Formulaire de contact fonctionnel
- ✅ Animations et effets visuels
- ✅ Responsive design complet

## 🐛 Problèmes Connus

- **Safari** : Certaines animations CSS peuvent être limitées
- **IE** : Non supporté (navigateurs modernes uniquement)
- **Formspree** : Limitation à 50 soumissions/mois en version gratuite

## 📞 Support

Pour toute question ou problème :
- **Email** : [jimmyramsamynaick@gmail.com](mailto:jimmyramsamynaick@gmail.com)
- **Discord** : [Rejoindre le serveur](https://discord.gg/UTrYfA3n58)
- **GitHub Issues** : [Ouvrir un ticket](https://github.com/JimmyRamsamynaick/portfolio/issues)

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

## 🙏 Remerciements

- **Epitech Technology** pour la formation en développement
- **Expernet Campus** pour la formation TSRS
- **Font Awesome** pour les icônes
- **Formspree** pour le service de formulaires


---

<div align="center">

**⭐ Si ce portfolio vous plaît, n'hésitez pas à lui donner une étoile !**

Made with ❤️ by [Jimmy Ramsamynaick](https://github.com/JimmyRamsamynaick)

</div>