const express = require('express');
const app = express();

const qrCodes = {
    qr1: { id: "qr1", message: "Indice 1 : Cherchez près de l'arbre.", next: "qr2" },
    qr2: { id: "qr2", message: "Indice 2 : Regardez près du banc.", next: "qr3" },
    qr3: { id: "qr3", message: "Indice 3 : Vers la fontaine.", next: "qr4" },
    qr4: { id: "qr4", message: "Félicitations ! Vous avez terminé.", next: null },
};

const userProgress = {}; // Stocke la progression des joueurs
const completedPlayers = []; // Liste des joueurs ayant terminé

app.use(express.static('.')); // Servir les fichiers statiques

app.get('/ping', (req, res) => {
    res.json({ message: "Pong!" });
});

app.get('/validate-qr', (req, res) => {
    const { qrId } = req.query;
    const ip = req.ip;

    if (!qrCodes[qrId]) {
        return res.status(400).json({ success: false, message: "Code QR invalide." });
    }

    if (!userProgress[ip]) {
        userProgress[ip] = [];
    }

    if (!userProgress[ip].includes(qrId)) {
        userProgress[ip].push(qrId);
    }

    const total = Object.keys(qrCodes).length;
    const progress = userProgress[ip].length;

    if (progress === total && !completedPlayers.includes(ip)) {
        completedPlayers.push(ip);
    }

    res.json({
        success: true,
        message: qrCodes[qrId].message,
        next: qrCodes[qrId].next,
        progress: `${progress}/${total}`,
        completed: progress === total
    });
});

app.get('/draw-winner', (req, res) => {
    if (completedPlayers.length === 0) {
        return res.json({ success: false, message: "Aucun joueur éligible." });
    }

    const winner = completedPlayers[Math.floor(Math.random() * completedPlayers.length)];
    res.json({ success: true, winner });
});

// Exporter l'application pour Vercel
module.exports = app;
