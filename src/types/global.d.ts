export { };

declare module '*.glb' {
  const content: unknown;
  export default content;
}

declare module '*.png' {
  const content: unknown;
  export default content;
}

declare module 'meshline' {
  export const MeshLineGeometry: unknown;
  export const MeshLineMaterial: unknown;
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      meshLineGeometry: unknown;
      meshLineMaterial: unknown;
      'mesh-line-geometry': unknown;
      'mesh-line-material': unknown;
    }
  }
} 