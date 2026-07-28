import React from 'react';
import { Html, useProgress } from '@react-three/drei';

export default function Loader() {
  const { active, progress } = useProgress();

  if (!active) return null;

  return (
    <Html center>
      <div className="loader">
        <div className="loader-bar">
          <div
            className="loader-bar-fill"
            style={{ width: `${Math.round(progress)}%` }}
          />
        </div>
        <div className="loader-text">Carregando... {Math.round(progress)}%</div>
      </div>
    </Html>
  );
}
