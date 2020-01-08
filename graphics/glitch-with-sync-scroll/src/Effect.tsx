import React, { useEffect, useRef, useMemo } from "react";
import { render } from "react-dom";
import useScrollPosition, { IScrollPos } from "./hooks/useScrollPosition";
import {
  Canvas,
  extend as extendThree,
  useFrame,
  useThree
} from "react-three-fiber";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import { HalftonePass } from "three/examples/jsm/postprocessing/HalftonePass";
import { FilmPass } from "three/examples/jsm/postprocessing/FilmPass";
import { GlitchPass } from "./postprocessing/GlitchPass";
import { map } from "./utils/";
import * as THREE from "three";

extendThree({ EffectComposer, RenderPass, GlitchPass, HalftonePass, FilmPass });

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
      // console.log((composer.current.passes[1] as any).uniforms);
      composer.current.render();
    }
  }, 1);
  return (
    <effectComposer ref={composer} args={[gl]}>
      <renderPass attachArray="passes" scene={scene} camera={camera} />
      <glitchPass
        attachArray="passes"
        factor={map(-1 * scrollPos.y, 0, 1694, 1, 0)}
        renderToScreen
      />
      <halftonePass
        attachArray="passes"
        uniforms-radius-value={map(-1 * scrollPos.y, 0, 1694, 0.1, 50)}
        uniforms-blending-value={1}
        renderToScreen
      />
      <filmPass
        uniforms-grayscale-value={0}
        attachArray="passes"
        renderToScreen
      />
    </effectComposer>
  );
};

export default Effect;
