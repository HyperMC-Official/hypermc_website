// Seleziona il bottone usando l'ID "hamburger"
const hamburger = document.getElementById('hamburger');
// Seleziona il menù usando l'ID "nav-menu"
const navMenu = document.getElementById('nav-menu');

hamburger.addEventListener('click', () => {
    // Aggiunge o toglie la classe "attivo" al click
    hamburger.classList.toggle('attivo');
    navMenu.classList.toggle('attivo');
});