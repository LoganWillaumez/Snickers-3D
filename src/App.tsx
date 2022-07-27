import { Suspense, useState } from 'react';
import './App.css';
import { Canvas, useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import { Mesh } from 'three';
import Sneackers from './models/Sneackers';
import { Loader } from '@react-three/drei';

function App() {
  return (
    <div className='App'>
      <Canvas shadows camera={{ position: [0, 0, 5], fov: 60 }}>
        <Suspense fallback={null}>
          <ambientLight />
          <pointLight position={[2, 2, 2]} intensity={3} />
          <axesHelper args={[10]} />
          <Sneackers />
        </Suspense>
      </Canvas>
      <Loader />
    </div>
  );
}

export default App;
