// Configuration des pistes audio
const musicTracks = [
    {
        title: 'Menace Santana - Vendredi 13 Mai 2022',
        url: './audio/menace-santana.mp3',
        fallback: false
    },
    {
        title: 'Eminem - The Real Slim Shady',
        url: './audio/eminem-slim-shady.mp3',
        fallback: false
    }
];

// Variables globales
let currentTrackIndex = 0;
let isPlaying = false;
let audioContext = null;
let currentAudio = null;

// Fonction pour mettre à jour tous les titres des lecteurs
function updateAllPlayerTitles() {
    const playerTrackTitle = document.getElementById('player-track-title');
    const entranceTrackTitle = document.getElementById('entrance-track-title');
    const currentTrack = musicTracks[currentTrackIndex];

    console.log('🔄 Updating all player titles to:', currentTrack?.title);

    if (playerTrackTitle && currentTrack) {
        playerTrackTitle.textContent = currentTrack.title;
        console.log('✅ Updated main player title');
    }

    if (entranceTrackTitle && currentTrack) {
        entranceTrackTitle.textContent = currentTrack.title;
        console.log('✅ Updated entrance player title');
    }
}

// Debug pour vérifier les changements
function debugTrackChange() {
    console.log('🎵 Track changed to:', currentTrackIndex, musicTracks[currentTrackIndex].title);

    // Forcer la mise à jour immédiate
    updateAllPlayerTitles();
}

// Initialisation
document.addEventListener('DOMContentLoaded', function() {
    initTheme();
    initNavigation();
    initAudioPlayer(); // Lecteur principal
    initEntranceAudioPlayer(); // Lecteur entrance
    initParticles();
    initScrollAnimations();
    initTypingEffect();

    // Gestion des touches
    document.addEventListener('keydown', handleKeyPress);
});

// === GESTION DU THÈME ===
function initTheme() {
    const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
    document.body.setAttribute('data-theme', savedTheme);
    updateThemeButtons();

    // Event listeners pour les boutons de thème
    const themeButtons = ['theme-toggle', 'theme-toggle-nav'];
    themeButtons.forEach(id => {
        const btn = document.getElementById(id);
        if (btn) {
            btn.addEventListener('click', toggleTheme);
        }
    });
}

function toggleTheme() {
    const currentTheme = document.body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    document.body.setAttribute('data-theme', newTheme);
    localStorage.setItem('portfolio-theme', newTheme);
    updateThemeButtons();

    // Notification
    showNotification(`Mode ${newTheme === 'dark' ? 'sombre' : 'clair'} activé`);
}

function updateThemeButtons() {
    const theme = document.body.getAttribute('data-theme');
    const isLight = theme === 'light';

    const buttons = [
        document.getElementById('theme-toggle'),
        document.getElementById('theme-toggle-nav')
    ];

    buttons.forEach(btn => {
        if (btn) {
            const icon = btn.querySelector('i');
            const span = btn.querySelector('span');

            if (icon) {
                icon.className = isLight ? 'fas fa-moon' : 'fas fa-sun';
            }
            if (span) {
                span.textContent = isLight ? 'Dark' : 'Light';
            }
        }
    });
}

// === NAVIGATION ===
function initNavigation() {
    const navToggle = document.getElementById('nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navLinkItems = document.querySelectorAll('.nav-link');

    // Toggle mobile menu
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }

    // Close mobile menu on link click
    navLinkItems.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();

            // Close mobile menu
            if (navToggle) navToggle.classList.remove('active');
            if (navLinks) navLinks.classList.remove('active');

            // Smooth scroll
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                const headerOffset = 80;
                const elementPosition = targetSection.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Active link highlighting
    window.addEventListener('scroll', updateActiveNav);
}

function updateActiveNav() {
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-link');

    let current = '';
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        if (sectionTop <= 100) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
}

