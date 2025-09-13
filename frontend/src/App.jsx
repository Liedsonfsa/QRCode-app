import { useState } from "react";
import axios from "axios";

function App() {
  const [url, setUrl] = useState("");
  const [qrCode, setQrCode] = useState("");

  const gerarQRCode = async () => {
    if (!url) return alert("Digite uma URL");

    try {
      const res = await axios.post("http://localhost:5000/qrcode", { url });
      setQrCode(res.data.qrCode);
    } catch (err) {
      console.error(err);
      alert("Erro ao gerar QR Code");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Gerador de QR Code</h1>

      <input
        type="text"
        placeholder="Digite a URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        className="border rounded p-2 w-80 mb-4"
      />

      <button
        onClick={gerarQRCode}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Gerar
      </button>

      {qrCode && (
        <div className="mt-6">
          <img src={qrCode} alt="QR Code" />
          <a
            href={qrCode}
            download="qrcode.png"
            className="block text-blue-600 mt-2 underline"
          >
            Baixar QR Code
          </a>
        </div>
      )}
    </div>
  );
}

export default App;
