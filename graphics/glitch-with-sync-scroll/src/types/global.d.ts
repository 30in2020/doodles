import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { GlitchPass } from "three/examples/jsm/postprocessing/GlitchPass";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      effectComposer: any;
      renderPass: any;
      glitchPass: any;
      filmPass: any;
      halftonePass: any;
    }
  }
}