// === LECTEUR AUDIO ENTRANCE ===
function initEntranceAudioPlayer() {
    const entrancePlayPauseBtn = document.getElementById('entrance-play-pause-btn');
    const entrancePrevBtn = document.getElementById('entrance-prev-btn');
    const entranceNextBtn = document.getElementById('entrance-next-btn');
    const entranceProgressBar = document.getElementById('entrance-progress-bar');

    // Event listeners pour entrance
    if (entrancePlayPauseBtn) {
        entrancePlayPauseBtn.addEventListener('click', togglePlayPause);
    }

    if (entrancePrevBtn) {
        entrancePrevBtn.addEventListener('click', previousTrack);
    }

    if (entranceNextBtn) {
        entranceNextBtn.addEventListener('click', nextTrack);
    }

    if (entranceProgressBar) {
        entranceProgressBar.addEventListener('click', seekToEntrance);
    }

    // Initialiser l'affichage avec la bonne piste
    updateAllPlayerTitles();
    updateAllPlayButtons();
}

function updateEntranceProgress() {
    const bgMusic = document.getElementById('bgMusic');
    const entranceProgressFill = document.getElementById('entrance-progress-fill');
    const entranceTimeCurrent = document.getElementById('entrance-time-current');
    const entranceTimeTotal = document.getElementById('entrance-time-total');

    if (bgMusic && entranceProgressFill && entranceTimeCurrent && !isNaN(bgMusic.duration)) {
        const progress = (bgMusic.currentTime / bgMusic.duration) * 100;
        entranceProgressFill.style.width = progress + '%';
        entranceTimeCurrent.textContent = formatTime(bgMusic.currentTime);

        if (entranceTimeTotal && bgMusic.duration) {
            entranceTimeTotal.textContent = formatTime(bgMusic.duration);
        }
    }
}

function seekToEntrance(e) {
    const bgMusic = document.getElementById('bgMusic');
    const entranceProgressBar = document.getElementById('entrance-progress-bar');

    if (bgMusic && entranceProgressBar && !isNaN(bgMusic.duration)) {
        const rect = entranceProgressBar.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const percentage = clickX / rect.width;
        const newTime = percentage * bgMusic.duration;

        bgMusic.currentTime = newTime;
    }
}

function updateAllPlayButtons() {
    const playPauseBtn = document.getElementById('play-pause-btn');
    const entrancePlayPauseBtn = document.getElementById('entrance-play-pause-btn');

    console.log('🔄 Updating play buttons, isPlaying:', isPlaying);

    const iconClass = isPlaying ? 'fas fa-pause' : 'fas fa-play';

    if (playPauseBtn) {
        playPauseBtn.innerHTML = `<i class="${iconClass}"></i>`;
        playPauseBtn.className = playPauseBtn.className.replace(/\s*playing\s*/g, '');
        if (isPlaying) {
            playPauseBtn.classList.add('playing');
        }
        console.log('✅ Updated main play button, isPlaying:', isPlaying);
    }

    if (entrancePlayPauseBtn) {
        entrancePlayPauseBtn.innerHTML = `<i class="${iconClass}"></i>`;
        entrancePlayPauseBtn.className = entrancePlayPauseBtn.className.replace(/\s*playing\s*/g, '');
        if (isPlaying) {
            entrancePlayPauseBtn.classList.add('playing');
        }
        console.log('✅ Updated entrance play button, isPlaying:', isPlaying);
    }
}

function initAudioPlayer() {
    const audioPlayer = document.getElementById('audio-player');
    const bgMusic = document.getElementById('bgMusic');
    const playPauseBtn = document.getElementById('play-pause-btn');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const progressBar = document.getElementById('progress-bar');

    // Afficher le lecteur avec animation
    if (audioPlayer) {
        audioPlayer.classList.add('show');
    }

    // Event listeners
    if (playPauseBtn) {
        playPauseBtn.addEventListener('click', togglePlayPause);
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', previousTrack);
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', nextTrack);
    }

    if (progressBar) {
        progressBar.addEventListener('click', seekTo);
    }

    // Mise à jour du temps et de la barre de progression
    if (bgMusic) {
        bgMusic.addEventListener('loadedmetadata', updateDuration);
        bgMusic.addEventListener('timeupdate', updateProgress);
        bgMusic.addEventListener('ended', nextTrack);

        // Event listeners pour détecter les changements d'état
        bgMusic.addEventListener('play', () => {
            isPlaying = true;
            console.log('🎵 Audio started playing');
            updateAllPlayButtons();
        });

        bgMusic.addEventListener('pause', () => {
            isPlaying = false;
            console.log('⏸️ Audio paused');
            updateAllPlayButtons();
        });
    }

    // Initialiser l'affichage avec la bonne piste
    updateAllPlayerTitles();
    updateAllPlayButtons();
}

