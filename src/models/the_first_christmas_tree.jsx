import { a } from "@react-spring/three";
import { useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";

  
import the_first_christmas_treeScene from '../assets/3d/the_first_christmas_tree.glb';

const The_First_Christmas_Tree = ({ isRotating, setIsRotating, ...props}) => {
  const the_first_christmas_treeRef = useRef();

  const { gl, viewport} = useThree();
  const { nodes, materials } = useGLTF(the_first_christmas_treeScene);

  const lastX = useRef(0);
  const rotationSpeed = useRef(0);
  const dampingFactor = 0.95;

  const handlePointerDown = (e) => { 
    e.stopPropagation();
    e.preventDefault();
    setIsRotating(true);

    const clientX = e.touches ? e.touches[0].clientX : e.clientX;

    lastX.current = clientX;

  }

  const handlePointerUp = (e) => { 
    e.stopPropagation();
    e.preventDefault();
    setIsRotating(false);
  }

  const handlePointerMove = (e) => { 
    e.stopPropagation();
    e.preventDefault();
    setIsRotating(true);

    if(isRotating) {
      const clientX = e.touches
      ? e.touches[0].clientX 
      : e.clientX;

    const delta = (clientX - lastX.current) / viewport.width;

    the_first_christmas_treeRef.current.rotation.y += delta * 0.01 * Math.PI;
    lastX.current = clientX;
    rotationSpeed.current = delta * 0.01 * Math.PI;
    }
  }

  const handleKeyDown = (e) => {
    if(e.key === 'ArrowLeft') {
      if(!isRotating) setIsRotating(true);
      the_first_christmas_treeRef.current.rotation.y += 0.01 * Math.PI;
    } else if(e.key === 'ArrowRight') {
      if(!isRotating) setIsRotating(true);
      the_first_christmas_treeRef.current.rotation.y -= 0.01 * Math.PI;
    }
  }

  const handleKeyUp = (e) => { 
    if(e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
      setIsRotating(false);
    }
  }

  useFrame(() => {
    if(!isRotating) {
      rotationSpeed.current *= dampingFactor;

      if(Math.abs(rotationSpeed.current) < 0.001) {
        rotationSpeed.current = 0
      }

      the_first_christmas_treeRef.current.rotation.y += rotationSpeed.current;
    } else {
      const rotation = the_first_christmas_treeRef.current.rotation.y;

      /**
       * Normalize the rotation value to ensure it stays within the range [0, 2 * Math.PI].
       * The goal is to ensure that the rotation value remains within a specific range to
       * prevent potential issues with very large or negative rotation values.
       *  Here's a step-by-step explanation of what this code does:
       *  1. rotation % (2 * Math.PI) calculates the remainder of the rotation value when divided
       *     by 2 * Math.PI. This essentially wraps the rotation value around once it reaches a
       *     full circle (360 degrees) so that it stays within the range of 0 to 2 * Math.PI.
       *  2. (rotation % (2 * Math.PI)) + 2 * Math.PI adds 2 * Math.PI to the result from step 1.
       *     This is done to ensure that the value remains positive and within the range of
       *     0 to 2 * Math.PI even if it was negative after the modulo operation in step 1.
       *  3. Finally, ((rotation % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI) applies another
       *     modulo operation to the value obtained in step 2. This step guarantees that the value
       *     always stays within the range of 0 to 2 * Math.PI, which is equivalent to a full
       *     circle in radians.
       */
      const normalizedRotation =
        ((rotation % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);

      // Set the current stage based on the island's orientation
      switch (true) {
        case normalizedRotation >= 5.45 && normalizedRotation <= 5.85:
          setCurrentStage(4);
          break;
        case normalizedRotation >= 0.85 && normalizedRotation <= 1.3:
          setCurrentStage(3);
          break;
        case normalizedRotation >= 2.4 && normalizedRotation <= 2.6:
          setCurrentStage(2);
          break;
        case normalizedRotation >= 4.25 && normalizedRotation <= 4.75:
          setCurrentStage(1);
          break;
        default:
          setCurrentStage(null);
      }
    }
  });

  useEffect(() => {
    const canvas = gl.domElement;
    canvas.addEventListener('pointerdown', handlePointerDown);
    canvas.addEventListener('pointerup', handlePointerUp);
    canvas.addEventListener('pointermove', handlePointerMove);
    document.addEventListener('keyup', handleKeyUp);
    document.addEventListener('keydown', handleKeyDown);


    return () => {
      canvas.removeEventListener('pointerdown', handlePointerDown);
      canvas.removeEventListener('pointerup', handlePointerUp);
      canvas.removeEventListener('pointermove', handlePointerMove);
      document.removeEventListener('keyup', handleKeyUp);
      document.removeEventListener('Keydown', handleKeyDown);
      
    } 
  }, [gl, handlePointerDown, handlePointerUp, handlePointerMove])

  return (
    <a.group ref={the_first_christmas_treeRef} {...props}>
      <group position={[0.042, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <group rotation={[Math.PI / 2, 0, 0]}>
          <group position={[0, 0.988, 0]} scale={[4.885, 3.981, 4.885]}>
            <mesh
              
              
              geometry={nodes.Object_4.geometry}
              material={materials.Rock_03}
            />
            <mesh
              
              
              geometry={nodes.Object_5.geometry}
              material={materials.Snow}
            />
          </group>
          <group
            position={[-3.06, 6.887, 1.089]}
            rotation={[Math.PI / 2, 0.772, -Math.PI / 2]}
            scale={[1.431, 0.097, 0.089]}
          >
            <mesh
              
              
              geometry={nodes.Object_21.geometry}
              material={materials.wood_colour}
            />
            <mesh
              
              
              geometry={nodes.Object_22.geometry}
              material={materials.Wood_end}
            />
          </group>
          <group
            position={[-3.769, 4.071, 1.962]}
            rotation={[-Math.PI / 2, 0.005, 0]}
            scale={[2.341, 0.158, 0.204]}
          >
            <mesh
              
              
              geometry={nodes.Object_24.geometry}
              material={materials.wood_colour}
            />
            <mesh
              
              
              geometry={nodes.Object_25.geometry}
              material={materials.Wood_end}
            />
          </group>
          <group
            position={[-4.556, 4.018, -0.166]}
            rotation={[Math.PI / 2, 0, -Math.PI / 2]}
            scale={[2.341, 0.158, 0.204]}
          >
            <mesh
              
              
              geometry={nodes.Object_27.geometry}
              material={materials.wood_colour}
            />
            <mesh
              
              
              geometry={nodes.Object_28.geometry}
              material={materials.Wood_end}
            />
          </group>
          <group
            position={[-3.067, 4.095, -4.396]}
            rotation={[-Math.PI / 2, -0.005, -3.142]}
            scale={[2.341, 0.158, 0.204]}
          >
            <mesh
              
              
              geometry={nodes.Object_32.geometry}
              material={materials.wood_colour}
            />
            <mesh
              
              
              geometry={nodes.Object_33.geometry}
              material={materials.Wood_end}
            />
          </group>
          <group position={[3.881, 4.614, -2.721]}>
            <mesh
              
              
              geometry={nodes.Object_51.geometry}
              material={materials.Rock_03}
            />
            <mesh
              
              
              geometry={nodes.Object_52.geometry}
              material={materials.Shadow}
            />
          </group>
          <group
            position={[3.916, 6.223, -1.795]}
            rotation={[-Math.PI, 0, -Math.PI]}
            scale={[1.116, 0.044, 0.05]}
          >
            <mesh
              
              
              geometry={nodes.Object_94.geometry}
              material={materials.wood_colour}
            />
            <mesh
              
              
              geometry={nodes.Object_95.geometry}
              material={materials.Wood_end}
            />
          </group>
          <group
            position={[3.916, 6.223, -3.62]}
            rotation={[-Math.PI, 0, -Math.PI]}
            scale={[1.116, 0.044, 0.05]}
          >
            <mesh
              
              
              geometry={nodes.Object_99.geometry}
              material={materials.wood_colour}
            />
            <mesh
              
              
              geometry={nodes.Object_100.geometry}
              material={materials.Wood_end}
            />
          </group>
          <group
            position={[-2.003, 3.691, -0.316]}
            rotation={[0, Math.PI / 2, 0]}
            scale={[2.341, 0.158, 0.204]}
          >
            <mesh
              
              
              geometry={nodes.Object_104.geometry}
              material={materials.wood_colour}
            />
            <mesh
              
              
              geometry={nodes.Object_105.geometry}
              material={materials.Wood_end}
            />
          </group>
          <group
            position={[-3.053, 3.691, -0.148]}
            rotation={[0, Math.PI / 2, 0]}
            scale={[2.341, 0.158, 0.204]}
          >
            <mesh
              
              
              geometry={nodes.Object_107.geometry}
              material={materials.wood_colour}
            />
            <mesh
              
              
              geometry={nodes.Object_108.geometry}
              material={materials.Wood_end}
            />
          </group>
          <group
            position={[-4.152, 3.655, -0.229]}
            rotation={[0, Math.PI / 2, 0]}
            scale={[2.341, 0.158, 0.204]}
          >
            <mesh
              
              
              geometry={nodes.Object_110.geometry}
              material={materials.wood_colour}
            />
            <mesh
              
              
              geometry={nodes.Object_111.geometry}
              material={materials.Wood_end}
            />
          </group>
          <group
            position={[2.328, 3.359, 3.433]}
            rotation={[Math.PI / 2, 0, 0]}
            scale={0.16}
          >
            <mesh
              
              
              geometry={nodes.Object_187.geometry}
              material={materials.wood_colour}
            />
            <mesh
              
              
              geometry={nodes.Object_188.geometry}
              material={materials.Wood_end}
            />
          </group>
          <group position={[-1.066, 1.297, -1.512]} scale={0.302}>
            <mesh
              
              
              geometry={nodes.Object_190.geometry}
              material={materials.Wood_end}
            />
            <mesh
              
              
              geometry={nodes.Object_191.geometry}
              material={materials.Metal03}
            />
          </group>
          <group position={[-4.455, 2.493, 0.979]} scale={0.921}>
            <mesh
              
              
              geometry={nodes.Object_343.geometry}
              material={materials.wood_colour}
            />
            <mesh
              
              
              geometry={nodes.Object_344.geometry}
              material={materials.Light}
            />
          </group>
          <group position={[-4.455, 2.493, -0.544]} scale={0.921}>
            <mesh
              
              
              geometry={nodes.Object_346.geometry}
              material={materials.wood_colour}
            />
            <mesh
              
              
              geometry={nodes.Object_347.geometry}
              material={materials.Light}
            />
          </group>
          <group position={[-4.455, 2.493, -2.022]} scale={0.921}>
            <mesh
              
              
              geometry={nodes.Object_349.geometry}
              material={materials.wood_colour}
            />
            <mesh
              
              
              geometry={nodes.Object_350.geometry}
              material={materials.Light}
            />
          </group>
          <group position={[-4.455, 2.493, -3.45]} scale={0.921}>
            <mesh
              
              
              geometry={nodes.Object_352.geometry}
              material={materials.wood_colour}
            />
            <mesh
              
              
              geometry={nodes.Object_353.geometry}
              material={materials.Light}
            />
          </group>
          <group
            position={[-3.124, 2.522, -4.176]}
            rotation={[0, -Math.PI / 2, 0]}
            scale={0.921}
          >
            <mesh
              
              
              geometry={nodes.Object_355.geometry}
              material={materials.wood_colour}
            />
            <mesh
              
              
              geometry={nodes.Object_356.geometry}
              material={materials.Light}
            />
          </group>
          <group
            position={[-0.941, 2.307, -4.47]}
            rotation={[0, -Math.PI / 2, 0]}
            scale={0.921}
          >
            <mesh
              
              
              geometry={nodes.Object_358.geometry}
              material={materials.wood_colour}
            />
            <mesh
              
              
              geometry={nodes.Object_359.geometry}
              material={materials.Window}
            />
          </group>
          <group
            position={[0.542, 2.307, -4.47]}
            rotation={[0, -Math.PI / 2, 0]}
            scale={0.921}
          >
            <mesh
              
              
              geometry={nodes.Object_361.geometry}
              material={materials.wood_colour}
            />
            <mesh
              
              
              geometry={nodes.Object_362.geometry}
              material={materials.Window}
            />
          </group>
          <group
            position={[1.982, 2.307, -4.47]}
            rotation={[0, -Math.PI / 2, 0]}
            scale={0.921}
          >
            <mesh
              
              
              geometry={nodes.Object_364.geometry}
              material={materials.wood_colour}
            />
            <mesh
              
              
              geometry={nodes.Object_365.geometry}
              material={materials.Window}
            />
          </group>
          <group
            position={[-3.063, 5.051, 1.779]}
            rotation={[0, Math.PI / 2, 0]}
            scale={0.921}
          >
            <mesh
              
              
              geometry={nodes.Object_367.geometry}
              material={materials.wood_colour}
            />
            <mesh
              
              
              geometry={nodes.Object_368.geometry}
              material={materials.Light}
            />
          </group>
          <group
            position={[-6.273, 1.042, 8.283]}
            rotation={[0, 0.795, 0]}
            scale={0.526}
          >
            <mesh
              
              
              geometry={nodes.Object_374.geometry}
              material={materials.Pine_green}
            />
            <mesh
              
              
              geometry={nodes.Object_375.geometry}
              material={materials.wood_colour}
            />
          </group>
          <group position={[7.919, 1.362, -9.431]} scale={0.22}>
            <mesh
              
              
              geometry={nodes.Object_377.geometry}
              material={materials.Pine_green}
            />
            <mesh
              
              
              geometry={nodes.Object_378.geometry}
              material={materials.wood_colour}
            />
          </group>
          <group
            position={[9.471, 2.09, 1.777]}
            rotation={[0, 1.394, 0]}
            scale={0.167}
          >
            <mesh
              
              
              geometry={nodes.Object_380.geometry}
              material={materials.Snow}
            />
            <mesh
              
              
              geometry={nodes.Object_381.geometry}
              material={materials.Coal}
            />
            <mesh
              
              
              geometry={nodes.Object_382.geometry}
              material={materials.wood01}
            />
            <mesh
              
              
              geometry={nodes.Object_383.geometry}
              material={materials.Roof_carrot}
            />
            <mesh
              
              
              geometry={nodes.Object_384.geometry}
              material={materials.Strawhat}
            />
          </group>
          <group
            position={[9.765, 1.28, -9.023]}
            rotation={[0, 0.795, 0]}
            scale={0.733}
          >
            <mesh
              
              
              geometry={nodes.Object_398.geometry}
              material={materials.Pine_green}
            />
            <mesh
              
              
              geometry={nodes.Object_399.geometry}
              material={materials.wood_colour}
            />
          </group>
          <group
            position={[7.545, 1.042, -7.828]}
            rotation={[0, 0.795, 0]}
            scale={0.526}
          >
            <mesh
              
              
              geometry={nodes.Object_401.geometry}
              material={materials.Pine_green}
            />
            <mesh
              
              
              geometry={nodes.Object_402.geometry}
              material={materials.wood_colour}
            />
          </group>
          <group
            position={[18.206, 0.739, -10.01]}
            rotation={[0, 0.795, 0]}
            scale={0.3}
          >
            <mesh
              
              
              geometry={nodes.Object_406.geometry}
              material={materials.Pine_green}
            />
            <mesh
              
              
              geometry={nodes.Object_407.geometry}
              material={materials.wood_colour}
            />
          </group>
          <group position={[5.618, 0.409, 0]} scale={14.439}>
            <mesh
              
              
              geometry={nodes.Object_409.geometry}
              material={materials.Snow}
            />
            <mesh
              
              
              geometry={nodes.Object_410.geometry}
              material={materials.Earth}
            />
          </group>
          <group
            position={[-5.176, 1.891, -10.351]}
            rotation={[0, -0.738, 0]}
            scale={0.158}
          >
            <mesh
              
              
              geometry={nodes.Object_538.geometry}
              material={materials.wood_colour}
            />
            <mesh
              
              
              geometry={nodes.Object_539.geometry}
              material={materials.Pine_green}
            />
            <mesh
              
              
              geometry={nodes.Object_540.geometry}
              material={materials.Snow}
            />
          </group>
          <group
            position={[-5.235, 1.169, 7.046]}
            rotation={[0, -0.662, 0]}
            scale={0.22}
          >
            <mesh
              
              
              geometry={nodes.Object_544.geometry}
              material={materials.Pine_green}
            />
            <mesh
              
              
              geometry={nodes.Object_545.geometry}
              material={materials.wood_colour}
            />
          </group>
          <group
            position={[-3.712, 1.361, 3.179]}
            rotation={[-Math.PI, 0.783, -Math.PI]}
            scale={0.3}
          >
            <mesh
              
              
              geometry={nodes.Object_549.geometry}
              material={materials.Pine_green}
            />
            <mesh
              
              
              geometry={nodes.Object_550.geometry}
              material={materials.wood_colour}
            />
          </group>
          <group
            position={[10.187, 0.86, 10.114]}
            rotation={[0, -0.872, 0]}
            scale={0.248}
          >
            <mesh
              
              
              geometry={nodes.Object_582.geometry}
              material={materials.Present_box_yellow}
            />
            <mesh
              
              
              geometry={nodes.Object_583.geometry}
              material={materials.Present_box_red}
            />
          </group>
          <group
            position={[10.414, 0.659, 10.574]}
            rotation={[0, -0.037, 0]}
            scale={0.136}
          >
            <mesh
              
              
              geometry={nodes.Object_585.geometry}
              material={materials.Present_box_blue}
            />
            <mesh
              
              
              geometry={nodes.Object_586.geometry}
              material={materials.Present_box_red}
            />
          </group>
          <group
            position={[-1.526, 1.122, 3.144]}
            rotation={[0, -Math.PI / 2, 0]}
            scale={[0.746, 0.135, 1.499]}
          >
            <mesh
              
              
              geometry={nodes.Object_652.geometry}
              material={materials.Earth_02}
            />
            <mesh
              
              
              geometry={nodes.Object_653.geometry}
              material={materials.wood_colour}
            />
          </group>
          <group
            position={[3, 1.773, 0.228]}
            rotation={[-2.975, -1.544, 1.74]}
            scale={[0.044, 0.389, 0.044]}
          >
            <mesh
              
              
              geometry={nodes.Object_657.geometry}
              material={materials.Metal02}
            />
            <mesh
              
              
              geometry={nodes.Object_658.geometry}
              material={materials.Metal}
            />
            <mesh
              
              
              geometry={nodes.Object_659.geometry}
              material={materials.Rock}
            />
            <mesh
              
              
              geometry={nodes.Object_660.geometry}
              material={materials.Water}
            />
          </group>
          <group position={[-0.475, 1.297, -1.7]} scale={0.302}>
            <mesh
              
              
              geometry={nodes.Object_714.geometry}
              material={materials.Wood_end}
            />
            <mesh
              
              
              geometry={nodes.Object_715.geometry}
              material={materials.Metal03}
            />
          </group>
          <group
            position={[8.129, 0.392, 10.096]}
            rotation={[-Math.PI, 1.446, -Math.PI]}
            scale={0.688}
          >
            <mesh
              
              
              geometry={nodes.Object_721.geometry}
              material={materials.Pine_green}
            />
            <mesh
              
              
              geometry={nodes.Object_722.geometry}
              material={materials.wood_colour}
            />
          </group>
          <group
            position={[9.953, 1.977, 8.174]}
            rotation={[-2.662, 0.57, 2.847]}
            scale={[0.237, 0.237, 0.073]}
          >
            <mesh
              
              
              geometry={nodes.Object_732.geometry}
              material={materials.wood_colour}
            />
            <mesh
              
              
              geometry={nodes.Object_733.geometry}
              material={materials.Wood_end}
            />
          </group>
          <group
            position={[9.921, 3.458, 8.143]}
            rotation={[0.033, -0.626, 0.02]}
            scale={[0.217, 0.264, 0.264]}
          >
            <mesh
              
              
              geometry={nodes.Object_735.geometry}
              material={materials.Monk_robe}
            />
            <mesh
              
              
              geometry={nodes.Object_736.geometry}
              material={materials.Rope}
            />
            <mesh
              
              
              geometry={nodes.Object_737.geometry}
              material={materials.Skin}
            />
            <mesh
              
              
              geometry={nodes.Object_738.geometry}
              material={materials.Shadow}
            />
            <mesh
              
              
              geometry={nodes.Object_739.geometry}
              material={materials.Hair}
            />
          </group>
          <group
            position={[9.636, 4.155, 8.494]}
            rotation={[-2.081, 0.35, -0.537]}
            scale={[0.217, 0.264, 0.264]}
          >
            <mesh
              
              
              geometry={nodes.Object_741.geometry}
              material={materials.Monk_robe}
            />
            <mesh
              
              
              geometry={nodes.Object_742.geometry}
              material={materials.Skin}
            />
          </group>
          <group
            position={[10.314, 4.045, 8.327]}
            rotation={[-0.615, -0.534, -0.345]}
            scale={[0.217, 0.264, 0.264]}
          >
            <mesh
              
              
              geometry={nodes.Object_744.geometry}
              material={materials.Monk_robe}
            />
            <mesh
              
              
              geometry={nodes.Object_745.geometry}
              material={materials.Skin}
            />
          </group>
          <group
            position={[11.144, 1.552, 12.497]}
            rotation={[3.106, 0.702, -3.119]}
            scale={[0.217, 0.264, 0.264]}
          >
            <mesh
              
              
              geometry={nodes.Object_747.geometry}
              material={materials.Monk_robe}
            />
            <mesh
              
              
              geometry={nodes.Object_748.geometry}
              material={materials.Rope}
            />
            <mesh
              
              
              geometry={nodes.Object_749.geometry}
              material={materials.Skin}
            />
            <mesh
              
              
              geometry={nodes.Object_750.geometry}
              material={materials.Shadow}
            />
            <mesh
              
              
              geometry={nodes.Object_751.geometry}
              material={materials.Hair}
            />
          </group>
          <group position={[17.466, 0.79, -0.977]} scale={0.602}>
            <mesh
              
              
              geometry={nodes.Object_761.geometry}
              material={materials.Snow}
            />
            <mesh
              
              
              geometry={nodes.Object_762.geometry}
              material={materials.Pine_green}
            />
            <mesh
              
              
              geometry={nodes.Object_763.geometry}
              material={materials.Present_box_red}
            />
          </group>
          <group
            position={[16.823, 0.899, -1.998]}
            rotation={[0, -1.094, 0]}
            scale={0.803}
          >
            <mesh
              
              
              geometry={nodes.Object_765.geometry}
              material={materials.Snow}
            />
            <mesh
              
              
              geometry={nodes.Object_766.geometry}
              material={materials.Pine_green}
            />
            <mesh
              
              
              geometry={nodes.Object_767.geometry}
              material={materials.Present_box_red}
            />
          </group>
          <group
            position={[8.33, 0.746, -6.517]}
            rotation={[0, 1.397, 0]}
            scale={0.54}
          >
            <mesh
              
              
              geometry={nodes.Object_769.geometry}
              material={materials.Snow}
            />
            <mesh
              
              
              geometry={nodes.Object_770.geometry}
              material={materials.Pine_green}
            />
            <mesh
              
              
              geometry={nodes.Object_771.geometry}
              material={materials.Present_box_red}
            />
          </group>
          <group
            position={[11.958, 1.724, 10.863]}
            rotation={[0, -0.283, 0]}
            scale={0.127}
          >
            <mesh
              
              
              geometry={nodes.Object_773.geometry}
              material={materials.Rope}
            />
            <mesh
              
              
              geometry={nodes.Object_774.geometry}
              material={materials.Monk_robe}
            />
            <mesh
              
              
              geometry={nodes.Object_775.geometry}
              material={materials.Shadow}
            />
            <mesh
              
              
              geometry={nodes.Object_776.geometry}
              material={materials.Skin}
            />
          </group>
          <group
            position={[-4.191, 3.672, -4.259]}
            rotation={[0, -Math.PI / 2, 0]}
            scale={[2.341, 0.158, 0.204]}
          >
            <mesh
              
              
              geometry={nodes.Object_804.geometry}
              material={materials.wood_colour}
            />
            <mesh
              
              
              geometry={nodes.Object_805.geometry}
              material={materials.Wood_end}
            />
          </group>
          <group
            position={[-3.084, 3.699, -4.273]}
            rotation={[0, -Math.PI / 2, 0]}
            scale={[2.341, 0.158, 0.204]}
          >
            <mesh
              
              
              geometry={nodes.Object_807.geometry}
              material={materials.wood_colour}
            />
            <mesh
              
              
              geometry={nodes.Object_808.geometry}
              material={materials.Wood_end}
            />
          </group>
          <group
            position={[-2.049, 3.708, -4.316]}
            rotation={[0, -Math.PI / 2, 0]}
            scale={[2.341, 0.158, 0.204]}
          >
            <mesh
              
              
              geometry={nodes.Object_810.geometry}
              material={materials.wood_colour}
            />
            <mesh
              
              
              geometry={nodes.Object_811.geometry}
              material={materials.Wood_end}
            />
          </group>
          <mesh
            
            
            geometry={nodes.Object_7.geometry}
            material={materials.Rock_03}
            position={[0, 1.999, -3.39]}
          />
          <mesh
            
            
            geometry={nodes.Object_9.geometry}
            material={materials.wood_colour}
            position={[-1.805, 1.949, -0.495]}
          />
          <mesh
            
            
            geometry={nodes.Object_11.geometry}
            material={materials.Metal}
            position={[-1.751, 2.476, -0.655]}
            rotation={[0, 0, -Math.PI / 2]}
            scale={[0.066, 0.313, 0.313]}
          />
          <mesh
            
            
            geometry={nodes.Object_13.geometry}
            material={materials.Metal}
            position={[-1.751, 1.36, -0.655]}
            rotation={[0, 0, -Math.PI / 2]}
            scale={[0.066, 0.313, 0.313]}
          />
          <mesh
            
            
            geometry={nodes.Object_15.geometry}
            material={materials.Gold}
            position={[-3.063, 7.007, 0.704]}
          />
          <mesh
            
            
            geometry={nodes.Object_17.geometry}
            material={materials.wood_colour}
            position={[-3.799, 6.156, 2.106]}
            rotation={[Math.PI / 2, 0.78, 0]}
            scale={[1.128, 0.076, 0.098]}
          />
          <mesh
            
            
            geometry={nodes.Object_19.geometry}
            material={materials.wood_colour}
            position={[-2.318, 6.156, 2.106]}
            rotation={[Math.PI / 2, -0.78, -Math.PI]}
            scale={[1.128, 0.076, 0.098]}
          />
          <mesh
            
            
            geometry={nodes.Object_30.geometry}
            material={materials.wood_colour}
            position={[-1.584, 4.049, -0.486]}
            rotation={[Math.PI / 2, 0, -Math.PI / 2]}
            scale={[2.341, 0.158, 0.204]}
          />
          <mesh
            
            
            geometry={nodes.Object_35.geometry}
            material={materials.wood_colour}
            position={[-1.609, 4.391, -0.696]}
            rotation={[0, 0, -Math.PI / 2]}
            scale={[2.341, 0.158, 0.204]}
          />
          <mesh
            
            
            geometry={nodes.Object_37.geometry}
            material={materials.wood_colour}
            position={[-4.52, 4.391, -0.782]}
            rotation={[Math.PI, 0, Math.PI / 2]}
            scale={[2.341, 0.158, 0.204]}
          />
          <mesh
            
            
            geometry={nodes.Object_39.geometry}
            material={materials.Roof_carrot}
            position={[-3.055, 6.508, 0.864]}
          />
          <mesh
            
            
            geometry={nodes.Object_41.geometry}
            material={materials.Roof_carrot}
            position={[-3.062, 5.516, -1.658]}
          />
          <mesh
            
            
            geometry={nodes.Object_43.geometry}
            material={materials.wood_colour}
            position={[-3.799, 6.156, -0.511]}
            rotation={[Math.PI / 2, 0.78, 0]}
            scale={[1.128, 0.076, 0.098]}
          />
          <mesh
            
            
            geometry={nodes.Object_45.geometry}
            material={materials.wood_colour}
            position={[-2.318, 6.156, -0.511]}
            rotation={[Math.PI / 2, -0.78, -Math.PI]}
            scale={[1.128, 0.076, 0.098]}
          />
          <mesh
            
            
            geometry={nodes.Object_47.geometry}
            material={materials.Gold}
            position={[-3.043, 6.394, -4.447]}
          />
          <mesh
            
            
            geometry={nodes.Object_49.geometry}
            material={materials.Gold}
            position={[3.843, 7.747, -2.734]}
            scale={0.137}
          />
          <mesh
            
            
            geometry={nodes.Object_54.geometry}
            material={materials.wood_colour}
            position={[4.763, 6.223, -2.773]}
            rotation={[0, Math.PI / 2, 0]}
            scale={[1.116, 0.036, 0.06]}
          />
          <mesh
            
            
            geometry={nodes.Object_56.geometry}
            material={materials.Roof_carrot}
            position={[4.861, 6.36, -1.706]}
            rotation={[-3.074, 0.835, 2.169]}
            scale={0.116}
          />
          <mesh
            
            
            geometry={nodes.Object_58.geometry}
            material={materials.Roof_carrot}
            position={[4.598, 6.587, -1.982]}
            rotation={[-3.044, 0.801, 2.007]}
            scale={0.116}
          />
          <mesh
            
            
            geometry={nodes.Object_60.geometry}
            material={materials.Roof_carrot}
            position={[4.334, 6.854, -2.253]}
            rotation={[-3.093, 0.855, 2.259]}
            scale={0.116}
          />
          <mesh
            
            
            geometry={nodes.Object_62.geometry}
            material={materials.Roof_carrot}
            position={[4.106, 7.16, -2.501]}
            rotation={[-3.095, 0.861, 2.292]}
            scale={0.116}
          />
          <mesh
            
            
            geometry={nodes.Object_64.geometry}
            material={materials.Roof_carrot}
            position={[2.813, 6.36, -1.718]}
            rotation={[-0.066, 0.738, -0.931]}
            scale={0.116}
          />
          <mesh
            
            
            geometry={nodes.Object_66.geometry}
            material={materials.Roof_carrot}
            position={[3.089, 6.587, -1.981]}
            rotation={[-0.094, 0.764, -0.999]}
            scale={0.116}
          />
          <mesh
            
            
            geometry={nodes.Object_68.geometry}
            material={materials.Roof_carrot}
            position={[3.361, 6.854, -2.245]}
            rotation={[-0.042, 0.713, -0.819]}
            scale={0.116}
          />
          <mesh
            
            
            geometry={nodes.Object_70.geometry}
            material={materials.Roof_carrot}
            position={[3.609, 7.16, -2.472]}
            rotation={[-0.04, 0.707, -0.789]}
            scale={0.116}
          />
          <mesh
            
            
            geometry={nodes.Object_72.geometry}
            material={materials.Roof_carrot}
            position={[2.812, 6.36, -3.75]}
            rotation={[-0.067, -0.822, -0.971]}
            scale={0.116}
          />
          <mesh
            
            
            geometry={nodes.Object_74.geometry}
            material={materials.Roof_carrot}
            position={[3.079, 6.587, -3.477]}
            rotation={[-0.096, -0.788, -1.132]}
            scale={0.116}
          />
          <mesh
            
            
            geometry={nodes.Object_76.geometry}
            material={materials.Roof_carrot}
            position={[3.337, 6.841, -3.219]}
            rotation={[-0.048, -0.842, -0.882]}
            scale={0.116}
          />
          <mesh
            
            
            geometry={nodes.Object_78.geometry}
            material={materials.Roof_carrot}
            position={[3.578, 7.16, -2.965]}
            rotation={[-0.046, -0.848, -0.849]}
            scale={0.116}
          />
          <mesh
            
            
            geometry={nodes.Object_80.geometry}
            material={materials.Roof_carrot}
            position={[4.883, 6.36, -3.741]}
            rotation={[-3.097, -0.739, 2.067]}
            scale={0.116}
          />
          <mesh
            
            
            geometry={nodes.Object_82.geometry}
            material={materials.Roof_carrot}
            position={[4.604, 6.587, -3.481]}
            rotation={[-3.043, -0.745, 2.238]}
            scale={0.116}
          />
          <mesh
            
            
            geometry={nodes.Object_84.geometry}
            material={materials.Roof_carrot}
            position={[4.33, 6.854, -3.219]}
            rotation={[-3.1, -0.704, 2.322]}
            scale={0.116}
          />
          <mesh
            
            
            geometry={nodes.Object_86.geometry}
            material={materials.Roof_carrot}
            position={[4.099, 7.186, -3.01]}
            rotation={[-3.119, -0.684, 2.484]}
            scale={0.116}
          />
          <mesh
            
            
            geometry={nodes.Object_88.geometry}
            material={materials.Gold}
            position={[3.845, 7.293, -2.735]}
            scale={1.391}
          />
          <mesh
            
            
            geometry={nodes.Object_90.geometry}
            material={materials.Gold}
            position={[-3.038, 6.603, -4.455]}
            scale={0.137}
          />
          <mesh
            
            
            geometry={nodes.Object_92.geometry}
            material={materials.Roof_carrot}
            position={[3.843, 6.503, -2.734]}
            scale={1.159}
          />
          <mesh
            
            
            geometry={nodes.Object_97.geometry}
            material={materials.wood_colour}
            position={[2.915, 6.223, -2.773]}
            rotation={[0, Math.PI / 2, 0]}
            scale={[1.116, 0.036, 0.06]}
          />
          <mesh
            
            
            geometry={nodes.Object_102.geometry}
            material={materials.Roof_carrot}
            position={[0.651, 4.348, -3.33]}
            rotation={[0, Math.PI / 2, 0]}
            scale={[1, 1, 1.044]}
          />
          <mesh
            
            
            geometry={nodes.Object_113.geometry}
            material={materials.Rock_03}
            position={[-0.017, 0.984, -2.361]}
            scale={0.409}
          />
          <mesh
            
            
            geometry={nodes.Object_115.geometry}
            material={materials.Rock_02}
            position={[-0.017, 2.529, -2.361]}
            scale={0.269}
          />
          <mesh
            
            
            geometry={nodes.Object_117.geometry}
            material={materials.Rock_02}
            position={[1.184, 2.529, -2.361]}
            scale={0.269}
          />
          <mesh
            
            
            geometry={nodes.Object_119.geometry}
            material={materials.Rock_03}
            position={[1.192, 0.984, -2.361]}
            scale={0.409}
          />
          <mesh
            
            
            geometry={nodes.Object_121.geometry}
            material={materials.Rock_02}
            position={[2.403, 2.529, -2.361]}
            scale={0.269}
          />
          <mesh
            
            
            geometry={nodes.Object_123.geometry}
            material={materials.Rock_03}
            position={[2.411, 0.984, -2.361]}
            scale={0.409}
          />
          <mesh
            
            
            geometry={nodes.Object_125.geometry}
            material={materials.Rock_03}
            position={[-1.233, 0.984, -2.361]}
            scale={0.409}
          />
          <mesh
            
            
            geometry={nodes.Object_127.geometry}
            material={materials.Rock_02}
            position={[-1.233, 2.529, -2.361]}
            scale={0.269}
          />
          <mesh
            
            
            geometry={nodes.Object_129.geometry}
            material={materials.Shadow}
            position={[0.584, 2.152, -2.756]}
          />
          <mesh
            
            
            geometry={nodes.Object_131.geometry}
            material={materials.Roof_carrot}
            position={[2.315, 3.428, 3.451]}
            rotation={[3.062, 0, Math.PI]}
            scale={[0.57, 0.57, 0.595]}
          />
          <mesh
            
            
            geometry={nodes.Object_133.geometry}
            material={materials.wood_colour}
            position={[-1.617, 2.522, -4.524]}
            rotation={[0, 0, -Math.PI / 2]}
            scale={[1.535, 0.104, 0.134]}
          />
          <mesh
            
            
            geometry={nodes.Object_135.geometry}
            material={materials.Rock_02}
            position={[3.022, 0.742, 4.488]}
            scale={0.372}
          />
          <mesh
            
            
            geometry={nodes.Object_137.geometry}
            material={materials.Rock_03}
            position={[3.022, 0.742, 3.718]}
            scale={0.372}
          />
          <mesh
            
            
            geometry={nodes.Object_139.geometry}
            material={materials.Rock_02}
            position={[3.022, 0.742, 2.912]}
            scale={[0.372, 0.372, 0.405]}
          />
          <mesh
            
            
            geometry={nodes.Object_141.geometry}
            material={materials.K_02}
            position={[3.773, 0.376, 4.535]}
            scale={0.372}
          />
          <mesh
            
            
            geometry={nodes.Object_143.geometry}
            material={materials.Rock}
            position={[3.773, 0.376, 2.959]}
            scale={[0.372, 0.372, 0.405]}
          />
          <mesh
            
            
            geometry={nodes.Object_145.geometry}
            material={materials.Rock}
            position={[4.43, 0.08, 4.562]}
            scale={0.372}
          />
          <mesh
            
            
            geometry={nodes.Object_147.geometry}
            material={materials.Rock_04}
            position={[4.43, 0.08, 3.97]}
            scale={[0.372, 0.372, 0.197]}
          />
          <mesh
            
            
            geometry={nodes.Object_149.geometry}
            material={materials.Rock_03}
            position={[4.43, 0.08, 3.349]}
            scale={[0.372, 0.372, 0.405]}
          />
          <mesh
            
            
            geometry={nodes.Object_151.geometry}
            material={materials.Rock}
            position={[4.43, 0.08, 2.757]}
            scale={[0.372, 0.372, 0.162]}
          />
          <mesh
            
            
            geometry={nodes.Object_153.geometry}
            material={materials.material_0}
            position={[4.43, 0.08, 4.93]}
            scale={[0.372, 0.372, 0.197]}
          />
          <mesh
            
            
            geometry={nodes.Object_155.geometry}
            material={materials.Rock_03}
            position={[5.21, 1.973, 1.244]}
            rotation={[0, 0, -Math.PI / 2]}
          />
          <mesh
            
            
            geometry={nodes.Object_157.geometry}
            material={materials.Rock_04}
            position={[4.987, 1.558, -1.222]}
            scale={[0.268, 0.57, 0.268]}
          />
          <mesh
            
            
            geometry={nodes.Object_159.geometry}
            material={materials.Rock_04}
            position={[4.987, 1.558, 2.355]}
            scale={[0.268, 0.57, 0.268]}
          />
          <mesh
            
            
            geometry={nodes.Object_161.geometry}
            material={materials.Rock_03}
            position={[3.431, 1.578, 2.316]}
            rotation={[-Math.PI / 2, Math.PI / 2, 0]}
          />
          <mesh
            
            
            geometry={nodes.Object_163.geometry}
            material={materials.Rock_03}
            position={[0.302, 1.578, 4.49]}
            rotation={[-Math.PI / 2, Math.PI / 2, 0]}
          />
          <mesh
            
            
            geometry={nodes.Object_165.geometry}
            material={materials.Rock_04}
            position={[-4.687, 1.558, 4.555]}
            scale={[0.268, 0.57, 0.268]}
          />
          <mesh
            
            
            geometry={nodes.Object_167.geometry}
            material={materials.Rock_04}
            position={[-4.687, 1.558, 2.131]}
            scale={[0.268, 0.57, 0.268]}
          />
          <mesh
            
            
            geometry={nodes.Object_169.geometry}
            material={materials.Rock_03}
            position={[-4.479, 1.973, 4.513]}
            rotation={[0, 0, -Math.PI / 2]}
          />
          <mesh
            
            
            geometry={nodes.Object_171.geometry}
            material={materials.Rock_02}
            position={[5.069, 2.465, 2.28]}
            scale={0.159}
          />
          <mesh
            
            
            geometry={nodes.Object_173.geometry}
            material={materials.Rock_02}
            position={[5.069, 2.465, -1.298]}
            scale={0.159}
          />
          <mesh
            
            
            geometry={nodes.Object_175.geometry}
            material={materials.Rock_02}
            position={[-4.604, 2.465, 4.479]}
            scale={0.159}
          />
          <mesh
            
            
            geometry={nodes.Object_177.geometry}
            material={materials.Rock_02}
            position={[-4.604, 2.465, 2.047]}
            scale={0.159}
          />
          <mesh
            
            
            geometry={nodes.Object_179.geometry}
            material={materials.wood_colour}
            position={[2.324, 0.994, 4.385]}
            scale={0.303}
          />
          <mesh
            
            
            geometry={nodes.Object_181.geometry}
            material={materials.wood_colour}
            position={[2.324, 0.994, 2.469]}
            scale={0.303}
          />
          <mesh
            
            
            geometry={nodes.Object_183.geometry}
            material={materials.Rock_04}
            position={[2.707, 1.558, 2.355]}
            scale={[0.268, 0.57, 0.268]}
          />
          <mesh
            
            
            geometry={nodes.Object_185.geometry}
            material={materials.Rock_02}
            position={[2.789, 2.465, 2.28]}
            scale={0.159}
          />
          <mesh
            
            
            geometry={nodes.Object_193.geometry}
            material={materials.Rock_04}
            position={[1.758, 1.558, 4.558]}
            scale={[0.268, 0.57, 0.268]}
          />
          <mesh
            
            
            geometry={nodes.Object_195.geometry}
            material={materials.Rock_02}
            position={[1.839, 2.465, 4.483]}
            scale={0.159}
          />
          <mesh
            
            
            geometry={nodes.Object_197.geometry}
            material={materials.Rock_01}
            position={[0.676, 2.224, 4.509]}
            rotation={[0, -Math.PI / 2, 0]}
            scale={[0.167, 0.084, 0.167]}
          />
          <mesh
            
            
            geometry={nodes.Object_199.geometry}
            material={materials.Rock_01}
            position={[-4.619, 2.224, 3.247]}
            scale={[0.167, 0.084, 0.167]}
          />
          <mesh
            
            
            geometry={nodes.Object_201.geometry}
            material={materials.Rock_01}
            position={[3.995, 0.069, 5.238]}
            rotation={[-Math.PI, 0.085, -Math.PI]}
            scale={0.322}
          />
          <mesh
            
            
            geometry={nodes.Object_203.geometry}
            material={materials.Rock_01}
            position={[3.858, 0.076, 6.199]}
            rotation={[0, -0.085, 0]}
            scale={0.322}
          />
          <mesh
            
            
            geometry={nodes.Object_205.geometry}
            material={materials.Rock_01}
            position={[2.895, 0.308, 5.541]}
            rotation={[0, -1.494, 0]}
            scale={0.853}
          />
          <mesh
            
            
            geometry={nodes.Object_207.geometry}
            material={materials.Rock_01}
            position={[-5.103, 0.385, 5.451]}
            rotation={[0, 0.853, 0]}
            scale={0.853}
          />
          <mesh
            
            
            geometry={nodes.Object_209.geometry}
            material={materials.Rock_05}
            position={[-1.506, 2.964, 0.907]}
            rotation={[0, 1.318, Math.PI / 2]}
            scale={[0.143, 0.143, 0.129]}
          />
          <mesh
            
            
            geometry={nodes.Object_211.geometry}
            material={materials.Rock}
            position={[-1.582, 3.075, 0.502]}
            rotation={[-Math.PI, -0.079, -Math.PI]}
            scale={[0.129, 0.162, 0.252]}
          />
          <mesh
            
            
            geometry={nodes.Object_213.geometry}
            material={materials.Rock_02}
            position={[-3.005, 2.541, 1.808]}
            rotation={[-Math.PI, 1.548, -Math.PI]}
            scale={[0.149, 0.149, 0.303]}
          />
          <mesh
            
            
            geometry={nodes.Object_215.geometry}
            material={materials.Rock_02}
            position={[-1.58, 2.003, -1.597]}
            rotation={[0, 0.056, 0]}
            scale={[0.122, 0.122, 0.249]}
          />
          <mesh
            
            
            geometry={nodes.Object_217.geometry}
            material={materials.Rock_02}
            position={[-2.747, 2.249, 1.823]}
            rotation={[-3.093, -1.549, 0]}
            scale={[0.123, 0.148, 0.168]}
          />
          <mesh
            
            
            geometry={nodes.Object_219.geometry}
            material={materials.Rock}
            position={[-4.583, 1.834, -1.338]}
            rotation={[0, 0.023, 0]}
            scale={[0.149, 0.149, 0.303]}
          />
          <mesh
            
            
            geometry={nodes.Object_221.geometry}
            material={materials.Rock_02}
            position={[-4.597, 1.542, -1.08]}
            rotation={[-3.141, 0.022, -0.048]}
            scale={[0.123, 0.148, 0.168]}
          />
          <mesh
            
            
            geometry={nodes.Object_223.geometry}
            material={materials.Rock_02}
            position={[4.976, 2.003, -3.121]}
            rotation={[0, 0.056, 0]}
            scale={[0.122, 0.122, 0.249]}
          />
          <mesh
            
            
            geometry={nodes.Object_225.geometry}
            material={materials.Rock_02}
            position={[-1.58, 2.237, -1.882]}
            rotation={[0, 0.056, 0]}
            scale={[0.122, 0.122, 0.249]}
          />
          <mesh
            
            
            geometry={nodes.Object_227.geometry}
            material={materials.Rock_02}
            position={[4.976, 2.232, -2.816]}
            rotation={[0, 0.056, 0]}
            scale={[0.122, 0.122, 0.249]}
          />
          <mesh
            
            
            geometry={nodes.Object_229.geometry}
            material={materials.K_02}
            position={[-0.514, 1.004, -0.488]}
          />
          <mesh
            
            
            geometry={nodes.Object_231.geometry}
            material={materials.Rock}
            position={[3.786, 4.003, -1.766]}
            rotation={[-Math.PI, 1.548, -Math.PI]}
            scale={[0.149, 0.149, 0.303]}
          />
          <mesh
            
            
            geometry={nodes.Object_233.geometry}
            material={materials.Rock_02}
            position={[4.044, 3.71, -1.751]}
            rotation={[-3.093, -1.549, 0]}
            scale={[0.123, 0.148, 0.168]}
          />
          <mesh
            
            
            geometry={nodes.Object_235.geometry}
            material={materials.Rock_02}
            position={[4.857, 2.885, -1.718]}
            rotation={[-3.093, -1.549, 0]}
            scale={[0.123, 0.148, 0.168]}
          />
          <mesh
            
            
            geometry={nodes.Object_237.geometry}
            material={materials.Rock_03}
            position={[3.046, 5.337, -2.002]}
            rotation={[-Math.PI, -0.023, -Math.PI]}
            scale={[0.149, 0.149, 0.303]}
          />
          <mesh
            
            
            geometry={nodes.Object_239.geometry}
            material={materials.Rock_02}
            position={[3.208, 5.031, -1.849]}
            rotation={[-3.093, -1.549, 0]}
            scale={[0.123, 0.148, 0.168]}
          />
          <mesh
            
            
            geometry={nodes.Object_241.geometry}
            material={materials.Rock}
            position={[3.326, 1.509, -3.871]}
            rotation={[-Math.PI, 1.548, -Math.PI]}
            scale={[0.149, 0.149, 0.303]}
          />
          <mesh
            
            
            geometry={nodes.Object_243.geometry}
            material={materials.Rock_02}
            position={[3.584, 1.216, -3.856]}
            rotation={[-3.093, -1.549, 0]}
            scale={[0.123, 0.148, 0.168]}
          />
          <mesh
            
            
            geometry={nodes.Object_245.geometry}
            material={materials.Rock_02}
            position={[-3.131, 4.999, -4.321]}
            rotation={[0, Math.PI / 2, 0]}
            scale={[0.111, 0.111, 0.118]}
          />
          <mesh
            
            
            geometry={nodes.Object_247.geometry}
            material={materials.Rock}
            position={[-3.023, 5.218, -4.321]}
            rotation={[0, Math.PI / 2, 0]}
            scale={[0.111, 0.111, 0.118]}
          />
          <mesh
            
            
            geometry={nodes.Object_249.geometry}
            material={materials.Rock}
            position={[-2.385, 3.28, -4.315]}
            rotation={[-Math.PI, 1.548, -Math.PI]}
            scale={[0.149, 0.149, 0.303]}
          />
          <mesh
            
            
            geometry={nodes.Object_251.geometry}
            material={materials.Rock_02}
            position={[-2.126, 2.988, -4.301]}
            rotation={[-3.093, -1.549, 0]}
            scale={[0.123, 0.148, 0.168]}
          />
          <mesh
            
            
            geometry={nodes.Object_253.geometry}
            material={materials.Rock}
            position={[-0.143, 2.731, -4.572]}
            rotation={[0, Math.PI / 2, 0]}
            scale={[0.111, 0.111, 0.118]}
          />
          <mesh
            
            
            geometry={nodes.Object_255.geometry}
            material={materials.Rock_02}
            position={[-0.035, 2.95, -4.572]}
            rotation={[0, Math.PI / 2, 0]}
            scale={[0.111, 0.111, 0.118]}
          />
          <mesh
            
            
            geometry={nodes.Object_257.geometry}
            material={materials.Rock_02}
            position={[0.727, 1.287, -4.578]}
            rotation={[-Math.PI, 1.515, Math.PI]}
            scale={[0.122, 0.122, 0.249]}
          />
          <mesh
            
            
            geometry={nodes.Object_259.geometry}
            material={materials.Rock_02}
            position={[0.443, 1.521, -4.578]}
            rotation={[-Math.PI, 1.515, Math.PI]}
            scale={[0.122, 0.122, 0.249]}
          />
          <mesh
            
            
            geometry={nodes.Object_261.geometry}
            material={materials.Rock_02}
            position={[-4.528, 2.892, 1.762]}
            rotation={[-1.57, 0.022, -0.048]}
            scale={[0.123, 0.148, 0.168]}
          />
          <mesh
            
            
            geometry={nodes.Object_263.geometry}
            material={materials.Rock_02}
            position={[-4.535, 2.253, -4.316]}
            rotation={[1.594, 0, -Math.PI / 2]}
            scale={[0.149, 0.149, 0.303]}
          />
          <mesh
            
            
            geometry={nodes.Object_265.geometry}
            material={materials.Rock_05}
            position={[5.161, 1.561, 0.907]}
            rotation={[0, 1.318, Math.PI / 2]}
            scale={[0.143, 0.143, 0.129]}
          />
          <mesh
            
            
            geometry={nodes.Object_267.geometry}
            material={materials.Rock_02}
            position={[5.158, 1.672, 0.531]}
            rotation={[-Math.PI, -0.079, -Math.PI]}
            scale={[0.129, 0.162, 0.252]}
          />
          <mesh
            
            
            geometry={nodes.Object_269.geometry}
            material={materials.Rock}
            position={[3.687, 1.622, 2.35]}
            rotation={[0, -1.548, 0]}
            scale={[0.149, 0.149, 0.303]}
          />
          <mesh
            
            
            geometry={nodes.Object_271.geometry}
            material={materials.Rock_02}
            position={[3.994, 1.316, 2.363]}
            rotation={[-3.093, -1.549, 0]}
            scale={[0.123, 0.148, 0.168]}
          />
          <mesh
            
            
            geometry={nodes.Object_273.geometry}
            material={materials.Rock_05}
            position={[-2.82, 1.461, 4.562]}
            rotation={[-Math.PI, -0.165, -Math.PI / 2]}
            scale={[0.143, 0.143, 0.129]}
          />
          <mesh
            
            
            geometry={nodes.Object_275.geometry}
            material={materials.Rock}
            position={[-3.012, 1.709, 4.583]}
            rotation={[0, -1.492, 0]}
            scale={[0.129, 0.162, 0.252]}
          />
          <mesh
            
            
            geometry={nodes.Object_277.geometry}
            material={materials.Rock}
            position={[0.93, 1.228, 4.583]}
            rotation={[0, -1.492, 0]}
            scale={[0.129, 0.162, 0.252]}
          />
          <mesh
            
            
            geometry={nodes.Object_279.geometry}
            material={materials.Rock_02}
            position={[0.659, 1.477, 4.588]}
            rotation={[-Math.PI, 1.515, -Math.PI]}
            scale={[0.122, 0.122, 0.249]}
          />
          <mesh
            
            
            geometry={nodes.Object_281.geometry}
            material={materials.Rock_02}
            position={[-4.649, 1.424, 3.322]}
            rotation={[-Math.PI, 0, -Math.PI]}
            scale={[0.111, 0.111, 0.118]}
          />
          <mesh
            
            
            geometry={nodes.Object_283.geometry}
            material={materials.Rock}
            position={[-4.649, 1.643, 3.214]}
            rotation={[-Math.PI, 0, -Math.PI]}
            scale={[0.111, 0.111, 0.118]}
          />
          <mesh
            
            
            geometry={nodes.Object_285.geometry}
            material={materials.Rock_05}
            position={[-1.013, 1.461, 4.426]}
            rotation={[-Math.PI, -0.165, -Math.PI / 2]}
            scale={[0.143, 0.143, 0.129]}
          />
          <mesh
            
            
            geometry={nodes.Object_287.geometry}
            material={materials.K_03}
            position={[-1.206, 1.709, 4.447]}
            rotation={[0, -1.492, 0]}
            scale={[0.129, 0.162, 0.252]}
          />
          <mesh
            
            
            geometry={nodes.Object_289.geometry}
            material={materials.Rock_01}
            position={[5.051, 1.628, 0.355]}
            rotation={[-Math.PI, -0.023, -Math.PI]}
            scale={[0.149, 0.149, 0.303]}
          />
          <mesh
            
            
            geometry={nodes.Object_291.geometry}
            material={materials.Rock}
            position={[5.045, 1.336, 0.097]}
            rotation={[-0.001, -0.022, 3.093]}
            scale={[0.123, 0.148, 0.168]}
          />
          <mesh
            
            
            geometry={nodes.Object_293.geometry}
            material={materials.Rock}
            position={[-4.506, 1.424, 3.322]}
            rotation={[-Math.PI, 0, -Math.PI]}
            scale={[0.111, 0.111, 0.118]}
          />
          <mesh
            
            
            geometry={nodes.Object_295.geometry}
            material={materials.Rock_04}
            position={[-4.506, 1.643, 3.214]}
            rotation={[-Math.PI, 0, -Math.PI]}
            scale={[0.111, 0.111, 0.118]}
          />
          <mesh
            
            
            geometry={nodes.Object_297.geometry}
            material={materials.Rock_03}
            position={[0.588, 2.632, -2.681]}
          />
          <mesh
            
            
            geometry={nodes.Object_299.geometry}
            material={materials.Rock_05}
            position={[-0.423, 0.521, -4.816]}
            rotation={[Math.PI, 0.253, -Math.PI / 2]}
            scale={[0.143, 0.143, 0.129]}
          />
          <mesh
            
            
            geometry={nodes.Object_301.geometry}
            material={materials.Rock}
            position={[-0.8, 0.632, -4.813]}
            rotation={[0, -1.492, 0]}
            scale={[0.129, 0.162, 0.252]}
          />
          <mesh
            
            
            geometry={nodes.Object_303.geometry}
            material={materials.Rock_05}
            position={[-4.867, 0.348, 0.081]}
            rotation={[0, -1.405, 1.571]}
            scale={[0.143, 0.143, 0.129]}
          />
          <mesh
            
            
            geometry={nodes.Object_305.geometry}
            material={materials.Rock}
            position={[-4.846, 0.595, 0.273]}
            rotation={[0, 0.079, 0]}
            scale={[0.129, 0.162, 0.252]}
          />
          <mesh
            
            
            geometry={nodes.Object_307.geometry}
            material={materials.Rock_02}
            position={[5.185, 0.461, 2.411]}
            rotation={[-1.57, 0.022, -0.048]}
            scale={[0.123, 0.148, 0.168]}
          />
          <mesh
            
            
            geometry={nodes.Object_309.geometry}
            material={materials.Rock}
            position={[-4.781, 0.632, -4.755]}
            rotation={[0, -1.492, 0]}
            scale={[0.129, 0.162, 0.252]}
          />
          <mesh
            
            
            geometry={nodes.Object_311.geometry}
            material={materials.Rock}
            position={[-1.913, 0.426, 4.857]}
            rotation={[0, 1.571, 0]}
            scale={[0.095, 0.095, 0.194]}
          />
          <mesh
            
            
            geometry={nodes.Object_313.geometry}
            material={materials.Rock_05}
            position={[-1.797, 0.612, 4.779]}
            rotation={[0, 1.488, 0]}
            scale={[0.095, 0.095, 0.138]}
          />
          <mesh
            
            
            geometry={nodes.Object_315.geometry}
            material={materials.Rock_02}
            position={[5.229, 0.426, -1.673]}
            scale={[0.095, 0.095, 0.194]}
          />
          <mesh
            
            
            geometry={nodes.Object_317.geometry}
            material={materials.Rock}
            position={[5.244, 0.612, -1.557]}
            rotation={[0, -0.082, 0]}
            scale={[0.095, 0.095, 0.138]}
          />
          <mesh
            
            
            geometry={nodes.Object_319.geometry}
            material={materials.Rock_03}
            position={[-4.804, 0.819, 4.738]}
            rotation={[0, 1.488, 0]}
            scale={[0.095, 0.095, 0.138]}
          />
          <mesh
            
            
            geometry={nodes.Object_321.geometry}
            material={materials.Rock_03}
            position={[5.199, 0.292, -4.81]}
            rotation={[0, -0.082, 0]}
            scale={[0.095, 0.095, 0.138]}
          />
          <mesh
            
            
            geometry={nodes.Object_323.geometry}
            material={materials.Roof_carrot}
            position={[-2.175, 6.235, 1.939]}
            rotation={[Math.PI / 2, 0.979, -Math.PI / 2]}
            scale={0.124}
          />
          <mesh
            
            
            geometry={nodes.Object_325.geometry}
            material={materials.Roof_carrot}
            position={[-2.595, 6.687, 1.732]}
            rotation={[Math.PI / 2, 0.942, -Math.PI / 2]}
            scale={0.124}
          />
          <mesh
            
            
            geometry={nodes.Object_327.geometry}
            material={materials.Roof_carrot}
            position={[-2.632, 6.635, 1.559]}
            rotation={[Math.PI / 2, 0.942, -Math.PI / 2]}
            scale={0.124}
          />
          <mesh
            
            
            geometry={nodes.Object_329.geometry}
            material={materials.Roof_carrot}
            position={[-2.267, 6.335, 1.944]}
            rotation={[Math.PI / 2, 0.979, -Math.PI / 2]}
            scale={0.124}
          />
          <mesh
            
            
            geometry={nodes.Object_331.geometry}
            material={materials.Roof_carrot}
            position={[-2.403, 6.466, 1.944]}
            rotation={[Math.PI / 2, 0.979, -Math.PI / 2]}
            scale={0.124}
          />
          <mesh
            
            
            geometry={nodes.Object_333.geometry}
            material={materials.Roof_carrot}
            position={[-1.992, 6.046, 1.939]}
            rotation={[Math.PI / 2, 0.979, -Math.PI / 2]}
            scale={0.124}
          />
          <mesh
            
            
            geometry={nodes.Object_335.geometry}
            material={materials.Roof_carrot}
            position={[-1.784, 5.836, 1.939]}
            rotation={[Math.PI / 2, 0.991, -Math.PI / 2]}
            scale={0.124}
          />
          <mesh
            
            
            geometry={nodes.Object_337.geometry}
            material={materials.Roof_carrot}
            position={[-2.035, 6.15, 0.015]}
            rotation={[Math.PI / 2, 0.942, -Math.PI / 2]}
            scale={0.124}
          />
          <mesh
            
            
            geometry={nodes.Object_339.geometry}
            material={materials.Roof_carrot}
            position={[-2.316, 5.767, -2.773]}
            rotation={[Math.PI / 2, 1.043, -Math.PI / 2]}
            scale={0.124}
          />
          <mesh
            
            
            geometry={nodes.Object_341.geometry}
            material={materials.Roof_carrot}
            position={[-2.028, 5.463, -2.093]}
            rotation={[Math.PI / 2, 0.991, -Math.PI / 2]}
            scale={0.124}
          />
          <mesh
            
            
            geometry={nodes.Object_370.geometry}
            material={materials.wood_colour}
            position={[1.323, 0.588, -7.193]}
            scale={0.22}
          />
          <mesh
            
            
            geometry={nodes.Object_372.geometry}
            material={materials.Pine_green}
            position={[1.323, 1.277, -7.193]}
            rotation={[0, 1.43, 0]}
            scale={0.733}
          />
          <mesh
            
            
            geometry={nodes.Object_386.geometry}
            material={materials.wood_colour}
            position={[16.399, 0.59, -11.511]}
            rotation={[0, -0.738, 0]}
            scale={0.219}
          />
          <mesh
            
            
            geometry={nodes.Object_388.geometry}
            material={materials.Pine_green}
            position={[16.399, 0.969, -11.511]}
            rotation={[0, 0.824, 0]}
            scale={0.729}
          />
          <mesh
            
            
            geometry={nodes.Object_390.geometry}
            material={materials.Pine_green}
            position={[16.399, 1.769, -11.511]}
            rotation={[0, 0.824, 0]}
            scale={0.729}
          />
          <mesh
            
            
            geometry={nodes.Object_392.geometry}
            material={materials.Pine_green}
            position={[16.399, 2.636, -11.511]}
            rotation={[0, 0.824, 0]}
            scale={0.729}
          />
          <mesh
            
            
            geometry={nodes.Object_394.geometry}
            material={materials.Pine_green}
            position={[16.399, 3.676, -11.511]}
            rotation={[0, 0.824, 0]}
            scale={0.729}
          />
          <mesh
            
            
            geometry={nodes.Object_396.geometry}
            material={materials.Rock_01}
            position={[9.947, 0.385, -7.118]}
            rotation={[0, -0.214, 0]}
            scale={0.853}
          />
          <mesh
            
            
            geometry={nodes.Object_404.geometry}
            material={materials.Rock_01}
            position={[8.966, 0.308, -7.396]}
            rotation={[-Math.PI, 0.109, -Math.PI]}
            scale={0.435}
          />
          <mesh
            
            
            geometry={nodes.Object_412.geometry}
            material={materials.Gmb_zld}
            position={[10.026, 3.366, 9.997]}
            scale={0.149}
          />
          <mesh
            
            
            geometry={nodes.Object_414.geometry}
            material={materials.Gmb_lils}
            position={[9.418, 2.641, 11.819]}
            scale={0.149}
          />
          <mesh
            
            
            geometry={nodes.Object_416.geometry}
            material={materials.Gmb_srga}
            position={[8.254, 3.719, 11.822]}
            scale={0.149}
          />
          <mesh
            
            
            geometry={nodes.Object_418.geometry}
            material={materials.Gmb_kk}
            position={[7.261, 1.43, 13.037]}
            scale={0.149}
          />
          <mesh
            
            
            geometry={nodes.Object_420.geometry}
            material={materials.Gmb_srga}
            position={[10.486, 1.176, 9.804]}
            scale={0.149}
          />
          <mesh
            
            
            geometry={nodes.Object_422.geometry}
            material={materials.Gmb_zld}
            position={[5.596, 1.354, 9.453]}
            scale={0.149}
          />
          <mesh
            
            
            geometry={nodes.Object_424.geometry}
            material={materials.Gmb_kk}
            position={[8.428, 1.372, 8.045]}
            scale={0.149}
          />
          <mesh
            
            
            geometry={nodes.Object_426.geometry}
            material={materials.Gmb_piros}
            position={[6.931, 2.721, 11.265]}
            scale={0.149}
          />
          <mesh
            
            
            geometry={nodes.Object_428.geometry}
            material={materials.Gmb_lils}
            position={[6.417, 2.521, 9.07]}
            scale={0.149}
          />
          <mesh
            
            
            geometry={nodes.Object_430.geometry}
            material={materials.Gmb_piros}
            position={[8.461, 2.183, 8.021]}
            scale={0.149}
          />
          <mesh
            
            
            geometry={nodes.Object_432.geometry}
            material={materials.Gmb_zld}
            position={[6.124, 3.583, 10.242]}
            scale={0.149}
          />
          <mesh
            
            
            geometry={nodes.Object_434.geometry}
            material={materials.Gmb_srga}
            position={[9.041, 4.625, 8.429]}
            scale={0.149}
          />
          <mesh
            
            
            geometry={nodes.Object_436.geometry}
            material={materials.Gmb_kk}
            position={[9.716, 4.582, 9.748]}
            scale={0.149}
          />
          <mesh
            
            
            geometry={nodes.Object_438.geometry}
            material={materials.Gmb_piros}
            position={[9.186, 4.378, 11.631]}
            scale={0.149}
          />
          <mesh
            
            
            geometry={nodes.Object_440.geometry}
            material={materials.Gmb_lils}
            position={[7.73, 4.745, 12.156]}
            scale={0.149}
          />
          <mesh
            
            
            geometry={nodes.Object_442.geometry}
            material={materials.Gmb_kk}
            position={[6.303, 4.627, 9.793]}
            scale={0.149}
          />
          <mesh
            
            
            geometry={nodes.Object_444.geometry}
            material={materials.Rock_01}
            position={[-4.352, 0.308, -11.172]}
            rotation={[-2.719, 0, -Math.PI / 2]}
            scale={0.853}
          />
          <mesh
            
            
            geometry={nodes.Object_446.geometry}
            material={materials.Rock_01}
            position={[-5.103, 0.385, -11.691]}
            rotation={[-1.017, -0.484, 0.926]}
            scale={0.853}
          />
          <mesh
            
            
            geometry={nodes.Object_448.geometry}
            material={materials.Snow}
            position={[7.545, 1.042, -7.828]}
            rotation={[0, 0.795, 0]}
            scale={0.526}
          />
          <mesh
            
            
            geometry={nodes.Object_450.geometry}
            material={materials.Snow}
            position={[9.785, 5.44, -9.003]}
            rotation={[0, 0.795, 0]}
            scale={0.733}
          />
          <mesh
            
            
            geometry={nodes.Object_452.geometry}
            material={materials.Snow}
            position={[-2.42, 6.53, 0.865]}
          />
          <mesh
            
            
            geometry={nodes.Object_454.geometry}
            material={materials.Roof_carrot}
            position={[-1.48, 5.567, 0.928]}
            rotation={[Math.PI / 2, 0.942, -Math.PI / 2]}
            scale={0.124}
          />
          <mesh
            
            
            geometry={nodes.Object_456.geometry}
            material={materials.Roof_carrot}
            position={[-2.723, 6.74, 2.035]}
            rotation={[Math.PI / 2, 0.979, -Math.PI / 2]}
            scale={0.124}
          />
          <mesh
            
            
            geometry={nodes.Object_458.geometry}
            material={materials.Snow}
            position={[-3.732, 6.53, 0.671]}
            rotation={[-Math.PI, 0, -Math.PI]}
          />
          <mesh
            
            
            geometry={nodes.Object_460.geometry}
            material={materials.Roof_carrot}
            position={[-1.48, 5.563, 1.203]}
            rotation={[Math.PI / 2, 0.942, -Math.PI / 2]}
            scale={0.124}
          />
          <mesh
            
            
            geometry={nodes.Object_462.geometry}
            material={materials.material}
            position={[-1.366, 5.278, 0.92]}
            rotation={[0, Math.PI / 2, 0]}
            scale={0.022}
          />
          <mesh
            
            
            geometry={nodes.Object_464.geometry}
            material={materials.material}
            position={[-1.477, 4.817, -1.871]}
            rotation={[0, Math.PI / 2, 0]}
            scale={0.022}
          />
          <mesh
            
            
            geometry={nodes.Object_466.geometry}
            material={materials.material}
            position={[4.87, 6.096, -2.323]}
            rotation={[0, Math.PI / 2, 0]}
            scale={0.022}
          />
          <mesh
            
            
            geometry={nodes.Object_468.geometry}
            material={materials.material}
            position={[-4.659, 5.317, 1.905]}
            rotation={[0, -Math.PI / 2, 0]}
            scale={0.022}
          />
          <mesh
            
            
            geometry={nodes.Object_470.geometry}
            material={materials.material}
            position={[-3.085, 6.586, 2.474]}
            rotation={[0, -Math.PI / 2, 0]}
            scale={0.022}
          />
          <mesh
            
            
            geometry={nodes.Object_472.geometry}
            material={materials.material}
            position={[-4.638, 4.755, -3.924]}
            rotation={[0, -Math.PI / 2, 0]}
            scale={0.022}
          />
          <mesh
            
            
            geometry={nodes.Object_474.geometry}
            material={materials.material}
            position={[-1.477, 4.817, -4.537]}
            rotation={[0, Math.PI / 2, 0]}
            scale={0.022}
          />
          <mesh
            
            
            geometry={nodes.Object_476.geometry}
            material={materials.material}
            position={[0.105, 3.118, -4.705]}
            rotation={[-Math.PI, 0, -Math.PI]}
            scale={0.022}
          />
          <mesh
            
            
            geometry={nodes.Object_478.geometry}
            material={materials.material}
            position={[2.809, 5.976, -1.7]}
            rotation={[0, -Math.PI / 2, 0]}
            scale={0.022}
          />
          <mesh
            
            
            geometry={nodes.Object_480.geometry}
            material={materials.material}
            position={[2.788, 6.121, -1.814]}
            rotation={[0, Math.PI / 2, 0]}
            scale={0.022}
          />
          <mesh
            
            
            geometry={nodes.Object_482.geometry}
            material={materials.material}
            position={[2.807, 6.049, -3.73]}
            rotation={[0, Math.PI / 2, 0]}
            scale={0.022}
          />
          <mesh
            
            
            geometry={nodes.Object_484.geometry}
            material={materials.material}
            position={[2.876, 6.088, -1.653]}
            rotation={[0, Math.PI / 2, 0]}
            scale={0.022}
          />
          <mesh
            
            
            geometry={nodes.Object_486.geometry}
            material={materials.material}
            position={[2.764, 6.095, -3.624]}
            rotation={[0, Math.PI / 2, 0]}
            scale={0.022}
          />
          <mesh
            
            
            geometry={nodes.Object_488.geometry}
            material={materials.material}
            position={[0.99, 3.071, -1.979]}
            scale={0.022}
          />
          <mesh
            
            
            geometry={nodes.Object_490.geometry}
            material={materials.material}
            position={[-3.036, 6.156, -4.56]}
            rotation={[0, -Math.PI / 2, 0]}
            scale={0.022}
          />
          <mesh
            
            
            geometry={nodes.Object_492.geometry}
            material={materials.material}
            position={[-3.151, 6.198, -4.589]}
            rotation={[0, Math.PI / 2, 0]}
            scale={0.022}
          />
          <mesh
            
            
            geometry={nodes.Object_494.geometry}
            material={materials.material}
            position={[-2.924, 6.129, -4.589]}
            rotation={[0, Math.PI / 2, 0]}
            scale={0.03}
          />
          <mesh
            
            
            geometry={nodes.Object_496.geometry}
            material={materials.material}
            position={[-2.919, 6.779, 2.471]}
            rotation={[0, -1.571, 0]}
            scale={0.022}
          />
          <mesh
            
            
            geometry={nodes.Object_498.geometry}
            material={materials.material}
            position={[-3.196, 6.727, 2.46]}
            rotation={[0, -1.571, 0]}
            scale={0.03}
          />
          <mesh
            
            
            geometry={nodes.Object_500.geometry}
            material={materials.Snow}
            position={[7.919, 3.053, -9.431]}
            scale={0.22}
          />
          <mesh
            
            
            geometry={nodes.Object_502.geometry}
            material={materials.material}
            position={[2.659, 2.937, 3.41]}
            rotation={[0, Math.PI / 2, 0]}
            scale={0.022}
          />
          <mesh
            
            
            geometry={nodes.Object_504.geometry}
            material={materials.material}
            position={[2.321, 3.112, 2.12]}
            rotation={[0, -Math.PI / 2, 0]}
            scale={0.022}
          />
          <mesh
            
            
            geometry={nodes.Object_506.geometry}
            material={materials.material}
            position={[2.279, 3.22, 2.006]}
            rotation={[0, Math.PI / 2, 0]}
            scale={0.022}
          />
          <mesh
            
            
            geometry={nodes.Object_508.geometry}
            material={materials.material}
            position={[2.386, 3.218, 2.167]}
            rotation={[0, Math.PI / 2, 0]}
            scale={0.022}
          />
          <mesh
            
            
            geometry={nodes.Object_510.geometry}
            material={materials.Snow}
            position={[18.241, 2.365, -10.005]}
            rotation={[0, 0.795, 0]}
            scale={0.3}
          />
          <mesh
            
            
            geometry={nodes.Object_512.geometry}
            material={materials.Snow}
            position={[16.392, 3.856, -11.51]}
            rotation={[0, 0.824, 0]}
            scale={0.69}
          />
          <mesh
            
            
            geometry={nodes.Object_514.geometry}
            material={materials.Snow}
            position={[16.399, 2.882, -11.511]}
            rotation={[0, 0.824, 0]}
            scale={0.787}
          />
          <mesh
            
            
            geometry={nodes.Object_516.geometry}
            material={materials.Snow}
            position={[16.399, 1.946, -11.511]}
            rotation={[0, 0.824, 0]}
            scale={[0.911, 0.787, 0.911]}
          />
          <mesh
            
            
            geometry={nodes.Object_518.geometry}
            material={materials.Snow}
            position={[16.399, 1.163, -11.511]}
            rotation={[0, 0.824, 0]}
            scale={[1.008, 0.787, 1.008]}
          />
          <mesh
            
            
            geometry={nodes.Object_520.geometry}
            material={materials.wood_colour}
            position={[-0.464, 0.646, 10.655]}
            rotation={[-Math.PI, -0.975, -Math.PI]}
            scale={0.282}
          />
          <mesh
            
            
            geometry={nodes.Object_522.geometry}
            material={materials.Pine_green}
            position={[-0.464, 1.135, 10.655]}
            rotation={[0, -0.605, 0]}
            scale={0.942}
          />
          <mesh
            
            
            geometry={nodes.Object_524.geometry}
            material={materials.Pine_green}
            position={[-0.464, 2.168, 10.655]}
            rotation={[0, -0.605, 0]}
            scale={0.942}
          />
          <mesh
            
            
            geometry={nodes.Object_526.geometry}
            material={materials.Pine_green}
            position={[-0.464, 3.289, 10.655]}
            rotation={[0, -0.605, 0]}
            scale={0.942}
          />
          <mesh
            
            
            geometry={nodes.Object_528.geometry}
            material={materials.Pine_green}
            position={[-0.464, 4.631, 10.655]}
            rotation={[0, -0.605, 0]}
            scale={0.942}
          />
          <mesh
            
            
            geometry={nodes.Object_530.geometry}
            material={materials.Snow}
            position={[-0.467, 4.863, 10.646]}
            rotation={[0, -0.605, 0]}
            scale={0.891}
          />
          <mesh
            
            
            geometry={nodes.Object_532.geometry}
            material={materials.Snow}
            position={[-0.464, 3.605, 10.655]}
            rotation={[0, -0.605, 0]}
            scale={1.016}
          />
          <mesh
            
            
            geometry={nodes.Object_534.geometry}
            material={materials.Snow}
            position={[-0.464, 2.397, 10.655]}
            rotation={[0, -0.605, 0]}
            scale={[1.176, 1.016, 1.176]}
          />
          <mesh
            
            
            geometry={nodes.Object_536.geometry}
            material={materials.Snow}
            position={[-0.464, 1.385, 10.655]}
            rotation={[0, -0.605, 0]}
            scale={[1.302, 1.016, 1.302]}
          />
          <mesh
            
            
            geometry={nodes.Object_542.geometry}
            material={materials.Snow}
            position={[1.334, 4.438, -7.235]}
            rotation={[0, 1.43, 0]}
            scale={[0.762, 0.733, 0.762]}
          />
          <mesh
            
            
            geometry={nodes.Object_547.geometry}
            material={materials.Snow}
            position={[-5.235, 2.86, 7.046]}
            rotation={[0, -0.662, 0]}
            scale={0.22}
          />
          <mesh
            
            
            geometry={nodes.Object_552.geometry}
            material={materials.Snow}
            position={[-3.707, 2.986, 3.145]}
            rotation={[-Math.PI, 0.783, -Math.PI]}
            scale={0.3}
          />
          <mesh
            
            
            geometry={nodes.Object_554.geometry}
            material={materials.Snow}
            position={[-6.273, 2.14, 8.283]}
            rotation={[0, 0.795, 0]}
            scale={[0.551, 0.526, 0.551]}
          />
          <mesh
            
            
            geometry={nodes.Object_556.geometry}
            material={materials.Snow}
            position={[-3.732, 5.894, -2.368]}
            rotation={[-Math.PI, 0, -3.137]}
          />
          <mesh
            
            
            geometry={nodes.Object_558.geometry}
            material={materials.Roof_carrot}
            position={[-3.999, 6.235, -0.095]}
            rotation={[Math.PI / 2, -0.979, Math.PI / 2]}
            scale={0.124}
          />
          <mesh
            
            
            geometry={nodes.Object_560.geometry}
            material={materials.Roof_carrot}
            position={[-3.908, 6.335, -0.099]}
            rotation={[Math.PI / 2, -0.979, Math.PI / 2]}
            scale={0.124}
          />
          <mesh
            
            
            geometry={nodes.Object_562.geometry}
            material={materials.Roof_carrot}
            position={[-4.182, 6.046, -0.095]}
            rotation={[Math.PI / 2, -0.979, Math.PI / 2]}
            scale={0.124}
          />
          <mesh
            
            
            geometry={nodes.Object_564.geometry}
            material={materials.Roof_carrot}
            position={[-4.39, 5.836, -0.095]}
            rotation={[Math.PI / 2, -0.991, Math.PI / 2]}
            scale={0.124}
          />
          <mesh
            
            
            geometry={nodes.Object_566.geometry}
            material={materials.Snow}
            position={[-2.373, 5.936, -2.85]}
            rotation={[0, 0, 0.004]}
          />
          <mesh
            
            
            geometry={nodes.Object_568.geometry}
            material={materials.Snow}
            position={[0.651, 4.41, -3.33]}
            rotation={[0, Math.PI / 2, 0]}
            scale={[1, 1, 1.044]}
          />
          <mesh
            
            
            geometry={nodes.Object_570.geometry}
            material={materials.Snow}
            position={[3.881, 6.655, -2.684]}
            rotation={[-0.066, 0.738, -0.931]}
            scale={0.115}
          />
          <mesh
            
            
            geometry={nodes.Object_572.geometry}
            material={materials.Snow}
            position={[2.315, 3.461, 3.406]}
            rotation={[3.062, 0, Math.PI]}
            scale={[0.57, 0.57, 0.595]}
          />
          <mesh
            
            
            geometry={nodes.Object_574.geometry}
            material={materials.Snow}
            position={[15.402, 0.372, 1.664]}
          />
          <mesh
            
            
            geometry={nodes.Object_576.geometry}
            material={materials.material_0}
            position={[6.407, 0.422, 6.145]}
          />
          <mesh
            
            
            geometry={nodes.Object_578.geometry}
            material={materials.material_0}
            position={[11.521, -0.029, 4.785]}
            scale={0.746}
          />
          <mesh
            
            
            geometry={nodes.Object_580.geometry}
            material={materials.material_0}
            position={[16.864, 0.63, 6.944]}
            scale={0.746}
          />
          <mesh
            
            
            geometry={nodes.Object_588.geometry}
            material={materials.Roof_carrot}
            position={[-2.574, 6.109, -3.869]}
            rotation={[Math.PI / 2, 0.942, -Math.PI / 2]}
            scale={0.124}
          />
          <mesh
            
            
            geometry={nodes.Object_590.geometry}
            material={materials.Snow}
            position={[9.947, 0.286, -7.118]}
            rotation={[0, -0.214, 0]}
            scale={[0.917, 0.808, 0.917]}
          />
          <mesh
            
            
            geometry={nodes.Object_592.geometry}
            material={materials.Roof_carrot}
            position={[-2.001, 5.567, -2.784]}
            rotation={[Math.PI / 2, 0.942, -Math.PI / 2]}
            scale={0.124}
          />
          <mesh
            
            
            geometry={nodes.Object_594.geometry}
            material={materials.Roof_carrot}
            position={[-2.856, 6.352, -1.059]}
            rotation={[Math.PI / 2, 0.979, -Math.PI / 2]}
            scale={0.124}
          />
          <mesh
            
            
            geometry={nodes.Object_596.geometry}
            material={materials.Roof_carrot}
            position={[-2.59, 6.168, -0.675]}
            rotation={[Math.PI / 2, 0.979, -Math.PI / 2]}
            scale={0.124}
          />
          <mesh
            
            
            geometry={nodes.Object_598.geometry}
            material={materials.Roof_carrot}
            position={[-2.802, 6.361, -0.685]}
            rotation={[Math.PI / 2, 0.979, -Math.PI / 2]}
            scale={0.124}
          />
          <mesh
            
            
            geometry={nodes.Object_600.geometry}
            material={materials.Roof_carrot}
            position={[-2.643, 6.158, -1.049]}
            rotation={[Math.PI / 2, 0.979, -Math.PI / 2]}
            scale={0.124}
          />
          <mesh
            
            
            geometry={nodes.Object_602.geometry}
            material={materials.Roof_carrot}
            position={[-3.398, 6.168, -1.002]}
            rotation={[Math.PI / 2, -0.979, Math.PI / 2]}
            scale={0.124}
          />
          <mesh
            
            
            geometry={nodes.Object_604.geometry}
            material={materials.Roof_carrot}
            position={[-3.306, 6.268, -0.826]}
            rotation={[Math.PI / 2, -0.979, Math.PI / 2]}
            scale={0.124}
          />
          <mesh
            
            
            geometry={nodes.Object_606.geometry}
            material={materials.Roof_carrot}
            position={[-3.58, 5.98, -0.666]}
            rotation={[Math.PI / 2, -0.979, Math.PI / 2]}
            scale={0.124}
          />
          <mesh
            
            
            geometry={nodes.Object_608.geometry}
            material={materials.Roof_carrot}
            position={[-3.789, 5.769, -0.889]}
            rotation={[Math.PI / 2, -0.991, Math.PI / 2]}
            scale={0.124}
          />
          <mesh
            
            
            geometry={nodes.Object_610.geometry}
            material={materials.Roof_carrot}
            position={[-3.906, 5.687, -3.815]}
            rotation={[Math.PI / 2, -0.979, Math.PI / 2]}
            scale={0.124}
          />
          <mesh
            
            
            geometry={nodes.Object_612.geometry}
            material={materials.Roof_carrot}
            position={[-3.588, 6.616, 1.756]}
            rotation={[Math.PI / 2, -0.979, Math.PI / 2]}
            scale={0.124}
          />
          <mesh
            
            
            geometry={nodes.Object_614.geometry}
            material={materials.Roof_carrot}
            position={[1.138, 4.002, -2.626]}
            rotation={[0.592, 0, 0]}
            scale={0.124}
          />
          <mesh
            
            
            geometry={nodes.Object_616.geometry}
            material={materials.Roof_carrot}
            position={[1.425, 4.058, -2.652]}
            rotation={[0.592, 0, 0]}
            scale={0.124}
          />
          <mesh
            
            
            geometry={nodes.Object_618.geometry}
            material={materials.Roof_carrot}
            position={[0.937, 3.906, -2.564]}
            rotation={[0.592, 0, 0]}
            scale={0.124}
          />
          <mesh
            
            
            geometry={nodes.Object_620.geometry}
            material={materials.Roof_carrot}
            position={[1.145, 3.751, -2.407]}
            rotation={[0.58, 0, 0]}
            scale={0.124}
          />
          <mesh
            
            
            geometry={nodes.Object_622.geometry}
            material={materials.Roof_carrot}
            position={[2.397, 4.65, -3.126]}
            rotation={[0.725, -0.007, 0.077]}
            scale={0.124}
          />
          <mesh
            
            
            geometry={nodes.Object_624.geometry}
            material={materials.Roof_carrot}
            position={[2.018, 4.627, -3.15]}
            rotation={[0.725, -0.007, 0.077]}
            scale={0.124}
          />
          <mesh
            
            
            geometry={nodes.Object_626.geometry}
            material={materials.Roof_carrot}
            position={[0.279, 3.954, -4.07]}
            rotation={[2.549, 0, Math.PI]}
            scale={0.124}
          />
          <mesh
            
            
            geometry={nodes.Object_628.geometry}
            material={materials.Roof_carrot}
            position={[0.371, 4.08, -3.911]}
            rotation={[2.549, 0, Math.PI]}
            scale={0.124}
          />
          <mesh
            
            
            geometry={nodes.Object_630.geometry}
            material={materials.Roof_carrot}
            position={[0.096, 4.073, -3.94]}
            rotation={[2.549, 0, Math.PI]}
            scale={0.124}
          />
          <mesh
            
            
            geometry={nodes.Object_632.geometry}
            material={materials.Roof_carrot}
            position={[-0.033, 3.837, -4.18]}
            rotation={[2.562, 0, Math.PI]}
            scale={0.124}
          />
          <mesh
            
            
            geometry={nodes.Object_634.geometry}
            material={materials.Roof_carrot}
            position={[1.352, 3.298, -2.031]}
            rotation={[0.58, 0, 0]}
            scale={0.124}
          />
          <mesh
            
            
            geometry={nodes.Object_636.geometry}
            material={materials.Roof_carrot}
            position={[1.08, 3.321, -2.016]}
            rotation={[0.58, 0, 0]}
            scale={0.124}
          />
          <mesh
            
            
            geometry={nodes.Object_638.geometry}
            material={materials.Roof_carrot}
            position={[2.447, 3.298, -2.031]}
            rotation={[0.58, 0, 0]}
            scale={0.124}
          />
          <mesh
            
            
            geometry={nodes.Object_640.geometry}
            material={materials.Roof_carrot}
            position={[2.342, 3.379, -2.111]}
            rotation={[0.58, 0, 0]}
            scale={0.124}
          />
          <mesh
            
            
            geometry={nodes.Object_642.geometry}
            material={materials.Roof_carrot}
            position={[2.342, 3.454, -2.195]}
            rotation={[0.58, 0, 0]}
            scale={0.124}
          />
          <mesh
            
            
            geometry={nodes.Object_644.geometry}
            material={materials.Roof_carrot}
            position={[0.279, 3.446, -4.514]}
            rotation={[2.549, 0, Math.PI]}
            scale={0.124}
          />
          <mesh
            
            
            geometry={nodes.Object_646.geometry}
            material={materials.Roof_carrot}
            position={[0.533, 3.446, -4.514]}
            rotation={[2.549, 0, Math.PI]}
            scale={0.124}
          />
          <mesh
            
            
            geometry={nodes.Object_648.geometry}
            material={materials.Roof_carrot}
            position={[1.779, 3.446, -4.514]}
            rotation={[2.549, 0, Math.PI]}
            scale={0.124}
          />
          <mesh
            
            
            geometry={nodes.Object_650.geometry}
            material={materials.Snow}
            position={[3.845, 7.302, -2.735]}
            scale={1.391}
          />
          <mesh
            
            
            geometry={nodes.Object_655.geometry}
            material={materials.Snow}
            position={[-1.532, 1.304, 3.154]}
            rotation={[0, -Math.PI / 2, 0]}
            scale={[0.746, 0.135, 1.499]}
          />
          <mesh
            
            
            geometry={nodes.Object_662.geometry}
            material={materials.material_0}
            position={[2.101, 1.619, 0.164]}
            scale={0.132}
          />
          <mesh
            
            
            geometry={nodes.Object_664.geometry}
            material={materials.material_0}
            position={[2.53, 1.625, -0.551]}
            scale={0.155}
          />
          <mesh
            
            
            geometry={nodes.Object_666.geometry}
            material={materials.material_0}
            position={[3.026, 2.577, 0.225]}
            rotation={[-Math.PI, 0, -Math.PI]}
            scale={0.135}
          />
          <mesh
            
            
            geometry={nodes.Object_668.geometry}
            material={materials.Snow}
            position={[2.38, 1.588, -0.148]}
            rotation={[-2.975, -1.544, 1.74]}
            scale={[0.044, 0.389, 0.044]}
          />
          <mesh
            
            
            geometry={nodes.Object_670.geometry}
            material={materials.Snow}
            position={[3.608, 1.588, 0.624]}
            rotation={[-0.166, 1.544, -1.402]}
            scale={[0.044, 0.389, 0.044]}
          />
          <mesh
            
            
            geometry={nodes.Object_672.geometry}
            material={materials.material_0}
            position={[3.137, 1.38, -0.213]}
            scale={0.097}
          />
          <mesh
            
            
            geometry={nodes.Object_674.geometry}
            material={materials.material_0}
            position={[3.137, 1.38, 0.685]}
            rotation={[-Math.PI, 0, -Math.PI]}
            scale={0.134}
          />
          <mesh
            
            
            geometry={nodes.Object_676.geometry}
            material={materials.material_0}
            position={[2.586, 1.38, 0.229]}
            rotation={[-Math.PI, 0, -Math.PI]}
            scale={0.134}
          />
          <mesh
            
            
            geometry={nodes.Object_678.geometry}
            material={materials.material_0}
            position={[2.551, 1.623, 1.002]}
            rotation={[-Math.PI, 0, -Math.PI]}
            scale={0.151}
          />
          <mesh
            
            
            geometry={nodes.Object_680.geometry}
            material={materials.material_0}
            position={[3.912, 1.623, 0.302]}
            rotation={[-Math.PI, 0, -Math.PI]}
            scale={0.151}
          />
          <mesh
            
            
            geometry={nodes.Object_682.geometry}
            material={materials.Roof_carrot}
            position={[3.432, 6.351, -3.684]}
            rotation={[2.549, 0, Math.PI]}
            scale={0.124}
          />
          <mesh
            
            
            geometry={nodes.Object_684.geometry}
            material={materials.Roof_carrot}
            position={[3.754, 6.351, -3.684]}
            rotation={[2.549, 0, Math.PI]}
            scale={0.124}
          />
          <mesh
            
            
            geometry={nodes.Object_686.geometry}
            material={materials.Roof_carrot}
            position={[4.157, 6.335, -3.684]}
            rotation={[2.549, 0, Math.PI]}
            scale={0.124}
          />
          <mesh
            
            
            geometry={nodes.Object_688.geometry}
            material={materials.Rock_01}
            position={[5.109, 2.224, 0.474]}
            scale={[0.167, 0.084, 0.167]}
          />
          <mesh
            
            
            geometry={nodes.Object_690.geometry}
            material={materials.Snow}
            position={[5.109, 2.319, 0.474]}
          />
          <mesh
            
            
            geometry={nodes.Object_692.geometry}
            material={materials.Snow}
            position={[5.068, 2.59, -1.302]}
            scale={0.159}
          />
          <mesh
            
            
            geometry={nodes.Object_694.geometry}
            material={materials.Snow}
            position={[2.795, 2.59, 2.284]}
            rotation={[-Math.PI, 0, -Math.PI]}
            scale={0.159}
          />
          <mesh
            
            
            geometry={nodes.Object_696.geometry}
            material={materials.Snow}
            position={[-4.6, 2.606, 4.489]}
            scale={0.159}
          />
          <mesh
            
            
            geometry={nodes.Object_698.geometry}
            material={materials.Snow}
            position={[-4.605, 2.603, 2.045]}
            scale={0.159}
          />
          <mesh
            
            
            geometry={nodes.Object_700.geometry}
            material={materials.Snow}
            position={[-0.529, 2.319, 4.52]}
            rotation={[0, -Math.PI / 2, 0]}
          />
          <mesh
            
            
            geometry={nodes.Object_702.geometry}
            material={materials.Snow}
            position={[-3.383, 2.273, 4.576]}
            rotation={[0, -Math.PI / 2, 0]}
          />
          <mesh
            
            
            geometry={nodes.Object_704.geometry}
            material={materials.Rock_01}
            position={[3.91, 2.224, 2.314]}
            rotation={[0, Math.PI / 2, 0]}
            scale={[0.167, 0.084, 0.159]}
          />
          <mesh
            
            
            geometry={nodes.Object_706.geometry}
            material={materials.Snow}
            position={[3.906, 2.296, 2.306]}
            rotation={[0, Math.PI / 2, 0]}
          />
          <mesh
            
            
            geometry={nodes.Object_708.geometry}
            material={materials.Snow}
            position={[-4.948, 0.654, 5.603]}
            rotation={[0, 0.853, 0]}
            scale={0.853}
          />
          <mesh
            
            
            geometry={nodes.Object_710.geometry}
            material={materials.Snow}
            position={[-4.306, 0.574, -11.443]}
            rotation={[-2.719, 0, -Math.PI / 2]}
            scale={0.853}
          />
          <mesh
            
            
            geometry={nodes.Object_712.geometry}
            material={materials.Snow}
            position={[-5.391, 1.107, -11.356]}
            rotation={[-1.017, -0.484, 0.926]}
            scale={0.853}
          />
          <mesh
            
            
            geometry={nodes.Object_717.geometry}
            material={materials.Snow}
            position={[-0.454, 1.62, -1.704]}
            scale={0.277}
          />
          <mesh
            
            
            geometry={nodes.Object_719.geometry}
            material={materials.Snow}
            position={[-1.099, 1.584, -1.432]}
            rotation={[-Math.PI, 0, -Math.PI]}
            scale={0.197}
          />
          <mesh
            
            
            geometry={nodes.Object_724.geometry}
            material={materials.Snow}
            position={[8.146, 5.854, 10.056]}
            rotation={[-Math.PI, 1.446, -Math.PI]}
            scale={0.688}
          />
          <mesh
            
            
            geometry={nodes.Object_726.geometry}
            material={materials.Snow}
            position={[8.05, 5.398, 10.113]}
            rotation={[-Math.PI, 1.446, -Math.PI]}
            scale={0.688}
          />
          <mesh
            
            
            geometry={nodes.Object_728.geometry}
            material={materials.Snow}
            position={[8.128, 4.489, 10.174]}
            rotation={[-Math.PI, 1.446, -Math.PI]}
            scale={0.688}
          />
          <mesh
            
            
            geometry={nodes.Object_730.geometry}
            material={materials.Snow}
            position={[8.08, 3.209, 10.034]}
            rotation={[-Math.PI, 1.446, -Math.PI]}
            scale={0.688}
          />
          <mesh
            
            
            geometry={nodes.Object_753.geometry}
            material={materials.Rope}
            position={[9.084, 0.337, 7.247]}
            rotation={[0, 0.799, -Math.PI / 2]}
            scale={0.128}
          />
          <mesh
            
            
            geometry={nodes.Object_755.geometry}
            material={materials.Gmb_kk}
            position={[9.042, 0.146, 7.411]}
            scale={0.149}
          />
          <mesh
            
            
            geometry={nodes.Object_757.geometry}
            material={materials.Gmb_lils}
            position={[9.042, 0.342, 7.152]}
            scale={0.149}
          />
          <mesh
            
            
            geometry={nodes.Object_759.geometry}
            material={materials.Gmb_piros}
            position={[9.261, 0.233, 7.266]}
            scale={0.149}
          />
          <mesh
            
            
            geometry={nodes.Object_778.geometry}
            material={materials.Roof_carrot}
            position={[3.685, 6.657, -3.344]}
            rotation={[2.549, 0, Math.PI]}
            scale={0.124}
          />
          <mesh
            
            
            geometry={nodes.Object_780.geometry}
            material={materials.Roof_carrot}
            position={[4.262, 6.897, -2.834]}
            rotation={[Math.PI / 2, 0.979, -Math.PI / 2]}
            scale={0.124}
          />
          <mesh
            
            
            geometry={nodes.Object_782.geometry}
            material={materials.Roof_carrot}
            position={[3.897, 6.738, -2.213]}
            rotation={[0.592, 0, 0]}
            scale={0.124}
          />
          <mesh
            
            
            geometry={nodes.Object_784.geometry}
            material={materials.Snow}
            position={[-11.458, 13.075, 5.857]}
            rotation={[0, 0.259, 0]}
            scale={[0.864, 0.649, 0.826]}
          />
          <mesh
            
            
            geometry={nodes.Object_786.geometry}
            material={materials.Snow}
            position={[-11.18, 13.908, 6.91]}
            rotation={[0, 0.259, 0]}
            scale={[1.315, 0.992, 1.315]}
          />
          <mesh
            
            
            geometry={nodes.Object_788.geometry}
            material={materials.Snow}
            position={[-12.416, 13.68, 6.111]}
            rotation={[0, 0.259, 0]}
            scale={[0.492, 0.354, 0.471]}
          />
          <mesh
            
            
            geometry={nodes.Object_790.geometry}
            material={materials.Snow}
            position={[13.866, 13.129, -12.254]}
            rotation={[0, -1.284, 0]}
            scale={[0.735, 0.533, 0.682]}
          />
          <mesh
            
            
            geometry={nodes.Object_792.geometry}
            material={materials.Snow}
            position={[12.673, 13.547, -12.277]}
            rotation={[0, -1.284, 0]}
            scale={[1.207, 0.681, 1.25]}
          />
          <mesh
            
            
            geometry={nodes.Object_794.geometry}
            material={materials.Snow}
            position={[13.166, 12.461, -10.784]}
            rotation={[0, -1.284, 0]}
            scale={[0.293, 0.215, 0.291]}
          />
          <mesh
            
            
            geometry={nodes.Object_796.geometry}
            material={materials.Earth_02}
            position={[6.389, -20.763, -0.981]}
            scale={0.544}
          />
          <mesh
            
            
            geometry={nodes.Object_798.geometry}
            material={materials.Earth}
            position={[2.322, -14.565, -3.615]}
            scale={1.329}
          />
          <mesh
            
            
            geometry={nodes.Object_800.geometry}
            material={materials.Earth_02}
            position={[9.935, -17.561, 2.892]}
            scale={0.484}
          />
          <mesh
            
            
            geometry={nodes.Object_802.geometry}
            material={materials.Earth}
            position={[7.764, -14.299, 5.98]}
            rotation={[-Math.PI, 0, 0]}
            scale={0.672}
          />
        </group>
      </group>
    </a.group>
  );
}


export default The_First_Christmas_Tree;
