import {CGFobject, CGFtexture, CGFappearance} from '../lib/CGF.js';
import { MyPyramid } from "./MyPyramid.js";
/**
* MyPillar
* @constructor
 * @param scene - Reference to MyScene object
 * @param slices - number of divisions around the Y axis
 * @param height - height of the Cylinder
*/
export class MySeaweed extends CGFobject {
    constructor(scene, slices, stacks, texture_seaweed) {
        super(scene);
        this.pyramid = new MyPyramid(this.scene, slices, stacks);
        this.texture_seaweed = texture_seaweed;
        this.seaweed_texture = new CGFtexture(this.scene, texture_seaweed);

        this.init();
    }

    init(){
        this.seaWeedAppearance = new CGFappearance(this);
		this.seaWeedAppearance.setAmbient(0.3, 0.3, 0.3, 1);
		this.seaWeedAppearance.setDiffuse(0.7, 0.7, 0.7, 1);
		this.seaWeedAppearance.setSpecular(0.0, 0.0, 0.0, 1);
		this.seaWeedAppearance.setShininess(120);
        this.seaWeedAppearance.loadTexture(this.texture_seaWeed); //need to choose one 
    
    }

    display(){
        this.scene.pushMatrix();
        this.scene.seaWeedAppearance.apply();
        this.scene.scale(0.02,0.7,0.08);
		this.pyramid.display();
		this.scene.popMatrix();
        
    }



}


