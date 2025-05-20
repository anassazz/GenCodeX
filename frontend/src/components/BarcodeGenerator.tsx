import React, { useState } from 'react';
import BarcodeForm from './BarcodeForm';
import BarcodeDisplay from './BarcodeDisplay';

type BarcodeType = '1D' | '2D';

const BarcodeGenerator: React.FC = () => {
  const [barcodeValue, setBarcodeValue] = useState<string>('');
  const [barcodeGenerated, setBarcodeGenerated] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [barcodeType, setBarcodeType] = useState<BarcodeType>('1D');

  const generateBarcode = (text: string, type: BarcodeType) => {
    if (!text.trim()) {
      setError('Please enter some text to generate a barcode');
      setBarcodeGenerated(false);
      return;
    }
    
    // Clear any previous errors
    setError(null);
    setBarcodeValue(text);
    setBarcodeType(type);
    setBarcodeGenerated(true);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
      <BarcodeForm 
        onGenerateBarcode={generateBarcode} 
        error={error}
      />
      
      {barcodeGenerated && (
        <BarcodeDisplay 
          value={barcodeValue}
          type={barcodeType}
          onReset={() => setBarcodeGenerated(false)}
        />
      )}
    </div>
  );
};

export default BarcodeGenerator;