# 🚀 Portfolio Jimmy Ramsamynaick

<div align="center">

[![Portfolio](https://img.shields.io/badge/Portfolio-Live-brightgreen)](https://jimmyramsamynaick.github.io/portfolio)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

</div>

> Portfolio personnel moderne de Jimmy Ramsamynaick - Développeur & Technicien Système Réseau Sécurité basé à La Réunion 🏝️

## 👨‍💻 À propos

Diplômé d'un Bac STI2D SIN, j'ai poursuivi mes études à **Epitech Technology** avant de rejoindre **Expernet Campus** pour me spécialiser en TSRS. Actuellement en poste chez **Expernet Informatique**, je développe mes compétences en administration système, sécurité réseau et DevOps.

## ✨ Fonctionnalités

### 🎨 Design & Interface
- **Écran d'entrée immersif** avec animations de particules
- **Design moderne** avec dégradés violets et effets visuels
- **Mode sombre/clair** avec sauvegarde automatique des préférences
- **Interface responsive** optimisée pour tous les appareils
- **Animations fluides** et transitions élégantes
- **Terminal interactif** affichant les compétences

### 🎵 Lecteur Audio Intégré
- **Lecteur moderne** style guns.lol avec design glassmorphism
- **Double interface** : écran d'entrée + lecteur fixe
- **Contrôles complets** : play/pause, suivant/précédent, barre de progression
- **Raccourcis clavier** : Espace, M, N, P pour la navigation
- **Synchronisation** parfaite entre les deux lecteurs

### 📱 Sections du Portfolio
- **🏠 Home** : Présentation avec terminal et liens sociaux
- **👤 About** : Formation, expérience et passion (cartes animées)
- **💼 Projects** : Portfolio avec statuts en temps réel
    - ✅ Terminé (vert)
    - 🔄 En développement (orange clignotant)
    - ⚠️ À améliorer (rouge)
- **📞 Contact** : Liens sociaux et coordonnées

### 🎯 Projets Présentés
- **Yako Bot Discord** - Bot administrateur (JavaScript, Discord.js, Node.js)
- **Popeye** - Découverte Docker (Docker, Docker Compose, Linux)
- **My_Sokoban** - Jeu en C (C, CSFML, Algorithmes)
- **My_printf** - Fonction printf personnalisée (C, Pointeurs)
- **Bash Tools** - Outils d'automatisation (Bash, Linux, Cron)

### 🔧 Fonctionnalités Techniques
- **Navigation smooth scroll** avec indicateur de section active
- **Système de notifications** moderne avec animations
- **Thème manager** séparé avec gestion complète
- **Sauvegarde d'état** (thème, piste audio, préférences)
- **Easter eggs** : Code Konami pour mode arc-en-ciel 🌈
- **Accessibilité** : navigation clavier complète
- **Performance optimisée** : debouncing, throttling

## 🛠️ Technologies Utilisées

### Frontend
- **HTML5** : Structure sémantique moderne
- **CSS3** :
    - Variables CSS pour système de thèmes
    - Flexbox & Grid Layout avancés
    - Animations et keyframes personnalisées
    - Backdrop-filter et glassmorphism
    - Media queries responsive complètes
- **JavaScript Vanilla** :
    - Gestion d'état complexe
    - Web Audio API (préparé)
    - Intersection Observer
    - Local Storage pour persistance
    - Event delegation et optimisation

### Design System
- **Police** : JetBrains Mono (monospace)
- **Couleurs** : Palette violette (#8b5cf6, #7c3aed, #c084fc)
- **Icons** : Font Awesome 6.5.0
- **Thèmes** : Mode sombre (défaut) et clair

## 📁 Structure du Projet

```
portfolio/
├── index.html              # Page principale avec structure complète
├── css/
│   └── style.css          # Styles CSS complets avec système de thèmes
├── js/
│   ├── script.js          # JavaScript principal avec lecteur audio
│   └── theme-manager.js   # Gestionnaire de thèmes séparé
├── audio/                 # Dossier pour les fichiers audio
│   ├── menace-santana.mp3
│   └── eminem-slim-shady.mp3
├── README.md              # Documentation
└── LICENSE                # Licence MIT
```

## 🚀 Installation & Utilisation

### Prérequis
- Navigateur web moderne (Chrome 80+, Firefox 75+, Safari 14+)
- Serveur web local (recommandé pour le développement)

### Installation Rapide
```bash
# 1. Cloner le repository
git clone https://github.com/JimmyRamsamynaick/portfolio.git
cd portfolio

# 2. Ajouter vos fichiers audio (optionnel)
mkdir audio
# Ajoutez vos fichiers .mp3 dans le dossier audio/

# 3. Lancer un serveur local
# Option A : Python
python -m http.server 8000

# Option B : Node.js
npx serve .

# Option C : PHP
php -S localhost:8000

# 4. Ouvrir dans le navigateur
open http://localhost:8000
```

## ⚙️ Configuration

### 🎵 Lecteur Audio
Pour personnaliser les pistes audio, modifiez dans `js/script.js` :

```javascript
const musicTracks = [
    {
        title: 'Votre Titre - Artiste',
        url: './audio/votre-fichier.mp3',
        fallback: false
    },
    // Ajoutez d'autres pistes...
];
```

### 🎨 Personnalisation des Couleurs
Modifiez les variables CSS dans `css/style.css` :

```css
:root {
    --accent-primary: #8b5cf6;      /* Violet principal */
    --accent-secondary: #c084fc;    /* Violet secondaire */
    --bg-primary: #0a0a0a;         /* Arrière-plan sombre */
    --text-primary: #ffffff;        /* Texte principal */
    /* ... autres variables */
}
```

### 📝 Informations Personnelles
Mettez à jour dans `index.html` :
- **Email** : `jimmyramsamynaick@gmail.com`
- **GitHub** : `https://github.com/JimmyRamsamynaick`
- **LinkedIn** : `https://linkedin.com/in/jimmyramsamynaick`
- **Discord** : `https://discord.gg/UTrYfA3n58`

## 🎮 Raccourcis Clavier

| Touche | Action |
|--------|--------|
| `Espace` ou `M` | Play/Pause musique |
| `←` ou `P` | Piste précédente |
| `→` ou `N` | Piste suivante |
| `T` | Basculer le thème |
| `Echap` | Fermer le menu mobile |
| `Code Konami` | Mode arc-en-ciel 🌈 |

> **Code Konami** : ↑↑↓↓←→←→BA

## 📱 Responsive Design

### Breakpoints
- **1024px+** : Desktop (layout grille complète)
- **768px-1024px** : Tablette (layout adapté)
- **480px-768px** : Mobile large (menu hamburger)
- **<480px** : Mobile petit (layout vertical)

### Optimisations Mobile
- Menu de navigation convertible
- Lecteur audio adaptatif
- Tailles de texte optimisées
- Interactions tactiles améliorées

## 🚀 Déploiement

### GitHub Pages
```bash
# 1. Push sur GitHub
git add .
git commit -m "Deploy portfolio"
git push origin main

# 2. Activer GitHub Pages
# Settings > Pages > Source: Deploy from branch > main
```

### Netlify
1. Connecter le repository GitHub
2. Build settings : aucune commande nécessaire
3. Publish directory : `/`
4. Deploy automatique activé

### Vercel
```bash
# Installation CLI
npm i -g vercel

# Deploy
vercel --prod
```

## 🔧 Développement

### Scripts de Développement
```bash
# Formatage du code
prettier --write "**/*.{html,css,js}"

# Serveur avec rechargement automatique
live-server --port=8080

# Validation HTML
html-validate index.html

# Optimisation des images
imagemin "**/*.{jpg,png}" --out-dir=optimized
```

### Fonctionnalités Avancées
- **Lazy loading** des animations
- **Intersection Observer** pour les animations au scroll
- **Debouncing** des événements de redimensionnement
- **Local Storage** pour la persistance
- **Error handling** robuste

## 🛡️ Bonnes Pratiques

### Performance
- ✅ CSS optimisé avec variables
- ✅ JavaScript vanilla (pas de frameworks lourds)
- ✅ Images optimisées et lazy loading
- ✅ Polices préchargées
- ✅ Minification recommandée pour la production

### Accessibilité
- ✅ Navigation clavier complète
- ✅ Contraste des couleurs respecté
- ✅ Textes alternatifs sur les éléments
- ✅ Focus visible pour la navigation
- ✅ Structure sémantique HTML5

### SEO
- ✅ Meta tags optimisées
- ✅ Structure HTML sémantique
- ✅ Balises Open Graph (à ajouter)
- ✅ Sitemap XML (à générer)

## 🎯 Fonctionnalités Avancées

### Système de Thèmes
- **Thème sombre** (défaut) : Optimisé pour la lecture
- **Thème clair** : Pour les environnements lumineux
- **Transition fluide** entre les thèmes
- **Sauvegarde automatique** des préférences

### Lecteur Audio Intégré
- **Format moderne** inspiré de guns.lol
- **Glassmorphism** avec backdrop-filter
- **Contrôles tactiles** optimisés
- **Barre de progression** interactive
- **Affichage du temps** en temps réel

## 🐛 Problèmes Connus & Solutions

| Problème | Solution |
|----------|----------|
| Safari : Backdrop-filter limité | Fallback avec opacity |
| iOS : Autoplay bloqué | Interaction utilisateur requise |
| IE : Non supporté | Message d'erreur gracieux |
| Fichiers audio manquants | Fallback avec notifications |

## 🤝 Contribution

1. **Fork** le projet
2. **Créer** une branche feature
   ```bash
   git checkout -b feature/nouvelle-fonctionnalite
   ```
3. **Committer** les changements
   ```bash
   git commit -m "feat: ajout nouvelle fonctionnalité"
   ```
4. **Push** et créer une Pull Request

### Convention de Commits
- `feat:` Nouvelle fonctionnalité
- `fix:` Correction de bug
- `docs:` Documentation
- `style:` Formatage
- `refactor:` Refactorisation
- `test:` Tests

## 📝 Changelog

### Version 2.0.0 (2025-07-24)
- ✨ **NOUVEAU** : Lecteur audio intégré moderne
- ✨ **NOUVEAU** : Écran d'entrée avec animations
- ✨ **NOUVEAU** : Système de thèmes avancé
- ✨ **NOUVEAU** : Raccourcis clavier complets
- 🎨 **AMÉLIORATION** : Design glassmorphism
- 🎨 **AMÉLIORATION** : Animations fluides
- 🔧 **TECHNIQUE** : Code refactorisé et optimisé

### Version 1.0.0 (2025-01-01)
- 🎉 Version initiale du portfolio
- 📱 Design responsive complet
- 🎨 Mode sombre/clair
- 💼 Sections principales (About, Projects, Contact)

## 📞 Support & Contact

Pour toute question, suggestion ou collaboration :

- **📧 Email** : [jimmyramsamynaick@gmail.com](mailto:jimmyramsamynaick@gmail.com)
- **💼 LinkedIn** : [jimmyramsamynaick](https://linkedin.com/in/jimmyramsamynaick)
- **🐙 GitHub** : [JimmyRamsamynaick](https://github.com/JimmyRamsamynaick)
- **💬 Discord** : [Rejoindre le serveur](https://discord.gg/UTrYfA3n58)
- **🐛 Issues** : [Ouvrir un ticket](https://github.com/JimmyRamsamynaick/portfolio/issues)

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

Vous êtes libre de :
- ✅ Utiliser ce code pour vos propres projets
- ✅ Modifier et distribuer
- ✅ Utiliser à des fins commerciales

Conditions :
- 📄 Inclure la licence originale
- 🏷️ Mentionner l'auteur original

## 🙏 Remerciements

- **🎓 Epitech Technology** pour la formation en développement
- **🏢 Expernet Campus & Informatique** pour la formation TSRS
- **🎨 Font Awesome** pour les icônes de qualité
- **💜 La communauté open source** pour l'inspiration
- **🏝️ La Réunion** pour l'environnement inspirant

## 🌟 Inspirations

Ce portfolio s'inspire de :
- **Design moderne** des interfaces 2025
- **Glassmorphism** et effets visuels tendance
- **guns.lol** pour le lecteur audio
- **Portfolios de développeurs** créatifs

---

<div align="center">

**⭐ Si ce portfolio vous plaît, n'hésitez pas à lui donner une étoile !**

**🔗 [Voir le portfolio en direct](https://jimmyramsamynaick.github.io/portfolio)**

Made with 💜 & ☕ by [Jimmy Ramsamynaick](https://github.com/JimmyRamsamynaick) in La Réunion 🏝️

---

*Développeur & TSRS • La Réunion, France • 2025*

</div>