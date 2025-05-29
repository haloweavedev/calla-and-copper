'use client';

import { useEffect, useState, useCallback } from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

// Helper function to convert ArrayBuffer to hex dump format
function arrayBufferToHexDump(buffer: ArrayBuffer, maxBytes = 2048): string {
  const uint8Array = new Uint8Array(buffer);
  const bytesToShow = Math.min(uint8Array.length, maxBytes);
  const lines: string[] = [];

  for (let i = 0; i < bytesToShow; i += 16) {
    // Address column (8 hex digits)
    const address = i.toString(16).padStart(8, '0').toUpperCase();
    
    // Hex bytes (16 bytes per line, split into two groups of 8)
    const hexBytes: string[] = [];
    const asciiChars: string[] = [];
    
    for (let j = 0; j < 16; j++) {
      const byteIndex = i + j;
      if (byteIndex < bytesToShow) {
        const byte = uint8Array[byteIndex];
        hexBytes.push(byte.toString(16).padStart(2, '0').toUpperCase());
        // ASCII representation (printable chars only)
        asciiChars.push(byte >= 32 && byte <= 126 ? String.fromCharCode(byte) : '.');
      } else {
        hexBytes.push('  ');
        asciiChars.push(' ');
      }
    }
    
    // Format: address | 8 hex bytes | 8 hex bytes | ASCII
    const hexPart1 = hexBytes.slice(0, 8).join(' ');
    const hexPart2 = hexBytes.slice(8, 16).join(' ');
    const asciiPart = asciiChars.join('');
    
    lines.push(`${address}  ${hexPart1}  ${hexPart2}  |${asciiPart}|`);
  }

  return lines.join('\n');
}

export default function USDZRawDataViewer({ file }: { file: File }) {
  const [hexData, setHexData] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [bytesShown, setBytesShown] = useState(2048);
  const [totalBytes, setTotalBytes] = useState(0);
  const [showMore, setShowMore] = useState(false);

  const extractRawData = useCallback(async (maxBytes: number) => {
    setIsLoading(true);
    
    try {
      // Read file as ArrayBuffer for all file types
      const buffer = await file.arrayBuffer();
      setTotalBytes(buffer.byteLength);
      
      // Convert to hex dump
      const hexDump = arrayBufferToHexDump(buffer, maxBytes);
      setHexData(hexDump);
      setBytesShown(Math.min(buffer.byteLength, maxBytes));
      setShowMore(buffer.byteLength > maxBytes);
      
    } catch (error) {
      setHexData(`// Error reading file: ${error}`);
    }
    
    setIsLoading(false);
  }, [file]);

  useEffect(() => {
    extractRawData(2048);
  }, [extractRawData]);

  const handleShowMore = () => {
    const nextChunkSize = bytesShown + 2048;
    extractRawData(nextChunkSize);
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} bytes`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Raw File Data (Hex)</span>
          <span className="text-sm font-normal text-gray-500">
            {formatFileSize(totalBytes)}
          </span>
        </CardTitle>
        {totalBytes > 0 && (
          <p className="text-sm text-gray-600">
            Showing first {bytesShown.toLocaleString()} of {totalBytes.toLocaleString()} bytes
            {bytesShown < totalBytes && ` (${((bytesShown / totalBytes) * 100).toFixed(1)}%)`}
          </p>
        )}
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <p className="text-gray-500">Reading raw file data...</p>
          </div>
        ) : (
          <div className="space-y-4">
            <Textarea
              readOnly
              value={hexData}
              className="h-96 font-mono whitespace-pre text-xs leading-tight"
              aria-label="Raw file data in hexadecimal format"
              placeholder="Raw file data will appear here..."
            />
            {showMore && (
              <div className="flex justify-center">
                <Button 
                  onClick={handleShowMore}
                  variant="outline"
                  size="sm"
                >
                  Show More Data (+2KB)
                </Button>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
} 