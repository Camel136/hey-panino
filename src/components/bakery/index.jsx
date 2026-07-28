import { useGLTF, useTexture, Outlines } from '@react-three/drei';
import { useEffect, useContext } from 'react';
import * as THREE from 'three';
import Smoke from '../smoke/Smoke';
import { Context } from '../context/context';
import PulseSistem from '../pulseSistem';

// https://gltf.report/

export default function Bakery() {
  const { nodes } = useGLTF('./gltf/casaUnifyMeshv2.glb');
  const bake1 = useTexture('./bake/bake1.jpg');
  const bake2 = useTexture('./bake/bake2.jpg');
  const bake3 = useTexture('./bake/bake3.jpg');
  const normalMap1 = useTexture('./bake/normal/normalBake1.png');
  const normalMap2 = useTexture('./bake/normal/normalBake2.png');
  const normalMap3 = useTexture('./bake/normal/normalBake3.png');

  const { setPosCam } = useContext(Context);

  console.log('...........', nodes);

  useEffect(() => {
    if (nodes.cameraSpawn) {
      setPosCam({
        position: nodes.cameraSpawn.position.clone(),
        quaternion: nodes.cameraSpawn.quaternion.clone(),
      });
    }
  }, [nodes]);

  [bake1, bake2, bake3, normalMap1, normalMap2, normalMap3].forEach(bake => {
    bake.flipY = false;
    bake.colorSpace = THREE.SRGBColorSpace;
    bake.anisotropy = 16;
  });

  const donationLight = new THREE.MeshStandardMaterial({
    color: 0xfffad9,
    emissive: new THREE.Color(0xfffad9),
    emissiveIntensity: 20,
    roughness: 0,
    metalness: 0,
  });
  const LampLight = new THREE.MeshStandardMaterial({
    color: 0xfca729,
    emissive: new THREE.Color(0xfca729),
    emissiveIntensity: 0.8,
    roughness: 0,
    metalness: 0,
  });

  const wood = new THREE.MeshStandardMaterial({
    color: 0xa7610c,
    roughness: 0,
    metalness: 0.05,
  });

  const white = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    roughness: 0,
    metalness: 0.05,
  });
  const black = new THREE.MeshStandardMaterial({
    color: 0x181717,
    roughness: 0,
    metalness: 0.05,
  });

  const glassMaterial = new THREE.MeshPhysicalMaterial({
    transmission: 1.0,
    transparent: true,
    roughness: 0.0,
    metalness: 0.0,
    ior: 1.5,
    thickness: 0.6,
    attenuationColor: new THREE.Color(0xfca729),
    attenuationDistance: 0.5,
    envMapIntensity: 1.5,
  });

  const whiteMeshes = [
    'caneca',
    'baseGuardaSol',
    'calota001',
    'chavaso',
    'frisoTrailer',
    'frisoTrailer001',
    'fundo',
    'pontaCalota',
  ];
  const blackMeshes = ['line', 'chao_e_cabos', 'luminaria', 'tuboGuardasol'];

  const interactiveMeshes = [
    'paov1',
    'paov2',
    'paov3',
    'paov4',
    'paov5',
    'paov6',
  ];

  return (
    <>
      <ambientLight intensity={1.5} color={0xfcc632} /> {/* #fc9732 */}
      <directionalLight position={[5, 8, 3]} intensity={2} />
      <mesh geometry={nodes.bake1.geometry} receiveShadow>
        <meshStandardMaterial
          color="white"
          map={bake1}
          roughness={0.8}
          metalness={0.4}
          normalMap={normalMap1}
          normalScale={new THREE.Vector2(4, 4)}
        />
        <Outlines thickness={1} color="black" />
      </mesh>
      {interactiveMeshes.map(name => (
        <mesh
          geometry={nodes[name].geometry}
          onClick={() => {
            console.log(nodes[name].name);
          }}
          receiveShadow
        >
          <meshStandardMaterial
            map={bake2}
            roughness={0.6}
            metalness={0.4}
            normalMap={normalMap2}
            normalScale={new THREE.Vector2(2, 2)}
          />
          <PulseSistem />
        </mesh>
      ))}
      <mesh geometry={nodes.bake2.geometry} receiveShadow>
        <meshStandardMaterial
          map={bake2}
          roughness={0.6}
          metalness={0.4}
          normalMap={normalMap2}
          normalScale={new THREE.Vector2(2, 2)}
        />
        <Outlines thickness={1} color="black" />
      </mesh>
      <mesh geometry={nodes.bake3.geometry} receiveShadow>
        <meshStandardMaterial
          map={bake3}
          roughness={0.6}
          metalness={0.4}
          normalMap={normalMap3}
          normalScale={new THREE.Vector2(1, 1)}
        />
        <Outlines thickness={1} color="black" />
      </mesh>
      {whiteMeshes.map(name => (
        <mesh
          key={name}
          geometry={nodes[name].geometry}
          material={white}
          receiveShadow
        />
      ))}
      {blackMeshes.map(name => (
        <mesh
          key={name}
          geometry={nodes[name].geometry}
          material={black}
          receiveShadow
        />
      ))}
      <mesh geometry={nodes.line.geometry} material={black}></mesh>
      <mesh
        geometry={nodes.cerca.geometry}
        receiveShadow
        material={wood}
      ></mesh>
      <mesh geometry={nodes.madeira.geometry} receiveShadow material={wood}>
        <lineSegments>
          <edgesGeometry args={[nodes.madeira.geometry, 10]} />
          <lineBasicMaterial color="black" />
        </lineSegments>
      </mesh>
      <mesh geometry={nodes.balcao.geometry} material={wood} receiveShadow>
        <lineSegments>
          <edgesGeometry args={[nodes.balcao.geometry, 8]} />
          <lineBasicMaterial color="black" />
        </lineSegments>
      </mesh>
      <mesh
        geometry={nodes.lampadas.geometry}
        receiveShadow
        material={LampLight}
      ></mesh>
      <mesh
        geometry={nodes.vidroLuminaria.geometry}
        receiveShadow
        material={glassMaterial}
      ></mesh>
      <Smoke position={nodes.SmokeSpawn.position} />
    </>
  );
}
