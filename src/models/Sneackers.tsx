import * as THREE from 'three';
import React, { useRef, useState } from 'react';
import { useGLTF } from '@react-three/drei';
import { GLTF } from 'three-stdlib';
import { useThree } from '@react-three/fiber';
import { proxy, useSnapshot } from 'valtio';
import store from '../store';
// interface stateType {
//   current: { [key: string]: any } | null;
//   items: {
//     obj1: string;
//     obj2: string;
//     obj3: string;
//     obj4: string;
//   };
// }

// const state: stateType = proxy({
//   current: null,
//   items: {
//     obj1: '#2F2C2F',
//     obj2: '#992638',
//     obj3: '#211E20',
//     obj4: '#C7C9CB',
//   },
// });

type GLTFResult = GLTF & {
  nodes: {
    Obj02: THREE.Mesh;
    Obj01: THREE.Mesh;
    Obj03: THREE.Mesh;
    Obj04: THREE.Mesh;
  };
  materials: {
    Obj02: THREE.MeshStandardMaterial;
    Obj01: THREE.MeshStandardMaterial;
    Obj03: THREE.MeshStandardMaterial;
    Obj04: THREE.MeshStandardMaterial;
  };
};
export default function Model({ ...props }: JSX.IntrinsicElements['group']) {
  const [hovered, setHovered] = useState<any>(null);
  const group = useRef<THREE.Group>(null);
  const snap = useSnapshot(store);
  const { viewport } = useThree();
  const { nodes, materials } = useGLTF('/models/sneackers.glb') as GLTFResult;
  return (
    <group
      onPointerOver={(e: { [key: string]: any }) => {
        e.stopPropagation();
        setHovered(e.object.material.name);
      }}
      onPointerOut={(e) => {
        e.intersections.length === 0 && setHovered(null);
      }}
      onPointerDown={(e) => {
        e.stopPropagation();
        store.changeCurrent((e.object as THREE.Mesh).material.name); //! check typage problem
      }}
      onPointerMissed={(e) => {
        store.changeCurrent(null);
      }}
      ref={group}
      {...props}
      dispose={null}
      position={[0, -1, 0]}
      rotation={[Math.PI / 360, 0.8, 0.1]}
      scale={viewport.width < 4.5 ? viewport.width * 0.2 : viewport.width * 0.1}
    >
      <mesh
        geometry={nodes.Obj02.geometry}
        material={materials.Obj01}
        material-color={snap.items.obj1}
      ></mesh>
      <mesh
        geometry={nodes.Obj01.geometry}
        material={materials.Obj02}
        material-color={snap.items.obj2}
      />
      <mesh
        geometry={nodes.Obj03.geometry}
        material={materials.Obj03}
        material-color={snap.items.obj3}
      />
      <mesh
        geometry={nodes.Obj04.geometry}
        material={materials.Obj04}
        material-color={snap.items.obj4}
      />
    </group>
  );
}

useGLTF.preload('/models/sneackers.glb');
