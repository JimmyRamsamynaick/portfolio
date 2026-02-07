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

// === GESTION DU THÈME CORRIGÉE ===
function initTheme() {
    console.log('🎨 Initialisation du thème...');

    const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
    console.log('Thème sauvegardé:', savedTheme);

    // Appliquer le thème
    document.body.setAttribute('data-theme', savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);

    updateThemeButtons();

    // Event listeners pour les boutons de thème - CORRIGÉ
    setTimeout(() => {
        const themeButtons = document.querySelectorAll('#theme-toggle, #theme-toggle-nav, .theme-btn, .control-btn');
        console.log('Boutons de thème trouvés:', themeButtons.length);

        themeButtons.forEach((btn, index) => {
            console.log(`Bouton ${index}:`, btn.id || btn.className);

            // Supprimer les anciens listeners
            btn.removeEventListener('click', toggleTheme);

            // Ajouter le nouveau listener
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('🔄 Bouton thème cliqué!');
                toggleTheme();
            });
        });
    }, 100);
}

function toggleTheme() {
    console.log('🔄 toggleTheme appelé');

    const currentTheme = document.body.getAttribute('data-theme') || 'dark';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    console.log(`Changement de thème: ${currentTheme} → ${newTheme}`);

    // Appliquer sur body et html
    document.body.setAttribute('data-theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);

    // Sauvegarder
    localStorage.setItem('portfolio-theme', newTheme);

    // Mettre à jour les boutons
    updateThemeButtons();

    // Notification
    showNotification(`🎨 Mode ${newTheme === 'dark' ? 'sombre' : 'clair'} activé!`);

    console.log('✅ Thème changé avec succès');
}

function updateThemeButtons() {
    const theme = document.body.getAttribute('data-theme') || 'dark';
    const isLight = theme === 'light';

    console.log('🔄 Mise à jour des boutons, thème actuel:', theme);

    const buttons = [
        document.getElementById('theme-toggle'),
        document.getElementById('theme-toggle-nav')
    ];

    buttons.forEach((btn, index) => {
        if (btn) {
            const icon = btn.querySelector('i');
            const span = btn.querySelector('span');

            if (icon) {
                icon.className = isLight ? 'fas fa-moon' : 'fas fa-sun';
                console.log(`Bouton ${index} icône mise à jour:`, icon.className);
            }
            if (span) {
                span.textContent = isLight ? 'Dark' : 'Light';
                console.log(`Bouton ${index} texte mise à jour:`, span.textContent);
            }
        }
    });
}

// === FONCTIONS RESPONSIVE ===
function getDeviceType() {
    const width = window.innerWidth;

    if (width <= 480) return 'mobile-small';
    if (width <= 768) return 'mobile-large';
    if (width <= 1024) return 'tablet';
    if (width <= 1200) return 'desktop-small';
    return 'desktop-large';
}

function isTouchDevice() {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
}

function isLandscape() {
    return window.innerWidth > window.innerHeight;
}

function handleResponsiveChanges() {
    const deviceType = getDeviceType();
    const isTouch = isTouchDevice();
    const landscape = isLandscape();

    // Ajouter des classes CSS basées sur l'appareil
    document.body.className = document.body.className.replace(/device-\w+/g, '');
    document.body.classList.add(`device-${deviceType}`);

    if (isTouch) {
        document.body.classList.add('touch-device');
    } else {
        document.body.classList.remove('touch-device');
    }

    if (landscape && (deviceType.includes('mobile') || deviceType === 'tablet')) {
        document.body.classList.add('mobile-landscape');
    } else {
        document.body.classList.remove('mobile-landscape');
    }

    // Ajuster les composants selon l'appareil
    adjustAudioPlayerForDevice(deviceType);
    adjustParticlesForDevice(deviceType);
    adjustAnimationsForDevice(deviceType);
}

function adjustAudioPlayerForDevice(deviceType) {
    const audioPlayer = document.getElementById('audio-player');

    if (deviceType.includes('mobile')) {
        if (audioPlayer) {
            audioPlayer.style.setProperty('--player-gap', '0.5rem');
        }
        // Réduire la fréquence de mise à jour sur mobile
        clearInterval(window.audioUpdateInterval);
        window.audioUpdateInterval = setInterval(updateProgress, 500);
    } else {
        if (audioPlayer) {
            audioPlayer.style.removeProperty('--player-gap');
        }
        clearInterval(window.audioUpdateInterval);
        window.audioUpdateInterval = setInterval(updateProgress, 100);
    }
}

function adjustParticlesForDevice(deviceType) {
    const particleContainer = document.getElementById('particles');
    if (!particleContainer) return;

    if (deviceType === 'mobile-small') {
        particleContainer.style.display = 'none';
    } else if (deviceType === 'mobile-large') {
        particleContainer.style.opacity = '0.5';
    } else {
        particleContainer.style.display = 'block';
        particleContainer.style.opacity = '1';
    }
}

function adjustAnimationsForDevice(deviceType) {
    const root = document.documentElement;

    if (deviceType.includes('mobile')) {
        root.style.setProperty('--animation-duration', '0.2s');
        root.style.setProperty('--transition-duration', '0.15s');
    } else {
        root.style.setProperty('--animation-duration', '0.3s');
        root.style.setProperty('--transition-duration', '0.3s');
    }
}

function initTouchInteractions() {
    if (!isTouchDevice()) return;

    const interactiveElements = document.querySelectorAll(
        '.enter-btn, .hero-link, .contact-link, .project-link, ' +
        '.player-btn, .entrance-player-btn, .nav-link'
    );

    interactiveElements.forEach(element => {
        element.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.95)';
        }, { passive: true });

        element.addEventListener('touchend', function() {
            this.style.transform = '';
        }, { passive: true });

        element.addEventListener('touchcancel', function() {
            this.style.transform = '';
        }, { passive: true });
    });

    // Prévenir le zoom accidentel sur double-tap
    let lastTouchEnd = 0;
    document.addEventListener('touchend', function(event) {
        const now = (new Date()).getTime();
        if (now - lastTouchEnd <= 300) {
            event.preventDefault();
        }
        lastTouchEnd = now;
    }, false);
}

