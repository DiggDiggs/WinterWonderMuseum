<<<<<<< HEAD
import { useState, Suspense } from 'react';
=======
>>>>>>> 220e3968341559c59fb53cdb159f6fb71a4e9555
import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import Loader from '../components/Loader';
import Alex from '../models/Alex';
import Bear from '../models/Bear_igloo';
import Chris from '../models/Chris';
<<<<<<< HEAD
import Dom from '../models/dom3d';
import Bear from '../models/Bear_igloo';
import Alex from '../models/Alex';
import Whey from '../models/Whey';
=======
import Elk_Wip from '../models/Elk_Wip';
import Mail from '../models/Mail';
import Sky from '../models/Sky';
import The_First_Christmas_Tree from '../models/The_First_Christmas_Tree';
import Dom from '../models/dom3d';
>>>>>>> 220e3968341559c59fb53cdb159f6fb71a4e9555


// Home component
const Home = () => {
  const [isRotating, setIsRotating] = useState(false);


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
  
  const [The_First_Christmas_TreeScale, The_First_Christmas_TreePosition, The_First_Christmas_TreeRotation] = adjustThe_First_Christmas_TreeForScreenSize();
  const [wheyScale, wheyPosition] = adjustWheyForScreenSize();
  return (
  

    <section className="w-full h-screen relative">
      <Canvas className={`w-full h-screen bg-transparent" ${isRotating ? 'cursor-grabbing' : 'cursor-grab'}`} camera={{ near: 0.1, far: 1000 }}>
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
            isRotating={isRotating}
            setIsRotating={setIsRotating}
          />
          <Chris />
          <Alex />
          <Dom />
          <Bear />
          <Whey
            isRotating={isRotating}
            wheyScale={wheyScale}
            wheyPosition={wheyPosition}
            rotation={[0, 20, 0]}
          />
          <Mail />
        </Suspense>
      </Canvas>
    </section>
  );
};

export default Home;
