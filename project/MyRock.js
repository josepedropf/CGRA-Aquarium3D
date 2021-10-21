import {CGFobject, CGFappearance, CGFtexture, CGFshader} from '../lib/CGF.js';
import { MyRandomSphere } from './MyRandomSphere.js';

export class MyRock extends CGFobject {
  /**
   * @method constructor
   * @param  {CGFscene} scene - MyScene object
   * @param  {integer} slices - number of slices around Y axis
   * @param  {integer} stacks - number of stacks along Y axis, from the center to the poles (half of sphere)
   */
  constructor(scene, slices, stacks, texture_image) {
    super(scene);
    this.rock = new MyRandomSphere(this.scene, slices, stacks);
    this.rock_texture = new CGFtexture(this.scene, texture_image);
    
    this.init();
  }

  init(){
    this.scene.rock_material = new CGFappearance(this.scene);
		this.scene.rock_material.setTexture(this.rock_texture);
  }

  display(){
    this.scene.rock_material.apply();

    this.scene.pushMatrix();
    //this.scene.translate(this.position[0], this.position[1], this.position[2]);
		//this.scene.scale(this.scale_x, this.scale_y, this.scale_z);
		this.rock.display();
		this.scene.popMatrix();
  }

}
