import React from 'react';

import { useGLTF } from '@react-three/drei';
import mailScene from '../assets/3d/small_winter_scene.glb';

const Mail = () => {
    const { scene, animations } = useGLTF(mailScene);
  return (
    <mesh position={[-2, -5, -77]} scale={[.150, .150, .150]}>
        <primitive object={scene} />

    </mesh>
  )
}

export default Mail;