function togglePlayPause() {
    const bgMusic = document.getElementById('bgMusic');

    if (!bgMusic) return;

    if (isPlaying) {
        bgMusic.pause();
        isPlaying = false;
        console.log('⏸️ Music paused');
    } else {
        // Charger la piste actuelle si nécessaire
        const track = musicTracks[currentTrackIndex];
        const currentSrc = bgMusic.src.split('/').pop();
        const trackFile = track.url.split('/').pop();

        if (currentSrc !== trackFile) {
            console.log('🔄 Loading new track:', track.title);
            bgMusic.src = track.url;
        }

        bgMusic.play().then(() => {
            isPlaying = true;
            console.log('▶️ Music playing:', track.title);
            showNotification(`🎵 ${track.title}`);
        }).catch(e => {
            console.error('Erreur lecture audio:', e);
            showNotification(`❌ Impossible de lire: ${track.title}`);
            isPlaying = false;
        });
    }

    // Mettre à jour tous les boutons et titres
    updateAllPlayButtons();
    updateAllPlayerTitles();
}

function previousTrack() {
    currentTrackIndex = currentTrackIndex === 0 ? musicTracks.length - 1 : currentTrackIndex - 1;
    debugTrackChange();
    loadAndPlayTrack();
}

function nextTrack() {
    currentTrackIndex = (currentTrackIndex + 1) % musicTracks.length;
    debugTrackChange();
    loadAndPlayTrack();
}

function loadAndPlayTrack() {
    const bgMusic = document.getElementById('bgMusic');
    const track = musicTracks[currentTrackIndex];

    console.log('🎵 loadAndPlayTrack called for:', track?.title);

    if (bgMusic && track) {
        bgMusic.src = track.url;

        // Mettre à jour immédiatement tous les affichages
        updateAllPlayerTitles();

        if (isPlaying) {
            bgMusic.play().then(() => {
                console.log('▶️ Track loaded and playing:', track.title);
                showNotification(`🎵 ${track.title}`);
            }).catch(e => {
                console.error('Erreur lecture audio:', e);
                showNotification(`❌ Impossible de lire: ${track.title}`);
                isPlaying = false;
            });
        }

        updateAllPlayButtons();
    }
}

function updatePlayerDisplay() {
    const trackTitle = document.getElementById('player-track-title');
    const track = musicTracks[currentTrackIndex];

    if (trackTitle && track) {
        trackTitle.textContent = track.title;
    }
}

function updateDuration() {
    const bgMusic = document.getElementById('bgMusic');
    const timeTotal = document.getElementById('time-total');

    if (bgMusic && timeTotal && !isNaN(bgMusic.duration)) {
        timeTotal.textContent = formatTime(bgMusic.duration);
    }
}

function updateProgress() {
    const bgMusic = document.getElementById('bgMusic');
    const progressFill = document.getElementById('progress-fill');
    const timeCurrent = document.getElementById('time-current');

    if (bgMusic && progressFill && timeCurrent && !isNaN(bgMusic.duration)) {
        const progress = (bgMusic.currentTime / bgMusic.duration) * 100;
        progressFill.style.width = progress + '%';
        timeCurrent.textContent = formatTime(bgMusic.currentTime);
    }

    // Synchroniser avec le lecteur entrance
    updateEntranceProgress();
}

