import {CGFobject, CGFappearance, CGFtexture} from '../lib/CGF.js';
import { MyRandomSphere } from './MyRandomSphere.js';
import {MyPyramid} from './MyPyramid.js';

export class MyMovingObject extends CGFobject{
    constructor(scene, object, h_min, h_max, rock_set, pick_up_dist, launching_dist, nest) {
		super(scene);
		this.init();
		this.state = 0;
		this.rock_picked = false;
		this.launching_dist = launching_dist;
		this.pick_up_dist = pick_up_dist;
		this.rock_scale_x = 0.0;
		this.rock_scale_y = 0.0;
		this.rock_scale_z = 0.0;
		this.rock_dropping_scale_x = 0.0;
		this.rock_dropping_scale_y = 0.0;
		this.rock_dropping_scale_z = 0.0;
		this.rock_launching_scale_x = 0.0;
		this.rock_launching_scale_y = 0.0;
		this.rock_launching_scale_z = 0.0;
		this.rock_ang = 0.0;
		this.rock_dropping_ang = 0.0;
		this.rock_launching_ang = 0.0;
		this.h_min = h_min;
		this.h_max = h_max;
		this.object = object;
		this.rock_set = rock_set;
		this.rockAppearance = this.rock_set.rockAppearance;
		this.rock = this.rock_set.rock;
		this.dropping = false;
		this.launching = false;
		this.launch_vertex_w = 0.0;
		this.launch_vertex_x = 0.0;
		this.launch_vertex_z = 0.0;
		this.launch_vertex_y = 0.0;
		this.parabola_coef = 0.0;
		this.final_launching_y = 0.0;
		this.final_launching_w = 0.0;
		this.final_launching_x = 0.0;
		this.final_launching_z = 0.0;
		this.launch_ang = 0.0;
		this.nest = nest;
		this.length = object.length;
		this.rock_dropping_pos = [0.0, 0.0, 0.0];
		this.rock_launching_pos = [0.0, 0.0, 0.0];
		this.rock_final_y = 0.0;
		this.rock_dropping = 0;
		this.launching_slope = 0.0;
		this.rock_launching = 0;
    }

	set_parabola(x, z){
		this.final_launching_y = this.nest.getY(x, z, 2 * this.rock_launching_scale_y);
		var w = Math.sqrt(Math.pow(x - this.launch_vertex_x, 2) + Math.pow(z - this.launch_vertex_z, 2));
		this.final_launching_w = w;
		this.parabola_coef = (this.final_launching_y - this.launch_vertex_y) / (Math.pow((w - this.launch_vertex_w), 2));
	}

	parabola_getY(w){
		return this.parabola_coef * Math.pow((w - this.launch_vertex_w), 2) + this.launch_vertex_y;
	}

	
	init() {
		this.position = [0.0, 3.0, 0.0];
		this.velocity = 0.0;
		this.constvel = 0.0;
		this.angle = 0.0;
		this.tailspeed = 20.0;
		this.turningright = false;
		this.turningleft = false;
	}

