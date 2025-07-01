// src/types/model-viewer-jsx.d.ts
import * as React from 'react';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'model-viewer': {
        // Basic attributes
        src?: string;
        alt?: string;
        ar?: boolean;
        'ar-modes'?: string;
        'camera-controls'?: boolean;
        'auto-rotate'?: boolean;
        
        // Display attributes
        poster?: string;
        'seamless-poster'?: boolean;
        loading?: 'auto' | 'lazy' | 'eager';
        reveal?: 'auto' | 'interaction' | 'manual';
        
        // Standard HTML attributes
        className?: string;
        id?: string;
        style?: React.CSSProperties;
        
        // Event handlers
        onLoad?: (event: Event) => void;
        onError?: (event: ErrorEvent) => void;
        'onAr-status'?: (event: CustomEvent) => void;
        'onCamera-change'?: (event: CustomEvent) => void;
        
        // Standard HTML event handlers
        onClick?: (event: React.MouseEvent<HTMLElement>) => void;
        onMouseEnter?: (event: React.MouseEvent<HTMLElement>) => void;
        onMouseLeave?: (event: React.MouseEvent<HTMLElement>) => void;
        
        // Ref support
        ref?: React.Ref<HTMLElement>;
      };
    }
  }
}

export {};