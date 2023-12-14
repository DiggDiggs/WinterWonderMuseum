import React from 'react';

import { useGLTF } from '@react-three/drei';
import alexScene from '../assets/3d/SnowAstroAlex.glb';

const Alex = () => {
    const { scene, animations } = useGLTF(alexScene);
  return (
    <mesh position={[-5, 2, 1]} scale={[0.1, 0.1,.003]}>
        <primitive object={scene} />

    </mesh>
  )
}

export default Alex;