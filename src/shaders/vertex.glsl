// vertexShader.js
export const vertexShader = `
  uniform vec2 uResolution;
  varying vec2 vUv;

  void main() {
    vUv=uv;
    // Set gl_PointSize based on the vertical resolution
    gl_PointSize = 0.3 * uResolution.y;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;