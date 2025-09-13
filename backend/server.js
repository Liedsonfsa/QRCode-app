const express = require('express');
const QRCode = require('qrcode');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

app.post('/qrcode', async (req, res) => {
    const { url } = req.body;

    if (!url) {
        return res.status(400).json({ error: 'URL é obrigatória'});
    }

    try {
        const qrCodeData = await QRCode.toDataURL(url);
        res.json({ qrCode: qrCodeData });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao gerar QR Code'});
    }
});

app.listen(5000, () => {
    console.log(`Servidor rodando em http://localhost:5000`);
});