const SERVER_IP = "hyper-mc.it"; 

async function checkServerStatus() {
    const statusText = document.getElementById("server-status-text");
    const playerCount = document.getElementById("player-count");

    statusText.classList.remove("status-loading");

    // Usiamo MineTools, un'altra ottima API ottima per i test locali
    fetch(`https://api.minetools.eu/ping/${SERVER_IP}`)
        .then(response => response.json())
        .then(data => {
            // Se c'è un errore interno all'API o il server è offline
            if (data.error) {
                setServerOffline(statusText, playerCount);
            } else {
                statusText.innerText = "Online";
                statusText.classList.add("status-online");
                statusText.classList.remove("status-offline");
                // MineTools restituisce i player dentro data.players.online
                playerCount.innerText = data.players.online;
            }
        })
        .catch(error => {
            console.error("Errore di rete:", error);
            setServerOffline(statusText, playerCount);
        });
}

function setServerOffline(statusEl, playersEl) {
    statusEl.innerText = "Offline";
    statusEl.classList.add("status-offline");
    statusEl.classList.remove("status-online");
    playersEl.innerText = "0";
}

document.addEventListener("DOMContentLoaded", () => {
    checkServerStatus();
});