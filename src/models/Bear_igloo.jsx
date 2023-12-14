import React from 'react'

import bearScene from '../assets/3d/bear_in_an_igloo.glb';
import { useGLTF } from '@react-three/drei';

const Bear = () => {
    const { scene, animations } = useGLTF(bearScene);
  return (
    <mesh position={[1.55, -1.3, -8]} scale={[.8, .8, .03]}>
      <primitive object={scene} />

    </mesh>
  )
}

export default Bear