function seekTo(e) {
    const bgMusic = document.getElementById('bgMusic');
    const progressBar = document.getElementById('progress-bar');

    if (bgMusic && progressBar && !isNaN(bgMusic.duration)) {
        const rect = progressBar.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const percentage = clickX / rect.width;
        const newTime = percentage * bgMusic.duration;

        bgMusic.currentTime = newTime;
    }
}

function formatTime(seconds) {
    if (isNaN(seconds)) return '0:00';

    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}

// === PARTICULES ===
function initParticles() {
    const container = document.getElementById('particles');
    if (!container) return;

    setInterval(() => {
        if (document.getElementById('entrance').classList.contains('fade-out')) return;

        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDuration = (Math.random() * 3 + 3) + 's';
        particle.style.animationDelay = Math.random() * 2 + 's';

        container.appendChild(particle);

        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, 6000);
    }, 300);
}

// === EFFET DE FRAPPE ===
function initTypingEffect() {
    const typingElement = document.querySelector('.typing-text');
    if (!typingElement) return;

    const text = typingElement.textContent;
    typingElement.textContent = '';

    let i = 0;
    function typeWriter() {
        if (i < text.length) {
            typingElement.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 50);
        }
    }

    setTimeout(typeWriter, 1000);
}

// === ANIMATIONS AU SCROLL ===
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, observerOptions);

    // Observer les cartes
    document.querySelectorAll('.about-card, .project-card').forEach(card => {
        observer.observe(card);
    });
}

// === ENTRÉE DANS LE SITE ===
function enterSite() {
    const entrance = document.getElementById('entrance');
    const mainSite = document.getElementById('main-site');

    entrance.classList.add('fade-out');

    setTimeout(() => {
        entrance.style.display = 'none';
        mainSite.classList.remove('hidden');

        // Animer l'entrée du contenu principal
        initMainSiteAnimations();

        // La musique continue de jouer automatiquement sur le lecteur principal
    }, 1000);
}

function initMainSiteAnimations() {
    // Animation du terminal
    const terminalLines = document.querySelectorAll('.terminal-line, .skill-item');

    terminalLines.forEach((line, index) => {
        line.style.opacity = '0';
        line.style.transform = 'translateX(-20px)';

        setTimeout(() => {
            line.style.transition = 'all 0.5s ease';
            line.style.opacity = '1';
            line.style.transform = 'translateX(0)';
        }, index * 200);
    });
}

// === GESTION DES TOUCHES ===
function handleKeyPress(e) {
    // Éviter les actions si on tape dans un input
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
        return;
    }

    switch (e.key.toLowerCase()) {
        case ' ': // Espace pour play/pause
            e.preventDefault();
            togglePlayPause();
            break;
        case 'm':
            togglePlayPause();
            break;
        case 't':
            toggleTheme();
            break;
        case 'n':
        case 'arrowright':
            nextTrack();
            break;
        case 'p':
        case 'arrowleft':
            previousTrack();
            break;
        case 'escape':
            // Fermer le menu mobile si ouvert
            const navToggle = document.getElementById('nav-toggle');
            const navLinks = document.querySelector('.nav-links');
            if (navToggle && navToggle.classList.contains('active')) {
                navToggle.classList.remove('active');
                navLinks.classList.remove('active');
            }
            break;
    }
}

// === NOTIFICATIONS ===
function showNotification(message, duration = 3000) {
    // Supprimer l'ancienne notification si elle existe
    const existing = document.querySelector('.notification');
    if (existing) {
        existing.remove();
    }

    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;

    // Styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--bg-secondary);
        color: var(--text-primary);
        padding: 1rem 1.5rem;
        border-radius: 8px;
        border: 1px solid var(--accent-primary);
        box-shadow: var(--shadow-glow);
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
    }, duration);
}

// === EASTER EGGS ===
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];

document.addEventListener('keydown', function(e) {
    konamiCode.push(e.code);

    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }

    if (konamiCode.length === konamiSequence.length &&
        konamiCode.every((key, index) => key === konamiSequence[index])) {

        activateRainbowMode();
        konamiCode = [];
    }
});

