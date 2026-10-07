function copyIP() {
    const ipTesto = "hyper-mc.it"; /* L'IP reale del tuo server Minecraft */
    
    /* Usa le funzioni moderne del browser per copiare il testo negli appunti */
    navigator.clipboard.writeText(ipTesto).then(() => {
        
        /* Crea al volo un piccolo elemento di notifica sullo schermo */
        const notifica = document.createElement("div"); /* Genera un box vuoto */
        notifica.className = "toast-notifica";          /* Gli assegna la classe CSS */
        notifica.innerText = "IP Copiato con successo!"; /* Inserisce il testo dell'avviso */
        
        document.body.appendChild(notifica);            /* Appiccica la notifica nella pagina */
        
        /* Rende visibile la notifica dopo un millisecondo per attivare l'animazione */
        setTimeout(() => {
            notifica.classList.add("mostra");           /* Attiva la transizione visiva */
        }, 10);
        
        /* Rimuove la notifica dallo schermo dopo 3 secondi */
        setTimeout(() => {
            notifica.classList.remove("mostra");        /* Fa sparire l'avviso con l'animazione */
            setTimeout(() => notifica.remove(), 400);   /* Elimina definitivamente il tag HTML */
        }, 3000);
        
    }).catch(err => {
        console.error("Errore durante il copia:", err); /* Log di sicurezza in caso di blocchi */
    });
}
function toggleAccordion(header) {
    const item = header.parentElement;
    const isActive = item.classList.contains('active');

    // Opzionale: Chiude gli altri quando ne apri uno nuovo
    document.querySelectorAll('.accordion-item').forEach(otherItem => {
        otherItem.classList.remove('active');
    });

    // Apre/Chiude quello cliccato
    if (!isActive) {
        item.classList.add('active');
    }
}




/* ==========================================
   NOTIFICA VOTO ANIMATA
   ========================================== */

const recentVoters = [
    "Kev4n", "EnderGamer_99", "RedstoneMaster", "Xx_Shadow_xX", 
    "Marko_PvP", "HyperCraft", "AlexPro_IT", "DiamondHunter", 
    "DragonSlayer", "CraftBoy_04", "GhostRider_IT", "N3xusPlayer"
];

let voteTimeout;

function showVoteNotification(playerName) {
    const notification = document.getElementById('vote-notification');
    const nameElement = document.getElementById('vote-player-name');
    const progressBar = document.getElementById('vote-progress-bar');

    if (!notification || !nameElement) return;

    notification.classList.remove('show');
    if (progressBar) progressBar.style.animation = 'none';
    
    void notification.offsetWidth;

    nameElement.textContent = playerName;
    
    if (progressBar) progressBar.style.animation = '';
    notification.classList.add('show');

    clearTimeout(voteTimeout);

    voteTimeout = setTimeout(() => {
        closeVoteNotification();
    }, 6000);
}

function closeVoteNotification() {
    const notification = document.getElementById('vote-notification');
    if (notification) {
        notification.classList.remove('show');
    }
}

function getRandomTime(minSeconds, maxSeconds) {
    return Math.floor(Math.random() * (maxSeconds - minSeconds + 1) + minSeconds) * 1000;
}

function scheduleNextNotification() {
    const nextInterval = getRandomTime(35, 75); 
    
    setTimeout(() => {
        const randomPlayer = recentVoters[Math.floor(Math.random() * recentVoters.length)];
        showVoteNotification(randomPlayer);
        scheduleNextNotification();
    }, nextInterval);
}

window.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        const randomPlayer = recentVoters[Math.floor(Math.random() * recentVoters.length)];
        showVoteNotification(randomPlayer);
        scheduleNextNotification();
    }, 4000);
});



// --- MENU TASTO DESTRO PERSONALIZZATO ---
document.addEventListener('contextmenu', function(e) {
    const contextMenu = document.getElementById('custom-context-menu');
    if (!contextMenu) return;

    e.preventDefault();

    let x = e.clientX;
    let y = e.clientY;

    const menuWidth = 210;
    const menuHeight = 290;
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    /* Evita che il menu esca dai bordi dello schermo */
    if (x + menuWidth > windowWidth) {
        x = windowWidth - menuWidth - 10;
        contextMenu.style.transformOrigin = 'top right';
    } else {
        contextMenu.style.transformOrigin = 'top left';
    }

    if (y + menuHeight > windowHeight) {
        y = windowHeight - menuHeight - 10;
    }

    contextMenu.style.left = `${x}px`;
    contextMenu.style.top = `${y}px`;
    contextMenu.classList.add('attivo');
});

// Chiudi il menu se si clicca fuori o si fa scroll
document.addEventListener('click', function(e) {
    const contextMenu = document.getElementById('custom-context-menu');
    if (contextMenu && !contextMenu.contains(e.target)) {
        contextMenu.classList.remove('attivo');
    }
});

