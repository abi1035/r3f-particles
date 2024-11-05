import React, { useMemo } from "react";
import { useThree } from "@react-three/fiber";
import { OrbitControls,useTexture } from "@react-three/drei";
import * as THREE from "three";
import { vertexShader } from "./shaders/vertex.glsl";
import { fragmentShader } from "./shaders/fragment.glsl";

export default function Experience({ count = 32 }) {


const texture=useTexture('./picture-1.png')




  const { size, viewport } = useThree();
  const width = 10; // Plane width
  const height = 10; // Plane height

  // Calculate positions for the plane with particles
  const positions = useMemo(() => {
    const positions = [];
    const stepX = width / count;
    const stepZ = height / count;

    for (let xi = 0; xi < count; xi++) {
      for (let zi = 0; zi < count; zi++) {
        const x = stepX * (xi - count / 2);
        const z = stepZ * (zi - count / 2);
        const y = 0;
        positions.push({ x, y, z });
      }
    }

    return positions;
  }, [count, width, height]);

  // Create a ShaderMaterial with the vertex and fragment shaders
  const shaderMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uResolution: { value: new THREE.Vector2(size.width * viewport.dpr, size.height * viewport.dpr) },
        uPictureTexture: {value:texture},
        // uDisplacementTexture:new THREE.Uniform(displacement.texture),
      },
    });
  }, [size.width, size.height, viewport.dpr]);

  return (
    <>
      <OrbitControls makeDefault />

      <group rotation={[Math.PI*0.5, 0, 0]}>
        {positions.map((pos, index) => (
          <mesh
            key={index}
            position={[pos.x, pos.y, pos.z]}
            material={shaderMaterial}
            rotation={[-(Math.PI / 2), 0, 0]} 
          >
            {/* Small plane geometry to represent each particle */}
            <planeGeometry  args={[0.2, 0.2]} /> {/* Adjust size as needed */}
          </mesh>
        ))}
      </group>
      </>
  );
}