function activateRainbowMode() {
    showNotification('🎮 Konami Code activé! Mode Arc-en-ciel!');

    document.body.style.filter = 'hue-rotate(0deg)';
    let degree = 0;

    const rainbowInterval = setInterval(() => {
        degree += 10;
        document.body.style.filter = `hue-rotate(${degree}deg)`;

        if (degree >= 360) {
            clearInterval(rainbowInterval);
            document.body.style.filter = '';
        }
    }, 50);
}

// === GESTION DES ERREURS ===
window.addEventListener('error', function(e) {
    console.error('Erreur JavaScript:', e.error);
    showNotification('Une erreur est survenue. Vérifiez la console.', 5000);
});

// === FONCTIONS UTILITAIRES ===
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Optimisation du scroll avec throttle
const optimizedScrollHandler = throttle(updateActiveNav, 100);
window.addEventListener('scroll', optimizedScrollHandler);

// === ACCESSIBILITÉ ===
function initAccessibility() {
    // Gestion du focus clavier
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });

    document.addEventListener('mousedown', () => {
        document.body.classList.remove('keyboard-navigation');
    });

    // Styles pour la navigation clavier
    const style = document.createElement('style');
    style.textContent = `
        body:not(.keyboard-navigation) *:focus {
            outline: none;
        }
        
        .keyboard-navigation *:focus {
            outline: 2px solid var(--accent-primary);
            outline-offset: 2px;
        }
    `;
    document.head.appendChild(style);
}

// Initialiser l'accessibilité
document.addEventListener('DOMContentLoaded', initAccessibility);

// === RESPONSIVE UTILITIES ===
function isMobile() {
    return window.innerWidth <= 768;
}

function isTablet() {
    return window.innerWidth > 768 && window.innerWidth <= 1024;
}

function isDesktop() {
    return window.innerWidth > 1024;
}

// Ajuster les animations selon la taille d'écran
window.addEventListener('resize', debounce(() => {
    if (isMobile()) {
        // Désactiver certaines animations sur mobile pour les performances
        document.body.classList.add('mobile-optimized');
    } else {
        document.body.classList.remove('mobile-optimized');
    }
}, 250));

// === SAUVEGARDE D'ÉTAT ===
function saveState() {
    const state = {
        theme: document.body.getAttribute('data-theme'),
        currentTrack: currentTrackIndex,
        musicPlaying: isPlaying
    };
    localStorage.setItem('portfolio-state', JSON.stringify(state));
}

function loadState() {
    const saved = localStorage.getItem('portfolio-state');
    if (saved) {
        try {
            const state = JSON.parse(saved);
            if (state.theme) {
                document.body.setAttribute('data-theme', state.theme);
            }
            if (state.currentTrack !== undefined) {
                currentTrackIndex = state.currentTrack;
            }
            updateThemeButtons();
            updateAllPlayerTitles();
        } catch (e) {
            console.log('Erreur lors du chargement de l\'état:', e);
        }
    }
}

// Sauvegarder l'état avant de quitter
window.addEventListener('beforeunload', saveState);

// Charger l'état au début
document.addEventListener('DOMContentLoaded', loadState);

// Message console pour les développeurs
console.log(`
╔══════════════════════════════════════════╗
║           Jimmy Ramsamynaick             ║
║    Développeur & Technicien Système     ║
║                                          ║
║  🎮 Raccourcis clavier:                 ║
║  • ESPACE/M : Play/Pause musique         ║
║  • ← P : Piste précédente                ║
║  • → N : Piste suivante                  ║
║  • T : Toggle thème                      ║
║  • ESC : Fermer menu mobile              ║
║  • Konami Code : Mode arc-en-ciel        ║
║                                          ║
║  🎵 Lecteur audio moderne style guns.lol ║
║  🎨 Thème sombre/clair                   ║
║  🚀 Construit avec amour à La Réunion    ║
╚══════════════════════════════════════════╝
`);