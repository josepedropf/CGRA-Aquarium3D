import {CGFobject, CGFappearance, CGFtexture, CGFshader} from '../lib/CGF.js';
import { MyMovingObject } from './MyMovingObject.js';
import {MyFish} from './MyFish.js';

export class MyMovingFish extends MyMovingObject{
    constructor(scene, fish, h_min, h_max, rock_set, pick_up_dist, launching_dist, nest) {
		super(scene, fish, h_min, h_max, rock_set, pick_up_dist, launching_dist, nest);
		this.rock_shader = new CGFshader(this.scene.gl, "./shaders/texture1.vert", "./shaders/rock.frag");
    }

	update(t){
		super.update(t);
	}
	
	
	display() {
		if(this.rock_picked || this.dropping || this.launching){
			this.scene.setActiveShader(this.rock_shader);
			this.scene.rockAppearance.apply();
			if(this.rock_picked){
				this.scene.pushMatrix();
				this.scene.translate(this.position[0] + (this.object.length/2.0 + this.rock_scale_x/2.0) * Math.sin(-this.angle), this.position[1], this.position[2] + (this.object.length/2.0 + this.rock_scale_z/2.0) * Math.cos(-this.angle));
				this.scene.rotate(this.rock_ang, 0, 1, 0);
				this.scene.rotate(-this.angle, 0, 1, 0);
				this.scene.scale(this.rock_scale_x, this.rock_scale_y, this.rock_scale_z);
				this.rock.display();
				this.scene.popMatrix();	
			}
			if(this.dropping){
				this.scene.pushMatrix();
				this.scene.translate(this.rock_dropping_pos[0], this.rock_dropping_pos[1], this.rock_dropping_pos[2]);
				this.scene.rotate(this.rock_dropping_ang, 0, 1, 0);
				this.scene.scale(this.rock_dropping_scale_x, this.rock_dropping_scale_y, this.rock_dropping_scale_z);
				this.rock.display();
				this.scene.popMatrix();
			}
			if(this.launching){
				this.scene.pushMatrix();
				this.scene.translate(this.rock_launching_pos[0], this.rock_launching_pos[1], this.rock_launching_pos[2]);
				this.scene.rotate(this.rock_launching_ang, 0, 1, 0);
				this.scene.scale(this.rock_launching_scale_x, this.rock_launching_scale_y, this.rock_launching_scale_z);
				this.rock.display();
				this.scene.popMatrix();
			}
		}

		this.scene.setActiveShader(this.scene.defaultShader);

		this.scene.pushMatrix();
		this.scene.translate(this.position[0], this.position[1], this.position[2]);
		this.scene.rotate(-this.angle, 0, 1, 0);
		super.display();
		this.scene.popMatrix();
	}
}