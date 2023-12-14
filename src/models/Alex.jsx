import React from 'react';

import { useGLTF } from '@react-three/drei';
import alexScene from '../assets/3d/SnowAstroAlex.glb';

const Alex = () => {
    const { scene, animations } = useGLTF(alexScene);
  return (
    <mesh>
        <primitive object={scene} />

    </mesh>
  )
}

export default Alex;