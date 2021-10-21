import {CGFinterface, dat} from '../lib/CGF.js';

/**
* MyInterface
* @constructor
*/
export class MyInterface extends CGFinterface {
    constructor() {
        super();
    }

    init(application) {
        // call CGFinterface init
        super.init(application);
        // init GUI. For more information on the methods, check:
        // http://workshop.chromeexperiments.com/examples/gui
        this.gui = new dat.GUI();
        
        var obj = this;

        //Checkbox element in GUI
        this.gui.add(this.scene, 'displayAxis').name('Display Axis');
        this.gui.add(this.scene, 'displayMovingObject').name('Display Player');
        this.gui.add(this.scene, 'displayPillar').name('Display Pillar');
        this.gui.add(this.scene, 'displayFourPillars').name('Display Four Pillars');
        this.gui.add(this.scene, 'displayRock').name('Display Rock');
        this.gui.add(this.scene, 'displayRockSet').name('Display Rock Set');
        this.gui.add(this.scene, 'displayPillarSet').name('Display Pillar Set');
        this.gui.add(this.scene, 'displaySeaweedSet').name('Display SeaWeed Set');
        this.gui.add(this.scene, 'displayFish').name('Display Static Fish');
        this.gui.add(this.scene, 'displayAnimFish').name('Display Animated Fish');
        this.gui.add(this.scene, 'displayAnimFishSet').name('Display Animated Fish Set');
        this.gui.add(this.scene, 'displayQuad').name('Display Quad');
        this.gui.add(this.scene, 'displaySphere').name('Display Sphere');
        this.gui.add(this.scene, 'displaySeaFloor').name('Display Sea Floor');
        this.gui.add(this.scene, 'displayWater').name('Display Water Surface');

        this.initKeys();


        this.gui.add(this.scene, 'selectedMap', this.scene.mapList).onChange(this.scene.onSelectedMapChanged.bind(this.scene)).name('Select Map');
        this.gui.add(this.scene, 'selectedCamera', this.scene.cameraList).onChange(this.scene.onSelectedCameraChanged.bind(this.scene)).name('Select Camera');
        this.gui.add(this.scene, 'selectedColor', this.scene.colorList).onChange(this.scene.onSelectedColorChanged.bind(this.scene)).name('Select Fish Color');
        this.gui.add(this.scene, 'selectedFishT', this.scene.fishTextureList).onChange(this.scene.onSelectedFishTChanged.bind(this.scene)).name('Select Fish Texture');
        this.gui.add(this.scene, 'selectedEyeT', this.scene.eyeTextureList).onChange(this.scene.onSelectedEyeTChanged.bind(this.scene)).name('Select Eye Texture');
        this.gui.add(this.scene, 'selectedNestT', this.scene.nestTextureList).onChange(this.scene.onSelectedNestTChanged.bind(this.scene)).name('Select Nest Texture');
        this.gui.add(this.scene, 'selectedPillarT', this.scene.pillarTextureList).onChange(this.scene.onSelectedPillarTChanged.bind(this.scene)).name('Select Pillar Texture');

        this.gui.add(this.scene, 'scaleFactor', 0.5, 3).onChange(this.scene.onScaleFactorChanged.bind(this.scene));
        this.gui.add(this.scene, 'speedFactor', 0.0, 5.0).onChange(this.scene.onSpeedFactorChanged.bind(this.scene));

        return true;
    }

    initKeys() {
        //Create reference from scene to GUI
        this.scene.gui = this;

        // disable the processKeyboard function
        this.processKeyboard = function() {};

        // create a named array to store which keys are being pressed
        this.activeKeys = {};
    }

    processKeyDown(event) {
        // called when a key is pressed, mark it as active in the array
        this.activeKeys[event.code] = true;
    };

    processKeyUp(event) {
        // called when a key is released, mark it as inactive in the array
        this.activeKeys[event.code] = false;
    };

    isKeyPressed(keyCode) {
        var text = "KeyCode: ";

        if(this.activeKeys[keyCode] === true && (keyCode == "KeyP" 
        || keyCode == "KeyL")) {
            this.activeKeys[keyCode] = false;
            return true;
        }

        return this.activeKeys[keyCode] || false;
    }
}