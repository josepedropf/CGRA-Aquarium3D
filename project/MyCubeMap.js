import {CGFobject, CGFappearance, CGFtexture} from '../lib/CGF.js';
import { MyQuad } from "./MyQuad.js";

/**
 * MyUnitCubeQuad
 * @constructor
 * @param scene - Reference to MyScene object
 */

export class MyCubeMap extends CGFobject {
	constructor(scene, side, texture_bo, texture_l, texture_r, texture_ba, texture_f, texture_t) {
        super(scene);
        
        this.texture_bo = new CGFtexture(this.scene, texture_bo);
        this.texture_l = new CGFtexture(this.scene, texture_l);
        this.texture_r = new CGFtexture(this.scene, texture_r);
        this.texture_ba = new CGFtexture(this.scene, texture_ba);
        this.texture_f = new CGFtexture(this.scene, texture_f);
        this.texture_t = new CGFtexture(this.scene, texture_t);
        this.SIDE = side;
        this.OFFSET = 1/this.SIDE;


        this.init();
    }
	
	init() {
        this.quad = new MyQuad(this.scene);
    }

    adjust(){
        this.scene.scale(this.SIDE, this.SIDE, this.SIDE);
        this.scene.translate(this.scene.camera.position[0] * this.OFFSET, this.scene.camera.position[1] * this.OFFSET, this.scene.camera.position[2] * this.OFFSET);
    }
    
    display() {
        var switcher = 0;
        var quadTextCoord = [0, 1, 1, 1, 0, 0, 1, 0];
        var quadTextCoord_rot90 = [1, 1, 1, 0, 0, 1, 0, 0];
        var quadTextCoord_rot270 = [0, 0, 0, 1, 1, 0, 1, 1]; 

        this.scene.face_material = new CGFappearance(this.scene);

        
        var H_OFFSET = -0.5;

        //Bottom Face
        this.scene.pushMatrix();
        this.adjust();
        this.scene.translate(0, H_OFFSET, 0);
        this.scene.rotate(Math.PI/2, 1, 0, 0);

        this.scene.rotate(Math.PI, 1, 0, 0);
        
        if(switcher == 0){
            this.scene.face_material.setTexture(this.texture_bo);
            this.scene.face_material.apply();
            this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        } 
        this.quad.display();
        this.scene.popMatrix();
        switcher++;

        //Right Face
        this.scene.pushMatrix();
        this.adjust();
        this.scene.translate(-0.5, 0.5 + H_OFFSET, 0);
        this.scene.rotate(Math.PI/2, 0, 1, 0);
        
        if(switcher == 1){
            this.scene.face_material.setTexture(this.texture_r);
            this.scene.face_material.apply();
            this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        } 
        this.quad.display();
        this.scene.popMatrix();
        switcher++;

        //Left Face
        this.scene.pushMatrix();
        this.adjust();
        this.scene.translate(0.5, 0.5 + H_OFFSET, 0);
        this.scene.rotate(Math.PI/2, 0, 1, 0);

        this.scene.rotate(Math.PI, 0, 1, 0);

        if(switcher == 2){
            this.scene.face_material.setTexture(this.texture_l);
            this.scene.face_material.apply();
            this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        } 
        this.quad.display();
        this.scene.popMatrix();
        switcher++;

        //Back Face
        this.scene.pushMatrix();
        this.adjust();
        this.scene.translate(0, 0.5 + H_OFFSET, -0.5);
        //this.scene.rotate(Math.PI/2, 0, 0, 1);
        if(switcher == 3){
            this.scene.face_material.setTexture(this.texture_ba);
            //this.quad.updateTexCoords(quadTextCoord_rot270);
            this.scene.face_material.apply();
            this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        } 
        this.quad.display();
        this.scene.popMatrix();
        switcher++;

        //Front Face
        this.scene.pushMatrix();
        this.adjust();
        this.scene.translate(0, 0.5 + H_OFFSET, 0.5);
        //this.scene.rotate(Math.PI/2, 0, 0, 1);

        this.scene.rotate(Math.PI, 0, 1, 0);

        if(switcher == 4){
            this.scene.face_material.setTexture(this.texture_f);
            //this.quad.updateTexCoords(quadTextCoord_rot270);
            this.scene.face_material.apply();
            this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        } 
        this.quad.display();
        this.scene.popMatrix();
        switcher++;

        //Top Face
        this.scene.pushMatrix();
        this.adjust();
        this.scene.translate(0, 1 + H_OFFSET, 0);
        this.scene.rotate(Math.PI/2, 1, 0, 0);
        if(switcher == 5){
            this.scene.face_material.setTexture(this.texture_t);
            //this.quad.updateTexCoords(quadTextCoord);
            this.scene.face_material.apply();
            this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        } 
        this.quad.display();
        this.scene.popMatrix();
        
    }
    
}