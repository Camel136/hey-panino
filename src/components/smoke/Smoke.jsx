import { useEffect, useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';

import * as THREE from 'three';

export default function Smoke({ position }) {
  const smokeTexture = useTexture('./texture/smoke.png');

  smokeTexture.flipY = false;
  smokeTexture.colorSpace = THREE.SRGBColorSpace;

  const PARTICLES = 30;

  const meshRef = useRef();
  const particles = useRef([]);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useEffect(() => {
    particles.current = Array.from({ length: PARTICLES }, () => ({
      life: Math.random() * 2,
      velocity: 0.3 + Math.random() * 0.2,
      offsetX: (Math.random() - 0.8) * 0.08,
      offsetZ: (Math.random() - 0.8) * 0.08,
    }));
  }, []);

  useFrame((state, delta) => {
    particles.current.forEach((particle, i) => {
      particle.life += particle.velocity * delta;

      if (particle.life > 2) {
        particle.life = 0;

        particle.offsetX = (Math.random() - 0.8) * 0.08;
        particle.offsetZ = (Math.random() - 0.8) * 0.08;
      }

      dummy.position.set(
        position.x + particle.offsetX,
        position.y + particle.life,
        position.z + particle.offsetZ
      );

      const scale = 0.05 + particle.life * 0.08;

      dummy.scale.set(scale, scale, scale);

      dummy.updateMatrix();

      meshRef.current.setMatrixAt(i, dummy.matrix);
    });

    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[null, null, PARTICLES]}>
      <sphereGeometry args={[1, 8, 8]} />

      <meshBasicMaterial map={smokeTexture} transparent opacity={0.9} />
    </instancedMesh>
  );
}
