// src/types/model-viewer-module.d.ts
declare module '@google/model-viewer' {
  interface ModelViewerElement extends HTMLElement {
    src: string;
    alt: string;
    ar: boolean;
    arModes: string;
    cameraControls: boolean;
    autoRotate: boolean;
    poster?: string;
    seamlessPoster?: boolean;
    loading?: 'auto' | 'lazy' | 'eager';
    reveal?: 'auto' | 'interaction' | 'manual';
    
    // Methods
    getCameraTarget(): { x: number; y: number; z: number };
    getCameraOrbit(): { theta: number; phi: number; radius: number };
    getFieldOfView(): number;
  }
  
  export { ModelViewerElement };
}