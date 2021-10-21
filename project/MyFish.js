import {CGFobject, CGFappearance, CGFtexture, CGFshader} from '../lib/CGF.js';
import {MyPyramid} from './MyPyramid.js';
import {MySphere} from './MySphere.js';
import {MyTriangleBig} from './MyTriangleBig.js';
import {MyTriangleSmall} from './MyTriangleSmall.js';
import {MyRock} from './MyRock.js';
import {MyRandomSphere} from './MyRandomSphere.js';

export class MyFish extends CGFobject{
    constructor(scene, body_image, eye_image, color_r, color_g, color_b, ratio, slices, stacks, length) {
		super(scene);
		this.fish_texture = new CGFtexture(this.scene, body_image);
		this.eye_image = eye_image;
		this.color_r = color_r;
		this.color_g = color_g;
		this.color_b = color_b;
		this.ratio = ratio;
		this.slices = slices;
		this.stacks = stacks;
		this.length = length;

		if(this.ratio > 1.0) this.ratio = 1.0;
		if(this.ratio < 0.0) this.ratio = 0.0;

		this.init();
    }

    init() {
		this.rock = new MyRandomSphere(this.scene, this.slices, this.stacks);
		this.rock_scale = 0.0;
		this.rock_display = false;
		this.body = new MySphere(this.scene, 16, 16);
		this.left_fin = new MyTriangleSmall(this.scene);
		this.right_fin = new MyTriangleSmall(this.scene);
		this.top_fin = new MyTriangleSmall(this.scene);
		this.big_fin = new MyTriangleBig(this.scene);
		this.left_eye = new MySphere(this.scene, 16, 8);
		this.right_eye = new MySphere(this.scene, 16, 8);
		this.position = [0.0, 0.0, 0.0];
		this.velocity = 0.0;
		this.angle = 0.0;
		this.big_fin_angle = 0.0;
		this.side_rightfin_angle = 0.0;
		this.side_leftfin_angle = 0.0;
		this.side_fin_angle = 0.0;

		this.anim_status = [0, 0, 0, 0];

		this.scene.enableTextures(true);

		this.scene.color_material = new CGFappearance(this.scene);
		this.scene.color_material.setAmbient(this.color_r, this.color_g, this.color_b, 1.0);
        this.scene.color_material.setDiffuse(this.color_r, this.color_g, this.color_b, 1.0);
        this.scene.color_material.setSpecular(this.color_r, this.color_g, this.color_b, 1.0);
		this.scene.color_material.setShininess(10.0);

		this.scene.eyeAppearance = new CGFappearance(this.scene);
		this.scene.eyeAppearance.setAmbient(0.3, 0.3, 0.3, 1);
		this.scene.eyeAppearance.setDiffuse(0.7, 0.7, 0.7, 1);
		this.scene.eyeAppearance.setSpecular(0.0, 0.0, 0.0, 1);
		this.scene.eyeAppearance.setShininess(120);
        this.scene.eyeAppearance.loadTexture(this.eye_image);
		
		this.scene.text_material = new CGFappearance(this.scene);
		this.scene.text_material.setTexture(this.fish_texture);

		this.shader = new CGFshader(this.scene.gl, "./shaders/fish.vert", "./shaders/fish.frag");
		this.color_shader = new CGFshader(this.scene.gl, "./shaders/color.vert", "./shaders/color.frag");

		this.shader.setUniformsValues({ color_r: this.color_r });
		this.shader.setUniformsValues({ color_g: this.color_g });
		this.shader.setUniformsValues({ color_b: this.color_b });
		this.shader.setUniformsValues({ uSampler: 0 });

		this.shader.setUniformsValues({ ratio: this.ratio });

		this.color_shader.setUniformsValues({ color_r: this.color_r });
		this.color_shader.setUniformsValues({ color_g: this.color_g });
		this.color_shader.setUniformsValues({ color_b: this.color_b });
	
	}

	set_body_texture(new_image){
		this.fish_texture = new CGFtexture(this.scene, new_image);
		this.scene.text_material.setTexture(this.fish_texture);
	}

