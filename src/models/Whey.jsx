import { useRef, useEffect } from 'react';
import wheyScene from '../assets/3d/whey.glb';
import { useAnimations, useGLTF } from '@react-three/drei';

const Whey = ({ isRotating, ...props }) => {
  const ref = useRef();
  const { scene, animations } = useGLTF(wheyScene);
  const { actions } = useAnimations(animations, ref);

  useEffect(() => {
    const onAnimationLoad = () => {
      // Access the animations here
      console.log('Model and animations are loaded:', animations);
    };

    ref.current.addEventListener('model-loaded', onAnimationLoad);

    return () => {
      ref.current.removeEventListener('model-loaded', onAnimationLoad);
    };
  }, [ref, animations]);

  useEffect(() => {
    // Ensure that the action exists before attempting to play or stop it
    const take001Action = actions['take 001'];

    if (take001Action) {
      if (isRotating) {
        take001Action.play();
      } else {
        take001Action.stop();
      }
    }
  }, [actions, isRotating]);

  return (
    <mesh {...props} ref={ref}>
      <primitive object={scene} />
    </mesh>
  );
};

export default Whey;
