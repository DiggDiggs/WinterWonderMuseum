import { useAnimations, useGLTF } from '@react-three/drei';
import React, { useEffect, useRef } from 'react';
import alexScene from '../assets/3d/dshoot1_default.glb';

const Alex = ({ isRotating, ...props }) => {
    const { scene, animations } = useGLTF(alexScene);
    const ref = useRef();
    const { actions } = useAnimations(animations, ref);
    
    useEffect(() => {
      const onAnimationLoad = () => {
        console.log('Model and animations are loaded:', animations);
      };
    
      const currentRef = ref.current;
    
      if (currentRef) {
        currentRef.addEventListener('model-loaded', onAnimationLoad);
      }
    
      return () => {
        if (currentRef) {
          currentRef.removeEventListener('model-loaded', onAnimationLoad);
        }
      };
    }, [ref, animations]); 
  
    useEffect(() => {
      if (actions && actions["dshoot1"] && actions["dshoot1"].play && actions["dshoot1"].stop) {
        if (isRotating) {
          actions["dshoot1"].play();
        } else {
          actions["dshoot1"].stop();
        }
      }
    }, [actions, isRotating]); 
  
    return (
      <mesh {...props} ref={ref} position={[3, 1, -1]} scale={[1, 1, 1]}>
      <primitive object={scene} />
    </mesh> 
  )
}

export default Alex;