// vertex.glsl
export const vertexShader=`
uniform vec2 uResolution;
uniform sampler2D uPictureTexture;
varying vec2 vUv;
varying vec3 vColor;

void main() {
    vUv = uv; // Pass UV coordinates to fragment shader

    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;
    gl_Position = projectedPosition;

    // Picture intensity
    float pictureIntensity=texture(uPictureTexture,uv).r; // To get the UV of the texture only r channel

    // Set point size based on resolution
    gl_PointSize = 0.2 *pictureIntensity* uResolution.y / -viewPosition.z;

    vColor=vec3(pow(pictureIntensity,2.0));
}
`;