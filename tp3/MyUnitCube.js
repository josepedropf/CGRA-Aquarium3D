import {CGFobject} from '../lib/CGF.js';

export class MyUnitCube extends CGFobject {
	constructor(scene) {
            super(scene);
		this.initBuffers();
	}
	
	initBuffers() {

            this.normals = [];

		this.vertices = [
            0, 0, 0,	//0
            1, 0, 0,	//1
            0, 1, 0,	//2
            0, 0, 1,	//3
            1, 1, 0,    //4
            1, 0, 1,    //5
            0, 1, 1,    //6
            1, 1, 1,    //7
            0, 0, 0,	//0
            1, 0, 0,	//1
            0, 1, 0,	//2
            0, 0, 1,	//3
            1, 1, 0,    //4
            1, 0, 1,    //5
            0, 1, 1,    //6
            1, 1, 1,    //7
            0, 0, 0,	//0
            1, 0, 0,	//1
            0, 1, 0,	//2
            0, 0, 1,	//3
            1, 1, 0,    //4
            1, 0, 1,    //5
            0, 1, 1,    //6
            1, 1, 1     //7
            ];
            
            
            var vcounter = 0;
            
            for(var i = 0; i < 24 ; i++){
                  if(vcounter <= 7){
                        if(this.vertices[3*i] == 1) this.normals.push(1, 0, 0);
                        else this.normals.push(-1, 0, 0);
                  }
                  else{
                        if(vcounter <= 15){
                              if(this.vertices[3*i + 1] == 1) this.normals.push(0, 1, 0);
                              else this.normals.push(0, -1, 0);
                        }
                        else{
                              if(this.vertices[3*i + 2] == 1) this.normals.push(0, 0, 1);
                              else this.normals.push(0, 0, -1);
                        }
                  }
                  vcounter++;
            }

            /*
            this.normals.push(-1, 0, 0);
            this.normals.push(1, 0, 0);
            this.normals.push(-1, 0, 0);
            this.normals.push(-1, 0, 0);
            this.normals.push(1, 0, 0);
            this.normals.push(1, 0, 0);
            this.normals.push(-1, 0, 0);
            this.normals.push(1, 0, 0);

            this.normals.push(0, -1, 0);
            this.normals.push(0, -1, 0);
            this.normals.push(0, 1, 0);
            this.normals.push(0, -1, 0);
            this.normals.push(0, 1, 0);
            this.normals.push(0, -1, 0);
            this.normals.push(0, 1, 0);
            this.normals.push(0, 1, 0);

            this.normals.push(0, 0, -1);
            this.normals.push(0, 0, -1);
            this.normals.push(0, 0, -1);
            this.normals.push(0, 0, 1);
            this.normals.push(0, 0, -1);
            this.normals.push(0, 0, 1);
            this.normals.push(0, 0, 1);
            this.normals.push(0, 0, 1);*/


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