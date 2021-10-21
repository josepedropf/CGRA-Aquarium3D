import { CGFscene, CGFcamera, CGFaxis, CGFappearance, CGFtexture, CGFshader } from "../lib/CGF.js";
import { CGFcamera2 } from "./CGFCamera2.js";
import { MyMovingObject } from "./MyMovingObject.js";
import { MyMovingFish } from "./MyMovingFish.js";
import { MyUnitCube } from "./MyUnitCube.js";
import { MySphere } from "./MySphere.js";
import { MyCubeMap } from "./MyCubeMap.js";
import { MyCylinder } from "./MyCylinder.js";
import { MyPillar } from "./MyPillar.js";
import { MyQuad } from "./MyQuad.js";
import { MyRock } from "./MyRock.js";
import { MyFish } from "./MyFish.js";
import { MySeaFloor } from "./MySeaFloor.js";
import { MyWaterSurface } from "./MyWaterSurface.js";
import { MyRockSet } from "./MyRockSet.js";
import { MyPillarSet } from "./MyPillarSet.js";
import {MySeaweedSet} from "./MySeaweedSet.js";
import {MyPyramid} from './MyPyramid.js';
import { MyFlatSeaFloor } from "./MyFlatSeaFloor.js";
import { MySeaweed } from "./MySeaweed.js";
import { MyNest } from "./MyNest.js";
import { MyAnimatedFish } from "./MyAnimatedFish.js";
import { MyAnimatedFishSet } from "./MyAnimatedFishSet.js";
import { MyFourPillars } from "./MyFourPillars.js";

