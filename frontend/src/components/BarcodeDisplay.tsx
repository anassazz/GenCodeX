import React, { useEffect, useRef } from 'react';
import { Download, Copy, RefreshCw } from 'lucide-react';
import JsBarcode from 'jsbarcode';
import QRCode from 'qrcode';

interface BarcodeDisplayProps {
  value: string;
  type: '1D' | '2D';
  onReset: () => void;
}