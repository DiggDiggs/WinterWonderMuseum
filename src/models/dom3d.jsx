import React from 'react'

import domScene from '../assets/3d/3d-dom.glb';
import { useGLTF } from '@react-three/drei';

const Dom = () => {
    const { scene, animations } = useGLTF(domScene);
  return (
    <mesh>
        <primitive object={scene} />

    </mesh>
  )
}

export default Dom