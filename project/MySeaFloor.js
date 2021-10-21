import {CGFobject, CGFappearance, CGFtexture, CGFshader} from '../lib/CGF.js';
import { MyPlane } from './MyPlane.js';
import { MyPlaneSimple } from './MyPlaneSimple.js';
import { MyPlaneText } from './MyPlaneText.js';
import { MyPlaneAlt } from './MyPlaneAlt.js';
import { MyRockSet } from './MyRockSet.js';
import { MyFlatSeaFloor } from './MyFlatSeaFloor.js';
/**
* MyPlane
* @constructor
 * @param scene - Reference to MyScene object
 * @param nDivs - number of divisions in both directions of the surface
 * @param minS - minimum texture coordinate in S
 * @param maxS - maximum texture coordinate in S
 * @param minT - minimum texture coordinate in T
 * @param maxT - maximum texture coordinate in T
*/
export class MySeaFloor extends CGFobject {
	constructor(scene, texture_image, texture_h, texture_color, side, max_h, base_height, hscale, nrDivs, minS, maxS, minT, maxT, nest) {
		super(scene);
		this.texture_image = texture_image;
		this.texture_h = texture_h;
		this.texture_color = texture_color;
		this.shell_h = nest.texture_vert;
		this.nest_text = nest.texture_image;
		this.shell_height = new CGFtexture(this.scene, nest.texture_vert);
		this.floor_image = new CGFtexture(this.scene, texture_image);
		this.floor_texture = new CGFtexture(this.scene, texture_h);
		this.floor_color = new CGFtexture(this.scene, texture_color);
		this.nest_texture = new CGFtexture(this.scene, nest.texture_image);
		this.plane = new MyPlane(this.scene, nrDivs, minS, maxS, minT, maxT);
		this.plane_alt = new MyPlaneAlt(this.scene, nrDivs, minS, maxS, minT, maxT);
		this.flat_floor = new MyFlatSeaFloor(this.scene, this.texture_image, side, nrDivs, minS, maxS, minT, maxT);
		this.base_height = base_height;
		this.side = side;
		this.hscale = hscale;
		this.max_h = max_h;
		this.nest = nest;
		this.init();
	}
	init() {
		this.scene.floorAppearance = new CGFappearance(this.scene);
		this.scene.floorAppearance.setTexture(this.floor_image);

		this.scene.hfloorAppearance = new CGFappearance(this.scene);
		this.scene.hfloorAppearance.setTexture(this.floor_texture);

		this.scene.cfloorAppearance = new CGFappearance(this.scene);
		this.scene.cfloorAppearance.setTexture(this.floor_color);

		this.scene.hshellAppearance = new CGFappearance(this.scene);
		this.scene.hshellAppearance.setTexture(this.shell_height);

		this.scene.nestAppearance = new CGFappearance(this.scene);
		this.scene.nestAppearance.setTexture(this.nest_texture);

		this.sea_shader = new CGFshader(this.scene.gl, "./shaders/sea_floor.vert", "./shaders/sea_floor.frag");
		
		
		this.sea_shader.setUniformsValues({ uSampler: 1 });
		this.sea_shader.setUniformsValues({ uSampler2: 2 });
		this.sea_shader.setUniformsValues({ uSampler3: 3 });
		this.sea_shader.setUniformsValues({ uSamplersh: 4 });
		this.sea_shader.setUniformsValues({ uSamplernest: 5 });
		
		this.sea_shader.setUniformsValues({ max_height: this.max_h });
		this.sea_shader.setUniformsValues({ base_height: this.base_height });
		console.log((this.nest.nest_start + this.side/2.0) / this.side);
		console.log((this.nest.nest_end + this.side/2.0) / this.side);
		this.sea_shader.setUniformsValues({ nest_start: (this.nest.nest_start + this.side/2.0) / this.side  });
		this.sea_shader.setUniformsValues({ nest_end: (this.nest.nest_end + this.side/2.0) / this.side });
		this.sea_shader.setUniformsValues({ bottom: this.nest.bottom });

		
	}

	set_nest_texture(new_image){
		this.nest.texture_image = new_image;
		this.nest_texture = new CGFtexture(this.scene, this.nest.texture_image);
	}

	display(){

		this.floor_image.bind(1);
		this.floor_texture.bind(2);
		this.floor_color.bind(3);
		this.shell_height.bind(4);
		this.nest_texture.bind(5);
		this.scene.floorAppearance.apply();


		this.scene.setActiveShader(this.sea_shader);
		this.scene.pushMatrix();



		this.scene.scale(this.side, 1, this.side);

		this.plane_alt.display();
		this.scene.popMatrix();
		this.scene.setActiveShader(this.scene.defaultShader);

	}

}
