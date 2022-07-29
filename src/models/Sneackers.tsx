import * as THREE from 'three';
import { useEffect, useRef, useState } from 'react';
import { useGLTF } from '@react-three/drei';
import { GLTF } from 'three-stdlib';
import { useThree } from '@react-three/fiber';
import { useSnapshot } from 'valtio';
import store from '../Components/App/store';

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
  const { changeStore, items } = useSnapshot(store);
  const { viewport } = useThree();
  const { nodes, materials } = useGLTF('/models/sneackers.glb') as GLTFResult;
  useEffect((): any => {
    const cursor = `<svg width="64" height="64" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0)"><path fill="rgba(255, 255, 255, 0.5)" d="M29.5 54C43.031 54 54 43.031 54 29.5S43.031 5 29.5 5 5 15.969 5 29.5 15.969 54 29.5 54z" stroke="#000"/><g filter="url(#filter0_d)"><path d="M29.5 47C39.165 47 47 39.165 47 29.5S39.165 12 29.5 12 12 19.835 12 29.5 19.835 47 29.5 47z" fill="${items[hovered]}"/></g><path d="M2 2l11 2.947L4.947 13 2 2z" fill="#000"/><text fill="#000" style="white-space:pre" font-family="Inter var, sans-serif" font-size="10" letter-spacing="-.01em"><tspan x="35" y="63">${hovered}</tspan></text></g><defs><clipPath id="clip0"><path fill="#fff" d="M0 0h64v64H0z"/></clipPath><filter id="filter0_d" x="6" y="8" width="47" height="47" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/><feOffset dy="2"/><feGaussianBlur stdDeviation="3"/><feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0"/><feBlend in2="BackgroundImageFix" result="effect1_dropShadow"/><feBlend in="SourceGraphic" in2="effect1_dropShadow" result="shape"/></filter></defs></svg>`;
    const auto = `<svg width="64" height="64" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill="rgba(255, 255, 255, 0.5)" d="M29.5 54C43.031 54 54 43.031 54 29.5S43.031 5 29.5 5 5 15.969 5 29.5 15.969 54 29.5 54z" stroke="#000"/><path d="M2 2l11 2.947L4.947 13 2 2z" fill="#000"/></svg>`;
    if (hovered) {
      document.body.style.cursor = `url('data:image/svg+xml;base64,${btoa(
        cursor
      )}'), auto`;
      return () =>
        (document.body.style.cursor = `url('data:image/svg+xml;base64,${btoa(
          auto
        )}'), auto`);
    } else {
      document.body.style.cursor = 'auto';
    }
  }, [hovered]);
  return (
    <group
      onPointerOver={(e: { [key: string]: any }) => {
        e.stopPropagation();
        setHovered(e.object.material.name);
      }}
      onPointerOut={(e) => {
        e.intersections.length === 0 && setHovered(null);
      }}
      onPointerDown={(e: { [key: string]: any }) => {
        e.stopPropagation();
        changeStore('current', e.object.material.name);
      }}
      onPointerMissed={(e) => {
        changeStore('current', null);
      }}
      ref={group}
      {...props}
      dispose={null}
      position={[0, -1, 0]}
      rotation={[Math.PI / 360, 0.8, 0.1]}
      scale={viewport.width < 4.5 ? viewport.width * 0.2 : viewport.width * 0.1}
    >
      <mesh
        geometry={nodes.Obj01.geometry}
        material={materials.Obj01}
        material-color={items.Obj01}
      ></mesh>
      <mesh
        geometry={nodes.Obj02.geometry}
        material={materials.Obj02}
        material-color={items.Obj02}
      />
      <mesh
        geometry={nodes.Obj03.geometry}
        material={materials.Obj03}
        material-color={items.Obj03}
      />
      <mesh
        geometry={nodes.Obj04.geometry}
        material={materials.Obj04}
        material-color={items.Obj04}
      />
    </group>
  );
}

useGLTF.preload('/models/sneackers.glb');
