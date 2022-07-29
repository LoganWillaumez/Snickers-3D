import { lazy, Suspense, useEffect, useState } from 'react';
import './App.css';
import { useWindowSize } from 'rooks';
import { Picker } from '../../Components/Picker/Picker';
import Sneackers from '../../models/Sneackers';
import { useLocalstorageState } from 'rooks';
// const Scene = lazy(() => import('../Canvas/Scene'));
import {
  ContactShadows,
  Float,
  Loader,
  PresentationControls,
} from '@react-three/drei';
import { Header } from '../../Components/Header/Header';

import { Favourites } from '../../Components/Favourites/Favourites';
import Scene from '../Canvas/Scene';
function App() {
  const [fav, setFav] = useLocalstorageState('favourites', []);

  return (
    <div className='App'>
      <Suspense fallback={null}>
        <Picker fav={fav} setFav={setFav} />
        <Scene />
        <Favourites setFav={setFav} />
      </Suspense>
      <Loader />
    </div>
  );
}
export default App;
