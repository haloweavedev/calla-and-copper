'use client';

import { useEffect, useState } from 'react';
import JSZip from 'jszip';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';

export default function USDAExtractor({ file }: { file: File }) {
  const [rawText, setRawText] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function processFile() {
      setIsLoading(true);
      
      try {
        if (file.name.endsWith('.usdz')) {
          // Read the file into memory as ArrayBuffer
          const arrayBuffer = await file.arrayBuffer();
          // Parse the ZIP archive
          const zip = await JSZip.loadAsync(arrayBuffer);
          // Find the first .usda entry and extract its text
          for (const path of Object.keys(zip.files)) {
            if (path.endsWith('.usda')) {
              const zipFile = zip.file(path);
              if (zipFile) {
                const content = await zipFile.async('string');
                setRawText(content);
                setIsLoading(false);
                return;
              }
            }
          }
          setRawText('// No .usda file found in archive');
        } else if (file.name.endsWith('.usda') || file.name.endsWith('.usd')) {
          // Read plain USD/USDA files directly
          const reader = new FileReader();
          reader.onload = () => {
            setRawText(reader.result as string);
            setIsLoading(false);
          };
          reader.readAsText(file);
          return;
        }
      } catch (error) {
        setRawText(`// Error processing file: ${error}`);
      }
      
      setIsLoading(false);
    }
    
    processFile();
  }, [file]);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Extracted USD Text</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <p className="text-gray-500">Processing file...</p>
          </div>
        ) : (
          <Textarea
            readOnly
            value={rawText}
            className="h-64 font-mono whitespace-pre-wrap text-sm"
            aria-label="Raw USD content"
            placeholder="USD content will appear here..."
          />
        )}
      </CardContent>
    </Card>
  );
} 