window.addEventListener('scroll', function() {
    const contextMenu = document.getElementById('custom-context-menu');
    contextMenu?.classList.remove('attivo');
});


// --- BLOCCO DEVTOOLS (F12) CON SALVATAGGIO PAGINA CORRENTE ---
document.addEventListener('keydown', function(e) {
    if (
        e.key === 'F12' || 
        e.keyCode === 123 || 
        (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'i' || e.keyCode === 73))
    ) {
        e.preventDefault();
        
        // Salva l'URL esatto di provenienza (inclusi eventuali #ancore o sezioni)
        const currentPage = encodeURIComponent(window.location.href);
        window.location.href = `no-access.html?from=${currentPage}`;
    }
});

// --- EFFETTO SCINTILLE ROSSE AL CLICK ---
document.addEventListener('click', function(e) {
    const sparkCount = 12; // Numero di scintille generate ad ogni click

    for (let i = 0; i < sparkCount; i++) {
        const spark = document.createElement('div');
        spark.classList.add('click-spark');

        // Posizione esatta del cursor
        spark.style.left = `${e.clientX}px`;
        spark.style.top = `${e.clientY}px`;

        // Calcolo di una traiettoria casuale a 360 gradi
        const angle = Math.random() * Math.PI * 2;
        const distance = 30 + Math.random() * 50; // Distanza dell'esplosione
        const tx = Math.cos(angle) * distance;
        const ty = Math.sin(angle) * distance;
        const size = 3 + Math.random() * 4; // Dimensioni variabili (3px - 7px)

        // Passiamo i valori calcolati al CSS tramite variabili custom
        spark.style.setProperty('--tx', `${tx}px`);
        spark.style.setProperty('--ty', `${ty}px`);
        spark.style.width = `${size}px`;
        spark.style.height = `${size}px`;

        document.body.appendChild(spark);

        // Rimuove la scintilla dal DOM al termine dell'animazione
        setTimeout(() => {
            spark.remove();
        }, 600);
    }
});


// ==========================================
// CONTROLLO SIDE DRAWER FAQ
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    const drawer = document.getElementById('faq-drawer');
    const overlay = document.getElementById('faq-overlay');
    const closeBtn = document.getElementById('faq-close-btn');
    const navTrigger = document.getElementById('faq-nav-trigger');
    const floatBtn = document.getElementById('faq-floating-btn');

    // Funzione Apri
    function openFAQ(e) {
        if (e) e.preventDefault();
        drawer.classList.add('open');
        overlay.classList.add('active');
    }

    // Funzione Chiudi
    function closeFAQ() {
        drawer.classList.remove('open');
        overlay.classList.remove('active');
    }

    // Event Listener per apertura
    if (navTrigger) navTrigger.addEventListener('click', openFAQ);
    if (floatBtn) floatBtn.addEventListener('click', openFAQ);

    // Event Listener per chiusura
    if (closeBtn) closeBtn.addEventListener('click', closeFAQ);
    if (overlay) overlay.addEventListener('click', closeFAQ);

    // Chiudi premendo il tasto ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && drawer.classList.contains('open')) {
            closeFAQ();
        }
    });

    // Gestione Accordion interno
    const faqItems = document.querySelectorAll('.faq-drawer .faq-item');

    faqItems.forEach(item => {
        const btn = item.querySelector('.faq-question');
        btn.addEventListener('click', () => {
            const isActive = item.classList.contains('active');

            faqItems.forEach(other => other.classList.remove('active'));

            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
});



// ==========================================
// WIKI HYPERMC (SCROLLSPY & MULTILINGUA)
// ==========================================
document.addEventListener('DOMContentLoaded', () => {

    // 1. SCROLLSPY (Evidenzia categoria durante lo scorrimento)
    const sections = document.querySelectorAll('.wiki-section');
    const sidebarLinks = document.querySelectorAll('.sidebar-link');

    window.addEventListener('scroll', () => {
        let currentSectionId = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            const sectionHeight = section.clientHeight;

            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        sidebarLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    });

    // 2. SISTEMA MULTILINGUA (IT / EN)
    const langBtns = document.querySelectorAll('.lang-btn');

    langBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const selectedLang = btn.getAttribute('data-lang');

            // Cambia stato attivo sui pulsanti
            langBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Cerca tutti gli elementi con traduzione data-it / data-en
            const translatableElements = document.querySelectorAll('[data-' + selectedLang + ']');

            translatableElements.forEach(el => {
                const translation = el.getAttribute(`data-${selectedLang}`);
                if (translation) {
                    el.innerText = translation;
                }
            });
        });
    });
});