	update(t){
		if((this.state == 1 && this.position[1] >= this.h_max) || (this.state == -1 && this.position[1] <= this.h_min)){
			this.constvel = 0.0;
			if(this.position[1] >= this.h_max) this.state = 2;
			else this.state = -2;
		}
		this.position[0] += (this.velocity * t * this.scene.speedFactor * Math.sin(-this.angle));
		this.position[1] += (this.constvel * t * this.scene.speedFactor);
		this.position[2] += (this.velocity * t * this.scene.speedFactor * Math.cos(-this.angle));
		if(this.velocity > 0){
			if(this.velocity > t) this.velocity -= t;
			else this.velocity = 0;
		}
		else{
			if(this.velocity < -t) this.velocity += t;
			else this.velocity = 0;
		}

		 
		this.movingtailspeed = this.tailspeed - 2*this.velocity;

		if (this.movingtailspeed > 2.0) {
			this.object.update_anim(t, this.movingtailspeed, this.turningleft, this.turningright); //to use on mymovingfish class
		}
		else
			this.object.update_anim(t, 2.0);
		this.turningleft = false;
		this.turningright = false;

		if(this.dropping){
			this.rock_dropping_pos[1] -= 0.2;
			if(this.rock_dropping_pos[1] < this.rock_final_y){
				this.rock_dropping_pos[1] = this.rock_final_y;
				this.dropping = false;
				this.rock_set.end_dropping();
				this.rock_set.rock_data[7 * this.rock_dropping + 3] = this.rock_dropping_pos[0];
				this.rock_set.rock_data[7 * this.rock_dropping + 4] = this.rock_dropping_pos[1];
				this.rock_set.rock_data[7 * this.rock_dropping + 5] = this.rock_dropping_pos[2];
			}
		}

		if(this.launching){
			var delta = (this.final_launching_x - this.launch_vertex_x) / 15.0;
			this.rock_launching_pos[0] += delta;
			this.rock_launching_pos[2] += this.launching_slope * delta;

			
			var current_w = Math.sqrt(Math.pow(this.rock_launching_pos[0] - this.launch_vertex_x, 2) + Math.pow(this.rock_launching_pos[2] - this.launch_vertex_z, 2));

			this.rock_launching_pos[1] = this.parabola_getY(current_w);

			console.log("LAUNCHING UPDATE\n current_w:%f | posX:%f | posZ:%f | posY:%f", current_w, this.rock_launching_pos[0], this.rock_launching_pos[2], this.rock_launching_pos[1]);
			
			if(this.rock_launching_pos[1] < this.final_launching_y){
				this.rock_launching_pos[1] = this.final_launching_y;
				this.rock_launching_pos[0] = this.final_launching_x;
				this.rock_launching_pos[2] = this.final_launching_z;
				this.launching = false;
				this.rock_set.end_launching();
				this.rock_set.rock_data[7 * this.rock_launching + 3] = this.rock_launching_pos[0];
				this.rock_set.rock_data[7 * this.rock_launching + 4] = this.rock_launching_pos[1];
				this.rock_set.rock_data[7 * this.rock_launching + 5] = this.rock_launching_pos[2];
				console.log("LAUNCHING FINAL\n current_w:%f | posX:%f | posZ:%f | posY:%f", current_w, this.rock_launching_pos[0], this.rock_launching_pos[2], this.rock_launching_pos[1]);
			}
		}
	}

	turn(val, key){
		this.angle -= val;
		if(this.angle >= 2*Math.PI) {
			this.angle - 2*Math.PI;
			
		}
		if(this.angle <= -2*Math.PI) {
			this.angle + 2*Math.PI;
		}

		if (key == "KeyA") {
			this.turningright = false;
			this.turningleft = true;
		}
			

		if (key == "KeyD") {
			this.turningleft = false;
			this.turningright = true;
		}
 
	}

	accelerate(val){
		this.velocity += val;
	}

	rise() {
		this.constvel = 1.5;
		this.state = 1;
	}

	fall() {
		this.constvel = -1.5;
		this.state = -1;
	}

