'use client';

import { useEffect, useState, useCallback, useMemo } from 'react';
import JSZip from 'jszip';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';

// TypeScript interfaces for structured USD data
interface USDZAnalysis {
  metadata: {
    version?: string;
    defaultPrim?: string;
    metersPerUnit?: number;
    upAxis?: string;
    timeCodesPerSecond?: number;
  };
  prims: Array<{
    name: string;
    type: string;
    kind?: string;
    purpose?: string;
    transform?: Record<string, number[]>;
    properties?: Record<string, string>;
  }>;
  materials: Array<{
    name: string;
    properties: Record<string, number | number[]>;
  }>;
  geometry: Array<{
    name: string;
    type: string;
    points?: number;
    faces?: number;
  }>;
  dimensions?: {
    bounds?: { min: number[], max: number[] };
    size?: { width: number, height: number, depth: number };
  };
}

/**
 * Parse USD/USDA content to extract structured information
 */
function parseUSDContent(content: string): USDZAnalysis {
  const analysis: USDZAnalysis = {
    metadata: {},
    prims: [],
    materials: [],
    geometry: [],
    dimensions: {}
  };

  const lines = content.split('\n');

  // Parse metadata from header
  for (const line of lines.slice(0, 20)) {
    const trimmed = line.trim();
    
    if (trimmed.startsWith('#usda')) {
      analysis.metadata.version = trimmed.split(' ')[1];
    }
    if (trimmed.includes('defaultPrim')) {
      const match = trimmed.match(/defaultPrim\s*=\s*"([^"]+)"/);
      if (match) analysis.metadata.defaultPrim = match[1];
    }
    if (trimmed.includes('metersPerUnit')) {
      const match = trimmed.match(/metersPerUnit\s*=\s*([\d.]+)/);
      if (match) analysis.metadata.metersPerUnit = Number.parseFloat(match[1]);
    }
    if (trimmed.includes('upAxis')) {
      const match = trimmed.match(/upAxis\s*=\s*"([^"]+)"/);
      if (match) analysis.metadata.upAxis = match[1];
    }
    if (trimmed.includes('timeCodesPerSecond')) {
      const match = trimmed.match(/timeCodesPerSecond\s*=\s*([\d.]+)/);
      if (match) analysis.metadata.timeCodesPerSecond = Number.parseFloat(match[1]);
    }
  }

  // Parse primitive definitions
  const primRegex = /def\s+(\w+)\s+"([^"]+)"/g;
  let match: RegExpExecArray | null = primRegex.exec(content);
  
  while (match !== null) {
    const type = match[1];
    const name = match[2];
    
    // Extract additional properties for this prim
    const primBlock = extractPrimBlock(content, match.index);
    const properties: Record<string, string> = {};
    
    // Look for common USD properties
    if (primBlock.includes('kind')) {
      const kindMatch = primBlock.match(/kind\s*=\s*"([^"]+)"/);
      if (kindMatch) properties.kind = kindMatch[1];
    }
    
    if (primBlock.includes('purpose')) {
      const purposeMatch = primBlock.match(/purpose\s*=\s*"([^"]+)"/);
      if (purposeMatch) properties.purpose = purposeMatch[1];
    }

    // Extract transform information
    const transform: Record<string, number[]> = {};
    if (primBlock.includes('xformOp:translate')) {
      const translateMatch = primBlock.match(/xformOp:translate\s*=\s*\(([^)]+)\)/);
      if (translateMatch) {
        transform.translate = translateMatch[1].split(',').map(v => Number.parseFloat(v.trim()));
      }
    }
    if (primBlock.includes('xformOp:scale')) {
      const scaleMatch = primBlock.match(/xformOp:scale\s*=\s*\(([^)]+)\)/);
      if (scaleMatch) {
        transform.scale = scaleMatch[1].split(',').map(v => Number.parseFloat(v.trim()));
      }
    }

    analysis.prims.push({
      name,
      type,
      kind: properties.kind,
      purpose: properties.purpose,
      transform: Object.keys(transform).length > 0 ? transform : undefined,
      properties
    });

    // If it's a mesh, add to geometry
    if (type === 'Mesh') {
      analysis.geometry.push({
        name,
        type: 'Mesh'
      });
    }
    
    match = primRegex.exec(content);
  }

  // Parse material definitions
  const materialRegex = /def\s+Material\s+"([^"]+)"/g;
  let materialMatch: RegExpExecArray | null = materialRegex.exec(content);
  
  while (materialMatch !== null) {
    const materialName = materialMatch[1];
    const materialBlock = extractPrimBlock(content, materialMatch.index);
    const properties: Record<string, number | number[]> = {};

    // Extract common material properties
    const colorMatch = materialBlock.match(/diffuseColor\s*=\s*\(([^)]+)\)/);
    if (colorMatch) {
      properties.diffuseColor = colorMatch[1].split(',').map(v => Number.parseFloat(v.trim()));
    }

    const roughnessMatch = materialBlock.match(/roughness\s*=\s*([\d.]+)/);
    if (roughnessMatch) {
      properties.roughness = Number.parseFloat(roughnessMatch[1]);
    }

    const metallicMatch = materialBlock.match(/metallic\s*=\s*([\d.]+)/);
    if (metallicMatch) {
      properties.metallic = Number.parseFloat(metallicMatch[1]);
    }

    analysis.materials.push({
      name: materialName,
      properties
    });
    
    materialMatch = materialRegex.exec(content);
  }

  return analysis;
}

