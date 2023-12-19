import React from 'react';

import { useGLTF } from '@react-three/drei';
import chrisScene from '../assets/3d/IMG_1280_default.glb';

const Chris = () => {
    const { scene, animations } = useGLTF(chrisScene);

    
  return (
    <mesh position={[-1, -2, -3]} scale={[.5, .5,.5]}>
        <primitive object={scene} />

    </mesh>
  )
}

export default Chris;