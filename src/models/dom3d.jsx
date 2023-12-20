import React, { useRef, useEffect } from 'react'
import { useAnimations, useGLTF } from '@react-three/drei';
import domScene from '../assets/3d/3d-dom.glb';


const Dom = ({isRotating, ...props }) => {
    const { scene, animations } = useGLTF(domScene);
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
      if (actions && actions["3d-dom"]) {
        if (isRotating) {
          actions["3d-dom"].stop();
        }
      }
    }, [actions, isRotating]);

  return (
    <mesh {...props} ref={ref} position={[5, -4.5, -73]} scale={[2, 2, 2]}>
        <primitive object={scene} />

    </mesh>
  );
};

export default Dom