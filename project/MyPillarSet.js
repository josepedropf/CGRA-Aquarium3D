import {CGFobject, CGFappearance, CGFtexture, CGFshader} from '../lib/CGF.js';
import { MyRandomSphere } from './MyRandomSphere.js';
import { MyRock } from './MyRock.js';
import { MyPillar } from './MyPillar.js';

export class MyPillarSet extends CGFobject {
  
  constructor(scene, slices, height, texture_image, scale_min, scale_max, arena_side, npillars, nest) {
    super(scene);
    this.slices = slices;
    this.height = height;
    this.pillar_texture = new CGFtexture(this.scene, texture_image);
    this.texture_image = texture_image;
    this.pillar = new MyPillar(this.scene, this.slices, this.height, this.texture_image);
    this.scale_min = scale_min;
    this.scale_max = scale_max;
    this.arena_side = arena_side;
    this.npillars = npillars;
    this.nest = nest;
    this.arena_matrix = [];
    for(let i = 0; i < arena_side; i++){
      for(let j = 0; j < arena_side; j++){
        this.arena_matrix.push(0);
      }
    }

    this.init();
  }

  get_random_pos(){
    var return_pos = [0.0, 0.0, 0.0];
    var free = false;
    var row = 0;
    var col = 0;
    while(!free){
      row = Math.floor(Math.random() * this.arena_side);
      col = Math.floor(Math.random() * this.arena_side);

      if(this.arena_matrix[row][col] == 0){
        this.arena_matrix[row][col] = 1;
        free = true;
      }
    }

    return_pos[0] = -this.arena_side/2.0 + col + 0.5;
    return_pos[2] = -this.arena_side/2.0 + row + 0.5;

    return return_pos;
  }

  set_textures(new_image){
    this.pillar.set_texture(new_image)
  }

  init(){
    this.pillar_data = [];


    for(let n = 0; n < this.npillars; n++){

      var scale = (Math.floor(Math.random() * (this.scale_max - this.scale_min)) + this.scale_min) / 1.0;

      var pos_x = (Math.random() * (this.arena_side - 1)) - (this.arena_side/2 - 1) / 1.0;
      var pos_y = 0.0;
      var pos_z = (Math.random() * (this.arena_side - 1)) - (this.arena_side/2 - 1) / 1.0;
      
      if(pos_x >= this.nest.nest_start && pos_x <= this.nest.nest_end && pos_z >= this.nest.nest_start && pos_z <= this.nest.nest_end){
        n--;
      }
      else{
        this.pillar_data.push(scale, pos_x, pos_y, pos_z);
      }
      
    }

  }

  display(){

    for(let i = 0; i < this.npillars; i++){
      this.scene.pushMatrix();
      this.scene.translate(this.pillar_data[4*i+1], this.pillar_data[4*i+2], this.pillar_data[4*i+3]);
      this.scene.scale(this.pillar_data[4*i], this.pillar_data[4*i], this.pillar_data[4*i]);
      this.pillar.display();
		  this.scene.popMatrix();

    }
  }

}
