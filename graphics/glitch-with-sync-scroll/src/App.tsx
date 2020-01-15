import React, { useState, useRef, useMemo, ReactChild } from "react";
import { render } from "react-dom";
import useScrollPosition from "./hooks/useScrollPosition";
import { IScrollPos, IData } from "./types/interface";
import { Canvas, useFrame, useThree } from "react-three-fiber";
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

/** This renders text via canvas and projects it as a sprite */
function Text({
  children,
  position,
  opacity = 1,
  color = "white",
  fontSize = 410
}: {
  children: string;
  position: number[];
  opacity?: number;
  color?: string;
  fontSize?: number;
}) {
  const {
    size: { width, height },
    viewport: { width: viewportWidth, height: viewportHeight }
  } = useThree();
  const scale = viewportWidth > viewportHeight ? viewportWidth : viewportHeight;
  const canvas = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = 2048;
    const context = canvas.getContext("2d");
    if (context !== null) {
      context.font = `bold ${fontSize}px -apple-system, BlinkMacSystemFont, avenir next, avenir, helvetica neue, helvetica, ubuntu, roboto, noto, segoe ui, arial, sans-serif`;
      context.textAlign = "center";
      context.textBaseline = "middle";
      context.fillStyle = color;
      context.fillText(children, 1024, 1024 - 410 / 2);
    }
    return canvas;
  }, [children, width, height]);
  return (
    <sprite scale={[scale, scale, 1]} position={position}>
      <spriteMaterial attach="material" transparent opacity={opacity}>
        <canvasTexture
          attach="map"
          image={canvas}
          premultiplyAlpha
          onUpdate={s => (s.needsUpdate = true)}
        />
      </spriteMaterial>
    </sprite>
  );
}

const App: React.FC = () => {
  const [data, setData] = useState<IData>({
    ambientLightIntensity: 0.2,
    boxColor: "#2FA1D6",
    seed: 0.02,
    amount: 0.08,
    angle: 0.02,
    distortion_x: 0.5, // 0~1
    distortion_y: 0.6,
    seed_x: 0.02, // -1~1
    seed_y: 0.02 // -1~1
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
          <Text position={[0, 0, map(-1 * scrollPos.y, 0, 1694, 0, -30)]}>
            30in2020
          </Text>
          <Effect data={data} scrollPos={scrollPos} />
        </Canvas>
      </div>
    </>
  );
};

export default App;
