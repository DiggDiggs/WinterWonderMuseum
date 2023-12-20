import React from 'react'

import dragonScene from '../assets/3d/dragon.glb';
import { useAnimations, useGLTF } from '@react-three/drei';

const Dragon = () => {
    const { scene, animations } = useGLTF(dragonScene);

  return (
    <mesh position={[-1, 2, -3]} scale={[1, 1, 1]}>
      <primitive object={scene} />
    </mesh>
  )
}

export default Dragon