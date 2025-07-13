import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electronAPI', {
  getVersion: () => ipcRenderer.invoke('app:version'),
  uploadFile: (filePath: string) => ipcRenderer.invoke('file:upload', filePath),
  analyzeImage: (imageData: Buffer) => ipcRenderer.invoke('ai:analyze', imageData),
  saveAnalysisResult: (result: any) => ipcRenderer.invoke('db:save', result),
  getAnalysisResults: () => ipcRenderer.invoke('db:getAll'),
  exportData: (format: 'csv' | 'excel', data: any[]) => ipcRenderer.invoke('export:data', format, data)
});