function initMobileNavigation() {
    const navToggle = document.getElementById('nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (!navToggle || !navLinks) return;

    // Fermer le menu lors du scroll sur mobile
    let scrollTimer = null;
    window.addEventListener('scroll', () => {
        if (getDeviceType().includes('mobile') && navLinks.classList.contains('active')) {
            clearTimeout(scrollTimer);
            scrollTimer = setTimeout(() => {
                navToggle.classList.remove('active');
                navLinks.classList.remove('active');
            }, 150);
        }
    }, { passive: true });

    // Fermer le menu en touchant à l'extérieur
    document.addEventListener('touchstart', (e) => {
        if (navLinks.classList.contains('active') &&
            !navLinks.contains(e.target) &&
            !navToggle.contains(e.target)) {
            navToggle.classList.remove('active');
            navLinks.classList.remove('active');
        }
    }, { passive: true });
}

function initMobileAudioOptimizations() {
    const bgMusic = document.getElementById('bgMusic');
    if (!bgMusic) return;

    if (getDeviceType().includes('mobile')) {
        bgMusic.preload = 'none';

        // Gestion spéciale pour iOS
        if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
            bgMusic.muted = true;

            const unlockAudio = () => {
                bgMusic.muted = false;
                document.removeEventListener('touchstart', unlockAudio);
            };
            document.addEventListener('touchstart', unlockAudio, { once: true });
        }
    } else {
        bgMusic.preload = 'metadata';
    }
}

function initSystemThemeDetection() {
    if (window.matchMedia) {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

        if (!localStorage.getItem('portfolio-theme')) {
            const systemTheme = mediaQuery.matches ? 'dark' : 'light';
            document.body.setAttribute('data-theme', systemTheme);
            document.documentElement.setAttribute('data-theme', systemTheme);
            updateThemeButtons();
        }

        mediaQuery.addEventListener('change', (e) => {
            if (!localStorage.getItem('portfolio-theme')) {
                const newTheme = e.matches ? 'dark' : 'light';
                document.body.setAttribute('data-theme', newTheme);
                document.documentElement.setAttribute('data-theme', newTheme);
                updateThemeButtons();
                showNotification(`🎨 Thème système: ${newTheme === 'dark' ? 'sombre' : 'clair'}`);
            }
        });
    }
}

function initPageVisibilityHandling() {
    document.addEventListener('visibilitychange', () => {
        const bgMusic = document.getElementById('bgMusic');

        if (document.hidden) {
            if (bgMusic && isPlaying) {
                bgMusic.pause();
                window.wasPlayingBeforeHidden = true;
            }
            clearInterval(window.particleInterval);
        } else {
            if (bgMusic && window.wasPlayingBeforeHidden) {
                bgMusic.play();
                window.wasPlayingBeforeHidden = false;
            }
            if (!getDeviceType().includes('mobile')) {
                initParticles();
            }
        }
    });
}

