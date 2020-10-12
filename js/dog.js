var dog_material = new THREE.MeshPhongMaterial({
            color: 0xffaaff
        });
        dog_material.shininess = 100;
var loader = new THREE.PLYLoader();

//12.1.1 dog
loader.load('models/dog.ply', function (dog_geometry) {
    
    dog_geometry.computeVertexNormals();
    dog_geometry.computeBoundingBox();

    var dogCenter = dog_geometry.boundingBox.getCenter();
    var dogSize = dog_geometry.boundingBox.getSize();
    var dogMinimum = dog_geometry.boundingBox.min;


    var dogSca = new THREE.Matrix4();
    var dogTra = new THREE.Matrix4();
    var dogCombined = new THREE.Matrix4();

    dogTra.makeTranslation(-dogCenter.x, -dogMinimum.y, -dogCenter.z);
    dogSca.makeScale(90 / dogSize.length(), 90 / dogSize.length(), 90 /  dogSize.length());

    dogCombined.multiply(dogSca);
    dogCombined.multiply(dogTra);

    mesh7 = new THREE.Mesh(dog_geometry, dog_material);
    mesh7.applyMatrix(dogCombined);
    mesh7.castShadow = true;
    scene.add(mesh7);
    mesh7.position.x += 150;
    mesh7.position.z += 360;
//    mesh.name = "loaded_dog"
        mesh7.name = "loaded_dog";
});
var raycaster = new THREE.Raycaster();

var selecteddog = false;

function onDocumentMouseDown(event) {

    var mouse = new THREE.Vector2;
    mouse.x = (event.clientX / renderer.domElement.clientWidth) * 2 - 1;
    mouse.y = -(event.clientY / renderer.domElement.clientHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);

    var intersects = raycaster.intersectObjects(scene.children, false);

    if (intersects.length > 0) {
//        if((intersects[0].object))    
            if ((intersects[0].object.name == "loaded_dog") &&           (!selecteddog)) {
                console.log("Selected!");
                intersects[0].object.material.color = new THREE.Color(1,    0.5, 0.5);
                selecteddog = true;
            }
            if ((intersects[0].object.name != "loaded_dog") && (selecteddog)) {
                mesh7.material.color = new THREE.Color(1, 0.6, 1);
                var pos = intersects[0].point;
                console.log("Placed!");
                mesh7.position.x = pos.x;
                mesh7.position.z = pos.z;
                selecteddog = false;
        }
        
    }
}

// when the mouse is clicked, call the given function
document.addEventListener('mousedown', onDocumentMouseDown, false);