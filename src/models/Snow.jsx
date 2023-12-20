import React from 'react';

import { useGLTF } from '@react-three/drei';
import snowScene from '../assets/3d/snow_fx_test.glb';

const Snow = () => {
    const { scene, animations } = useGLTF(snowScene);
  return (
    <mesh position={[-2, -5, -77]} scale={[1, 1, 1]}>
        <primitive object={scene} />

    </mesh>
  )
}

export default Snow;