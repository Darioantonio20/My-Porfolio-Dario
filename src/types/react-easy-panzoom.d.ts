declare module 'react-easy-panzoom' {
  import * as React from 'react';
  export interface PanZoomProps {
    minZoom?: number;
    maxZoom?: number;
    zoom?: number;
    autoCenter?: boolean;
    boundaryRatioVertical?: number;
    boundaryRatioHorizontal?: number;
    style?: React.CSSProperties;
    enableBoundingBox?: boolean;
    enablePan?: boolean;
    enableZoom?: boolean;
    realPinch?: boolean;
    transition?: string;
    children?: React.ReactNode;
    ref?: React.Ref<unknown>;
  }
  const PanZoom: React.FC<PanZoomProps>;
  export default PanZoom;
} 