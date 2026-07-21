import { forwardRef, useRef, useState } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

function TouchSistem(
  {
    IsTimeToShow,
    setInsideOfTent = () => {},
    position = [0, 0, 0],
    rotation = [0, 0, 0],
    side = THREE.DoubleSide,
    args = [0.8, 1.1, 32],
    name,
  },
  ref
) {
  const localRef = useRef();
  const meshRef = ref || localRef;
  const [showRing, setShowRing] = useState(false);
  const colorPower = useRef(1);
  const time = useRef(0);

  useFrame((_, delta) => {
    time.current += delta;

    const pulse = Math.sin(time.current * 2) * 0.5 + 0.5;
    colorPower.current = 0.01 + pulse * 0.2;

    if (meshRef.current) {
      meshRef.current.material.opacity = colorPower.current;
    }
  });

  if (IsTimeToShow) {
    setTimeout(() => {
      setShowRing(true);
    }, 10000);
  }

  return (
    <>
      {showRing && (
        <mesh
          name={name}
          ref={meshRef}
          position={position}
          rotation={rotation}
          onPointerDown={() => setInsideOfTent(true)}
        >
          <ringGeometry args={args} />
          <meshBasicMaterial
            color="white"
            transparent
            opacity={colorPower.current}
            side={side}
          />
        </mesh>
      )}
    </>
  );
}

export default forwardRef(TouchSistem);
