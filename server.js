const express = require('express');
const app = express();

const PORT = 3000;

const qrCodes = {
    qr1: { id: "qr1", message: "Indice 1 : Cherchez près de l'arbre.", next: "qr2" },
    qr2: { id: "qr2", message: "Indice 2 : Regardez près du banc.", next: "qr3" },
    qr3: { id: "qr3", message: "Indice 3 : Vers la fontaine.", next: "qr4" },
    qr4: { id: "qr4", message: "Félicitations ! Vous avez terminé.", next: null },
};

app.use(express.static('.'));

app.get('/validate-qr', (req, res) => {
    const { qrId } = req.query; // Récupère l'ID du QR Code depuis la requête
    if (!qrCodes[qrId]) {
        return res.status(400).json({ success: false, message: "Code QR invalide." });
    }

    res.json({
        success: true,
        message: qrCodes[qrId].message,
        next: qrCodes[qrId].next,
    });
});


//app.get('/', (req, res) => {
//    res.send('Serveur en ligne !');
//});

app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
