import React, { useRef, useEffect } from 'react';
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

    ref.current.addEventListener('model-loaded', onAnimationLoad);

    return () => {
      ref.current.removeEventListener('model-loaded', onAnimationLoad);
    };
  }, [ref, animations]);

  useEffect(() => {
    if (actions && actions["IMG_1280"]) {
      if (isRotating) {
        actions["IMG_1280"].play();
      } else {
        actions["IMG_1280"].stop();
      }
    }
  }, [actions, isRotating]);

  return (
    <mesh {...props} ref={ref} position={[-1, 2, -3]} scale={[1, 1, 1]}>
      <primitive object={scene} />
    </mesh>
  );
};

export default Chris;
