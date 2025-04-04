const express = require("express");
const multer = require("multer");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

// Configuration de stockage des images
const storage = multer.diskStorage({
    destination: "./uploads",
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({ storage });

// Route pour uploader une image
app.post("/upload", upload.single("image"), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: "Aucun fichier envoyé" });
    }
    res.json({ imageUrl: `http://localhost:3000/uploads/${req.file.filename}` });
});

// Servir les images statiques
app.use("/uploads", express.static("uploads"));

// Démarrer le serveur
app.listen(3001, () => {
    console.log("Serveur démarré sur http://localhost:3001");
});
