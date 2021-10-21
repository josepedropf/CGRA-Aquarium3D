import {CGFobject, CGFappearance, CGFtexture, CGFshader} from '../lib/CGF.js';
import { MyAnimatedFish } from './MyAnimatedFish.js';
import { MyFish } from './MyFish.js';

export class MyAnimatedFishSet extends CGFobject {
  
  constructor(scene, nfishes, arena_side, texture_list, color_list, eye_list, min_y, max_y, min_radius, max_radius, min_period, max_period, min_ratio, max_ratio, min_l, max_l) {
    super(scene);
    this.nfishes = nfishes;
    this.texture_list = texture_list;
    this.color_list = color_list;
    this.eye_list = eye_list;
    this.arena_side = arena_side;
    this.min_y = min_y;
    this.max_y = max_y;
    this.min_radius = min_radius;
    this.max_radius = max_radius;
    this.min_period = min_period;
    this.max_period = max_period;
    this.min_ratio = min_ratio;
    this.max_ratio = max_ratio;
    this.min_l = min_l;
    this.max_l = max_l;
    this.init();
  }

  init(){
    this.animated_fishes = [];
    for(let i = 0; i < this.nfishes; i++){
        var radius = Math.random() * (this.max_radius - this.min_radius) + this.min_radius;
        var period = Math.random() * (this.max_period - this.min_period) + this.min_period;
        var y = Math.random() * (this.max_y - this.min_y) + this.min_y;
        var ratio = Math.random() * (this.max_ratio - this.min_ratio) + this.min_ratio;
        var comp = Math.random() * (this.max_l - this.min_l) + this.min_l;
        var texture_index = Math.floor(Math.random() * this.texture_list.length);
        var color_index = Math.floor(Math.random() * this.color_list.length);
        var eye_index = Math.floor(Math.random() * this.eye_list.length);

        var x_centre = Math.random() * (this.arena_side - 2.0) + 1.0;
        var z_centre = Math.random() * (this.arena_side - 2.0) + 1.0;

        x_centre -= this.arena_side/2.0;
        z_centre -= this.arena_side/2.0;

        comp = 0.5;

        //this.fish = new MyFish(this.scene, this.texture_list[texture_index], this.eye_list[eye_index], this.color_list[color_index][0], this.color_list[color_index][1], this.color_list[color_index][2], ratio, 16, 8, comp);
        this.animated_fishes.push(new MyAnimatedFish(this.scene, new MyFish(this.scene, this.texture_list[texture_index], this.eye_list[eye_index], this.color_list[color_index][0], this.color_list[color_index][1], this.color_list[color_index][2], ratio, 16, 8, comp), x_centre, z_centre, y, radius, period, 20.0));
    }
}

    update(t){
        for(let i = 0; i < this.nfishes; i++){
            this.animated_fishes[i].update(t);
        }
    }

  display(){
    for(let i = 0; i < this.nfishes; i++){
      this.scene.pushMatrix();
      this.animated_fishes[i].display();
	  this.scene.popMatrix();
    }
  }

}