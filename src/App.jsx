import './App.css';
import { Canvas } from '@react-three/fiber';
import Bakery from './components/bakery';
import PointerLockControlsCustom from './components/controls';
import { useContext, Suspense } from 'react';
import { Context } from './components/context/context';

import Modal from './components/modal';
import Loader from './components/loader';

// npm run lint -- --fix

function App() {
  // //castShadow e receiveshadow (fazer ou receber sombra)
  const ANGLE = {
    DEG_30: Math.PI / 6,
    DEG_45: Math.PI / 4,
    DEG_60: Math.PI / 3,
    DEG_90: Math.PI / 2,
    DEG_75: Math.PI / 2.4,
    DEG_180: Math.PI,
  };

  // 180/ deg = graus

  const { modalOpen, setModalOpen } = useContext(Context);
  if (modalOpen) {
    document.exitPointerLock();
  }

  return (
    <div className="app">
      <header className="section header"></header>
      <div className="section canvas-container">
        <Canvas
          shadows
          dpr={[1, 2]}
          gl={{
            alpha: true,
            antialias: true,
            powerPreference: 'high-performance',
          }}
          camera={{
            fov: 75,
            near: 0.1,
            far: 1000,
          }}
        >
          <>
            <PointerLockControlsCustom />
            <Loader />
            <Suspense fallback={null}>
              <Bakery />
            </Suspense>
          </>
        </Canvas>
        <Modal open={modalOpen} onClose={() => setModalOpen(false)} />
      </div>
      {!modalOpen && (
        <footer className="section footer">
          <p>{}</p>
        </footer>
      )}
    </div>
  );
}

export default App;
