import {CGFobject} from '../lib/CGF.js';
/**
* MyCylinder
* @constructor
 * @param scene - Reference to MyScene object
 * @param slices - number of divisions around the Y axis
 * @param height - height of the Cylinder
*/
export class MyCylinder extends CGFobject {
    constructor(scene, slices, height) {
        super(scene);
        this.slices = slices;
        this.height = height;
        this.initBuffers();
    }

    delZe(pointList, ind){
        console.log("DelZé: " + pointList.length);
        console.log("DelZé List: " + pointList);
        if(pointList.length == 3){
            
            ind.push(pointList[0], pointList[1], pointList[2]);
            ind.push(pointList[2], pointList[1], pointList[0]);
        }
        if(pointList.length == 4){
            ind.push(pointList[0], pointList[1], pointList[2]);
            ind.push(pointList[2], pointList[1], pointList[0]);
            ind.push(pointList[2], pointList[3], pointList[0]);
            ind.push(pointList[0], pointList[3], pointList[2]);
        }

        if(pointList.length > 4){
            var new_pointList = [pointList[0]];
            var a = 0;

            for(var i = 0; i < pointList.length - 3 && a + 2 <= pointList.length; i++){
                
                var vert0 = a;
                var vert1 = a + 1;
                var vert2 = a + 2;
                if(vert0 >= pointList.length) vert0 -= pointList.length;
                if(vert1 >= pointList.length) vert1 -= pointList.length;
                if(vert2 >= pointList.length) vert2 -= pointList.length;
                ind.push(pointList[vert0], pointList[vert1], pointList[vert2]);
                ind.push(pointList[vert2], pointList[vert1], pointList[vert0]);
                a += 2;
                if(a < pointList.length) new_pointList.push(pointList[a]);
            }

            this.delZe(new_pointList, ind);
        }
    }


    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];

        var ang = 0;
        var alphaAng = 2*Math.PI/this.slices;
        

        for(var i = 0.0; i <= this.slices; i++){
            // All vertices have to be declared for a given face
            // even if they are shared with others, as the normals 
            // in each face will be different

            var sa=Math.sin(ang);

            var ca=Math.cos(ang);
            
            this.vertices.push(ca, 0, sa);
            
            this.texCoords.push(1-(i / this.slices), 1);
            this.vertices.push(ca, this.height, sa);
            
            this.texCoords.push(1-(i / this.slices), 0);


            if(i == this.slices) console.log(this.vertices);
            if(i == this.slices) console.log(this.texCoords);
            // triangle normal computed by cross product of two edges
            var normal= [
                sa,
                0,
                ca
            ];

            // normalization
            var nsize=Math.sqrt(
                normal[0]*normal[0]+
                normal[1]*normal[1]+
                normal[2]*normal[2]
                );
            normal[0]/=nsize;
            normal[1]/=nsize;
            normal[2]/=nsize;

            // push normal once for each vertex of this triangle
            this.normals.push(...normal);
            this.normals.push(...normal);

            var vert0 = 2*i;
            var vert1 = 2*i + 1;
            var vert2 = 2*i + 2;
            var vert3 = 2*i + 3;
            
            if(i != this.slices){
                
                if(vert2 >= 2 * this.slices) vert2 = 0;
                if(vert3 >= 2 * this.slices) vert3 = 1;
            }
            else{
                vert0 = 2 * i - 2;
                vert1 = 2 * i - 1;
                vert2 = 2 * i;
                vert3 = 2 * i + 1;

            }
            
            this.indices.push(vert0, vert1, vert3);
            this.indices.push(vert0, vert2, vert3);
            this.indices.push(vert3, vert1, vert0);
            this.indices.push(vert3, vert2, vert0);
            

            ang+=alphaAng;
        }

        var base_pointList = [];
        var top_pointList = [];

        for(var i = 0; i < this.slices * 2; i++){
            if(i % 2 == 0)
                base_pointList.push(i);
            else
                top_pointList.push(i);
        }
        console.log(base_pointList);
        console.log(base_pointList.length);

        console.log(top_pointList);
        console.log(top_pointList.length);

        console.log(this.indices);
        console.log(this.indices.length);

        this.delZe(base_pointList, this.indices);

        console.log(this.indices);
        console.log(this.indices.length);

        this.delZe(top_pointList, this.indices);

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();

        console.log(this.indices);
        console.log(this.indices.length);
    }
    /**
     * Called when user interacts with GUI to change object's complexity.
     * @param {integer} complexity - changes number of slices
     */
    updateBuffers(complexity){
        this.slices = 3 + Math.round(9 * complexity); //complexity varies 0-1, so slices varies 3-12

        // reinitialize buffers
        this.initBuffers();
        this.initNormalVizBuffers();
    }

}