	set_eye_texture(new_image){
		this.scene.eyeAppearance.loadTexture(new_image);
	}

	set_color(color){
		/*
		this.scene.color_material.setAmbient(color[0], color[1], color[2], 1.0);
        this.scene.color_material.setDiffuse(color[0], color[1], color[2], 1.0);
        this.scene.color_material.setSpecular(color[0], color[1], color[2], 1.0);
		this.scene.color_material.setShininess(10.0);
		*/
		this.shader.setUniformsValues({ color_r: color[0] });
		this.shader.setUniformsValues({ color_g: color[1] });
		this.shader.setUniformsValues({ color_b: color[2] });

		this.color_shader.setUniformsValues({ color_r: color[0] });
		this.color_shader.setUniformsValues({ color_g: color[1] });
		this.color_shader.setUniformsValues({ color_b: color[2] });
	}
	

	ratio_to_vertex_interval(){
		var interval = [0.0, 0.0, 0.0];
		var dif = 0.5 - this.ratio;
		dif = dif / 2.0;
		if(dif < 0){
			interval[0] = 1.0 + dif;
			interval[1] = 0.5 - dif;
		}
		else{
			interval[0] = dif;
			interval[1] = 0.5 - dif;
			interval[2] = 1.0;
		}

		return interval;
	}

	anim_fin(angle, range, state, period){
		var increment = period / 4.0;
		switch(state){
			case -1:
				if(angle <= - range){
					state = 2;
					angle -= range/increment;
				}
				else{
					angle -= range/increment;
				}
				break;

			case 0:
				range = Math.PI / 9;
				angle += range/increment;
				state = 1;
				break;

			case 1:
				if(angle >= range){
					state = -1;
					angle += range/increment;
				}
				else{
					angle += range/increment;
				}
				break;

			case 2:
				if(angle >= 0){
					range = Math.PI / 9;
					angle += range/increment;
					state = 1;
				}
				else{
					angle += range/increment;
				}
				break;
			
			default:
				state = 0;
				break;
		}
		var result = [angle, range, state];
		return result;
	}

	update_anim(t, period, turningleft, turningright){
		var timeFactor = t / period % period;
	
		var side_fin_args = this.anim_fin(this.side_fin_angle, this.anim_status[1], this.anim_status[3], period*1.5);

		var big_fin_args = this.anim_fin(this.big_fin_angle, this.anim_status[0], this.anim_status[2], period);

	
		this.big_fin_angle = big_fin_args[0];
		this.side_rightfin_angle = side_fin_args[0];
		this.side_leftfin_angle = side_fin_args[0];
		this.side_fin_angle = side_fin_args[0];

		if (turningright == true && turningleft == false) {
			this.side_rightfin_angle = 0.0;
		}

		if (turningleft == true && turningright == false) {
			this.side_leftfin_angle = 0.0;
		}

		this.anim_status[0] = big_fin_args[1];
		this.anim_status[1] = side_fin_args[1];
		this.anim_status[2] = big_fin_args[2];
		this.anim_status[3] = side_fin_args[2];

	}
	
