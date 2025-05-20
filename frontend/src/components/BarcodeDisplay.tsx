import React, { useEffect, useRef } from 'react';
import { Download, Copy, RefreshCw } from 'lucide-react';
import JsBarcode from 'jsbarcode';
import QRCode from 'qrcode';

interface BarcodeDisplayProps {
  value: string;
  type: '1D' | '2D';
  onReset: () => void;
}

const BarcodeDisplay: React.FC<BarcodeDisplayProps> = ({ value, type, onReset }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
    if (!value) return;

    if (type === '1D' && svgRef.current) {
      try {
        JsBarcode(svgRef.current, value, {
          format: 'CODE128',
          lineColor: '#1E40AF', // Blue-800
          width: 2,
          height: 80,
          displayValue: true,
          fontSize: 16,
          font: 'system-ui, sans-serif',
          textMargin: 6,
          background: 'transparent',
        });
      } catch (error) {
        console.error('Error generating barcode:', error);
      }
    } else if (type === '2D' && canvasRef.current) {
      QRCode.toCanvas(canvasRef.current, value, {
        width: 200,
        margin: 2,
        color: {
          dark: '#1E40AF', // Blue-800
          light: '#FFFFFF',
        },
      }).catch((error) => {
        console.error('Error generating QR code:', error);
      });
    }
  }, [value, type]);

  const downloadCode = () => {
    const element = type === '1D' ? svgRef.current : canvasRef.current;
    if (!element) return;
    
    let url: string;
    let extension: string;
    
    if (type === '1D') {
      const svgData = new XMLSerializer().serializeToString(element as SVGElement);
      const blob = new Blob([svgData], { type: 'image/svg+xml' });
      url = URL.createObjectURL(blob);
      extension = 'svg';
    } else {
      url = (element as HTMLCanvasElement).toDataURL('image/png');
      extension = 'png';
    }
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `${type === '1D' ? 'barcode' : 'qrcode'}-${value}.${extension}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    if (type === '1D') {
      URL.revokeObjectURL(url);
    }
  };

  const copyCode = async () => {
    const element = type === '1D' ? svgRef.current : canvasRef.current;
    if (!element) return;
    
    try {
      if (type === '2D') {
        const blob = await new Promise<Blob>((resolve) => 
          (element as HTMLCanvasElement).toBlob((blob) => resolve(blob!))
        );
        await navigator.clipboard.write([
          new ClipboardItem({ 'image/png': blob })
        ]);
      } else {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const svgData = new XMLSerializer().serializeToString(element as SVGElement);
        const img = new Image();
        
        const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
        const url = URL.createObjectURL(svgBlob);
        
        img.onload = () => {
          canvas.width = img.width;
          canvas.height = img.height;
          ctx?.drawImage(img, 0, 0);
          canvas.toBlob(async (blob) => {
            if (blob) {
              try {
                await navigator.clipboard.write([
                  new ClipboardItem({ 'image/png': blob })
                ]);
                alert('Code copied to clipboard!');
              } catch (err) {
                console.error('Failed to copy: ', err);
                alert('Could not copy to clipboard. Your browser may not support this feature.');
              }
            }
          });
          URL.revokeObjectURL(url);
        };
        img.src = url;
      }
      alert('Code copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy:', err);
      alert('Could not copy to clipboard. Your browser may not support this feature.');
    }
  };

  return (
    <div className="p-6 bg-gray-50 border-t border-gray-200 animate-fadeIn">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Your {type === '1D' ? 'Barcode' : 'QR Code'}
      </h2>
      
      <div className="flex justify-center mb-6 p-4 bg-white rounded-lg shadow-sm overflow-hidden">
        {type === '1D' ? (
          <svg ref={svgRef} className="max-w-full"></svg>
        ) : (
          <canvas ref={canvasRef} className="max-w-full"></canvas>
        )}
      </div>
      
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={downloadCode}
          className="flex-1 flex items-center justify-center py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors duration-200"
        >
          <Download className="w-5 h-5 mr-2" />
          Download {type === '1D' ? 'SVG' : 'PNG'}
        </button>
        
        <button
          onClick={copyCode}
          className="flex-1 flex items-center justify-center py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200"
        >
          <Copy className="w-5 h-5 mr-2" />
          Copy to Clipboard
        </button>
        
        <button
          onClick={onReset}
          className="flex-1 flex items-center justify-center py-2 px-4 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors duration-200"
        >
          <RefreshCw className="w-5 h-5 mr-2" />
          Generate New
        </button>
      </div>
    </div>
  );
};

export default BarcodeDisplay;