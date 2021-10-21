import {CGFobject, CGFappearance, CGFtexture, CGFshader} from '../lib/CGF.js';
import { MyRandomSphere } from './MyRandomSphere.js';
import { MyRock } from './MyRock.js';

export class MyRockSet extends CGFobject {
  
  constructor(scene, slices, stacks, texture_image, texture_h, scale_min, scale_max, arena_side, nDivs, nrocks, nest, base_h, max_h) {
    super(scene);
    this.slices = slices;
    this.stacks = stacks;
    this.base_h = base_h;
    this.max_h = max_h;
    this.rock_texture = new CGFtexture(this.scene, texture_image);
    this.rock_h = new CGFtexture(this.scene, texture_h);
    this.rock = new MyRandomSphere(this.scene, this.slices, this.stacks);
    this.texture_image = texture_image;
    this.texture_h = texture_h;
    this.scale_min = scale_min;
    this.scale_max = scale_max;
    this.arena_side = arena_side;
    this.nrocks = nrocks;
    this.nest = nest;
    this.nDivs = nDivs;
    this.arena_matrix = [];
    for(let i = 0; i < arena_side; i++){
      for(let j = 0; j < arena_side; j++){
        this.arena_matrix.push(0);
      }
    }

    this.init();
  }

  set_fish_rock(fish_rock_no){
    this.rock_picked = fish_rock_no;
  }

  set_fish_dropping(fish_rock_no){
    this.rock_dropping = fish_rock_no;
    this.set_fish_rock(-1);
  }

  end_dropping(){
    this.rock_dropping = -1;
  }

  set_fish_launching(fish_rock_no){
    this.rock_launching = fish_rock_no;
    this.set_fish_rock(-1);
  }

  end_launching(){
    this.rock_launching = -1;
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

  Divs_to_pos(value, nDivs, side){
    return (((value / nDivs) * side) / 1.0) - side/2.0;
  }

  init(){
    //this.scene.rock_material = new CGFappearance(this.scene);
		//this.scene.rock_material.setTexture(this.rock_texture);

    this.rock_data = [];
    this.rock_picked = -1;
    this.rock_dropping = -1;
    this.rock_launching = -1;

    for(let n = 0; n < this.nrocks; n++){
      
      var scale_x = (Math.floor(Math.random() * (this.scale_max - this.scale_min)) + this.scale_min);
      var scale_y = (Math.floor(Math.random() * (this.scale_max - this.scale_min)) + this.scale_min);
      var scale_z = (Math.floor(Math.random() * (this.scale_max - this.scale_min)) + this.scale_min);
      

      var div_x = (Math.floor(Math.random() * this.nDivs));
      var div_z = (Math.floor(Math.random() * this.nDivs));


      var pos_x = (Math.random() * (this.arena_side - 2) + 1) - this.arena_side/2.0;
      var pos_y = this.max_h - scale_y;
      var pos_z = (Math.random() * (this.arena_side - 2) + 1) - this.arena_side/2.0;

      var ang = ((Math.random() * 360.0) / 180.0) * Math.PI;
      


      if(pos_x >= (this.nest.nest_start - 1) && pos_x <= (this.nest.nest_end + 1) && pos_z >= (this.nest.nest_start - 1) && pos_z <= (this.nest.nest_end + 1)){
        n--;
      }
      else{
        console.log("ROCK POS");
        console.log(pos_x, pos_z);
        this.rock_data.push(scale_x, scale_y, scale_z, pos_x, pos_y, pos_z, ang);
      }
      
    }


      this.scene.rockAppearance = new CGFappearance(this.scene);
      this.scene.rockAppearance.setTexture(this.rock_texture);

      this.scene.hrockAppearance = new CGFappearance(this.scene);
      this.scene.hrockAppearance.setTexture(this.rock_h);

      this.rock_shader = new CGFshader(this.scene.gl, "./shaders/rock.vert", "./shaders/rock.frag");
      
      this.rock_shader.setUniformsValues({ uSampler: 7 });
      this.rock_shader.setUniformsValues({ uSampler2: 8 });
      
      this.rock_shader.setUniformsValues({ max_height: this.max_h });
      this.rock_shader.setUniformsValues({ nDivs: this.nDivs });
  }

  display(){

    this.rock_texture.bind(7);
		this.rock_h.bind(8);
		this.scene.rockAppearance.apply();



		this.scene.setActiveShader(this.rock_shader);
		
    for(let i = 0; i < this.nrocks; i++){
      if((this.rock_launching == -1 || this.rock_launching != i) && (this.rock_dropping == -1 || this.rock_dropping != i) && (this.rock_picked == -1 || this.rock_picked != i)){
        this.scene.pushMatrix();
        this.scene.translate(this.rock_data[7*i + 3], this.rock_data[7*i + 4], this.rock_data[7*i + 5]);
        this.scene.rotate(this.rock_data[7*i + 6], 0, 1, 0);
        this.scene.scale(this.rock_data[7*i], this.rock_data[7*i + 1], this.rock_data[7*i + 2]);

        this.rock.display();
        this.scene.popMatrix();
      }
    }

    this.scene.setActiveShader(this.scene.defaultShader);
  }

}
