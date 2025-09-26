async function gerarQRCode() {
  const url = document.getElementById("urlInput").value;
  if (!url) {
    alert("Digite uma URL");
    return;
  }

  try {
    const res = await fetch("/qrcode", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url }),
    });
    const data = await res.json();

    if (data.qrCode) {
      document.getElementById("qrcode").innerHTML = `
        <img src="${data.qrCode}" alt="QR Code" />
        <a href="${data.qrCode}" download="qrcode.png">Baixar QR Code</a>
      `;
    }
  } catch (err) {
    console.error(err);
    alert("Erro ao gerar QR Code");
  }
}
