var angle = 0;
var reverse = false;
var do_rotate = true;

var MyUpdateLoop = function () {


    if (do_rotate) {
        if (!reverse) {
            mesh.rotation.y += 0.03;
            mesh1.rotation.y += 0.03;
            mesh2.rotation.y += 0.03;
            mesh5.rotation.y += 0.03;
            mesh6.rotation.y += 0.03;
            mesh7.rotation.y += 0.03;

        } else {
            mesh.rotation.y -= 0.03;
            mesh1.rotation.y -= 0.03;
            mesh2.rotation.y -= 0.03;
            mesh5.rotation.y -= 0.03;
            mesh6.rotation.y -= 0.03;
            mesh7.rotation.y -= 0.03;
        }
    }
    renderer.render(scene, camera);
};

requestAnimationFrame(MyUpdateLoop);


var gui;

function buildGui() {
    gui = new dat.GUI();
    //parameters for gui
    var params = {
        Floor: material_floor.color.getHex(),
        Rhino: rhino_material.color.getHex(),
        Horse: horse_material.color.getHex(),
        Pingu: pingu_material.color.getHex(),
        Wolf: wolfply_material.color.getHex(),
        Chimp: chim_material.color.getHex(),
        Dog: dog_material.color.getHex(),
        Rotate: do_rotate,
        Clockwise: reverse,
        spot_intensity: spotlight.intensity,
        ambient_intensity: light_ambient.intensity,
        camera_intensity: light_camera.intensity,
//        SunDistance: distant,
    }
    gui.addColor(params, 'Floor').onChange(function (val) {
        material_floor.color.setHex(val);
    })
    gui.addColor(params, 'Rhino').onChange(function (val) {
        rhino_material.color.setHex(val);
    })
    gui.addColor(params, 'Horse').onChange(function (val) {
        horse_material.color.setHex(val);
    })
    gui.addColor(params, 'Pingu').onChange(function (val) {
        pingu_material.color.setHex(val);
    })
    gui.addColor(params, 'Wolf').onChange(function (val) {
        wolfply_material.color.setHex(val);
    })
    gui.addColor(params, 'Chimp').onChange(function (val) {
        chim_material.color.setHex(val);
    })
    gui.addColor(params, 'Dog').onChange(function (val) {
        dog_material.color.setHex(val);
    })
    gui.add(params, 'Rotate', 0, 1).onChange(function (val) {
        do_rotate = val;
    });
    gui.add(params, 'Clockwise', 0, 1).onChange(function (val) {
        reverse = val;
    });
    gui.add(params, 'spot_intensity', 0, 3).onChange(function (val) {
        spotlight.intensity = val;
    });
    gui.add(params, 'ambient_intensity', 0, 3).onChange(function (val) {
        light_ambient.intensity = val;
    });
    gui.add(params, 'camera_intensity', 0, 3).onChange(function (val) {
        light_camera.intensity = val;
    });
//    gui.add(params, 'SunDistance', 2, 40).onChange(function (val) {
//        distant = Math.round(val);
//        ClearScene();
//
//    });
    gui.open();
}