/**
 * Extract a block of text for a specific primitive definition
 */
function extractPrimBlock(content: string, startIndex: number): string {
  const lines = content.slice(startIndex).split('\n');
  let braceCount = 0;
  const blockLines: string[] = [];
  let started = false;

  for (const line of lines) {
    if (line.includes('{')) {
      started = true;
      braceCount += (line.match(/{/g) || []).length;
    }
    if (started) {
      blockLines.push(line);
    }
    if (line.includes('}')) {
      braceCount -= (line.match(/}/g) || []).length;
      if (braceCount <= 0) break;
    }
  }

  return blockLines.join('\n');
}

/**
 * Identify furniture and design-relevant items
 */
function identifyFurnitureType(name: string): string {
  const furnitureKeywords = {
    'chair': ['chair', 'seat', 'stool'],
    'table': ['table', 'desk', 'surface'],
    'sofa': ['sofa', 'couch', 'settee'],
    'bed': ['bed', 'mattress', 'headboard'],
    'cabinet': ['cabinet', 'cupboard', 'wardrobe'],
    'shelf': ['shelf', 'bookcase', 'shelving'],
    'lamp': ['lamp', 'light', 'fixture'],
    'decoration': ['vase', 'plant', 'artwork', 'frame']
  };

  const lowerName = name.toLowerCase();
  for (const [category, keywords] of Object.entries(furnitureKeywords)) {
    if (keywords.some(keyword => lowerName.includes(keyword))) {
      return category;
    }
  }
  return 'object';
}

