import {CGFobject, CGFappearance, CGFtexture, CGFshader} from '../lib/CGF.js';
import { MySeaweed } from './MySeaweed.js';

export class MySeaweedSet extends CGFobject {
  
  constructor(scene, slices, stacks, texture_image, scale_min, scale_max, arena_side, nseaweeds, nest) {
    super(scene);
    this.slices = slices;
    this.stacks = stacks;
    this.seaWeed_texture = new CGFtexture(this.scene, texture_image);
    this.texture_image = texture_image;
    this.seaweed = new MySeaweed(this.scene, this.slices, this.stacks, this.texture_image);
    this.scale_min = scale_min;
    this.scale_max = scale_max;
    this.arena_side = arena_side;
    this.nseaweeds = nseaweeds;
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

  init(){
    this.scene.rock_material = new CGFappearance(this.scene);
		this.scene.rock_material.setTexture(this.rock_texture);
    this.seaweed_data = [];

    for(let n = 0; n < this.nseaweeds; n++){

      var scale = (Math.floor(Math.random() * (this.scale_max - this.scale_min)) + this.scale_min) / 1.0;

      var pos_x = (Math.random() * (this.arena_side - 1)) - (this.arena_side/2 - 1) / 1.0;
      var pos_y = 0.0;
      var pos_z = (Math.random() * (this.arena_side - 1)) - (this.arena_side/2 - 1) / 1.0;

      

      if(pos_x >= this.nest.nest_start && pos_x <= this.nest.nest_end && pos_z >= this.nest.nest_start && pos_z <= this.nest.nest_end){
        n--;
      }
      else{
        this.seaweed_data.push(scale, pos_x, pos_y, pos_z);
      }
      

    }

    console.log("SEAWEED DATA");
    console.log(this.seaweed_data);
  }

  display(){

    for(let i = 0; i < this.nseaweeds; i++){
      this.scene.pushMatrix();
      this.scene.translate(this.seaweed_data[4*i+1], this.seaweed_data[4*i+2], this.seaweed_data[4*i+3]);
      this.scene.scale(this.seaweed_data[4*i], this.seaweed_data[4*i], this.seaweed_data[4*i]);
      this.seaweed.display();
	    this.scene.popMatrix();
    }
  }

}
