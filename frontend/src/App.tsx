import React from 'react';
import { Barcode, QrCode } from 'lucide-react';
import BarcodeGenerator from './components/BarcodeGenerator';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center py-10 px-4">
      <header className="mb-10 text-center">
        <div className="flex items-center justify-center gap-3 mb-2">
          <Barcode className="w-8 h-8 text-blue-600" />
          <QrCode className="w-8 h-8 text-blue-600" />
          <h1 className="text-3xl font-bold text-blue-800">Code Generator</h1>
        </div>
        <p className="text-gray-600 max-w-md mx-auto">
          Generate 1D barcodes (CODE128) or QR codes from your text input with this simple and elegant tool.
        </p>
      </header>
      
      <main className="w-full max-w-2xl mx-auto">
        <BarcodeGenerator />
      </main>
      
      <footer className="mt-auto pt-10 text-center text-gray-500 text-sm">
        <p>© 2025 Code Generator • Built with React & Tailwind CSS</p>
      </footer>
    </div>
  );
}

export default App;