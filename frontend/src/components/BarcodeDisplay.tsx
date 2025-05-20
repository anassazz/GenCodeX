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