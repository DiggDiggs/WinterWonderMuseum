import React from 'react';

import { useGLTF } from '@react-three/drei';
import alexScene from '../assets/3d/SnowAstroAlex.glb';

const Alex = () => {
    const { scene, animations } = useGLTF(alexScene);
  return (
    <mesh position={[-1, -2, -3]} scale={[.5, .5,.5]}>
        <primitive object={scene} />

    </mesh>
  )
}

export default Alex;