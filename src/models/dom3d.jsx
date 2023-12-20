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
      if (actions && actions["IMG_2521"] && actions["IMG_2521"].play && actions["IMG_2521"].stop) {
        if (isRotating) {
          actions["IMG_2521"].play();
        } else {
          actions["IMG_2521"].stop();
        }
      }
    }, [actions, isRotating]);

  return (
    <group>
      <mesh {...props} ref={ref} position={[5, -4.5, -73]} scale={[2, 2, 2]}>
          <primitive object={scene} />
      </mesh>
    </group>
  );
};

export default Dom;