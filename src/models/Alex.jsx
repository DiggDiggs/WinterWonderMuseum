import { useAnimations, useGLTF } from '@react-three/drei';
import React, { useEffect, useRef } from 'react';
import alexScene from '../assets/3d/dshoot1_default.glb';

const Alex = () => {
    const { scene, animations } = useGLTF(alexScene);
    const ref = useRef();
    const { actions } = useAnimations(animations, ref);
    useEffect(() => {
      const onAnimationLoad = () => {
        console.log('Model and animations are loaded:', animations);
      };
  
      ref.current.addEventListener('model-loaded', onAnimationLoad);
  
      return () => {
        ref.current.removeEventListener('model-loaded', onAnimationLoad);
      };
    }, [ref, animations]);
  
    useEffect(() => {
      if (actions && actions["dshoot1_default.glb"]) {
        if (isRotating) {
          actions["dshoot1_default.glb"].play();
        } else {
          actions["dshoot1_default.glb"].stop();
        }
      }
    }, [actions, isRotating]);
  
    return (
      <mesh {...props} position={[-1, -2, -3]} scale={[.5, .5,.5]}>
        <primitive object={scene} />

    </mesh>
  )
}

export default Alex;