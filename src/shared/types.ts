export interface DrawingFile {
  id: string;
  name: string;
  path: string;
  size: number;
  type: 'jpeg' | 'png' | 'pdf' | 'dwg' | 'dxf';
  uploadedAt: Date;
}

export interface AnalysisResult {
  id: string;
  fileId: string;
  dimensions: Dimension[];
  partsList: Part[];
  materials: Material[];
  title: string;
  drawingNumber: string;
  analyzedAt: Date;
  status: 'pending' | 'analyzing' | 'completed' | 'failed';
  error?: string;
}

export interface Dimension {
  id: string;
  label: string;
  value: number;
  unit: 'mm' | 'cm' | 'm' | 'inch';
  type: 'length' | 'width' | 'height' | 'radius' | 'diameter';
}

export interface Part {
  id: string;
  name: string;
  quantity: number;
  material?: string;
  specifications?: string;
}

export interface Material {
  id: string;
  name: string;
  type: string;
  specifications?: string;
}

export interface ExportOptions {
  format: 'csv' | 'excel';
  includeHeaders: boolean;
  dateFormat: string;
}