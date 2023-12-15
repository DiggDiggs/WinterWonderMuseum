import React from 'react';

import { useGLTF } from '@react-three/drei';
import mailScene from '../assets/3d/small_winter_scene.glb';

const Mail = () => {
    const { scene, animations } = useGLTF(mailScene);
  return (
    <mesh position={[]} scale={[]}>
        <primitive object={scene} />

    </mesh>
  )
}

export default Mail;