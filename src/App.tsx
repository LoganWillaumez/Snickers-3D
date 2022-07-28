import { Suspense, useEffect, useState } from 'react';
import './App.css';
import { Canvas, useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import { Mesh } from 'three';
import { useWindowSize } from 'rooks';
import { proxy, useSnapshot } from 'valtio';
import store from './store';

import { Picker } from './Picker';
import Sneackers from './models/Sneackers';
import { useLocalstorageState } from 'rooks';
import {
  ContactShadows,
  Float,
  Loader,
  PresentationControls,
} from '@react-three/drei';
import { Header } from './Header';
import React from 'react';
import { Favourites } from './Favourites';
function App() {
  const [fav, setFav] = useLocalstorageState('favourites', []);
  const { current, items, favourites, changeItemsColor, addFavourites } =
    useSnapshot(store);
  const { innerWidth, innerHeight, outerHeight, outerWidth } = useWindowSize();

  return (
    <div className='App'>
      <Picker fav={fav} setFav={setFav} />
      <Canvas shadows camera={{ position: [0, 0, 5], fov: 60 }} linear>
        <ambientLight />
        <pointLight position={[2, 2, 2]} intensity={3} />
        <group
          position={[
            innerHeight! < innerWidth! ? 1.5 : 0,
            innerWidth !== null && innerWidth < 950 ? -0.5 : 0,
            0,
          ]}
        >
          <PresentationControls
            global={true} // Spin globally or by dragging the model
            cursor={false} // Whether to toggle cursor style on drag
            snap={false} // Snap-back to center (can also be a spring config)
            speed={1} // Speed factor
            zoom={1} // Zoom factor when half the polar-max is reached
            rotation={[0, 0, 0]} // Default rotation
            polar={[0, Math.PI / 40]} // Vertical limits
            azimuth={[-Infinity, Infinity]} // Horizontal limits
            config={{ mass: 1, tension: 170, friction: 26 }} // Spring config
          >
            <Float
              speed={1} // Animation speed, defaults to 1
              rotationIntensity={0.5} // XYZ rotation intensity, defaults to 1
              floatIntensity={0.01} // Up/down float intensity, works like a multiplier with floatingRange,defaults to 1
              floatingRange={[1, 10]} // Range of y-axis values the object will float within, defaults to [-0.1,0.1]
            >
              <Suspense fallback={null}>
                <Header />
                <Sneackers />
              </Suspense>
            </Float>
          </PresentationControls>
        </group>
        <ContactShadows
          opacity={0.4}
          scale={10}
          blur={1}
          far={10}
          resolution={256}
          position={[
            0,
            innerWidth !== null && innerWidth < 950 ? -2.1 : -1.3,
            0,
          ]}
          color='#000000'
        />
      </Canvas>
      <Favourites setFav={setFav} />
      <Loader />
    </div>
  );
}

export default App;