function initOptimizedScrollHandling() {
    let ticking = false;

    function handleScroll() {
        if (!ticking) {
            requestAnimationFrame(() => {
                updateActiveNav();

                // Masquer/afficher le lecteur audio selon le scroll sur mobile
                if (getDeviceType().includes('mobile')) {
                    const scrollY = window.scrollY;
                    const audioPlayer = document.getElementById('audio-player');

                    if (audioPlayer) {
                        if (scrollY > 100) {
                            audioPlayer.style.transform = 'translateY(80px)';
                        } else {
                            audioPlayer.style.transform = 'translateY(0)';
                        }
                    }
                }

                ticking = false;
            });
            ticking = true;
        }
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
}

function initImprovedKeyboardHandling() {
    const shortcuts = {
        ' ': () => togglePlayPause(),
        'm': () => togglePlayPause(),
        'n': () => nextTrack(),
        'p': () => previousTrack(),
        't': () => {
            console.log('🎮 Raccourci T pressé');
            toggleTheme();
        },
        'escape': () => {
            const navToggle = document.getElementById('nav-toggle');
            const navLinks = document.querySelector('.nav-links');

            if (navToggle?.classList.contains('active')) {
                navToggle.classList.remove('active');
                navLinks?.classList.remove('active');
            }
        },
        'h': () => {
            showNotification(`
                🎮 RACCOURCIS: 
                ESPACE/M = Play/Pause | 
                N/→ = Suivant | 
                P/← = Précédent | 
                T = Thème | 
                H = Aide
            `, 5000);
        }
    };

    document.addEventListener('keydown', (e) => {
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
            return;
        }

        const key = e.key.toLowerCase();
        if (shortcuts[key]) {
            e.preventDefault();
            shortcuts[key]();
        }
    });
}

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
    updateAllPlayerTitles();
}

