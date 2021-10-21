import {CGFobject, CGFappearance, CGFtexture} from '../lib/CGF.js';
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

        this.scene.enableTextures(true);
        
        this.scene.green_material = new CGFappearance(this.scene);
        this.scene.green_material.setAmbient(0, 1, 0, 1.0);
        this.scene.green_material.setDiffuse(0, 1, 0, 1.0);
        this.scene.green_material.setSpecular(0, 1, 0, 2.0);
        this.scene.green_material.setShininess(10.0);

        
        this.texture_tangram = new CGFtexture(this.scene, 'images/tangram.png');
        this.scene.new_material = new CGFappearance(this.scene);
        //this.scene.new_material.setAmbient(0, 1, 0, 1.0);
        //this.scene.new_material.setDiffuse(0, 1, 0, 1.0);
        //this.scene.new_material.setSpecular(0, 1, 0, 2.0);
        this.scene.new_material.setTexture(this.texture_tangram);

        var orange_r = 1.2; 
        var orange_g = 0.75; 
        var orange_b = 0; 

        this.scene.orange_material = new CGFappearance(this.scene);
        this.scene.orange_material.setAmbient(orange_r, orange_g, orange_b, 1.0);
        this.scene.orange_material.setDiffuse(orange_r, orange_g, orange_b, 1.0);
        this.scene.orange_material.setSpecular(orange_r, orange_g, orange_b, 2.0);
        this.scene.orange_material.setShininess(10.0);

        this.scene.blue_material = new CGFappearance(this.scene);
        this.scene.blue_material.setAmbient(0, 0, 1, 1.0);
        this.scene.blue_material.setDiffuse(0, 0, 1, 1.0);
        this.scene.blue_material.setSpecular(0, 0, 1, 2.0);
        this.scene.blue_material.setShininess(10.0);

        var yellow_r = 1; 
        var yellow_g = 1; 
        var yellow_b = 0;

        this.scene.yellow_material = new CGFappearance(this.scene);
        this.scene.yellow_material.setAmbient(yellow_r, yellow_g, yellow_b, 1.0);
        this.scene.yellow_material.setDiffuse(yellow_r, yellow_g, yellow_b, 1.0);
        this.scene.yellow_material.setSpecular(yellow_r, yellow_g, yellow_b, 2.0);
        this.scene.yellow_material.setShininess(10.0);

        var purple_r = 1; 
        var purple_g = 0; 
        var purple_b = 1;

        this.scene.purple_material = new CGFappearance(this.scene);
        this.scene.purple_material.setAmbient(purple_r, purple_g, purple_b, 1.0);
        this.scene.purple_material.setDiffuse(purple_r, purple_g, purple_b, 1.0);
        this.scene.purple_material.setSpecular(purple_r, purple_g, purple_b, 2.0);
        this.scene.purple_material.setShininess(10.0);

        var pink_r = 1; 
        var pink_g = 0.75; 
        var pink_b = 0.79;

        this.scene.pink_material = new CGFappearance(this.scene);
        this.scene.pink_material.setAmbient(pink_r, pink_g, pink_b, 1.0);
        this.scene.pink_material.setDiffuse(pink_r, pink_g, pink_b, 1.0);
        this.scene.pink_material.setSpecular(pink_r, pink_g, pink_b, 2.0);
        this.scene.pink_material.setShininess(10.0);

        this.scene.red_material = new CGFappearance(this.scene);
        this.scene.red_material.setAmbient(1, 0, 0, 1.0);
        this.scene.red_material.setDiffuse(1, 0, 0, 1.0);
        this.scene.red_material.setSpecular(1, 0, 0, 2.0);
        this.scene.red_material.setShininess(10.0);

    }
    
    display() {
        var bluetc = [0.5, 0.5, 0, 0, 1, 0, 0.5, 0.5, 0, 0, 1, 0];
        var orangetc = [0.5, 0.5, 1, 0,	1, 1, 0.5, 0.5,	1, 0, 1, 1];
        var purpletc = [0.25, 0.25, 0, 0, 0, 0.5, 0.25, 0.25, 0, 0, 0, 0.5];
        var redtc = [0.5, 0.5, 0.25, 0.75, 0.75, 0.75, 0.5, 0.5, 0.25, 0.75, 0.75, 0.75];
        var bt = true;
        var st = true;
        //green diamond
        var t2 = [
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            0.4, 4.6, 0, 1
         ];

        this.scene.pushMatrix();
        this.scene.multMatrix(t2);
        //this.scene.green_material.apply();
        //this.scene.materials[4].apply()
        this.scene.new_material.apply();
        this.diamond.display();
        this.scene.popMatrix();

        //orange triangle
        this.scene.pushMatrix();
        this.scene.translate(0, 2, 0);
        this.scene.rotate(3*Math.PI/2, 0, 0, 1);
        //this.scene.orange_material.apply();
        if(bt) this.b_triangle.updateTexCoords(orangetc);
        this.b_triangle.display();
        this.scene.popMatrix();

        bt = false;

        //blue triangle
        this.scene.pushMatrix();
        this.scene.translate(1, -1, 0);
        this.scene.rotate(Math.PI/2, 0, 0, 1);
        //this.scene.blue_material.apply();
        if(!bt) this.b_triangle.updateTexCoords(bluetc);
        this.scene.new_material.apply();
        this.b_triangle.display();
        this.scene.popMatrix();

        //yellow par
        this.scene.pushMatrix();
        this.scene.translate(0, 2, 0);
        this.scene.rotate(Math.PI/2, 0, 0, 1);
        this.scene.scale(-1,1,1);
        //this.scene.yellow_material.apply();
        this.par.display();
        this.scene.popMatrix();

        //light pink triangle
        this.scene.pushMatrix();
        this.scene.translate(-1, -2.4, 0);
        this.scene.rotate(5*Math.PI/4, 0, 0, 1);
        //this.scene.pink_material.apply();
        this.triangle.display();
        this.scene.popMatrix();

        //purple triangle
        this.scene.pushMatrix();
        this.scene.translate(1.1,-3.1,0);
        this.scene.rotate(3*Math.PI/4, 0, 0, 1);
        //this.scene.purple_material.apply();
        if(st) this.s_triangle.updateTexCoords(purpletc);
        this.s_triangle.display();
        this.scene.popMatrix();

         st = false;

        //red triangle
        this.scene.pushMatrix();
        this.scene.translate(-2.5, -3.1, 0);
        this.scene.rotate(Math.PI/4, 0, 0, 1);
        //this.scene.red_material.apply();
        if(!st) this.s_triangle.updateTexCoords(redtc);
        this.s_triangle.display();
        this.scene.popMatrix();
    
    }

}