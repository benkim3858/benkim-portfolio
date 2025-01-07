import * as THREE from 'three';

declare module 'three' {
  interface ShaderMaterial {
    uniforms?: {
      [key: string]: {
        value: any;
      };
    };
  }
} 