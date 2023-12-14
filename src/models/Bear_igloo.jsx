import React from 'react'

import bearScene from '../assets/3d/bear_in_an_igloo.glb';
import { useGLTF } from '@react-three/drei';

const Bear = () => {
    const { scene, animations } = useGLTF(bearScene);
  return (
    <mesh position={[1.5, -1.5, -8]} scale={[.1, .1, .03]}>
      <primitive object={scene} />

    </mesh>
  )
}

export default Bear