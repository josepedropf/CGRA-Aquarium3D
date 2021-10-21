import {CGFobject, CGFappearance, CGFtexture, CGFshader} from '../lib/CGF.js';
import { MyPlane } from './MyPlane.js';
import { MyQuad } from './MyQuad.js';
import { MyQuadUp } from './MyQuadUp.js';

export class MyWaterSurface extends CGFobject {
	constructor(scene, texture_image, texture_dist, texture_anim, side, height, max_h) {
		super(scene);
		this.texture_image = texture_image;
		this.texture_dist = texture_dist;
		this.texture_anim = texture_anim;
		this.surface_color = new CGFtexture(this.scene, texture_image);
		this.surface_dist = new CGFtexture(this.scene, texture_dist);
		this.surface_anim = new CGFtexture(this.scene, texture_anim);
		this.surface = new MyQuadUp(this.scene);
		this.height = height;
		this.side = side;
		this.max_h = max_h;
		this.init();
	}
	init() {
		this.scene.surfaceAppearance = new CGFappearance(this.scene);
		this.scene.surfaceAppearance.setTexture(this.surface_color);

		this.scene.distsurfaceAppearance = new CGFappearance(this.scene);
		this.scene.distsurfaceAppearance.setTexture(this.surface_dist);

		this.scene.animsurfaceAppearance = new CGFappearance(this.scene);
		this.scene.animsurfaceAppearance.setTexture(this.surface_anim);

		this.water_shader = new CGFshader(this.scene.gl, "./shaders/water_surface.vert", "./shaders/water_surface.frag");
		
		this.water_shader.setUniformsValues({ uSampler: 6 });
		this.water_shader.setUniformsValues({ uSampler2: 7 });
		this.water_shader.setUniformsValues({ uSampler3: 8 });
		
		this.water_shader.setUniformsValues({ max_height: this.max_h });
		this.water_shader.setUniformsValues({ timeFactor: 0 });

		
	}

	update(t, period){
		
		this.water_shader.setUniformsValues({ timeFactor: t / period % period });
	}

	display(){

		this.surface_color.bind(6);
		this.surface_dist.bind(7);
		this.surface_anim.bind(8);
		this.scene.surfaceAppearance.apply();

		this.scene.setActiveShader(this.water_shader);
		this.scene.pushMatrix();

		this.scene.translate(0, this.height, 0);
		this.scene.rotate(Math.PI/2, 1, 0, 0);
		this.scene.scale(this.side, this.side, this.side);
		this.surface.display();

		this.scene.popMatrix();
		this.scene.setActiveShader(this.scene.defaultShader);

	}

}
