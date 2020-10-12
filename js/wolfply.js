
 var wolfply_material = new THREE.MeshPhongMaterial({
            color: 0xffaaff
        });
        wolfply_material.shininess = 100;
var loader = new THREE.PLYLoader();

//12.1.1 Rhino
loader.load('models/wolfply.ply', function (wolfply_geometry) {
    
    wolfply_geometry.computeVertexNormals();
    wolfply_geometry.computeBoundingBox();

    var wolfplyCenter = wolfply_geometry.boundingBox.getCenter();
    var wolfplySize = wolfply_geometry.boundingBox.getSize();
    var wolfplyMinimum = wolfply_geometry.boundingBox.min;


    var wolfplySca = new THREE.Matrix4();
    var wolfplyTra = new THREE.Matrix4();
    var wolfplyCombined = new THREE.Matrix4();

    wolfplyTra.makeTranslation(-wolfplyCenter.x, -wolfplyMinimum.y, -wolfplyCenter.z);
    wolfplySca.makeScale(90 / wolfplySize.length(), 90 / wolfplySize.length(), 90 / wolfplySize.length());

    wolfplyCombined.multiply(wolfplySca);
    wolfplyCombined.multiply(wolfplyTra);

    mesh5 = new THREE.Mesh(wolfply_geometry, wolfply_material);
    mesh5.applyMatrix(wolfplyCombined);
    mesh5.castShadow = true;
    scene.add(mesh5);
    mesh5.position.x += -80;
    mesh5.position.z += -80;
//    mesh.name = "loaded_rhin"
        mesh5.name = "loaded_wolfply";
});



//14. Raycaster Feature

var raycaster = new THREE.Raycaster();

var selectedwolfply = false;

function onDocumentMouseDown(event) {

    var mouse = new THREE.Vector2;
    //         mouse.x = ( event.clientX / renderer.domElement.clientWidth );
    mouse.x = (event.clientX / renderer.domElement.clientWidth) * 2 - 1;
    //         mouse.z = -( event.clientZ / renderer.domElement.clientHeight );
    mouse.y = -(event.clientY / renderer.domElement.clientHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);

    var intersects = raycaster.intersectObjects(scene.children, false);

    if (intersects.length > 0) {
        if ((intersects[0].object.name == "loaded_wolfply") && (!selectedwolfply)) {
            console.log("Selected!");
            intersects[0].object.material.color = new THREE.Color(1, 0.5, 0.5);
            selectedwolfply = true;
        }
        if ((intersects[0].object.name != "loaded_wolfply") && (selectedwolfply)) {
            mesh5.material.color = new THREE.Color(1, 0.6, 1);
            var pos = intersects[0].point;
            console.log("Placed!");
            mesh5.position.x = pos.x;
            mesh5.position.z = pos.z;
            selectedwolfply = false;
        }
    }
}

// when the mouse is clicked, call the given function
document.addEventListener('mousedown', onDocumentMouseDown, false);