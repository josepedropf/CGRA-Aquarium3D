import {CGFobject, CGFappearance, CGFtexture, CGFshader} from '../lib/CGF.js';
import { MyPlane } from './MyPlane.js';
import { MyPlaneSimple } from './MyPlaneSimple.js';
import { MyPlaneText } from './MyPlaneText.js';
import { MyPlaneAlt } from './MyPlaneAlt.js';
import { MyRockSet } from './MyRockSet.js';
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
export class MyFlatSeaFloor extends CGFobject {
	constructor(scene, texture_image, side, nrDivs, minS, maxS, minT, maxT) {
		super(scene);
		this.texture_image = texture_image;
		
		this.floor_image = new CGFtexture(this.scene, texture_image);
		
		this.plane = new MyPlane(this.scene, nrDivs, minS, maxS, minT, maxT);
		this.plane_alt = new MyPlaneAlt(this.scene, nrDivs, minS, maxS, minT, maxT);
		
		this.side = side;
		this.init();
	}
	init() {
		this.scene.floorAppearance = new CGFappearance(this.scene);
		this.scene.floorAppearance.setTexture(this.floor_image);

		
	}

	display(){
		this.scene.floorAppearance.apply();
		this.scene.pushMatrix();
		this.scene.scale(this.side, 1, this.side);
		this.plane_alt.display();
		this.scene.popMatrix();
	}

}
