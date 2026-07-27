import { useRef, useState } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { Outlines } from '@react-three/drei';

function PulseSistem() {
  const time = useRef(0);
  const [thickness, setThickness] = useState(1);

  useFrame((_, delta) => {
    time.current += delta;
    setThickness(1 + Math.sin(time.current * 2) * 0.5);
  });

  return <Outlines thickness={thickness} color={0xfcc632} />;
}

export default PulseSistem;
