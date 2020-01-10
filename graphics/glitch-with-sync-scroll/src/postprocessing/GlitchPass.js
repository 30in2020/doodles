import {
  DataTexture,
  FloatType,
  Math as _Math,
  Mesh,
  OrthographicCamera,
  PlaneBufferGeometry,
  RGBFormat,
  Scene,
  ShaderMaterial,
  UniformsUtils
} from "three";
import { DigitalGlitch } from "../shader/DigitalGlitch.js";
import { Pass } from "three/examples/jsm/postprocessing/Pass.js";
/**
 * @author alteredq / http://alteredqualia.com/
 */

var GlitchPass = function(dt_size) {
  Pass.call(this);
  if (DigitalGlitch === undefined)
    console.error("THREE.GlitchPass relies on THREE.DigitalGlitch");
  var shader = DigitalGlitch;
  this.uniforms = UniformsUtils.clone(shader.uniforms);
  if (dt_size === undefined) dt_size = 64;
  this.uniforms["tDisp"].value = this.generateHeightmap(dt_size);
  this.material = new ShaderMaterial({
    uniforms: this.uniforms,
    vertexShader: shader.vertexShader,
    fragmentShader: shader.fragmentShader
  });
  this.camera = new OrthographicCamera(-1, 1, 1, -1, 0, 1);
  this.scene = new Scene();
  this.quad = new Mesh(new PlaneBufferGeometry(2, 2), null);
  this.quad.frustumCulled = false; // Avoid getting clipped
  this.scene.add(this.quad);
  this.data = {
    seed: 0.02,
    amount: 0.08,
    angle: 0.02,
    distortion_x: 0.5, // 0~1
    distortion_y: 0.6,
    seed_x: 0.02, // -1~1
    seed_y: 0.02 // -1~1
  };
};

GlitchPass.prototype = Object.assign(Object.create(Pass.prototype), {
  constructor: GlitchPass,

  render: function(renderer, writeBuffer, readBuffer, deltaTime, maskActive) {
    this.uniforms["byp"].value = 0;
    this.uniforms["tDiffuse"].value = readBuffer.texture;
    this.uniforms["seed"].value = Math.random() * this.data.seed;
    this.uniforms["amount"].value = this.data.amount;
    this.uniforms["angle"].value = this.data.angle;
    this.uniforms["distortion_x"].value = this.data.distortion_x;
    this.uniforms["distortion_y"].value = this.data.distortion_y;
    this.uniforms["seed_x"].value = this.data.seed_x;
    this.uniforms["seed_y"].value = this.data.seed_y;
    this.quad.material = this.material;
    if (this.renderToScreen) {
      renderer.setRenderTarget(null);
      renderer.render(this.scene, this.camera);
    } else {
      renderer.setRenderTarget(writeBuffer);
      if (this.clear) renderer.clear();
      renderer.render(this.scene, this.camera);
    }
  },

  generateHeightmap: function(dt_size) {
    var data_arr = new Float32Array(dt_size * dt_size * 3);
    var length = dt_size * dt_size;

    for (var i = 0; i < length; i++) {
      var val = _Math.randFloat(0, 1);
      data_arr[i * 3 + 0] = val;
      data_arr[i * 3 + 1] = val;
      data_arr[i * 3 + 2] = val;
    }

    var texture = new DataTexture(
      data_arr,
      dt_size,
      dt_size,
      RGBFormat,
      FloatType
    );
    texture.needsUpdate = true;
    return texture;
  }
});

export { GlitchPass };
