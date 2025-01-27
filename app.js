document.getElementById('scan').addEventListener('click', async () => {
    const qrId = prompt("Entrez l'identifiant du QR Code scanné :");
    if (!qrId) return;

    const response = await fetch(`/validate-qr?qrId=${qrId}`);
    const data = await response.json();

    const messageDiv = document.getElementById('message');
    if (data.success) {
        messageDiv.innerText = data.message;
    } else {
        messageDiv.innerText = "QR Code invalide. Réessayez.";
    }
});
