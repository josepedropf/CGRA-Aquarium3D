import {CGFobject} from '../lib/CGF.js';

export class MyUnitCube extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initBuffers();
	}
	
	initBuffers() {

		this.vertices = [
			0, 0, 0,	//0
			1, 0, 0,	//1
			0, 1, 0,	//2
            0, 0, 1,	//3
            1, 1, 0,    //4
            1, 0, 1,    //5
            0, 1, 1,    //6
            1, 1, 1     //7
		];
		

		//Counter-clockwise reference of vertices
		this.indices = [
            2, 0, 1,
            1, 4, 2,
            1, 0, 2,
            2, 4, 1,    //Bottom Face
            7, 5, 1,
            1, 4, 7,
            1, 5, 7,
            7, 4, 1,    //Front Face
            6, 7, 4,
            4, 2, 6,
            4, 7, 6,
            6, 2, 4,    //Right Face
            6, 3, 5,
            5, 7, 6,
            5, 3, 6,
            6, 7, 5,    //Top Face
            5, 3, 0,
            0, 1, 5,
            0, 3, 5,
            5, 1, 0,    //Left Face
            3, 0, 2,
            2, 6, 3,
            2, 0, 3,
            3, 6, 2     //Back Face
		];

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
}