import { CGFscene, CGFcamera, CGFaxis } from "../lib/CGF.js";
import { MyDiamond } from "./MyDiamond.js";
import { MyParallelogram } from "./MyParallelogram.js";
import { MyTriangle } from "./MyTriangle.js";
import { MyTriangleBig } from "./MyTriangleBig.js";
import { MyTriangleSmall } from "./MyTriangleSmall.js";
import { MyTangram } from "./MyTangram.js";
import { MyUnitCube } from "./MyUnitCube.js";
import { MyQuad } from "./MyQuad.js";
import { MyUnitCubeQuad } from "./MyUnitCubeQuad.js";

/**
 * MyScene
 * @constructor
 */
export class MyScene extends CGFscene {
  constructor() {
    super();
  }
  init(application) {
    super.init(application);
    
    this.initCameras();
    this.initLights();

    //Background color
    this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

    this.gl.clearDepth(100.0);
    this.gl.enable(this.gl.DEPTH_TEST);
    this.gl.enable(this.gl.CULL_FACE);
    this.gl.depthFunc(this.gl.LEQUAL);

    //Initialize scene objects
    this.axis = new CGFaxis(this);
    this.diamond = new MyDiamond(this);
    this.triangle = new MyTriangle(this);
    this.s_triangle = new MyTriangleSmall(this);
    this.b_triangle = new MyTriangleBig(this);
    this.par = new MyParallelogram(this);
    this.tangram = new MyTangram(this);
    this.unitcube = new MyUnitCube(this);
    this.quad = new MyQuad(this);
    this.unitcubequad = new MyUnitCubeQuad(this);

    //Objects connected to MyInterface
    this.displayST = false;
    this.displayBT = false;
    this.displayPar = false;
    this.displayDiamond = false;
    this.displayTriangle = false;
    this.displayAxis = true;
    this.displayUnitCube = false;
    this.displayTangram = false;
    this.displayQuad = false;
    this.displayUnitCubeQuad = true;

    this.scaleFactor = 1;
  }
  initLights() {
    this.lights[0].setPosition(15, 2, 5, 1);
    this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
    this.lights[0].enable();
    this.lights[0].update();
  }
  initCameras() {
    this.camera = new CGFcamera(
      0.4,
      0.1,
      500,
      vec3.fromValues(15, 15, 15),
      vec3.fromValues(0, 0, 0)
    );
  }
  setDefaultAppearance() {
    this.setAmbient(0.2, 0.4, 0.8, 1.0);
    this.setDiffuse(0.2, 0.4, 0.8, 1.0);
    this.setSpecular(0.2, 0.4, 0.8, 1.0);
    this.setShininess(10.0);
  }
  display() {
    // ---- BEGIN Background, camera and axis setup
    // Clear image and depth buffer everytime we update the scene
    this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    // Initialize Model-View matrix as identity (no transformation
    this.updateProjectionMatrix();
    this.loadIdentity();
    // Apply transformations corresponding to the camera position relative to the origin
    this.applyViewMatrix();

    // Draw axis
    if (this.displayAxis) this.axis.display();

    this.setDefaultAppearance();

    var sca = [
      this.scaleFactor,
      0.0,
      0.0,
      0.0,
      0.0,
      this.scaleFactor,
      0.0,
      0.0,
      0.0,
      0.0,
      this.scaleFactor,
      0.0,
      0.0,
      0.0,
      0.0,
      1.0,
    ];

    this.multMatrix(sca);

    this.pushMatrix();
    this.translate(-1, -1, 0);
    this.rotate(3*Math.PI/2, 1, 0, 0);
    if (this.displayUnitCube) this.unitcube.display();
    if (this.displayUnitCubeQuad) this.unitcubequad.display();
    this.popMatrix();

    this.pushMatrix();
    this.rotate(3*Math.PI/2, 1, 0, 0);
    if (this.displayTangram) this.tangram.display();
    this.popMatrix();

    // ---- BEGIN Primitive drawing section

    if (this.displayDiamond) this.diamond.display();
    if (this.displayTriangle) this.triangle.display();
    if (this.displayST) this.s_triangle.display();
    if (this.displayBT) this.b_triangle.display();
    if (this.displayPar) this.par.display();
    if (this.displayQuad) this.quad.display();


    // ---- END Primitive drawing section
  }
}
