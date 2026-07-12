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