/**
* MyScene
* @constructor
*/
export class MyScene extends CGFscene {
    constructor() {
        super();
    }
    init(application) {
        super.init(application);
        this.initCameras();
        this.initLights();

        //Background color
        this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

        this.gl.clearDepth(100.0);
        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.enable(this.gl.CULL_FACE);
        this.gl.depthFunc(this.gl.LEQUAL);

        this.setUpdatePeriod(50);
        this.last_t = 0;
        
        this.enableTextures(true);

        
        this.has_moved = false;
        this.defaultAppearance = new CGFappearance(this);
		this.defaultAppearance.setAmbient(0.2, 0.4, 0.8, 1.0);
        this.defaultAppearance.setDiffuse(0.2, 0.4, 0.8, 1.0);
        this.defaultAppearance.setSpecular(0.2, 0.4, 0.8, 1.0);
        this.defaultAppearance.setEmission(0,0,0,1);
        this.defaultAppearance.setShininess(120);
        
        this.mapMaterial = new CGFappearance(this);
        this.mapMaterial.setAmbient(0, 0, 0, 1);
        this.mapMaterial.setDiffuse(0, 0, 0, 1);
        this.mapMaterial.setSpecular(0, 0, 0, 1);
        this.mapMaterial.setEmission(1, 1, 1, 1);
        

		this.sphereAppearance = new CGFappearance(this);
		this.sphereAppearance.setAmbient(0.3, 0.3, 0.3, 1);
		this.sphereAppearance.setDiffuse(0.7, 0.7, 0.7, 1);
		this.sphereAppearance.setSpecular(0.0, 0.0, 0.0, 1);
		this.sphereAppearance.setShininess(120);
        this.sphereAppearance.loadTexture('images/earth.jpg');

        this.seaWeedAppearance = new CGFappearance(this);
		this.seaWeedAppearance.setAmbient(0.3, 0.3, 0.3, 1);
		this.seaWeedAppearance.setDiffuse(0.7, 0.7, 0.7, 1);
		this.seaWeedAppearance.setSpecular(0.0, 0.0, 0.0, 1);
		this.seaWeedAppearance.setShininess(120);
        this.seaWeedAppearance.loadTexture('./images/treetrunk.jpg');

 
        this.fishTextures = [
            "./images/fish_textures/fish_texture.jpg",
            "./images/fish_textures/fish_texture2.png",
            "./images/fish_textures/fish_texture3.png",
            "./images/fish_textures/fish_texture4.jpg",
            "./images/fish_textures/fish_texture5.jpg",
            "./images/fish_textures/fish_texture6.jpg"
        ]

        this.eyeTextures = [
            "./images/eye_textures/fish_eye.png",
            "./images/eye_textures/fish_eye2.png",
            "./images/eye_textures/fish_eye3.png",
            "./images/eye_textures/fish_eye4.png"
        ]

        this.nestTextures = [
            "./images/nest_textures/puffer_nest.jpg",
            "./images/nest_textures/sun_circle.png",
            "./images/nest_textures/sun_circle_close.png",
            "./images/nest_textures/tiger_text.jpg"
        ]

        this.pillarTextures = [
            "./images/pillar_textures/pillar_texture.jpg",
            "./images/pillar_textures/pillar_texture2.jpg",
            "./images/pillar_textures/pillar_texture3.jpg",
            "./images/pillar_textures/pillar_texture4.jpg"
        ]

        this.colors = [
            [1.00, 0.57, 0.00], 
            [0.00, 0.00, 0.00],
            [1.00, 1.00, 1.00],
            [1.00, 0.00, 0.00],
            [0.00, 1.00, 0.00],
            [0.00, 0.00, 1.00],
            [0.80, 0.20, 1.00],
            [0.70, 0.90, 0.50],
            [0.10, 0.90, 0.70],
            [0.20, 0.30, 0.80]

        ]
        //Orange
        //Black
        //White
        //Red
        //Green
        //Blue
        //Purple
        //Light Green
        //Light Blue
        //Dark Blue

        //Initialize scene objects
        this.axis = new CGFaxis(this);
        this.sphere = new MySphere(this, 16, 8);
        this.rock = new MyRock(this, 16, 8, "./images/rock_texture.jpg", 1.0, 1.0, 1.0, 0.0, 0.0, 0.0);
        this.nest = new MyNest(this, this.nestTextures[2], "./images/radial_gradient.png", 0.0, 10.0, 10);
        this.quad = new MyQuad(this);
        this.sea_floor = new MySeaFloor(this, "./images/sand.png", "./images/sandMapCustom.png", "./images/sandMap.png", 50, 1.0, 0.8, 10.0, 20, 0, 1, 0, 1, this.nest);
        this.water_surface = new MyWaterSurface(this, "./images/pier.jpg", "./images/distortionmap.png", "./images/waterMap.jpg", 50, 10, 12);
        this.pillar = new MyPillar(this, 12, 20, this.pillarTextures[0]);
        this.seaweed = new MySeaweed(this, 12, 20);
        this.rock_set = new MyRockSet(this, 16, 8, "./images/rock_texture.jpg", "./images/sandMapCustom.png", 0.1, 0.4, 50, 20, 50, this.nest, this.sea_floor.base_height, this.sea_floor.max_h); //0.05, 0.2, 0.1
        this.pillar_set = new MyPillarSet(this, 12, 40, this.pillarTextures[0], 0.5, 1.2, 50, 10, this.nest);
        this.seaweed_set = new MySeaweedSet(this, 40, 20, "./images/treetrunk.jpg", 0.5, 1.2, 50.0, 10.0, this.nest);
        this.fish = new MyFish(this, this.fishTextures[5], this.eyeTextures[1], this.colors[8][0], this.colors[8][1], this.colors[8][2], 0.6, 16, 8, 0.5);
        this.anim_fish = new MyAnimatedFish(this, new MyFish(this, this.fishTextures[5], this.eyeTextures[1], this.colors[8][0], this.colors[8][1], this.colors[8][2], 0.6, 16, 8, 0.5), 0.0, 0.0, 2.0, 3.0, 6.0, 20.0);
        this.anim_fish_set = new MyAnimatedFishSet(this, 3, 50.0, this.fishTextures, this.colors, this.eyeTextures, 1.0, 5.0, 1.0, 5.0, 2.0, 10.0, 0.4, 0.8, 0.5, 2.0);
        this.four_pillars = new MyFourPillars(this, 12, 50, this.pillarTextures[0], 50.0, 2.0);

        this.movingobject = new MyMovingFish(this, new MyFish(this, this.fishTextures[0], this.eyeTextures[0], this.colors[0][0], this.colors[0][1], this.colors[0][2], 0.6, 16, 8, 0.5), 1.0, 3.0, this.rock_set, 2.0, 5.0, this.nest);

        this.cubemap_demo = new MyCubeMap(this, 200, 'images/demo_cubemap/bottom.png', 'images/demo_cubemap/left.png', 'images/demo_cubemap/right.png', 'images/demo_cubemap/back.png', 'images/demo_cubemap/front.png', 'images/demo_cubemap/top.png');
        this.cubemap_space = new MyCubeMap(this, 200, 'images/space_cubemap/heavenly-tapestry_bottom.png', 'images/space_cubemap/heavenly-tapestry_left.png', 'images/space_cubemap/heavenly-tapestry_right.png', 'images/space_cubemap/heavenly-tapestry_back.png', 'images/space_cubemap/heavenly-tapestry_front.png', 'images/space_cubemap/heavenly-tapestry_top.png');
        this.cubemap_underwater = new MyCubeMap(this, 200,'images/underwater_cubemap/bottom.jpg', 'images/underwater_cubemap/left.jpg', 'images/underwater_cubemap/right.jpg', 'images/underwater_cubemap/back.jpg', 'images/underwater_cubemap/front.jpg', 'images/underwater_cubemap/top.jpg');

        this.mapList = {
            'Void' : 0,
            'Default Map' : 1,
            'Space Map' : 2,
            'Underwater Map' : 3
        }

        this.cameraList = {
            'Free Camera' : 0,
            'Third Person' : 1,
            'First Person' : 2
        }
        
        this.colorList = {
            'Orange' : 0,
            'Black' : 1,
            'White' : 2,
            'Red' : 3,
            'Green' : 4,
            'Blue' : 5,
            'Purple': 6,
            'Light Green': 7,
            'Light Blue': 8,
            'Dark Blue': 9
        }

        this.fishTextureList = {
            'Blue Scales' : 0,
            'Triangular Scales' : 1,
            'Little Scales' : 2,
            'Gold' : 3,
            'Iron Fish' : 4,
            'Gray Scales' : 5
        }
        
        this.eyeTextureList = {
            'Purple Hypno' : 0,
            'Blue' : 1,
            'Green' : 2,
            'Regular Eyes' : 3
        }

        this.nestTextureList = {
            'Blue Sun' : 0,
            'Sand Sun Far' : 1,
            'Sand Sun Close' : 2,
            'Tiger Stripes' : 3
        }

        this.pillarTextureList = {
            'Tree Trunk' : 0,
            'Marble' : 1,
            'Underwater Green' : 2,
            'Underwater Blue' : 3
        }


        //Objects connected to MyInterface
        this.scaleFactor = 1.0;
        this.speedFactor = 1.0;

        this.selectedMap = 3;
        this.selectedCamera = 0;
        this.selectedColor = 0;
        this.selectedFishT = 0;
        this.selectedEyeT = 0;
        this.selectedNestT = 2;
        this.selectedPillarT = 0;

        this.displayAxis = true;
        this.displayPillar = false;
        this.displayRock = false;
        this.displaySeaweed = false;
        this.displayRockSet = true;
        this.displayPillarSet = true;
        this.displayFish = false;
        this.displaySphere = false;
        this.displayQuad = false;
        this.displayMovingObject = true;
        this.displaySeaFloor = true;
        this.displayWater = true;
        this.displayAnimFish = true;
        this.displayAnimFishSet = true;
        this.displaySeaweedSet = false;
        this.displayFourPillars = true;

        this.onSelectedMapChanged(this.selectedMap);
        this.onSelectedCameraChanged(this.selectedCamera);
        this.onSelectedColorChanged(this.selectedColor);
        this.onSelectedFishTChanged(this.selectedFishT);
        this.onSelectedEyeTChanged(this.selectedEyeT);
        this.onSelectedNestTChanged(this.selectedNestT);
        this.onSelectedPillarTChanged(this.selectedPillarT);
    }
    initLights() {
        this.setGlobalAmbientLight(1, 1, 1, 1.0);
        this.lights[0].setPosition(15, 2, 5, 1);
        this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.lights[0].enable();
        this.lights[0].update();
    }
    initCameras() {
        //this.camera = new CGFcamera(1.5, 0.1, 500, vec3.fromValues(2, 2, 2), vec3.fromValues(0, 2, 0));
        this.camera = new CGFcamera2(1.5, 0.1, 500, vec3.fromValues(2, 2, 2), vec3.fromValues(0, 2, 0));
    }

