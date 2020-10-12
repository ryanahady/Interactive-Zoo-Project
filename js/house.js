var house_material = new THREE.MeshPhongMaterial({
            color: 0x2E1503
        });
        house_material.shininess = 100;
var loader = new THREE.PLYLoader();

//12.1.1 Rhino
loader.load('models/house.ply', function (house_geometry) {

    house_geometry.computeVertexNormals();
    house_geometry.computeBoundingBox();

    var houseCenter = house_geometry.boundingBox.getCenter();
    var houseSize = house_geometry.boundingBox.getSize();
    var houseMinimum = house_geometry.boundingBox.min;


    var houseSca = new THREE.Matrix4();
    var houseTra = new THREE.Matrix4();
    var houseCombined = new THREE.Matrix4();

    houseTra.makeTranslation(-houseCenter.x, -houseMinimum.y, -houseCenter.z);
    houseSca.makeScale( 600 / houseSize.length(), 600 / houseSize.length(), 600 /  houseSize.length());

    houseCombined.multiply(houseSca);
    houseCombined.multiply(houseTra);

    mesh8 = new THREE.Mesh(house_geometry, house_material);
    mesh8.applyMatrix(houseCombined);
    mesh8.castShadow = true;
    scene.add(mesh8);
    mesh8.position.x -= 500;
    mesh8.position.z += 150;
//    mesh.name = "loaded_rhin"
        mesh8.name = "loaded_house";
});


function onDocumentMouseDown(event) {

    var mouse = new THREE.Vector2;
    mouse.x = (event.clientX / renderer.domElement.clientWidth) * 2 - 1;
    mouse.y = -(event.clientY / renderer.domElement.clientHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);

    var intersects = raycaster.intersectObjects(scene.children, false);

    if (intersects.length > 0) {
        if ((intersects[0].object.name == "loaded_house") && (!selectedhouse)) {
            console.log("Selected!");
            intersects[0].object.material.color = new THREE.Color(1, 0.5, 0.5);
            selectedhouse = true;
        }
        if ((intersects[0].object.name != "loaded_house") && (selectedhouse)) {
            mesh8.material.color = new THREE.Color(1, 0.6, 1);
            var pos = intersects[0].point;
            console.log("Placed!");
            mesh8.position.x = pos.x;
            mesh8.position.z = pos.z;
            selectedhouse = false;
        }
    }
}

// when the mouse is clicked, call the given function
document.addEventListener('mousedown', onDocumentMouseDown, false);
