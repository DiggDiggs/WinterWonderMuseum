import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import Loader from '../components/Loader';
import The_First_Christmas_Tree from '../models/The_First_Christmas_Tree';
import Sky from '../models/Sky';
import Chris from '../models/Chris';
import Elk_Wip from '../models/Elk_Wip';
import Dom from '../models/dom3d';
import Bear from '../models/Bear_igloo';
import Alex from '../models/Alex';


// Home component
const Home = () => {
  const adjustThe_First_Christmas_TreeForScreenSize = () => {
    let screenScale = null;
    let screenPosition = [0, -6.5, -43.4];
    let rotation = [0.1, 4.7, 0];

    if (window.innerWidth < 768) {
      screenScale = [0.9, 0.9, 0.9];
    } else {
      screenScale = [1, 1, 1];
    }

    return [screenScale, screenPosition, rotation];
  }

  const [The_First_Christmas_TreeScale, The_First_Christmas_TreePosition, The_First_Christmas_TreeRotation] = adjustThe_First_Christmas_TreeForScreenSize();
  return (
    <section className="w-full h-screen relative">
      <Canvas className="w-full h-screen bg-transparent" camera={{ near: 0.1, far: 1000 }}>
        <Suspense fallback={<Loader />}>
          <directionalLight position={[1, 1, 1]} intensity={2} />
          <ambientLight intensity={0.5} />
          <pointLight />
          <spotLight />
          <hemisphereLight skyColor="#b1e1ff" groundColor="#000000" intensity={1} />

          
          
          <Sky />
          <The_First_Christmas_Tree 
            position={The_First_Christmas_TreePosition}
            scale={The_First_Christmas_TreeScale}
            rotation={The_First_Christmas_TreeRotation}
          />
          <Elk_Wip />
          <Chris />
          <Alex />
          <Dom />
          <Bear />
        </Suspense>
      </Canvas>
    </section>
  );
};

export default Home;