    resetCamera() {
        this.camera.position = vec3.fromValues(2, 2, 2);
    }

    FPSCamera() {
        this.camera.position = vec3.fromValues(this.movingobject.position[0], this.movingobject.position[1], this.movingobject.position[2]);
        this.camera.target = vec3.fromValues(this.movingobject.position[0] + Math.sin(-this.movingobject.angle), this.movingobject.position[1], this.movingobject.position[2] + Math.cos(-this.movingobject.angle));
    }

    TPCamera() {
        this.camera.position = vec3.fromValues(this.movingobject.position[0] - Math.sin(-this.movingobject.angle), this.movingobject.position[1] + 0.5, this.movingobject.position[2] - Math.cos(-this.movingobject.angle));
        this.camera.target = vec3.fromValues(this.movingobject.position[0], this.movingobject.position[1] , this.movingobject.position[2]);
    }
    

    setDefaultAppearance() {
        this.setAmbient(0.2, 0.4, 0.8, 1.0);
        this.setDiffuse(0.2, 0.4, 0.8, 1.0);
        this.setSpecular(0.2, 0.4, 0.8, 1.0);
        this.setEmission(0,0,0,1);
        this.setShininess(10.0);
    }
    
    checkKeys() {
        var text = "Keys pressed: ";
        var keysPressed = false;
        //console.log(text);

        if (this.gui.isKeyPressed("KeyW")) {
            text += " W ";
            keysPressed = true;
            this.has_moved = true;

            this.movingobject.accelerate(0.1 * this.speedFactor);
        }

        if (this.gui.isKeyPressed("KeyS")) {
            text += " S ";
            keysPressed = true;

            this.movingobject.accelerate(-0.1 * this.speedFactor);
        }

        if (this.gui.isKeyPressed("KeyA")) {
            text += " A ";
            keysPressed = true;
            this.has_moved = true;

            this.movingobject.turn(0.1 * this.speedFactor, "KeyA");
        }

        if (this.gui.isKeyPressed("KeyD")) {
            text += " D ";
            keysPressed = true;

            this.movingobject.turn(-0.1 * this.speedFactor, "KeyD");
        }

        if (this.gui.isKeyPressed("KeyR")) {
            text += " R ";
            keysPressed = true;

            this.movingobject.reset();
        }

        if (this.gui.isKeyPressed("KeyN")) {
            text += " N ";
            keysPressed = true;

            this.resetCamera();
        }

        if (this.gui.isKeyPressed("KeyP")) { //new 
            text += " P ";
            keysPressed = true;

            this.movingobject.rise();
        }

        if (this.gui.isKeyPressed("KeyL")) { //new 
            text += " L ";
            keysPressed = true;

            this.movingobject.fall();
        }

        if (this.gui.isKeyPressed("KeyC")) { //new 
            text += " C ";
            keysPressed = true;

            this.movingobject.pick_up();
        }

        if (keysPressed){
            //console.log(text);
            var pos_text = this.movingobject.position[0].toString() + ", " + this.movingobject.position[1].toString() + ", " + this.movingobject.position[2].toString();
            console.log(pos_text);
            var quad = 0;
            if(Math.abs(this.movingobject.angle) >= 0 && Math.abs(this.movingobject.angle) < Math.PI / 2.0) quad = 1;
            if(Math.abs(this.movingobject.angle) >= Math.PI / 2.0 && Math.abs(this.movingobject.angle) < Math.PI) quad = 2;
            if(Math.abs(this.movingobject.angle) >= Math.PI && Math.abs(this.movingobject.angle) < 3*Math.PI / 2.0) quad = 3;
            if(Math.abs(this.movingobject.angle) >= 3*Math.PI / 2.0 && Math.abs(this.movingobject.angle) <= 2*Math.PI) quad = 4;
            //console.log("V: " + this.movingobject.velocity + " | ANG: " + this.movingobject.angle + " | QUAD: " + quad);
        }
            
    }

