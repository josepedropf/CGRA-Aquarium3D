import {CGFobject, CGFappearance, CGFtexture, CGFshader} from '../lib/CGF.js';
import { MyPillar } from './MyPillar.js';

export class MyFourPillars extends CGFobject {
  
  constructor(scene, slices, height, texture_image, arena_side, radius) {
    super(scene);
    this.slices = slices;
    this.height = height;
    this.radius = radius;
    this.arena_side = arena_side;
    this.pillar_texture = new CGFtexture(this.scene, texture_image);
    this.texture_image = texture_image;
    this.ri_pillar = new MyPillar(this.scene, this.slices, this.height, this.texture_image);
    this.rs_pillar = new MyPillar(this.scene, this.slices, this.height, this.texture_image);
    this.li_pillar = new MyPillar(this.scene, this.slices, this.height, this.texture_image);
    this.ls_pillar = new MyPillar(this.scene, this.slices, this.height, this.texture_image);

    this.init();
  }

  init(){
    this.ri_position = [this.arena_side/2.0 - this.radius, 0.0, -this.arena_side/2.0 + this.radius];
    this.rs_position = [this.arena_side/2.0 - this.radius, 0.0, this.arena_side/2.0 - this.radius];
    this.li_position = [-this.arena_side/2.0 + this.radius, 0.0, -this.arena_side/2.0 + this.radius];
    this.ls_position = [-this.arena_side/2.0 + this.radius, 0.0, this.arena_side/2.0 - this.radius];
  }

  set_textures(new_image){
    this.ri_pillar.set_texture(new_image);
    this.rs_pillar.set_texture(new_image);
    this.li_pillar.set_texture(new_image);
    this.ls_pillar.set_texture(new_image);
  }

  display(){

    this.scene.pushMatrix();
    this.scene.translate(this.ri_position[0], this.ri_position[1], this.ri_position[2]);
    this.scene.scale(this.radius, 1.0, this.radius);
    this.ri_pillar.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(this.rs_position[0], this.rs_position[1], this.rs_position[2]);
    this.scene.scale(this.radius, 1.0, this.radius);
    this.rs_pillar.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(this.li_position[0], this.li_position[1], this.li_position[2]);
    this.scene.scale(this.radius, 1.0, this.radius);
    this.li_pillar.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(this.ls_position[0], this.ls_position[1], this.ls_position[2]);
    this.scene.scale(this.radius, 1.0, this.radius);
    this.ls_pillar.display();
    this.scene.popMatrix();
  
  }

}