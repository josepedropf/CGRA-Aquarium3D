import {CGFobject, CGFtexture, CGFappearance} from '../lib/CGF.js';
import { MyCylinder } from "./MyCylinder.js";
/**
* MyPillar
* @constructor
 * @param scene - Reference to MyScene object
 * @param slices - number of divisions around the Y axis
 * @param height - height of the Cylinder
*/
export class MyPillar extends CGFobject {
    constructor(scene, slices, height, texture_pillar) {
        super(scene);
        this.cylinder = new MyCylinder(this.scene, slices, height);

        this.texture_pillar = texture_pillar;
        this.pillar_texture = new CGFtexture(this.scene, texture_pillar);

        this.init();
    }

    init(){
        this.scene.enableTextures(true);
        this.scene.pillarAppearance = new CGFappearance(this.scene);
		this.scene.pillarAppearance.setAmbient(0.3, 0.3, 0.3, 1);
		this.scene.pillarAppearance.setDiffuse(0.7, 0.7, 0.7, 1);
		this.scene.pillarAppearance.setSpecular(0.0, 0.0, 0.0, 1);
		this.scene.pillarAppearance.setShininess(120);
        this.scene.pillarAppearance.loadTexture(this.texture_pillar); 
        
    }

    set_texture(new_image){
        this.scene.pillarAppearance.loadTexture(new_image);
    }

    display(){
        this.scene.pushMatrix();
        this.scene.pillarAppearance.apply();
		this.cylinder.display();
		this.scene.popMatrix();
    }
}