	pick_up(){
		if(this.state == -2){
			if(this.rock_picked && !this.dropping && this.nest.inNest(this.position[0], this.position[2], 0.0)){
				this.rock_picked = false;
				this.rock_set.set_fish_dropping(this.rock_set.rock_picked);
				this.rock_dropping = this.rock_set.rock_dropping;
				this.dropping = true;
				this.rock_dropping_pos[0] = this.position[0] + (this.object.length/2.0 + this.rock_scale_x/2.0) * Math.sin(-this.angle);
				this.rock_dropping_pos[1] = this.position[1];
				this.rock_dropping_pos[2] = this.position[2] + (this.object.length/2.0 + this.rock_scale_z/2.0) * Math.cos(-this.angle);
				this.rock_dropping_scale_x = this.rock_scale_x;
				this.rock_dropping_scale_y = this.rock_scale_y;
				this.rock_dropping_scale_z = this.rock_scale_z;
				this.rock_dropping_ang = this.rock_ang;
				this.rock_final_y = this.nest.getY(this.rock_dropping_pos[0], this.rock_dropping_pos[2], 2 * this.rock_dropping_scale_y); 

			}
			else if(!this.rock_picked){
				for(let i = 0; i < this.rock_set.nrocks; i++){
					var x = this.rock_set.rock_data[7*i + 3];
					var z = this.rock_set.rock_data[7*i + 5];
					var dist = Math.sqrt(Math.pow(this.position[0] - x, 2) + Math.pow(this.position[2] - z, 2));
	
					if(!this.nest.inNest(x, z, 0.0) && dist < this.pick_up_dist){
						this.rock_scale_x = this.rock_set.rock_data[7*i];
						this.rock_scale_y = this.rock_set.rock_data[7*i + 1];
						this.rock_scale_z = this.rock_set.rock_data[7*i + 2];
						this.rock_ang = this.rock_set.rock_data[7*i + 6];
						this.rock_picked = true;
						this.rock_set.set_fish_rock(i);
						break;
					}
				}
			}
		}
		else if(this.state == 2){
			if(this.rock_picked && !this.launching && this.nest.inNest(this.position[0], this.position[2], this.launching_dist)){
				this.rock_picked = false;
				this.rock_set.set_fish_launching(this.rock_set.rock_picked);
				this.rock_launching = this.rock_set.rock_launching;
				this.launching = true;
				this.rock_launching_pos[0] = this.position[0] + (this.object.length/2.0 + this.rock_scale_x/2.0) * Math.sin(-this.angle);
				this.rock_launching_pos[1] = this.position[1];
				this.rock_launching_pos[2] = this.position[2] + (this.object.length/2.0 + this.rock_scale_z/2.0) * Math.cos(-this.angle);
				this.rock_launching_scale_x = this.rock_scale_x;
				this.rock_launching_scale_y = this.rock_scale_y;
				this.rock_launching_scale_z = this.rock_scale_z;
				this.rock_launching_ang = this.rock_ang;
				this.launching_ang = -this.angle;
				this.launch_vertex_y = this.position[1];
				this.launch_vertex_x = this.rock_launching_pos[0];
				this.launch_vertex_z = this.rock_launching_pos[2];
				this.launch_vertex_w = 0;

				this.final_launching_x = Math.random() * (this.nest.nest_end - this.nest.nest_start) + this.nest.nest_start;
				this.final_launching_z = Math.random() * (this.nest.nest_end - this.nest.nest_start) + this.nest.nest_start;

				this.launching_slope = (this.final_launching_z - this.launch_vertex_z) / (this.final_launching_x - this.launch_vertex_x);
				this.set_parabola(this.final_launching_x, this.final_launching_z);
				console.log("LAUNCHING\n parabola_coef:%f | finalY:%f | x:%f | z:%f | launching_ang:%f | final_w:%f | slope:%f", this.parabola_coef, this.final_launching_y, this.final_launching_x, this.final_launching_z, this.launching_ang, this.final_launching_w, this.launching_slope);
			}
		}
		
	}

	reset(){
		this.position = [0.0, 3.0, 0.0];
		this.velocity = 0.0;
		this.constvel = 0.0;
		this.angle = 0.0;
		this.state = 0;
		this.rock_picked = false;
		this.rock_set.set_fish_rock(-1);
	}

	print_pos(){
		var pos = this.movingobject.position[0].toString() + ", " + this.movingobject.position[1].toString() + ", " + this.movingobject.position[2].toString();
		return pos;
	}
	
	
	display() {
		this.scene.pushMatrix();
		this.object.display();
		this.scene.popMatrix();
	}
}