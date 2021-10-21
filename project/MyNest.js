import {CGFobject, CGFtexture, CGFappearance} from '../lib/CGF.js';

export class MyNest extends CGFobject {
    constructor(scene, texture_image, texture_vert, nest_start, nest_end, bottom) {
        super(scene);
        this.nest_texture = new CGFtexture(this.scene, texture_image);
        this.texture_image = texture_image;
        this.nest_vert = new CGFtexture(this.scene, texture_vert);
        this.texture_vert = texture_vert;
        this.nest_start = nest_start;
        this.nest_end = nest_end;
        this.nest_centre = (nest_start + nest_end) / 2.0;
        this.bottom = bottom;
        this.radius = (nest_end - nest_start) / 2.0;
    }


    getY(x, z, offset){
        var dist = Math.sqrt(Math.pow((x - this.nest_centre), 2) + Math.pow((z - this.nest_centre), 2));
        var coef = (this.radius - dist) / this.radius;
        if(coef < 0.0) coef = 0.0;
        else if(coef > 1.0) coef = 1.0;
        /*
        console.log("GET Y");
        console.log("centre");
        console.log(this.nest_centre);
        console.log("x");
        console.log(x);
        console.log("z");
        console.log(z);
        console.log("Dist");
        console.log(dist);
        console.log("Coef");
        console.log(coef);
        console.log("FINAL Y");
        console.log((-this.bottom * coef) + offset);
        */
        return (-this.bottom * coef) + offset;
    }

    inNest(x, z, displacement){
        
        if(x >= this.nest_start - displacement && x <= this.nest_end + displacement && z >= this.nest_start - displacement && z <= this.nest_end + displacement){

            return true;
        } 
        
        return false;
    }

}