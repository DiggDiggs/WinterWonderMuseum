import { useGLTF } from "@react-three/drei";
import React from 'react';

import danceScene from "../assets/3d/dance_default.glb";

const dance = () => {
    const dance = useGLTF (danceScene)
  return (
    <mesh>
        <primitive object={dance.scene} />
    </mesh>
  )
}

export default dance