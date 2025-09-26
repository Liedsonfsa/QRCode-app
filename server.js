const express = require("express");
const QRCode = require("qrcode");
const path = require("path");

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, "public"))); // servir frontend

// rota que gera QRCode
app.post("/qrcode", async (req, res) => {
  const { url } = req.body;
  if (!url) {
    return res.status(400).json({ error: "URL é obrigatória" });
  }

  try {
    const qrCodeData = await QRCode.toDataURL(url);
    res.json({ qrCode: qrCodeData });
  } catch (err) {
    res.status(500).json({ error: "Erro ao gerar QR Code" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Rodando em http://localhost:${PORT}`));
