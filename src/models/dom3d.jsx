import React from 'react'

import domScene from '../assets/3d/3d-dom.glb';
import { useGLTF } from '@react-three/drei';

const Dom = () => {
    const { scene, animations } = useGLTF(domScene);
  return (
    <mesh position={[-.15, -1.1, -5.]} scale={[.18, .18, .03]}>
        <primitive object={scene} />

    </mesh>
  )
}

export default Dom