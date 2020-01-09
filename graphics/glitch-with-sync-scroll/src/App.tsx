import React, { useState, useRef } from "react";
import { render } from "react-dom";
import useScrollPosition from "./hooks/useScrollPosition";
import { IScrollPos, IData } from "./types/interface";
import { Canvas, useFrame } from "react-three-fiber";
import Effect from "./Effect";
import { map } from "./utils/";
import * as THREE from "three";
import DatGuiPanel from "./DatGui";

const Box: React.FC<{ data: IData }> = ({ data }) => {
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
      <meshStandardMaterial attach="material" color={data.boxColor} />
    </mesh>
  );
};

const App: React.FC = () => {
  const [data, setData] = useState<IData>({
    ambientLightIntensity: 0.2,
    boxColor: "#2FA1D6"
  });

  const [scrollPos, setScrollPos] = useState<IScrollPos>({ x: 0, y: 0 });
  useScrollPosition(
    ({ prevPos, currPos }: { prevPos: IScrollPos; currPos: IScrollPos }) => {
      setScrollPos(currPos);
    },
    []
  );

  return (
    <>
      <DatGuiPanel data={data} setData={setData} />
      <div id="scroll-layer">A</div>
      <div id="scroll-data">Scroll: {scrollPos.y} </div>
      <div id="bg">
        <Canvas>
          <ambientLight intensity={data.ambientLightIntensity} />
          <pointLight
            position={[10, 0, 10]}
            intensity={map(-1 * scrollPos.y, 0, 1694, 3, 0.3)}
          />
          <Box data={data} />
          <Effect data={data} scrollPos={scrollPos} />
        </Canvas>
      </div>
    </>
  );
};

export default App;
