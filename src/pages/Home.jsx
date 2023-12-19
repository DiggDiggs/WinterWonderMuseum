import { useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import Loader from '../components/Loader';
import Alex from '../models/Alex';
import Chris from '../models/Chris.jsx';
import Dom from '../models/dom3d';
import Bear from '../models/Bear_igloo';
import Dragon from '../models/dragon';
import Whey from '../models/Whey';
import Mail from '../models/Mail';
import Sky from '../models/Sky';
import The_First_Christmas_Tree from '../models/The_First_Christmas_Tree';


const IslandGroup = ({ children, rotation }) => {
  return (
    <group rotation={rotation}>
      {children}
    </group>
  );
};

const Home = () => {
  const [isRotating, setIsRotating] = useState(false);

  const adjustThe_First_Christmas_TreeForScreenSize = () => {
    let screenScale = null;
    let screenPosition = [0, -6.5, -43.4];

    if (window.innerWidth < 768) {
      screenScale = [0.9, 0.9, 0.9];
    } else {
      screenScale = [1, 1, 1];
    }

    return [screenScale, screenPosition];
  }

  const adjustWheyForScreenSize = () => {
    let screenScale, screenPosition;

    if (window.innerWidth < 768) {
      screenScale = [1.5, 1.5, 1.5];
      screenPosition = [0, -1.5, 0];
    } else {
      screenScale = [3, 3, 3];
      screenPosition = [0, -4, -4];
    }

    return [screenScale, screenPosition];
  }

  const adjustChrisForScreenSize = () => {
    let screenScale, screenPosition;

    if (window.innerWidth < 768) {
      screenScale = [1.5, 1.5, 1.5];
      screenPosition = [0, -1.5, 0];
    } else {
      screenScale = [3, 3, 3];
      screenPosition = [0, -4, -4];
    }

    return [screenScale, screenPosition];
  }

  const [The_First_Christmas_TreeScale, The_First_Christmas_TreePosition, The_First_Christmas_TreeRotation] = adjustThe_First_Christmas_TreeForScreenSize();
  const [wheyScale, wheyPosition] = adjustWheyForScreenSize();
  const [chrisScale, chrisPosition] = adjustChrisForScreenSize();

  return (
    <section className="w-full h-screen relative">
      <Canvas className={`w-full h-screen bg-transparent ${isRotating ? 'cursor-grabbing' : 'cursor-grab'}`} camera={{ near: 0.1, far: 1000 }}>
        <Suspense fallback={<Loader />}>
          <directionalLight position={[1, 1, 1]} intensity={2} />
          <ambientLight intensity={0.5} />
          <pointLight />
          <spotLight />
          <hemisphereLight skyColor="#b1e1ff" groundColor="#000000" intensity={1} />

          <IslandGroup rotation={isRotating ? [0, 0.1, 0] : [0, 0, 0]}>
            <Dragon />
            <Sky />
            <The_First_Christmas_Tree
              position={The_First_Christmas_TreePosition}
              scale={The_First_Christmas_TreeScale}
              rotation={The_First_Christmas_TreeRotation}
              isRotating={isRotating}
              setIsRotating={setIsRotating}
            />
            <Chris
              isRotating={isRotating}
              chrisScale={chrisScale}
              chrisPosition={chrisPosition}
              rotation={[0, 0, 0]}
            />
            <Alex />
            <Dom />
            <Bear />
            <Whey
              isRotating={isRotating}
              wheyScale={wheyScale}
              wheyPosition={wheyPosition}
              rotation={[0, 10, 0]}
            />
            <Mail />
          </IslandGroup>
        </Suspense>
      </Canvas>
    </section>
  );
};

export default Home;