// Initialisation responsive
function initResponsiveFeatures() {
    console.log('🔧 Initialisation des fonctionnalités responsive...');

    handleResponsiveChanges();

    // Event listeners optimisés
    const optimizedResizeHandler = debounce(() => {
        handleResponsiveChanges();
    }, 250);

    window.addEventListener('resize', optimizedResizeHandler);
    window.addEventListener('orientationchange', () => {
        setTimeout(handleResponsiveChanges, 100);
    });

    // Initialisation des fonctionnalités
    initOptimizedScrollHandling();
    initTouchInteractions();
    initMobileNavigation();
    initMobileAudioOptimizations();
    initSystemThemeDetection();
    initPageVisibilityHandling();
    initImprovedKeyboardHandling();

    console.log('✅ Fonctionnalités responsive initialisées');
    console.log(`📱 Appareil détecté: ${getDeviceType()}`);
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

    // Adapter selon le type d'appareil
    const deviceType = getDeviceType();
    if (deviceType === 'mobile-small') return;

    const particleInterval = deviceType.includes('mobile') ? 1000 : 300;

    window.particleInterval = setInterval(() => {
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
    }, particleInterval);
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

    // Styles adaptés au responsive
    notification.style.cssText = `
        position: fixed;
        top: ${getDeviceType().includes('mobile') ? '10px' : '20px'};
        right: ${getDeviceType().includes('mobile') ? '10px' : '20px'};
        left: ${getDeviceType().includes('mobile') ? '10px' : 'auto'};
        background: var(--bg-secondary);
        color: var(--text-primary);
        padding: ${getDeviceType().includes('mobile') ? '0.8rem 1rem' : '1rem 1.5rem'};
        border-radius: 8px;
        border: 1px solid var(--accent-primary);
        box-shadow: var(--shadow-glow);
        z-index: 10001;
        font-family: 'JetBrains Mono', monospace;
        font-size: ${getDeviceType().includes('mobile') ? '0.8rem' : '0.9rem'};
        transform: translateX(${getDeviceType().includes('mobile') ? '0' : '100%'});
        transition: transform 0.3s ease, opacity 0.3s ease;
        backdrop-filter: blur(10px);
        max-width: ${getDeviceType().includes('mobile') ? 'calc(100% - 20px)' : '300px'};
        word-wrap: break-word;
        text-align: center;
        opacity: 0;
    `;

    document.body.appendChild(notification);

    // Animation d'entrée
    setTimeout(() => {
        notification.style.opacity = '1';
        if (!getDeviceType().includes('mobile')) {
            notification.style.transform = 'translateX(0)';
        }
    }, 100);

    // Auto-suppression
    setTimeout(() => {
        notification.style.opacity = '0';
        if (!getDeviceType().includes('mobile')) {
            notification.style.transform = 'translateX(100%)';
        }
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
    if (!document.getElementById('keyboard-styles')) {
        const style = document.createElement('style');
        style.id = 'keyboard-styles';
        style.textContent = `
            body:not(.keyboard-navigation) *:focus {
                outline: none;
            }
            
            .keyboard-navigation *:focus {
                outline: 2px solid var(--accent-primary);
                outline-offset: 2px;
                border-radius: 4px;
            }
        `;
        document.head.appendChild(style);
    }
}

// === SAUVEGARDE D'ÉTAT ===
function saveState() {
    const state = {
        theme: document.body.getAttribute('data-theme'),
        currentTrack: currentTrackIndex,
        musicPlaying: isPlaying,
        deviceType: getDeviceType()
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
                document.documentElement.setAttribute('data-theme', state.theme);
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

// === FONCTIONS UTILITAIRES RESPONSIVE ===
function debugResponsiveInfo() {
    const info = {
        deviceType: getDeviceType(),
        isTouchDevice: isTouchDevice(),
        isLandscape: isLandscape(),
        screenSize: `${window.innerWidth}x${window.innerHeight}`,
        userAgent: navigator.userAgent.substring(0, 50) + '...',
        theme: document.body.getAttribute('data-theme'),
        musicTrack: musicTracks[currentTrackIndex]?.title
    };

    console.table(info);
    return info;
}

function getPerformanceLevel() {
    const deviceType = getDeviceType();
    const connection = navigator.connection;

    if (deviceType === 'mobile-small' || (connection && connection.effectiveType === '2g')) {
        return 'low';
    } else if (deviceType.includes('mobile') || (connection && connection.effectiveType === '3g')) {
        return 'medium';
    }
    return 'high';
}

function adjustQualityForPerformance() {
    const level = getPerformanceLevel();
    const root = document.documentElement;

    switch(level) {
        case 'low':
            root.style.setProperty('--animation-duration', '0.1s');
            root.style.setProperty('--particle-count', '0');
            break;
        case 'medium':
            root.style.setProperty('--animation-duration', '0.2s');
            root.style.setProperty('--particle-count', '5');
            break;
        case 'high':
        default:
            root.style.setProperty('--animation-duration', '0.3s');
            root.style.setProperty('--particle-count', '10');
            break;
    }
}

// === GESTION DES ERREURS RESPONSIVE ===
function handleResponsiveErrors() {
    // Vérifier si les éléments critiques sont présents
    const criticalElements = ['entrance', 'main-site', 'audio-player', 'bgMusic'];

    criticalElements.forEach(id => {
        const element = document.getElementById(id);
        if (!element) {
            console.warn(`Élément critique manquant: ${id}`);
        }
    });

    // Fallback pour les navigateurs qui ne supportent pas certaines fonctionnalités
    if (!('IntersectionObserver' in window)) {
        console.warn('IntersectionObserver non supporté, utilisation d\'un fallback');
        window.addEventListener('scroll', debounce(() => {
            document.querySelectorAll('.about-card, .project-card').forEach(card => {
                const rect = card.getBoundingClientRect();
                if (rect.top < window.innerHeight && rect.bottom > 0) {
                    card.classList.add('fade-in-up');
                }
            });
        }, 100));
    }
}

// === FONCTIONS D'OPTIMISATION ===
function forceReflow() {
    document.body.offsetHeight;
}

function prefersReducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

// === INITIALISATION PRINCIPALE ===
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Initialisation du site...');

    // Initialisation responsive en premier
    initResponsiveFeatures();

    // Puis vos initialisations existantes
    initTheme(); // Thème corrigé
    initNavigation();
    initAudioPlayer();
    initEntranceAudioPlayer();
    initParticles();
    initScrollAnimations();
    initTypingEffect();
    initAccessibility();

    // Charger l'état sauvegardé
    loadState();

    // Gestion des erreurs responsive
    handleResponsiveErrors();

    // Ajuster la qualité selon les performances
    adjustQualityForPerformance();

    console.log('✅ Site initialisé avec succès');
});

// Sauvegarder l'état avant de quitter
window.addEventListener('beforeunload', saveState);

// Exposer les fonctions de debug globalement
window.debugResponsive = debugResponsiveInfo;
window.getDeviceType = getDeviceType;
window.isTouchDevice = isTouchDevice;
window.isLandscape = isLandscape;
window.toggleTheme = toggleTheme; // Exposer pour debug

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
║  • H : Aide                              ║
║  • ESC : Fermer menu mobile              ║
║  • Konami Code : Mode arc-en-ciel        ║
║                                          ║
║  🎵 Lecteur audio moderne style guns.lol ║
║  🎨 Thème sombre/clair + détection auto  ║
║  📱 Responsive optimisé                  ║
║  🚀 Construit avec amour à La Réunion    ║
║                                          ║
║  🔧 Debug: tapez debugResponsive()       ║
║  🎨 Debug thème: tapez toggleTheme()     ║
╚══════════════════════════════════════════╝
`);

// Notification d'initialisation
setTimeout(() => {
    if (getDeviceType().includes('mobile')) {
        showNotification('📱 Version mobile optimisée chargée!', 2000);
    } else {
        showNotification('🖥️ Version desktop chargée! Tapez H pour l\'aide', 3000);
    }
}, 2000);