export default function USDZDataAnalyzer({ file }: { file: File }) {
  const [usdContent, setUsdContent] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showRawContent, setShowRawContent] = useState(false);

  const extractUSDContent = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      if (file.name.endsWith('.usdz')) {
        // Extract .usda content from USDZ archive
        const buffer = await file.arrayBuffer();
        const zip = await JSZip.loadAsync(buffer);
        
        for (const path of Object.keys(zip.files)) {
          if (path.endsWith('.usda')) {
            const zipFile = zip.file(path);
            if (zipFile) {
              const content = await zipFile.async('string');
              setUsdContent(content);
              setIsLoading(false);
              return;
            }
          }
        }
        throw new Error('No .usda file found in USDZ archive');
      }
      
      if (file.name.endsWith('.usda') || file.name.endsWith('.usd')) {
        // Read plain USD/USDA files directly
        const reader = new FileReader();
        reader.onload = () => {
          setUsdContent(reader.result as string);
          setIsLoading(false);
        };
        reader.onerror = () => {
          throw new Error('Failed to read file');
        };
        reader.readAsText(file);
        return;
      }
    } catch (err) {
      setError(`Error processing file: ${err}`);
      setIsLoading(false);
    }
  }, [file]);

  useEffect(() => {
    extractUSDContent();
  }, [extractUSDContent]);

  // Parse the USD content when it changes
  const analysis = useMemo(() => {
    if (!usdContent) return null;
    try {
      return parseUSDContent(usdContent);
    } catch (err) {
      setError(`Error parsing USD content: ${err}`);
      return null;
    }
  }, [usdContent]);

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} bytes`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const formatDimensions = (transform: Record<string, number[]> | undefined): string => {
    if (!transform) return 'Unknown';
    
    const translate = transform.translate || [0, 0, 0];
    const scale = transform.scale || [1, 1, 1];
    
    return `Position: (${translate.map((v: number) => v.toFixed(2)).join(', ')}) Scale: (${scale.map((v: number) => v.toFixed(2)).join(', ')})`;
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>USDZ File Analysis</span>
          <span className="text-sm font-normal text-gray-500">
            {formatFileSize(file.size)}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <p className="text-gray-500">Analyzing USD content...</p>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-800 text-sm">{error}</p>
          </div>
        ) : analysis ? (
          <div className="space-y-6">
            {/* File Metadata */}
            <section>
              <h3 className="font-semibold mb-3 text-gray-900">File Metadata</h3>
              <div className="bg-gray-50 p-4 rounded-lg text-sm space-y-2">
                {analysis.metadata.version && (
                  <div><strong>USD Version:</strong> {analysis.metadata.version}</div>
                )}
                {analysis.metadata.defaultPrim && (
                  <div><strong>Default Prim:</strong> {analysis.metadata.defaultPrim}</div>
                )}
                {analysis.metadata.metersPerUnit && (
                  <div><strong>Units:</strong> {analysis.metadata.metersPerUnit} meter per unit</div>
                )}
                {analysis.metadata.upAxis && (
                  <div><strong>Up Axis:</strong> {analysis.metadata.upAxis}</div>
                )}
                {Object.keys(analysis.metadata).length === 0 && (
                  <div className="text-gray-500">No metadata found</div>
                )}
              </div>
            </section>

            {/* Objects Found */}
            <section>
              <h3 className="font-semibold mb-3 text-gray-900">
                Objects Found ({analysis.prims.length})
              </h3>
              <div className="space-y-3">
                {analysis.prims.length > 0 ? analysis.prims.map((prim) => (
                  <div key={`${prim.type}-${prim.name}`} className="bg-white border border-gray-200 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-2">
                      <div className="font-medium text-gray-900">{prim.name}</div>
                      <div className="flex space-x-2">
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                          {prim.type}
                        </span>
                        <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">
                          {identifyFurnitureType(prim.name)}
                        </span>
                      </div>
                    </div>
                    {prim.kind && (
                      <div className="text-sm text-gray-600 mb-1">
                        <strong>Kind:</strong> {prim.kind}
                      </div>
                    )}
                    {prim.transform && (
                      <div className="text-sm text-gray-600">
                        <strong>Transform:</strong> {formatDimensions(prim.transform)}
                      </div>
                    )}
                  </div>
                )) : (
                  <div className="text-gray-500 text-sm">No objects found</div>
                )}
              </div>
            </section>

            {/* Materials */}
            <section>
              <h3 className="font-semibold mb-3 text-gray-900">
                Materials ({analysis.materials.length})
              </h3>
              <div className="space-y-2">
                {analysis.materials.length > 0 ? analysis.materials.map((material) => (
                  <div key={material.name} className="bg-white border border-gray-200 rounded-lg p-3">
                    <div className="font-medium text-gray-900 mb-1">{material.name}</div>
                    <div className="text-sm text-gray-600 space-y-1">
                      {material.properties.diffuseColor && Array.isArray(material.properties.diffuseColor) && (
                        <div><strong>Color:</strong> RGB({material.properties.diffuseColor.map((v: number) => v.toFixed(2)).join(', ')})</div>
                      )}
                      {material.properties.roughness !== undefined && (
                        <div><strong>Roughness:</strong> {material.properties.roughness}</div>
                      )}
                      {material.properties.metallic !== undefined && (
                        <div><strong>Metallic:</strong> {material.properties.metallic}</div>
                      )}
                    </div>
                  </div>
                )) : (
                  <div className="text-gray-500 text-sm">No materials found</div>
                )}
              </div>
            </section>

            {/* Geometry */}
            {analysis.geometry.length > 0 && (
              <section>
                <h3 className="font-semibold mb-3 text-gray-900">
                  Geometry ({analysis.geometry.length})
                </h3>
                <div className="bg-gray-50 p-4 rounded-lg text-sm">
                  {analysis.geometry.map((geom) => (
                    <div key={geom.name} className="mb-1">
                      <strong>{geom.name}:</strong> {geom.type}
                      {geom.points && ` (${geom.points} points)`}
                      {geom.faces && ` (${geom.faces} faces)`}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Raw Content Toggle */}
            <div className="pt-4 border-t border-gray-200">
              <Button
                onClick={() => setShowRawContent(!showRawContent)}
                variant="outline"
                size="sm"
              >
                {showRawContent ? 'Hide' : 'Show'} Raw USD Content
              </Button>
              {showRawContent && (
                <div className="mt-4">
                  <textarea
                    readOnly
                    value={usdContent}
                    className="w-full h-64 p-3 font-mono text-xs border border-gray-200 rounded-lg bg-gray-50"
                    placeholder="Raw USD content..."
                  />
                </div>
              )}
            </div>
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
} 