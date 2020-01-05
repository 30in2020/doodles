import React, { useState, useRef } from "react";
import { render } from "react-dom";
import useScrollPosition, { IScrollPos } from "./hooks/useScrollPosition";
import { Canvas, extend, useFrame, useThree } from "react-three-fiber";
import * as THREE from "three";

const Box: React.FC = () => {
  const ref = useRef<THREE.Mesh>();
  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.x += 0.005;
      ref.current.rotation.y += 0.0075;
    }
  });
  return (
    <mesh ref={ref}>
      <boxGeometry attach="geometry" args={[1, 1]} />
      <meshStandardMaterial attach="material" color={0xfe9966} />
    </mesh>
  );
};

const App: React.FC = () => {
  const [scrollPos, setScrollPos] = useState<IScrollPos>({ x: 0, y: 0 });

  useScrollPosition(
    ({ prevPos, currPos }: { prevPos: IScrollPos; currPos: IScrollPos }) => {
      setScrollPos(currPos);
    },
    []
  );

  return (
    <Canvas>
      <ambientLight />
      <pointLight position={[10, 0, 10]} intensity={1} />
      <Box />
    </Canvas>
  );
};

export default App;
