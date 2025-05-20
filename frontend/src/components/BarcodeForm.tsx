import React, { useState } from 'react';
import { ScanBarcode as BarcodeScan, QrCode, AlertCircle } from 'lucide-react';


const BarcodeForm: React.FC<BarcodeFormProps> = ({ onGenerateBarcode, error }) => {
  const [text, setText] = useState<string>('');
  const [isInputFocused, setIsInputFocused] = useState<boolean>(false);
  const [barcodeType, setBarcodeType] = useState<BarcodeType>('1D');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerateBarcode(text, barcodeType);
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Enter your text</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <div className={`absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none transition-colors ${
            isInputFocused ? 'text-blue-500' : 'text-gray-400'
          }`}>
            {barcodeType === '1D' ? <BarcodeScan className="h-5 w-5" /> : <QrCode className="h-5 w-5" />}
          </div>
          
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type text for barcode..."
            className={`w-full pl-10 pr-4 py-3 rounded-lg border focus:ring-2 transition-all duration-200 outline-none ${
              error 
                ? 'border-red-300 focus:border-red-500 focus:ring-red-200' 
                : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'
            }`}
            onFocus={() => setIsInputFocused(true)}
            onBlur={() => setIsInputFocused(false)}
          />
        </div>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => setBarcodeType('1D')}
            className={`flex-1 py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center ${
              barcodeType === '1D'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <BarcodeScan className="h-5 w-5 mr-2" />
            1D Barcode
          </button>
          
          <button
            type="button"
            onClick={() => setBarcodeType('2D')}
            className={`flex-1 py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center ${
              barcodeType === '2D'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <QrCode className="h-5 w-5 mr-2" />
            QR Code
          </button>
        </div>
        
        {error && (
          <div className="flex items-center text-red-500 text-sm">
            <AlertCircle className="w-4 h-4 mr-1" />
            <span>{error}</span>
          </div>
        )}
        
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center"
        >
          <span className="mr-2">Generate {barcodeType === '1D' ? 'Barcode' : 'QR Code'}</span>
          {barcodeType === '1D' ? <BarcodeScan className="h-5 w-5" /> : <QrCode className="h-5 w-5" />}
        </button>
      </form>
    </div>
  );
};

export default BarcodeForm;