    onSelectedMapChanged(v){}

    onSelectedCameraChanged(v){}

    onSelectedColorChanged(v){
        this.movingobject.object.set_color(this.colors[this.selectedColor]);
    }

    onSelectedFishTChanged(v){
        this.movingobject.object.set_body_texture(this.fishTextures[this.selectedFishT]);
    }

    onSelectedEyeTChanged(v){
        this.movingobject.object.set_eye_texture(this.eyeTextures[this.selectedEyeT]);
    }

    onSelectedNestTChanged(v){
        this.sea_floor.set_nest_texture(this.nestTextures[this.selectedNestT]);
    }

    onSelectedPillarTChanged(v){
        this.pillar_set.set_textures(this.pillarTextures[this.selectedPillarT]);
        this.four_pillars.set_textures(this.pillarTextures[this.selectedPillarT]);
    }


    onScaleFactorChanged(v) {
		//this.testShaders[this.selectedExampleShader].setUniformsValues({ normScale: this.scaleFactor });
    }
    
    onSpeedFactorChanged(v) {
        //this.setUpdatePeriod(50/this.speedFactor);
	}

    // called periodically (as per setUpdatePeriod() in init())
    update(t){
        this.checkKeys(); 
        this.fish.update_anim(t, 20.0);
        this.water_surface.update(t, 100);
        if(t != 0){
            this.movingobject.update((t - this.last_t) / 1000.0);
            if (this.selectedCamera == 1) this.TPCamera();
            else if (this.selectedCamera == 2) this.FPSCamera();
            console.log("UPDATE FREQ -> T:%f | DeltaT:%f", t, t - this.last_t);
            this.anim_fish.update((t - this.last_t));
            this.anim_fish_set.update((t - this.last_t));
        } 
        
        this.last_t = t;
    }

