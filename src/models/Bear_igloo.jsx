import React from 'react'

import bearScene from '../assets/3d/patch_of_old_snow.glb';
import { useGLTF } from '@react-three/drei';

const Bear = () => {
    const { scene, animations } = useGLTF(bearScene);
  return (
    <mesh position={[1.55, -5, -80]} scale={[30, 15, 15]}>
      <primitive object={scene} />

    </mesh>
  )
}

export default Bear