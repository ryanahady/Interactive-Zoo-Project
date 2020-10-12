var caretaker_material = new THREE.MeshPhongMaterial({
            color: 0x101010
        });
        caretaker_material.shininess = 100;
var loader = new THREE.PLYLoader();

//12.1.1 Rhino
loader.load('models/caretaker.ply', function (caretaker_geometry) {

    caretaker_geometry.computeVertexNormals();
    caretaker_geometry.computeBoundingBox();

    var caretakerCenter = caretaker_geometry.boundingBox.getCenter();
    var caretakerSize = caretaker_geometry.boundingBox.getSize();
    var caretakerMinimum = caretaker_geometry.boundingBox.min;


    var caretakerSca = new THREE.Matrix4();
    var caretakerTra = new THREE.Matrix4();
    var caretakerCombined = new THREE.Matrix4();

    caretakerTra.makeTranslation(-caretakerCenter.x, -caretakerMinimum.y, -caretakerCenter.z);
    caretakerSca.makeScale( 90 / caretakerSize.length(), 90 / caretakerSize.length(), 90/  caretakerSize.length());

    caretakerCombined.multiply(caretakerSca);
    caretakerCombined.multiply(caretakerTra);

    mesh9 = new THREE.Mesh(caretaker_geometry, caretaker_material);
    mesh9.applyMatrix(caretakerCombined);
    mesh9.castShadow = true;
    scene.add(mesh9);
    mesh9.position.x -= 300;
    mesh9.position.z += 100;
    mesh9.rotation.y = Math.PI / 2;
//    mesh.name = "loaded_rhin"
        mesh9.name = "loaded_caretaker";
});


function onDocumentMouseDown(event) {

    var mouse = new THREE.Vector2;
    mouse.x = (event.clientX / renderer.domElement.clientWidth) * 2 - 1;
    mouse.y = -(event.clientY / renderer.domElement.clientHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);

    var intersects = raycaster.intersectObjects(scene.children, false);

    if (intersects.length > 0) {
        if ((intersects[0].object.name == "loaded_caretaker") && (!selectedcaretaker)) {
            console.log("Selected!");
            intersects[0].object.material.color = new THREE.Color(1, 0.5, 0.5);
            selectedcaretaker = true;
        }
        if ((intersects[0].object.name != "loaded_caretaker") && (selectedcaretaker)) {
            mesh9.material.color = new THREE.Color(1, 0.6, 1);
            var pos = intersects[0].point;
            console.log("Placed!");
            mesh9.position.x = pos.x;
            mesh9.position.z = pos.z;
            selectedcaretaker = false;
        }
    }
}

// when the mouse is clicked, call the given function
document.addEventListener('mousedown', onDocumentMouseDown, false);
