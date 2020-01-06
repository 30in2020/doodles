import React, { useEffect, useRef, useMemo } from "react";
import { render } from "react-dom";
import useScrollPosition, { IScrollPos } from "./hooks/useScrollPosition";
import { Canvas, extend, useFrame, useThree } from "react-three-fiber";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import { GlitchPass } from "three/examples/jsm/postprocessing/GlitchPass.js";
import GlitchFilter from "./postprocessing/glitch/";
import * as THREE from "three";

const map = (value: number, x1: number, y1: number, x2: number, y2: number) =>
  ((value - x1) * (y2 - x2)) / (y1 - x1) + x2;

extend({ EffectComposer, RenderPass, GlitchPass });

interface IEffect {
  scrollPos: IScrollPos;
}

const Effect: React.FC<IEffect> = ({ scrollPos }) => {
  const composer = useRef<EffectComposer>();
  const { scene, gl, size, camera } = useThree();
  const aspect = useMemo(() => new THREE.Vector2(size.width, size.height), [
    size
  ]);
  useEffect(() => {
    if (composer.current !== undefined) {
      composer.current.setSize(size.width, size.height);
    }
  }, [size]);
  useFrame(() => {
    if (composer.current !== undefined) {
      composer.current.render();
    }
  }, 1);

  return (
    <effectComposer ref={composer} args={[gl]}>
      <renderPass attachArray="passes" scene={scene} camera={camera} />
      <glitchPass
        attachArray="passes"
        factor={20}
        uniforms-byp-value={map(-1 * scrollPos.y, 0, 1694, -1, 1)}
        renderToScreen
      />
    </effectComposer>
  );
};

export default Effect;