	display() {

		this.fish_texture.bind(0);
		var OFFSET = this.length/4.0;
		var XOFFSET = 1.50 * this.length;
		var YOFFSET = 2.00 * this.length;
		var ZOFFSET = 3.50 * this.length;
		
		

		if(this.rock_display){
			this.scene.pushMatrix();
			this.scene.translate(0.0, 1.0, 0.25);
			this.scene.translate(this.position[0], this.position[1], this.position[2]);
      		this.scene.scale(this.rock_scale, this.rock_scale, this.rock_scale);
			this.rock.display();
			this.scene.popMatrix();
		}
		
		this.scene.setActiveShader(this.shader);
		this.scene.pushMatrix();
		this.scene.translate(this.position[0], this.position[1], this.position[2]);
		this.scene.translate(0, 0, 0);
		this.scene.scale(XOFFSET, YOFFSET, ZOFFSET);
		this.scene.scale(OFFSET, OFFSET, OFFSET);

		this.scene.rotate(Math.PI / 2.0, 1, 0, 0);

		this.body.display();
		this.scene.popMatrix();
		this.scene.setActiveShader(this.color_shader);
		

		//left fin
		this.scene.pushMatrix();
		this.scene.translate(this.position[0], this.position[1], this.position[2]);
		this.scene.translate(1.1 * OFFSET, -0.5 * OFFSET, 0.2 * OFFSET);
		this.scene.rotate(Math.PI/2 + Math.PI/3.5, 1, 0, 0);
		this.scene.rotate(Math.PI/2 + Math.PI/4, 0, 1, 0);
		this.scene.rotate(this.side_leftfin_angle, 1, 0, 0);
		this.scene.scale(0.6, 0.6, 0.6);
		this.scene.scale(OFFSET, OFFSET, OFFSET);
		this.left_fin.display();
		this.scene.popMatrix();

		//right fin
		this.scene.pushMatrix();
		this.scene.translate(this.position[0], this.position[1], this.position[2]);
		this.scene.translate(-1.1 * OFFSET, -0.5 * OFFSET, 0.2 * OFFSET);
		this.scene.rotate(Math.PI/2 + Math.PI/3.5, 1, 0, 0);
		this.scene.rotate(-Math.PI/2 - Math.PI/4, 0, 1, 0);
		this.scene.rotate(this.side_rightfin_angle, 1, 0, 0);
		this.scene.scale(0.6, 0.6, 0.6);
		this.scene.scale(OFFSET, OFFSET, OFFSET); 
		this.right_fin.display();
		this.scene.popMatrix();


		this.scene.pushMatrix();
		this.scene.translate(this.position[0], this.position[1], this.position[2]);
		this.scene.translate(0, 0, -2.9 * OFFSET);
		this.scene.rotate(Math.PI/2, 0, 0, 1);  
		this.scene.rotate(Math.PI/2, 1, 0, 0);
		this.scene.translate(0, 1.2 * OFFSET, 0);
		this.scene.rotate(this.big_fin_angle, 1, 0, 0);
		this.scene.translate(0, -1.2 * OFFSET, 0);
		this.scene.scale(0.6, 0.6, 0.6);
		this.scene.scale(OFFSET, OFFSET, OFFSET);
		
		this.big_fin.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.translate(this.position[0], this.position[1], this.position[2]);
		this.scene.translate(0 * OFFSET, 1.4 * OFFSET, 0.3 * OFFSET);
		this.scene.rotate(-Math.PI/2 - Math.PI/4, 1, 0, 0);
		this.scene.rotate(-Math.PI/2, 0, 1, 0);
		this.scene.scale(0.8, 0.8, 0.8);
		this.scene.scale(OFFSET, OFFSET, OFFSET);
		this.top_fin.display();
		this.scene.popMatrix();

		this.scene.setActiveShader(this.scene.defaultShader);

		this.scene.pushMatrix();
		this.scene.translate(this.position[0], this.position[1], this.position[2]);
		this.scene.translate(0.5 * OFFSET, 0.2 * OFFSET, 1 * OFFSET);
		this.scene.rotate(Math.PI - Math.PI/8, 0, 1, 0);
		this.scene.scale(0.2, 0.2, 0.2);
		this.scene.scale(OFFSET, OFFSET, OFFSET);
		this.scene.eyeAppearance.apply();
		this.left_eye.display();
		this.scene.popMatrix();


		this.scene.pushMatrix();
		this.scene.translate(this.position[0], this.position[1], this.position[2]);
		this.scene.translate(-0.5 * OFFSET, 0.2 * OFFSET, 1 * OFFSET);
		this.scene.rotate(Math.PI/8, 0, 1, 0);
		this.scene.scale(0.2, 0.2, 0.2);
		this.scene.scale(OFFSET, OFFSET, OFFSET);
		this.scene.eyeAppearance.apply();
		this.right_eye.display();
		this.scene.popMatrix();
		
		this.scene.setActiveShader(this.scene.defaultShader);
	}
}