import React, { useState, useRef } from "react";
import { render } from "react-dom";
import useScrollPosition, { IScrollPos } from "./hooks/useScrollPosition";
import { Canvas, useFrame } from "react-three-fiber";
import Effect from "./Effect";
import { map } from "./utils/";
import * as THREE from "three";
import { Color } from "three";

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
      <meshStandardMaterial attach="material" color={0x203020} />
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
    <>
      <div id="scroll-layer">A</div>
      <div id="scroll-data">Scroll: {scrollPos.y} </div>
      <div id="bg">
        <Canvas>
          <ambientLight intensity={0.8} />
          <pointLight
            position={[10, 0, 10]}
            intensity={map(-1 * scrollPos.y, 0, 1694, 3, 0.3)}
          />
          <Box />
          <Effect scrollPos={scrollPos} />
        </Canvas>
      </div>
    </>
  );
};

export default App;
