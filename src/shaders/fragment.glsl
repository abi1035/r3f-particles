// fragmentShader.js
export const fragmentShader = `
varying vec2 vUv;
  void main() {

    vec2 uv=gl_PointCoord;
    float distanceToCenter=length(vUv-vec2(0.5));

    if(distanceToCenter>0.5){
      discard; // Do this to convert those square particles to circle
    }



    // Set a simple red color for each point
    gl_FragColor = vec4(1.0,1.0,1.0, 1.0);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
  }
`;