// theme-manager.js - Script séparé pour gérer le dark mode
(function() {
    'use strict';

    // Variables globales pour le thème
    let currentTheme = 'dark';

    // Initialisation immédiate du thème (avant le DOM)
    function initThemeImmediate() {
        const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
        const root = document.documentElement;

        if (savedTheme === 'light') {
            root.classList.add('light-theme');
            currentTheme = 'light';
        } else {
            root.classList.remove('light-theme');
            currentTheme = 'dark';
        }
    }

    // Fonction pour basculer le thème
    function toggleTheme() {
        const root = document.documentElement;
        const isLight = root.classList.contains('light-theme');

        if (isLight) {
            root.classList.remove('light-theme');
            localStorage.setItem('portfolio-theme', 'dark');
            currentTheme = 'dark';
        } else {
            root.classList.add('light-theme');
            localStorage.setItem('portfolio-theme', 'light');
            currentTheme = 'light';
        }

        updateAllThemeButtons();
        updateMatrixOpacity();

        // Notification
        showThemeNotification(`🎨 Mode ${isLight ? 'sombre' : 'clair'} activé !`);

        // Dispatch custom event
        window.dispatchEvent(new CustomEvent('themeChanged', {
            detail: { theme: currentTheme }
        }));
    }

    // Mettre à jour tous les boutons de thème
    function updateAllThemeButtons() {
        const buttons = [
            document.getElementById('theme-toggle'),
            document.getElementById('theme-toggle-fixed')
        ];

        const isLight = currentTheme === 'light';
        const icon = isLight ? '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>';
        const text = isLight ? 'Dark Mode' : 'Light Mode';

        buttons.forEach(button => {
            if (button) {
                if (button.querySelector('span')) {
                    button.innerHTML = `${icon}<span>${text}</span>`;
                } else {
                    button.innerHTML = icon;
                }
            }
        });
    }

    // Mettre à jour l'opacité du matrix
    function updateMatrixOpacity() {
        const canvas = document.querySelector('.matrix-canvas');
        if (canvas) {
            const isLight = currentTheme === 'light';
            canvas.style.opacity = isLight ? '0.03' : '0.08';
        }
    }

    // Système de notification simple
    function showThemeNotification(message) {
        // Supprimer l'ancienne notification
        const existing = document.querySelector('.theme-notification');
        if (existing) {
            existing.remove();
        }

        const notification = document.createElement('div');
        notification.className = 'theme-notification';
        notification.textContent = message;

        // Styles inline pour éviter les dépendances CSS
        notification.style.cssText = `
            position: fixed;
            top: 80px;
            right: 20px;
            background: var(--bg-secondary);
            color: var(--text-primary);
            padding: 0.75rem 1.5rem;
            border-radius: 8px;
            border: 1px solid var(--accent-primary);
            box-shadow: 0 4px 20px rgba(0, 255, 136, 0.3);
            z-index: 10001;
            font-family: 'JetBrains Mono', monospace;
            font-size: 0.9rem;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            backdrop-filter: blur(10px);
        `;

        document.body.appendChild(notification);

        // Animation d'entrée
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        // Auto-suppression
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 2500);
    }

    // Gestion des clics sur les boutons de thème
    function handleThemeButtonClick(e) {
        // Chercher le bouton de thème dans la hiérarchie
        const button = e.target.closest('#theme-toggle, #theme-toggle-fixed, .theme-toggle-btn, .theme-toggle-fixed');
        if (button) {
            e.preventDefault();
            e.stopPropagation();
            toggleTheme();
            return true;
        }
        return false;
    }

    // Initialisation au chargement du DOM
    function initThemeManager() {
        updateAllThemeButtons();

        // Attacher les event listeners avec capture pour s'assurer qu'on intercepte tous les clics
        document.addEventListener('click', handleThemeButtonClick, true);

        // Backup: event listener sur le body aussi
        document.body.addEventListener('click', handleThemeButtonClick);

        // Raccourci clavier T
        document.addEventListener('keydown', function(e) {
            if ((e.key === 't' || e.key === 'T') && !e.ctrlKey && !e.altKey && !e.shiftKey) {
                const activeElement = document.activeElement;
                const isInputFocused = activeElement && (
                    activeElement.tagName === 'INPUT' ||
                    activeElement.tagName === 'TEXTAREA' ||
                    activeElement.contentEditable === 'true'
                );

                if (!isInputFocused) {
                    e.preventDefault();
                    toggleTheme();
                }
            }
        });

        // Vérification périodique des boutons (fallback)
        setInterval(() => {
            updateAllThemeButtons();
        }, 1000);

        console.log('🎨 Theme Manager initialized - Current theme:', currentTheme);
    }

    // Exposer les fonctions globalement
    window.themeManager = {
        toggle: toggleTheme,
        getCurrentTheme: () => currentTheme,
        setTheme: (theme) => {
            if (theme === 'light' && currentTheme !== 'light') {
                toggleTheme();
            } else if (theme === 'dark' && currentTheme !== 'dark') {
                toggleTheme();
            }
        },
        handleClick: handleThemeButtonClick
    };

    // Initialisation immédiate (avant le DOM)
    initThemeImmediate();

    // Initialisation complète au chargement du DOM
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initThemeManager);
    } else {
        initThemeManager();
    }

    // Observation des changements DOM pour les nouveaux boutons
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            mutation.addedNodes.forEach(function(node) {
                if (node.nodeType === 1) { // Element node
                    const themeButtons = node.querySelectorAll && node.querySelectorAll('#theme-toggle, #theme-toggle-fixed, .theme-toggle-btn, .theme-toggle-fixed');
                    if (themeButtons && themeButtons.length > 0) {
                        updateAllThemeButtons();
                    }
                    if (node.id === 'theme-toggle' || node.id === 'theme-toggle-fixed' ||
                        node.classList.contains('theme-toggle-btn') || node.classList.contains('theme-toggle-fixed')) {
                        updateAllThemeButtons();
                    }
                }
            });
        });
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

})();