import React, { useEffect, useRef } from 'react';
import { useAnimations, useGLTF } from '@react-three/drei';
import chrisScene from '../assets/3d/IMG_1280_default.glb';

const Chris = ({ isRotating, ...props }) => {
  const { scene, animations } = useGLTF(chrisScene);
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
    if (actions && actions["IMG_1280"] && actions["IMG_1280"].play && actions["IMG_1280"].stop) {
      if (isRotating) {
        actions["IMG_1280"].play();
      } else {
        actions["IMG_1280"].stop();
      }
    }
  }, [actions, isRotating]);

  return (
    <group>
      <mesh {...props} ref={ref} position={[2, -4.5, -73]} scale={[2, 2, 2]}>
        <primitive object={scene} />
      </mesh>
    </group>
  );
};

export default Chris;
