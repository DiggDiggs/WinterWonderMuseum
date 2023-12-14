import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import Loader from '../components/Loader';
import The_First_Christmas_Tree from '../models/The_First_Christmas_Tree';


// Home component
const Home = () => {
  return (
    <section className="w-full h-screen relative">
      <Canvas className="w-full h-screen bg-transparent" camera={{ near: 0.1, far: 1000 }}>
        <Suspense fallback={<Loader />}>
          <directionalLight />
          <ambientLight />
          <pointLight />
          <spotLight />
          <hemisphereLight />

          <The_First_Christmas_Tree />
        </Suspense>
      </Canvas>
    </section>
  );
};

export default Home;
