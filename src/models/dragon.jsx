import React from 'react'

import dragonScene from '../assets/3d/dragon.glb';
import { useGLTF } from '@react-three/drei';

const Dragon = () => {
    const { scene, animations } = useGLTF(dragonScene);

  return (
    <mesh position={[2, 2, 1]} scale={[1, 1, 0.003]}>
      <primitive object={scene} />
    </mesh>
  )
}

export default Dragon