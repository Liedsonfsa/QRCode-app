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
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <div className="bg-gray-800 shadow-xl rounded-2xl p-8 w-full max-w-md text-center">
        <h1 className="text-2xl font-bold text-blue-400 mb-6">
          Gerador de QR Code
        </h1>

        <input
          type="text"
          placeholder="Digite a URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="w-full px-4 py-2 rounded-lg border border-gray-600 bg-gray-900 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          onClick={gerarQRCode}
          className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition"
        >
          Gerar QR Code
        </button>

        {qrCode && (
          <div className="mt-6 flex flex-col items-center">
            <img
              src={qrCode}
              alt="QR Code"
              className="w-40 h-40 shadow-lg rounded-lg"
            />
            <a
              href={qrCode}
              download="qrcode.png"
              className="mt-4 text-blue-400 hover:underline"
            >
              Baixar QR Code
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
