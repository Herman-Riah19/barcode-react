"use client"
import React, { useState, useRef, useEffect } from 'react';
import JsBarcode from 'jsbarcode';

export default function Home() {
  const [bottleId, setBottleId] = useState(""); // Numéro d'identifiant
  const [url, setUrl] = useState(""); // URL du site
  const [barcodeValue, setBarcodeValue] = useState("");

  const handleGenerateBarcode = () => {
    if (bottleId && url) {
      setBarcodeValue(`${url}/${bottleId}`); // Génère l'URL complète
    } else {
      alert("Veuillez remplir les deux champs !");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Générateur de Code-Barres</h1>
      <div className="flex flex-col items-center space-y-4 w-1/2">
        <input
          type="text"
          value={bottleId}
          onChange={(e) => setBottleId(e.target.value)}
          className="border border-gray-300 rounded p-2 w-full text-black"
          placeholder="Entrez l'identifiant (ex: 12345)"
        />
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="border border-gray-300 rounded p-2 w-full text-black"
          placeholder="Entrez l'URL (ex: https://example.com)"
        />
        <button
          onClick={handleGenerateBarcode}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Générer le Code-Barres
        </button>
      </div>
      {barcodeValue && (
        <div className="bg-white p-4 rounded shadow mt-6">
          <h2 className="text-lg font-semibold mb-4">Code-Barres :</h2>
          <BarcodeGenerator value={barcodeValue} displayValue={bottleId} />
        </div>
      )}
    </div>
  );
}

const BarcodeGenerator = ({ value, displayValue }: { value: string, displayValue: string }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (canvasRef.current) {
      JsBarcode(canvasRef.current, value, {
        format: "CODE128", // Format du code-barres
        width: 2,
        height: 100,
        displayValue: true, // Affiche le texte sous le code-barres
        text: displayValue, // Texte affiché sous le code-barres
        fontOptions: "bold",
      });
    }
  }, [value, displayValue]);

  const handleDownload = () => {
    const canvas = canvasRef.current;
    const link = document.createElement("a");
    link.download = "barcode.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  return (
    <div className="barcode-container flex flex-col items-center">
      <canvas ref={canvasRef} />
      <button
        onClick={handleDownload}
        className="mt-2 bg-green-500 text-white px-4 py-2 rounded"
      >
        Télécharger
      </button>
    </div>
  );
};

