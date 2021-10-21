import {CGFobject, CGFappearance, CGFtexture, CGFshader} from '../lib/CGF.js';

export class MyAnimatedFish extends CGFobject{
    constructor(scene, fish, centre_x, centre_z, heigth, radius, period, tailspeed) {
		super(scene);
		//this.texture = texture;
		this.fish = fish;
		this.centre_x = centre_x;
		this.centre_z = centre_z;
		this.heigth = heigth;
		this.radius = radius;
		this.period = period;
		this.tailspeed = tailspeed;
		this.movingtailspeed = tailspeed;
		this.init();
	}

	init(){
		this.angle = 0.0;
		this.position = [this.centre_x - this.radius, this.heigth, this.centre_z];
	}

	update(t){
		this.angle += 2*Math.PI / ((1000.0 / t) * this.period);
		console.log("PERIOD -> T:%f | Div:%f", t, ((1.0 / t) * this.period));
		if(this.angle >= 2 * Math.PI) this.angle = 0.0;
		this.movingtailspeed = this.tailspeed - 2 * ((2 * Math.PI * this.radius) / this.period);
		if(this.movingtailspeed < 2.0) this.movingtailspeed = 2.0;
		this.fish.update_anim(t / 1000.0, this.movingtailspeed, false, true);
		this.position = [this.centre_x + (Math.cos(-this.angle) * this.radius), this.heigth, this.centre_z - (Math.sin(-this.angle) * this.radius)];
	}

	display(){
		this.scene.pushMatrix();
		this.scene.translate(this.position[0], this.position[1], this.position[2]);
		this.scene.rotate(-this.angle, 0, 1, 0);
		this.fish.display();
		this.scene.popMatrix();
	}

}