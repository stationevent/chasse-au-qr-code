// Récupérer les éléments du DOM
const scanButton = document.getElementById('scan');
const messageDiv = document.getElementById('message');
const progressDiv = document.getElementById('progress');

// Fonction pour gérer les scans de QR Codes
scanButton.addEventListener('click', async () => {
    // Simule l'entrée d'un QR Code (remplace avec un vrai scanner si nécessaire)
    const qrId = prompt("Entrez l'identifiant du QR Code scanné :");
    if (!qrId) return;

    try {
        // Appel au serveur pour valider le QR Code
        const response = await fetch(`/validate-qr?qrId=${qrId}`);
        const data = await response.json();

        // Met à jour l'interface utilisateur en fonction de la réponse
        if (data.success) {
            messageDiv.innerHTML = `<strong>🎉 ${data.message}</strong>`;
            progressDiv.innerText = `Progression : ${data.progress}`;
            if (data.completed) {
                messageDiv.innerHTML += `<p>🎊 Félicitations, vous avez terminé !</p>`;
            }
        } else {
            messageDiv.innerHTML = `<strong>❌ ${data.message}</strong>`;
        }
    } catch (error) {
        console.error("Erreur lors de la validation :", error);
        messageDiv.innerHTML = `<strong>❌ Une erreur s'est produite. Réessayez.</strong>`;
    }
});
