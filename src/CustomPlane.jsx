import React, { useMemo } from "react";

import { BufferAttribute } from "three";

function CustomPlane({ count = 10000 }) {
  const points = useMemo(() => {
    const p = new Array(count).fill(0).map((v) => (0.5 - Math.random()) * 20);
    return new BufferAttribute(new Float32Array(p), 3);
  }, [count]);

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach={"attributes-position"} {...points} />
      </bufferGeometry>
      <pointsMaterial
        size={0.1}
        threshold={0.1}
        color={0xff00ff}
        sizeAttenuation={true}
      />
    </points>
  );
}
