
 var chim_material = new THREE.MeshPhongMaterial({
            color: 0xffaaff
        });
        chim_material.shininess = 100;
var loader = new THREE.PLYLoader();

//12.1.1 Rhino
loader.load('models/chim.ply', function (chim_geometry) {

    chim_geometry.computeVertexNormals();
    chim_geometry.computeBoundingBox();

    var chimCenter = chim_geometry.boundingBox.getCenter();
    var chimSize = chim_geometry.boundingBox.getSize();
    var chimMinimum = chim_geometry.boundingBox.min;


    var chimSca = new THREE.Matrix4();
    var chimTra = new THREE.Matrix4();
    var chimCombined = new THREE.Matrix4();

    chimTra.makeTranslation(-chimCenter.x, -chimMinimum.y, -chimCenter.z);
    chimSca.makeScale( 70 / chimSize.length(), 70 / chimSize.length(), 70 /  chimSize.length());

    chimCombined.multiply(chimSca);
    chimCombined.multiply(chimTra);

    mesh6 = new THREE.Mesh(chim_geometry, chim_material);
    mesh6.applyMatrix(chimCombined);
    mesh6.castShadow = true;
    scene.add(mesh6);
    mesh6.position.x -= 120;
    mesh6.position.z += 330;
//    mesh.name = "loaded_rhin"
        mesh6.name = "loaded_chim";
});
var raycaster = new THREE.Raycaster();

var selectedchim = false;

function onDocumentMouseDown(event) {

    var mouse = new THREE.Vector2;
    mouse.x = (event.clientX / renderer.domElement.clientWidth) * 2 - 1;
    mouse.y = -(event.clientY / renderer.domElement.clientHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);

    var intersects = raycaster.intersectObjects(scene.children, false);

    if (intersects.length > 0) {
        if ((intersects[0].object.name == "loaded_chim") && (!selectedchim)) {
            console.log("Selected!");
            intersects[0].object.material.color = new THREE.Color(1, 0.5, 0.5);
            selectedchim = true;
        }
        if ((intersects[0].object.name != "loaded_chim") && (selectedchim)) {
            mesh6.material.color = new THREE.Color(1, 0.6, 1);
            var pos = intersects[0].point;
            console.log("Placed!");
            mesh6.position.x = pos.x;
            mesh6.position.z = pos.z;
            selectedchim = false;
        }
    }
}

// when the mouse is clicked, call the given function
document.addEventListener('mousedown', onDocumentMouseDown, false);
