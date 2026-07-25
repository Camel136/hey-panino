import { PointerLockControls, OrbitControls } from '@react-three/drei';
import { useContext, useEffect, useRef } from 'react';
import { useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { Context } from '../context/context';

export default function PointerLockControlsCustom({}) {
  const { camera } = useThree();
  const { posCam } = useContext(Context);

  const otherTypeCam = false;

  // console.log('...........', posCam);
  const ANGLE = {
    DEG_30: Math.PI / 6,
    DEG_45: Math.PI / 4,
    DEG_60: Math.PI / 3,
    DEG_90: Math.PI / 2,
    DEG_75: Math.PI / 2.4,
    DEG_180: Math.PI,
  };

  useEffect(() => {
    if (posCam.position && posCam.quaternion) {
      camera.position.copy(posCam.position);
      camera.quaternion.copy(posCam.quaternion);
    }
  }, [posCam]);

  if (!otherTypeCam) {
    return (
      <OrbitControls
        makeDefault
        minPolarAngle={ANGLE.DEG_30}
        maxPolarAngle={ANGLE.DEG_75}
        enableZoom={true}
      />
    );
  }

  return <PointerLockControls />;

  return null;
}
