import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader';
import { useLoader } from '@react-three/fiber';

import Loader from '../components/Loader';

const ChristmasTreeModel = () => {
  const gltf = useLoader(GLTFLoader, '/path/to/the_first_christmas_tree.glb');

  return <primitive object={gltf.scene} />;
};

const Home = () => {
  return (
    <section className="w-full h-screen relative">
      <Canvas
        className="w-full h-screen bg-transparent"
        camera={{ near: 0.1, far: 1000 }}
      >
        <Suspense fallback={<Loader />}>
          <directionalLight />
          <ambientLight />
          <pointLight />
          <spotLight />
          <hemisphereLight />

          <ChristmasTreeModel />
        </Suspense>
      </Canvas>
    </section>
  );
};

export default Home;
