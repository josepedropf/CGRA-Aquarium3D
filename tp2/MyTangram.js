import {CGFobject} from '../lib/CGF.js';
import { MyDiamond } from "./MyDiamond.js";
import { MyParallelogram } from "./MyParallelogram.js";
import { MyTriangle } from "./MyTriangle.js";
import { MyTriangleBig } from "./MyTriangleBig.js";
import { MyTriangleSmall } from "./MyTriangleSmall.js";

/**
 * MyTangram
 * @constructor
 * @param scene - Reference to MyScene object
 */

export class MyTangram extends CGFobject {
	constructor(scene) {
		super(scene);
        this.init();
    }
	
	init() {
        this.diamond = new MyDiamond(this.scene);
        this.triangle = new MyTriangle(this.scene);
        this.s_triangle = new MyTriangleSmall(this.scene);
        this.b_triangle = new MyTriangleBig(this.scene);
        this.par = new MyParallelogram(this.scene);
    }
    
    display() {
        //green diamond
        var t2 = [
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            0.4, 4.6, 0, 1
         ];

        this.scene.pushMatrix();
        this.scene.multMatrix(t2);
        this.diamond.display();
        this.scene.popMatrix();

        //orange triangle
        this.scene.pushMatrix();
        this.scene.translate(0, 2, 0);
        this.scene.rotate(3*Math.PI/2, 0, 0, 1); 
        this.b_triangle.display();
        this.scene.popMatrix();

        //blue triangle
        this.scene.pushMatrix();
        this.scene.translate(1, -1, 0);
        this.scene.rotate(Math.PI/2, 0, 0, 1);
        this.b_triangle.display();
        this.scene.popMatrix();

        //yellow par
        this.scene.pushMatrix();
        this.scene.translate(0, 2, 0);
        this.scene.rotate(Math.PI/2, 0, 0, 1);
        this.scene.scale(-1,1,1);
        this.par.display();
        this.scene.popMatrix();

        //light pink triangle
        this.scene.pushMatrix();
        this.scene.translate(-1, -2.4, 0);
        this.scene.rotate(5*Math.PI/4, 0, 0, 1);
        this.triangle.display();
        this.scene.popMatrix();

        //purple triangle
        this.scene.pushMatrix();
        this.scene.translate(1.1,-3.1,0);
        this.scene.rotate(3*Math.PI/4, 0, 0, 1);
        this.s_triangle.display();
        this.scene.popMatrix();

        //red triangle
        this.scene.pushMatrix();
        this.scene.translate(-2.5, -3.1, 0);
        this.scene.rotate(Math.PI/4, 0, 0, 1);
        this.s_triangle.display();
        this.scene.popMatrix();
    
    }

}