import {CGFobject} from '../lib/CGF.js';
/**
* MyPlane
* @constructor
 * @param scene - Reference to MyScene object
 * @param nDivs - number of divisions in both directions of the surface
*/
export class MyPlaneText extends CGFobject {
    constructor(scene, nDivs, minS, maxS, minT, maxT) {
        super(scene);
        nDivs = typeof nDivs !== 'undefined' ? nDivs : 1;

        this.nDivs = nDivs;
        this.patchLength = 1.0 / nDivs;

        this.minS = minS || 0;
		this.maxS = maxS || 1;
		this.minT = minT || 0;
		this.maxT = maxT || 1;
		this.q = (this.maxS - this.minS) / this.nrDivs;
		this.w = (this.maxT - this.minT) / this.nrDivs;

        this.initBuffers();
    }

    initBuffers() {
        /* example for nDivs = 3 :
        (numbers represent index of point in array)
        ('x's represent vertices which are drawn but not stored

        y
        ^
        |
        0    2    4    6    
        |
        1    3    5    7
        |
        x	 x	  x    x
        |
        x----x----x----x---> x
        */

        // Generate vertices
        this.vertices = [];
        this.texCoords = [];
        var xCoord = -0.5;
        for (var i = 0; i <= this.nDivs; i++) {
            this.vertices.push(xCoord, -0.5, 0.5 - this.patchLength);
            this.vertices.push(xCoord, -0.5, 0.5);
            this.texCoords.push(this.minS + i * this.q, this.minT + j * this.w);
            xCoord += this.patchLength;
        }

        // Generating indices
        /* for nDivs = 3 output will be [0, 1, 2, 3, 4, 5, 6, 7].
        Interpreting this index list as a TRIANGLE_STRIP will draw a row of the plane. */

    
        this.indices = [];
        for (var i = 0; i <= 2 * this.nDivs + 1; i++) {
            this.indices.push(i);
        }


        // Generating normals
        /*
        As this plane is being drawn on the xy plane, the normal to the plane will be along the positive z axis.
        So all the vertices will have the same normal, (0, 0, 1).
        */
        this.normals = [];
        for (var i = 0; i <= 2 * this.nDivs + 1; i++) {
            this.normals.push(0, 1, 0);
        }

        this.primitiveType = this.scene.gl.TRIANGLE_STRIP;
        this.initGLBuffers();
    }
    // Drawing the plane
    /*
    To draw the plane we need to draw the row we defined, nDivs times.
    Each row must be drawn patchLength lower than the one before it.
    To draw each row, the drawElements() function is used. This function draws the geometry defined in initBuffers();
    */
    display() {
        this.scene.pushMatrix();
        for (var i = 0; i < this.nDivs; i++) {
            super.display();
            this.scene.translate(0, 0, -this.patchLength);
        }

        this.scene.popMatrix();
    }
    /**
     * Called when user interacts with GUI to change object's complexity.
     * @param {integer} complexity - changes number of nDivs
     */
    updateBuffers(complexity){
        this.nDivs = 1 +  Math.round(9 * complexity); //complexity varies 0-1, so nDivs varies 1-10
        this.patchLength = 1.0 / this. nDivs;

        // reinitialize buffers
        this.initBuffers();
        this.initNormalVizBuffers();
    }
}