    display() {
        // ---- BEGIN Background, camera and axis setup
        // Clear image and depth buffer everytime we update the scene
        this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
        // Initialize Model-View matrix as identity (no transformation)
        this.updateProjectionMatrix();
        this.loadIdentity();
        // Apply transformations corresponding to the camera position relative to the origin
        this.applyViewMatrix();
        
        
        this.defaultAppearance.apply();

        // Draw axis
        if (this.displayAxis)
            this.axis.display();

        // ---- BEGIN Primitive drawing section
        if (this.displayMovingObject){
            this.pushMatrix();
            //this.scale(this.scaleFactor, this.scaleFactor, this.scaleFactor);
            this.movingobject.display();
            this.popMatrix(); 
        }

        
        if(this.selectedMap == 1)
            this.cubemap_demo.display();

        if(this.selectedMap == 2)
            this.cubemap_space.display();
        
        if(this.selectedMap == 3)
            this.cubemap_underwater.display();
        

        
        //This sphere does not have defined texture coordinates
        if(this.displaySphere){
            this.sphereAppearance.apply();
            this.sphere.display();
        }

        if(this.displayRock){
            this.rock.display();
        }

        if(this.displayPillar){
            this.pillar.display();
        }

        if (this.displaySeaweed) {
            this.seaweed.display();
        }

        if(this.displayAnimFish){
            this.anim_fish.display();
        }

        if(this.displayAnimFishSet){
            this.anim_fish_set.display();
        }
        
        if(this.displayRockSet){
            this.rock_set.display();
        }
        
        if(this.displayPillarSet){
            this.pillar_set.display();
        }

        if(this.displayFourPillars){
            this.four_pillars.display();
        }

        if (this.displaySeaweedSet) {
            this.seaweed_set.display();
        }
        

        if(this.displayFish){
            this.fish.display();
        }

        if(this.displayQuad){
            this.pushMatrix();
            this.rotate(Math.PI/2, 0, 1, 0);
            this.quad.display();
            this.popMatrix();
        }

        if(this.displaySeaFloor){
            this.pushMatrix();
            this.sea_floor.display();
            this.popMatrix();
        }

        if(this.displayWater){
            this.pushMatrix();
            this.water_surface.display();
            this.popMatrix();
        }
        

        // ---- END Primitive drawing section
    }

}