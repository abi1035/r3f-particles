import React, { useMemo } from "react";
import { useThree } from "@react-three/fiber";
import { OrbitControls, useTexture } from "@react-three/drei";
import * as THREE from "three";
import { vertexShader } from "./shaders/vertex.glsl";
import { fragmentShader } from "./shaders/fragment.glsl";

export default function Experience({ count = 128 }) {
  const texture = useTexture("/picture-1.png");
  const { size, viewport } = useThree();
  const width = 10; // Plane width
  const height = 10; // Plane height

  // Calculate positions and UVs for each point
  const positions = useMemo(() => {
    const positions = [];
    const uvs = [];
    const stepX = width / count;
    const stepY = height / count;

    for (let xi = 0; xi < count; xi++) {
      for (let yi = 0; yi < count; yi++) {
        // Position each point in a grid
        const x = stepX * (xi - count / 2);
        const y = stepY * (yi - count / 2);
        const z = 0;

        // Push positions for the point
        positions.push(x, y, z);

        // Calculate and push UV coordinates for texture mapping
        const u = xi / (count - 1);
        const v = yi / (count - 1);
        uvs.push(u, v);
      }
    }

    return { positions: new Float32Array(positions), uvs: new Float32Array(uvs) };
  }, [count, width, height]);

  // Create ShaderMaterial with the texture uniform
  const shaderMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uResolution: { value: new THREE.Vector2(size.width * viewport.dpr, size.height * viewport.dpr) },
        uPictureTexture: { value: texture },
      },
      transparent: true,
    });
  }, [size.width, size.height, viewport.dpr, texture]);

  return (
      <>
      <OrbitControls makeDefault />

      <points material={shaderMaterial}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            array={positions.positions}
            count={positions.positions.length / 3}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-uv"
            array={positions.uvs}
            count={positions.uvs.length / 2}
            itemSize={2}
          />
        </bufferGeometry>
      </points>
      </>
  
  );
}
